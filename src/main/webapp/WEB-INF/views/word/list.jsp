<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>Product</title>
<!--This is the font pulled from google webfont-->
<link href='http://fonts.googleapis.com/css?family=Istok+Web:400,700,400italic,700italic' rel='stylesheet' type='text/css'/>
<!--This css stylesheet reset everything at the beginning -->
<link href="../assets/styles/reset.css" rel="stylesheet" type="text/css" />
<!--This is the less style -->
<link rel="stylesheet" type="text/css" href="../assets/styles/style2.css"/> 
 <link rel="stylesheet" href="../assets/styles/jquery-ui.css" />
<script src="../assets/js/jquery-1.9.1.js"></script>
<script src="../assets/js/jquery-ui.js"></script>
<script type="text/javascript" src="../assets/js/dropdown.js"></script>
<script type="text/javascript" src="../assets/js/view/word/list.js"></script>
<script type='text/javascript' src='../assets/js/jquery.simplemodal.js'></script>
</head>

<body class="minWidth1024">

	<div id="header" class="positionRelative">
		<div class="floatL marginT15 marginL40 "><img width="157"  src="../assets/images/logo.jpg"/></div>
		<ul id="main_menu" class="marginT44 positionAbsolute zIndex50"> 
		<li id="coc_li" class="main_menu_bg"><a href="../word/list" class="fontGreyd5d5d5 fontW700 marginT20 p13Font textCenter" id="admin_a">Key Word</a></li>
		<li id="users_li" class="main_menu_selected"><a href="../logout" class="fontW700 marginT20 p13Font textCenter fontDarkGrey343336" id="logout_a">LOGOUT</a></li>
			
		</ul>
	</div>
	<div id="padding" class="cleanBoth paddingT30" style="">
		 
		<div id="wrapper" class="bgGreydedede  positionRelative" style=""> 
			<div class="minHeight600 rightContentArea bgLightGreyf5f5f5 border_bottom1PGreyc5c5c5 border_right1PGreyd5d5d5 border_top1PWhite roundedCorner_BR roundedCorner_TR roundedCorner_BL" id="content">
			   		<form:form action="../word/add" id="reportFilters" method="post" cssClass="reportFilters">
							<!-- This starts the top filter-->
							<div id="contentProviderFilterContainer" class="floatL marginL10">
								<label class="fontGreyGeneral p14Font">File Dir</label>	
								<div class="marginL5 displayInlineBlock valueInput" id="contentProvidersSelect" name="contentProviderID" value="3">
									<input type="text" id="wordDir" name="wordDir" class="paddingL10 textField width150"/>
								</div>
							</div> 
							<div id="dateFilterContainer" class="floatL marginL10">
								<label class="fontGreyGeneral p13Font">File Path</label>	
								<div class="displayInlineBlock marginL5 valueInput" id="datesSelect" name="dateRangeType" value="ALLTIME">
									<input type="text" id="wordFile" name="wordFile" class="paddingL10 textField width150"/>
								</div>
							</div> 
							<div class="floatR">
								<a id="Search" class="border1PBlack3c3b3e cursorPointer darkBtn dropdownShadow floatR fontGreyeeeeee fontW700 marginR10 p13Font paddingB9 paddingL30 paddingR30 paddingT9 roundedCorner3">Parse</a>
								<a id="Distinct" class="border1PBlack3c3b3e cursorPointer darkBtn dropdownShadow floatR fontGreyeeeeee fontW700 marginR10 p13Font paddingB9 paddingL30 paddingR30 paddingT9 roundedCorner3">Distinct</a>
							</div>
							<div class="clearBoth"></div>
					</form:form>
					<table class="fixedTableLayout roundedCorner width100P border3PGreye7e7e7 marginT20">
						<tr class="bgLightGreyf5f5f5 fontW700 height40">
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter roundedCorner_TL verticalMiddle width20P">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">Key Word</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle width20P">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">PV</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle width20P">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">DESC</span>
							</th>
							
						</tr>
						<c:forEach items="${requireWordList}" var="requireWord">
						<tr class="bgWhite height40">
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width20P">
								<div class="fontW700 marginL5 marginR5 noWrap overflowHidden"><a class="textLink">${requireWord.word }</a></div>
							</td> 
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${requireWord.pv } </div>
							</td>
							<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font width10P">
								<div class="marginL5 marginR5 noWrap overflowHidden">${requireWord.desc }</div>
							</td>
							 
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
						<div class="fontGrey666567 fontW700 p13Font textLeft">Permission Details</div>
						
					</div>
					<div class="clearBoth"></div>
				</div>	
				<div class="bgGradientLightGrey border_top1PWhite paddingB14 paddingT14 roundedCorner_BL roundedCorner_BR textCenter">
					<a id="newPermissions" class="bgGradientBlack border1PBlack3c3b3e cursorPointer displayInlineBlock dropdownShadow fontGreyeeeeee fontW700 p13Font paddingB7 paddingL30 paddingR30 paddingT7 roundedCorner3 ">Save</a>
				</div>	
			</div>									
		</div>
	</div>
</body>
</html>
