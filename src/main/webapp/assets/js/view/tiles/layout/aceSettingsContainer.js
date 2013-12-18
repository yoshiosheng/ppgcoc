$(document).ready(function() {
	var fixedHeader = $('input[name=fixedHeader]').val();
	var fixedSidebar = $('input[name=fixedSidebar]').val();
	var fixedBreadcrumbs = $('input[name=fixedBreadcrumbs]').val();
	var rtl = $('input[name=rtl]').val();

	if(fixedHeader == 'true') {
		$('#ace-settings-header').prop('checked', true);
	}
	if(fixedSidebar == 'true') {
		$('#ace-settings-sidebar').prop('checked', true);
	}
	if(fixedBreadcrumbs == 'true') {
		$('#ace-settings-breadcrumbs').prop('checked', true);
	}
	if(rtl == 'true') {
		$('#ace-settings-rtl').prop('checked', true);
	}
	
	$("#skin-colorpicker").change(function () {
		$.ajax({
			type: 'POST',
			url: '../setting/skin',
			dataType:'html',
			data: {
				id: $('input[name=currentUserId]').val(),
				skin: $('#skin-colorpicker option:selected').data('class')
			},
			success: function(data) {
				// do nothing
			}
		});
	});
	$("#ace-settings-header,#ace-settings-sidebar,#ace-settings-breadcrumbs").change(function () {
		$.ajax({
			type: 'POST',
			url: '../setting/fixedHeaderSidebarBreadcrumbs',
			dataType:'html',
			data: {
				id: $('input[name=currentUserId]').val(),
				fixedHeader: $("#ace-settings-header").is(':checked'),
				fixedSidebar: $("#ace-settings-sidebar").is(':checked'),
				fixedBreadcrumbs: $("#ace-settings-breadcrumbs").is(':checked')
			},
			success: function(data) {
				// do nothing
			}
		});
	});
	$("#ace-settings-rtl").change(function () {
		$.ajax({
			type: 'POST',
			url: '../setting/rightToLeft',
			dataType:'html',
			data: {
				id: $('input[name=currentUserId]').val(),
				rightToLeft: $("#ace-settings-rtl").is(':checked')
			},
			success: function(data) {
				// do nothing
			}
		});
	});
});