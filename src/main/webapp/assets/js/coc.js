var products={
		1:{
			id:1,
			name:"8620GXXXXXCAGBCX",
			standard:"DS STD    GRY",
			desc:"CA8620G SNDNG SRFCR2:1:1",
			uom:"EA",
			cstd:"ZMS2110 I",
			batches:"1CA8620G#1CA8000B#1CA0000G"
		},
		2:{
			id:2,
			name:"2620GXXXXXCAGBCX",
			standard:"2DS STD    GRY",
			desc:"2CA8620G SNDNG SRFCR2:1:1",
			uom:"EA",
			cstd:"ZMS2110 II",
			batches:"2CA8620G#2CA8000B#2CA0000G"
		},
		3:{
			id:3,
			name:"3620GXXXXXCAGBCX",
			standard:"3DS STD    GRY",
			desc:"3CA8620G SNDNG SRFCR2:1:1",
			uom:"EA",
			cstd:"ZMS2110 III",
			batches:"3CA8620G#2CA8000B#2CA0000G"
		}
};
var customers={
		1:{
			customerName:"CH1",
			creditTerms:"creditTerms1",
			shipVia:"shipVia1",
			consignmentNoteNumber:"consignmentNoteNumber1",
			attention:"attention1",
			telephone:"telephone1",
			remarks:"MAINTENANCE SZ1309120",
		},
		2:{
			customerName:"CH2",
			creditTerms:"creditTerms2",
			shipVia:"shipVia2",
			consignmentNoteNumber:"consignmentNoteNumber2",
			attention:"attention2",
			telephone:"telephone2",
			remarks:"MAINTENANCE SZ1309120",
		},
		3:{
			customerName:"CH3",
			creditTerms:"creditTerms3",
			shipVia:"shipVia3",
			consignmentNoteNumber:"consignmentNoteNumber3",
			attention:"attention3",
			telephone:"telephone3",
			remarks:"MAINTENANCE SZ13091203",
		}

} ;
var orders={
		SO1:{
			orderDate:"09/05/13",
			customerPONumber:"SM-CM-13030",
			contact:"SM-CM-13030",
			shipVIA:"ROAD", 
			page:"1",
			soldTo:"1",
			shipTo:"1",
			customer:"1",
			products:[{id:1,qty:3},{id:2,qty:6},{id:3,qty:10}]
		},
		SO2:{
			orderDate:"09/05/13",
			customerPONumber:"SM-CM-13030",
			contact:"SM-CM-13030",
			shipVIA:"ROAD", 
			page:"2",
			soldTo:"2",
			shipTo:"2",
			customer:"2",
			products:[{id:1,qty:3},{id:2,qty:6}]
		},
		SO3:{
			orderDate:"09/05/13",
			customerPONumber:"SM-CM-13030",
			contact:"SM-CM-13030",
			shipVIA:"BOAT", 
			page:"3",
			soldTo:"3",
			shipTo:"3",
			customer:"3",
			products:[{id:1,qty:3},{id:2,qty:6},{id:3,qty:10}]
		},

};
var lots={
		1:{
			productNo:1,
			expiresAfter:"09/05/13",
			DOM:"01/05/13",
			DOP:"01/05/13",
			"1CA8620G":{batchNo:13423,DOM:"09/04/13",DOP:"09/06/13",DOE:"09/08/13"},
			"1CA8000B":{batchNo:12423,DOM:"09/05/13",DOP:"09/07/13",DOE:"09/09/13"}
		},
		2:{
			productNo:2,
			expiresAfter:"09/05/13",
			DOM:"01/05/13",
			DOP:"",
			"2CA8620G":{batchNo:23423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"},
			"2CA8000B":{batchNo:23423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"},
			"2CA0000G":{batchNo:23423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"}
		},
		3:{
			productNo:3,
			expiresAfter:"09/05/13",
			DOM:"01/05/13",
			DOP:"01/05/13",
			"1CA8620G":{batchNo:33423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"},
			"1CA8000B":{batchNo:33423,DOM:"09/05/13",DOP:"09/05/13",DOE:"09/05/13"}
		},
};
var customerProductOption={
		"1_1":{
			name:"CH18620GXXXXXCAGBCX",
			standard:"CH1DS STD    GRY",
			desc:"CH1CA8620G SNDNG SRFCR2:1:1",
			code:"",
			isLotDOM:true,
			isLotDOP:false,
			cstd:"ZMS2110 I",
			isCstd:true,
			isBatchDOM:true,
			isBatchDOP:false,
			isBatchDOE:true
			
		},
		"1_2":{
			name:"CH12620GXXXXXCAGBCX",
			standard:"CH12DS STD    GRY",
			desc:"CH12CA8620G SNDNG SRFCR2:1:1",
			code:"",
			isLotDOM:true,
			isLotDOP:false,
			cstd:"ZMS2110 I",
			isCstd:true,
			isBatchDOM:true,
			isBatchDOP:true,
			isBatchDOE:true
		}
};
var cpo =customerProductOption;
var itemTableHtml='<table class="fixedTableLayout width100P itemTable"><tbody><tr class="bgWhite "><td class=" border_right1Pgreye7e7e7 p13font width5P"><div class="marginL5 marginR5 noWrap overflowHidden textAlignCenter"><input type="text" name="itemNo " class="border0 itemNo width100P"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P"><div class="marginL5 marginR5 noWrap overflowHidden verticalMiddle"><input type="text" class="border0 itemName width100P" name="itemName"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden textAlignCenter"><input type="text" name="lotNo" class="border0 itemShipDate textAlignCenter width100P"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden "><input type="text" class="border0 textAlignCenter itemQtyOrdered width100P " name="lotNo"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden"><input type="text" name="lotNo" class="border0 textAlignCenter itemUOM width100P "></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P"><div class="marginL5 marginR5 noWrap overflowHidden "><input type="text" class="border0 textAlignCenter itemQtyShipped width100P " name="lotNo"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden textAlignCenter"></div></td></tr><tr class="bgWhite "><td class=" border_right1Pgreye7e7e7 p13font width5p"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td colspan="6" class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P"><div class="marginL5 marginR5 noWrap overflowHidden"><input type="text" name="itemStandard " class="border0 itemStandard width100P"></div></td></tr><tr class="bgWhite "><td class=" border_right1Pgreye7e7e7 p13font width5p"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td colspan="6" class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P"><div class="marginL5 marginR5 noWrap overflowHidden"><input type="text" class="border0 itemDesc width100P" name="itemDesc"></div></td></tr><tr class="bgWhite "><td class=" border_right1Pgreye7e7e7 p13font width5p"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td colspan="6" class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P"><div class="marginL5 marginR5 noWrap overflowHidden">Lot No:<input type="text" class="border0 lotNo" name="lotNo">Expires After:<input type="text" class="border0 expiresAfter" name="expiresAfter"><span class="lotDOMSpan">DOM:<input type="text" class="border0 lotDOM " name="lotDOM"></span><span class="lotDOPSpan">DOP:<input type="text" class="border0 lotDOP " name="lotDOP"></span></div></td></tr><tr class="bgWhite codeRow"><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width5P"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P" colspan="6"><div class="marginL5 marginR5 noWrap overflowHidden "><input type="text" class="border0 code width100P" name="code"></div></td></tr><tr class="bgWhite batchRow"><td class=" border_right1Pgreye7e7e7 p13font width5p"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td colspan="6" class="border_right1Pgreye7e7e7 p13Font width35P"></td></tr><tr class="bgWhite chinaStdRow"><td class="border_right1Pgreye7e7e7 p13Font width5P"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td colspan="6" class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P"><div class="marginL5 marginR5 noWrap overflowHidden">incompliance with the chemical registration laws of CHINA</div></td></tr><tr class="bgWhite"><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width5P"><div class="marginL5 marginR5 noWrap overflowHidden itemNoBlank">&nbsp;</div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width35P" colspan="6"><div class="marginL5 marginR5 noWrap overflowHidden "><input type="text" class="border0 chinaStd width100P" name="chinaStd"></div></td></tr></tbody></table>';
var batchHtml='<tr class="bgWhite "><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P"><div class="marginL5 marginR5 noWrap overflowHidden batchName"><input type="text" class="border0 " name="batchName"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P"><div class="marginL5 marginR5 noWrap overflowHidden batchNo">Batch NO:<input type="text" class="border0 " name="batchNo"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden batchDOM">DOM:<input type="text" class="border0 " name="batchDOM"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden batchDOP">DOP:<input type="text" class="border0 " name="batchDOP"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width10P "><div class="marginL5 marginR5 noWrap overflowHidden batchDOE">DOE:<input type="text" class="border0 " name="batchDOE"></div></td><td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 p13Font width50P "><div class="marginL5 marginR5 noWrap overflowHidden">&nbsp;</div></td></tr>';
$(document).ready(function() {

	$("#orderNo").blur(function(){
		var num = $(this).val(); 
		var orderInfo = orders[num];
		for ( var field in orderInfo) {
			$("#"+field).val(orderInfo[field]);
		}
		
		//for customer info
		var num = orderInfo.customer;
		var customerInfo = customers[num];
		for ( var field in customerInfo) {
			$("#"+field).val(customerInfo[field]);
		}
		//for items
		$(".itemTable").remove();
		var itemSize = orderInfo.products.length;
		var cocTableSize = Math.ceil(itemSize/2);
		for ( var p in orderInfo.products) {
			var product = products[orderInfo.products[p].id];
			addNewItem(product,orderInfo.products[p].qty,num);
		}

	});
	var orderNoSource = new Array();
	for ( var field in orders) {
		orderNoSource.push(field);
	}
	$("#orderNo").autocomplete({
		source: orderNoSource
	}); 
	
	$("#printer").click(function(){ 
		$("#printOption").modal();  
	});
	$(".closeBtn").click(function(){
		$.modal.close(); 
	});
	$("#print").click(function(){
		$.modal.close();
		preparePrint();
		DLPrinter.PrintPreview();
		clearPrint();
	});
	$("#back").click(function(){
		history.go(-1)
	});
	$("#settingBut").click(function(){ 
		$("#settingForm").modal();  
	});
	
});
function addNewItem(product,qty,customerId){
	 $("#itemTables").append(itemTableHtml);
	var itemCount = $("#itemTables").find(".itemTable").length;
	var newItemTable = $("#itemTables").find(".itemTable").last();
	newItemTable.find( ".itemNo,.itemNoBlank" ).on("dblclick",function(){ 
		$(this).parentsUntil(".itemTable").parent().remove();
	});
	newItemTable.find(".itemNo").val(itemCount);
	 
	var options = customerProductOption[customerId+"_"+product.id];
	if(!options)options = {};
	
	newItemTable.find(".itemName").val(options.name || product.name);
	newItemTable.find(".itemStandard").val(options.standard || product.standard);
	newItemTable.find(".itemDesc").val(options.desc || product.desc);
	newItemTable.find(".itemQtyOrdered").val(qty);
	newItemTable.find(".itemUOM").val(product.uom);
	if(options.code){
		newItemTable.find(".code").val(options.code);
	}else{ 
		newItemTable.find(".codeRow").hide();;
	}
	if(options.isCstd)  {
		newItemTable.find(".chinaStd").val(options.cstd||product.cstd);
		newItemTable.find(".chinaStdRow").show();
	}else{
		newItemTable.find(".chinaStd").val("");
		newItemTable.find(".chinaStdRow").hide();
	}
	
	if(!options.isLotDOM)
		newItemTable.find(".lotDOMSpan").hide();
	else
		newItemTable.find(".lotDOMSpan").show();
	if(!options.isLotDOP)
		newItemTable.find(".lotDOPSpan").hide();
	else
		newItemTable.find(".lotDOPSpan").show();
	
 	newItemTable.find(".itemShipDate").datepicker();
 	newItemTable.find(".expiresAfter").datepicker();
 	newItemTable.find(".lotDOM").datepicker();
 	newItemTable.find(".lotDOP").datepicker();

 	//create batch
 	var batches = product.batches.split("#");
	var batchTableHtml='<table class="fixedTableLayout batchTable"><tbody></tbody></table>';
	if(batches.length>0){
		newItemTable.find(".batchRow ").show();
		newItemTable.find(".batchRow ").children().last().html(batchTableHtml);
		var batchTable =newItemTable.find(".batchTable");
		for ( var idx in batches) { 
			batchTable.append(batchHtml);
			batchTable.find(".batchName input").last().val(batches[idx]);
			
			batchTable.find(".batchDOM input").last().datepicker();
			batchTable.find(".batchDOP input").last().datepicker();
			batchTable.find(".batchDOE input").last().datepicker();
	 
			if(options && !options.isBatchDOM)
				batchTable.find(".batchDOM").hide();
			if(options && !options.isBatchDOE)
				batchTable.find(".batchDOE").hide();
			if(options && !options.isBatchDOP)
				batchTable.find(".batchDOP").hide();
		}
	}else newItemTable.find(".batchRow ").hide();
 	
 	
 	newItemTable.find(".lotNo").change(function(){
 		var lotNo = $(this).val();
 		if(lotNo.indexOf('-')>0)
 			lotNo = lotNo.substring(0,lotNo.indexOf('-'));
 		
 		var lotData = lots[lotNo]; 
 		var newItemTable = $(this).parentsUntil(".itemTable").parent();

 		newItemTable.find(".expiresAfter").val(lotData.expiresAfter);
 		newItemTable.find(".lotDOM").val(lotData.DOM);
 		newItemTable.find(".lotDOP").val(lotData.DOP);
 		
 		//batch NO
 		for ( var field in lotData) { 
 			var row = findBatch(newItemTable,field);
 			if(row != null){
 				row.find("input[name='batchNo']").val(lotData[field].batchNo);
 				row.find("input[name='batchDOM']").val(lotData[field].DOM);
 				row.find("input[name='batchDOP']").val(lotData[field].DOP);
 				row.find("input[name='batchDOE']").val(lotData[field].DOE);
 			}
		}
 	});
} 

function findBatch(newItemTable,batch){
	var batchs = newItemTable.find("input[name='batchName']");
	var row = null;
	$.each(batchs,function(i,n){
		if($(n).val()==batch)
			row= $(n).parentsUntil("tr").parent();
	});
	return row;
}
function preparePrint(){
	var itemSize = $("#editTable").find(".itemTable").length;
	  
	for ( var int = 0; int < Math.ceil(itemSize/2); int++) {
		$("#cocPrint").append($("#editTable").find(".COCTable").clone());
	}
	$.each($("#cocPrint").find(".COCTable"),function(i,n){
		var items = $(n).find(".itemTable").addClass("noprint");
		items.eq(i*2).removeClass("noprint");
		items.eq(i*2+1).removeClass("noprint");
		
	})
	$("#psPrint").append($("#cocPrint").clone());
	$("#psPrint").find(".tableTitle").html("Packing Slip &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;");
	$("#psPrint").find(".signRow").css("visibility","hidden");
	
	$("#filePrint").append('<img src="doc/american.jpg" width="1000"/>');
	$("#filePrint").append('<img src="doc/Enroup.jpg" width="1000"/>');
	
	
}
function clearPrint(){
	$("#cocPrint").empty();
	$("#psPrint").empty();
	$("#filePrint").empty();
}