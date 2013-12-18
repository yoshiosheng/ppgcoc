var products={
		1:{
			std1:"8620GXXXXXCAGBCX",
			std2:"DS STD    GRY",
			std3:"CA8620G SNDNG SRFCR2:1:1",
			cstd:"ZMS2110 I",
			batches:"1CA8620G#1CA8000B#1CA0000G"
		},
		2:{
			std1:"2620GXXXXXCAGBCX",
			std2:"2DS STD    GRY",
			std3:"2CA8620G SNDNG SRFCR2:1:1",
			cstd:"ZMS2110 II",
			batches:"2CA8620G#2CA8000B#2CA0000G"
		},
		3:{
			std1:"3620GXXXXXCAGBCX",
			std2:"3DS STD    GRY",
			std3:"3CA8620G SNDNG SRFCR2:1:1",
			cstd:"ZMS2110 III",
			batches:"3CA8620G#2CA8000B#2CA0000G"
		}
}; 
var lots={
		1:{
			productNo:1,
			expiresAfter:"09/05/13",
			DOM:"01/05/13",
			"1CA8620G":{batchNo:13423,DOM:"09/04/13",DOP:"09/06/13",DOE:"09/08/13"},
			"1CA8000B":{batchNo:12423,DOM:"09/05/13",DOP:"09/07/13",DOE:"09/09/13"}
		},
		2:{
			productNo:2,
			expiresAfter:"09/05/13",
			DOM:"01/05/13",
			"2CA8620G":{batchNo:23423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"},
			"2CA8000B":{batchNo:23423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"},
			"2CA0000G":{batchNo:23423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"}
		},
		3:{
			productNo:3,
			expiresAfter:"09/05/13",
			DOM:"01/05/13",
			"1CA8620G":{batchNo:33423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"},
			"1CA8000B":{batchNo:33423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"}
		},
}; 
 $(document).ready(function() {
	 $("#close").click(function(){
		 $.modal.close();
	 });
	 $(".date").datepicker();
	 
	 $("#newCustomer").click(function(){		 
		 $("#inputform").submit(); 
	 });
	 
	 $("#newProductBut").click(function(){
		$("#productForm").modal(); 
	 });
	 
	 $("#Search").click(function(){
		$("#reportFilters").submit(); 
	 });
}); 
 
function updateCustomer(customerId,accoutNumber ,creditTerms ,shipVia ,
		signmentNoteNumber ,attention ,telephone ,remarks ){
	$("#productForm").modal(); 
	
	$("#accoutNumber").val(accoutNumber);
	$("#creditTerms").val(creditTerms);
	$("#shipVia").val(shipVia);
	$("#signmentNoteNumber").val(signmentNoteNumber);
	$("#attention").val(attention);
	$("#telephone").val(telephone);
	$("#remarks").val(remarks);
	
	$("#id").val(customerId);
}

function deleteCustomer(customerid){
	if(confirm("Are you sure to delete this customer?")){
		window.location = "../customer/delete/"+customerid;
	}
}

