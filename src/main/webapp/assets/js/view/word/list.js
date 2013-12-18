$(document).ready(function() {
	 $("#newProductBut").click(function(){
		 $("#productForm").modal(); 
	 });
	 $("#close,#newProduct").click(function(){
		 $.modal.close();
	 });
	 $(".date").datepicker();
	 
	 $("#newPermissions").click(function(){
		 $("#inputform").submit();
	 });
	 
	 $("#Search").click(function(){
			$("#reportFilters").submit(); 
	 });
	 
	 $("#Distinct").click(function(){
			window.location = "../word/distinct"; 
	 });
	
}); 
 
function updatePermission(permissionsId,permissionsName,permissionsCode,permissionsLink,permissionsIndex){
	$("#productForm").modal(); 
	
	$("#nameField").val(permissionsName);
	$("#code").val(permissionsCode);
	$("#link").val(permissionsLink);
	$("#index").val(permissionsIndex);
	$("#id").val(permissionsId);
}
