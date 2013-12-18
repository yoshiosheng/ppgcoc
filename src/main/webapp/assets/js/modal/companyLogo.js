//Used modals to edit company logo
$('#coLogo').on('click', function(){
	var notifyMsg = 'Format: jpg/jpeg, gif, png. Max Size: 100kb.';
	var errMsg = '';
	var color = 'gray';
	
	if ($("#errMsg").val()!='')
	{
		errMsg = $("#errMsg").val();
		color = 'red';
	}
	
	var modal = 
	'<div class="modal hide fade">\
		<div class="modal-header">\
			<button type="button" class="close" data-dismiss="modal">&times;</button>\
			<h4 class="blue">Upload Customer Logo</h4>\
		    <font color="gray"><label id="infoLabel">'+notifyMsg+'</label></font>\
			<font color="'+color+'"><label id="errLabel">'+errMsg+'</label></font>\
		</div>\
		\
		<form method="POST" action="../account/changeLogo"  id="modalForm" name="modalForm" enctype="multipart/form-data">\
		<div class="modal-body">\
			<div class="space-4"></div>\
			<div id="divFile" name="divFile" style="width:75%;margin-left:12%;">\
			<input type="file" name="file"/>\
			<input type="hidden" value="'+$(this).next().val()+'" id="coAccountId" name="coAccountId">\
			</div>\
		</div>\
		</form>\
		<div class="modal-footer center">\
			<button type="submit" id="submit" name="submit" class="btn btn-small btn-success" disabled><i class="icon-ok"></i> Submit</button>\
			<button type="button" class="btn btn-small" data-dismiss="modal"><i class="icon-remove"></i> Cancel</button>\
		</div>\
     </div>';

	var modal = $(modal);
	modal.modal("show").on("hidden", function(){
		$("#errMsg").val('');
		modal.remove();
	});

	var working = false;
	var form = modal.find('form:eq(0)');
	var file = form.find('input[type=file]').eq(0);

	file.ace_file_input({
		style:'well',
		btn_choose:'Click to choose new customer logo',
		btn_change:null,
		no_icon:'icon-picture',
		thumbnail:'small',
		before_remove: function() {
			$('button:submit').attr("disabled", true);
			//don't remove/reset files while being uploaded
			return !working;
		},
		before_change: function(files, dropped) {
			var file = files[0];
			var l = '';
			if(typeof file === "string") {
				//file is just a file name here (in browsers that don't support FileReader API)
				if(! (/\.(jpe?g|png|gif)$/i).test(file) ) return false;
			}
			else {//file is a File object
				var type = $.trim(file.type);
				if( ( type.length > 0 && ! (/^image\/(jpe?g|png|gif)$/i).test(type) )
						|| ( type.length == 0 && ! (/\.(jpe?g|png|gif)$/i).test(file.name) )//for android default browser!
					) {
					l = 'Invalid file format. Please select jpg/jpeg, gif or png image format only';
					$("#errMsg").val(l);
					modal.modal("hide");
					$("#coLogo").click();
				}
					
					//return false;

				if( file.size > 110000 ) {//~100Kb
					l = 'Invalid file size. Image size should not exceed 100kb';
					$("#errMsg").val(l);
					modal.modal("hide");
					$("#coLogo").click();
				}
			}
			$("button").removeAttr('disabled');
			$('#errLabel').text(l);
			return true;
		}
	});

	// Fixed on IE8 unclickable input file
	$(".ace-file-input > input").css("height", "auto");
	$(".ace-file-input > input").css("width", "auto");

	$(document.body).on('click', '#submit' ,function(event) {
		// Temporary fixed for IE submit button issues
		if ($.browser.msie) {
			$("#modalForm").submit();
			$("#modalForm").submit();
		}

		 $("#modalForm").submit();
	});
});