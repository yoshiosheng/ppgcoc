<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Product Management</title>
<!--This is the font pulled from google webfont-->
<link href='http://fonts.googleapis.com/css?family=Istok+Web:400,700,400italic,700italic' rel='stylesheet' type='text/css'/>
<!--This css stylesheet reset everything at the beginning -->
<link href="../assets/styles/reset.css" rel="stylesheet" type="text/css" />
<!--This is the less style -->
<link rel="stylesheet" type="text/css" href="../assets/styles/style2.css"/> 
<link rel="stylesheet" href="../assets/styles/jquery-ui.css" />
<script src="../assets/js/jquery-1.9.1.js"></script>
<script src="../assets/js/jquery-ui.js"></script>
<script type='text/javascript' src='../assets/js/jquery.simplemodal.js'></script>
<script type="text/javascript" src="../assets/js/eeDropDown.js"></script>
<script type="text/javascript" src="../assets/js/view/customer/list.js"></script>
</head>

<body class="minWidth1024">

	<div id="header" class="positionRelative">
		<div class="floatL marginT15 marginL40 "><img width="157"  src="../assets/images/logo.jpg"/></div>
		<ul id="main_menu" class="marginT44 positionAbsolute zIndex50"> 
			<li id="coc_li" class="main_menu_bg"><a href="cocs.html" class="fontGreyd5d5d5 fontW700 marginT20 p13Font textCenter" id="admin_a">COC</a></li> 	
			<li id="receipt_li" class="main_menu_bg"><a href="receipt.html" class="fontGreyd5d5d5 fontW700 marginT20 p13Font textCenter" id="adminClasses_a">RECEIPT</a></li> 
			<li id="orders_li" class="main_menu_bg"><a href="orders.html" class="fontGreyd5d5d5 fontW700 marginT20 p13Font textCenter" id="content_a">ORDERS</a></li> 	
			<li id="workorder_li" class="main_menu_bg"><a href="workorder.html" class="fontGreyd5d5d5 fontW700 marginT20 p13Font textCenter" id="content_a">WORK ORDER </a></li> 	 
			<li id="product_li" class="main_menu_bg"><a href="../product/list" class="fontGreyd5d5d5 fontW700 marginT20 p13Font textCenter" id="content_a">PRODUCT</a></li> 	
			<li id="users_li" class="main_menu_selected"><a href="../user/list" class="fontW700 marginT20 p13Font textCenter fontDarkGrey343336" id="adminUsers_a">USERS</a></li> 
			<li id="users_li" class="main_menu_selected"><a href="../permission/list" class="fontW700 marginT20 p13Font textCenter fontDarkGrey343336" id="permissions_a">PERMISSIONS</a></li>
			<li id="users_li" class="main_menu_selected"><a href="../logout" class="fontW700 marginT20 p13Font textCenter fontDarkGrey343336" id="logout_a">LOGOUT</a></li>
		</ul>
	</div>
	<div id="padding" class="cleanBoth paddingT30" style="">
		 
		<div id="wrapper" class="bgGreydedede  positionRelative" style=""> 
			<div class="minHeight600 rightContentArea bgLightGreyf5f5f5 border_bottom1PGreyc5c5c5 border_right1PGreyd5d5d5 border_top1PWhite roundedCorner_BR roundedCorner_TR roundedCorner_BL" id="content">
			   		
			   		<form:form action="../customer/search" id="reportFilters" modelAttribute="customer" method="post" cssClass="reportFilters">
							<!-- This starts the top filter-->
							<div id="contentProviderFilterContainer" class="floatL marginL10">
								<label class="fontGreyGeneral p14Font">Accout Number</label>	
								<div class="marginL5 displayInlineBlock valueInput" id="contentProvidersSelect" name="contentProviderID" value="3">
									<form:input path="accoutNumber" id="searchAccoutNumber" cssClass="paddingL10 textField width150"/> 
								</div>
							</div> 
							<div id="dateFilterContainer" class="floatL marginL10">
								<label class="fontGreyGeneral p13Font">Credit Terms</label>	
								<div class="displayInlineBlock marginL5 valueInput" id="datesSelect" name="dateRangeType" value="ALLTIME">
									<form:input path="creditTerms" id="searchCreditTerms" cssClass="paddingL10 textField width150"/> 
								</div>
							</div> 
							<div class="floatR">
								<a id="newProductBut" class="border1PGreyc5c5c5 cursorPointer floatR dropdownShadow fontGrey666567 fontW700 lightBtn marginR10 p13Font paddingB9 paddingL20 paddingR20 paddingT9 roundedCorner3">New Customer</a>
								<a id="Search" class="border1PBlack3c3b3e cursorPointer darkBtn dropdownShadow floatR fontGreyeeeeee fontW700 marginR10 p13Font paddingB9 paddingL30 paddingR30 paddingT9 roundedCorner3">Search</a>
							</div>
							<div class="clearBoth"></div>
					</form:form>
					<table class="fixedTableLayout roundedCorner width100P border3PGreye7e7e7 marginT20">
						<tr class="bgLightGreyf5f5f5 fontW700 height40">
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter roundedCorner_TL verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Accout Number</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Credit Terms</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Ship Via</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">SignmentNoteNumber</span>
							</th>
							
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Attention</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Telephone</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Remarks</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Delete</span>
							</th>
							
						</tr>
						<c:forEach items="${customerList}" var="customer">
						<tr class="bgWhite height40">
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font ">
								<div class="fontW700 marginL5 marginR5 noWrap overflowHidden">
									<a class="textLink" onclick="javascript:updateCustomer(${customer.id},'${customer.accoutNumber }','${customer.creditTerms }','${customer.shipVia }','${customer.signmentNoteNumber }','${customer.attention }','${customer.telephone }','${customer.remarks }');">
										${customer.accoutNumber }
									</a>
								</div>
							</td> 
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${customer.creditTerms }</div>
							</td>
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${customer.shipVia }</div>
							</td>
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${customer.signmentNoteNumber }</div>
							</td> 
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${customer.attention }</div>
							</td>
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${customer.telephone }</div>
							</td> 
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${customer.remarks }</div>
							</td> 
							 <td class="border_bottom1Pgreye7e7e7 fontGreyGeneral p14Font width10P "><a classid="100" href="javascript:deactivateCourse(100)"><img class="cursorPointer" onclick="javascript:deleteCustomer(${customer.id});" src="../assets/img/darkDeleteBtn.png"></a></td>
						</tr>
						</c:forEach> 
					</table>	
			</div>			
		</div>
		<footer class="autoMarginLR clearBoth textCenter" id="footer">
		Copyright &copy 2012, PPG Aerospace
		</footer>
	</div> 
	<div id="productForm" class="centerOuter displayNone">
		<div class="bgWhite border5PGrey666567 centerInner roundedCorner10">
			<div id="close" class="closeBtn cursorPointer positionAbsolute"><img alt="close" src="../assets/img/lightboxCloseBtn.png"></div>
			<div class="bgLightGreyf5f5f5 paddingT30 p13Font roundedCorner">
				<div class="border_bottom1Pgreye7e7e7">
					<div class="floatL marginL30">
						<div class="fontGrey666567 fontW700 p13Font textLeft">Product Details</div>
						<form:form action="../customer/add" id="inputform" modelAttribute="customer"   method="post" cssClass="bgWhite borderGreydedede fontW400 height300  marginB20 marginT20 paddingT20 paddingL20 paddingR20 roundedCorner textLeft width380">
							<form:hidden path="id"/>
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Accout Number</div>
								<form:input path="accoutNumber" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>												
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Credit Terms</div>
								<form:input path="creditTerms" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Ship Via</div>
								<form:input path="shipVia" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>												
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Consignment Note Number</div>
								<form:input path="signmentNoteNumber" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Attention</div>
								<form:input path="attention" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Telephone</div>
								<form:input path="telephone" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Remarks</div>
								<form:input path="remarks" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>							
						</form:form>
					</div>
					<div class="clearBoth"></div>
				</div>	
				<div class="bgGradientLightGrey border_top1PWhite paddingB14 paddingT14 roundedCorner_BL roundedCorner_BR textCenter">
					<a id="newCustomer" class="bgGradientBlack border1PBlack3c3b3e cursorPointer displayInlineBlock dropdownShadow fontGreyeeeeee fontW700 p13Font paddingB7 paddingL30 paddingR30 paddingT7 roundedCorner3 ">Save</a>
				</div>	
			</div>									
		</div>
	</div>
</body>
</html>