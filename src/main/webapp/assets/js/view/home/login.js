function show_box(id) {
	$('.widget-box.visible').removeClass('visible');
	$('#'+id).addClass('visible');
}

//NOMAD-97 watermark support for IE8
$(document).ready(function() {
	$('#j_username').watermark('Username');
	$('#j_password').watermark('Password');
});