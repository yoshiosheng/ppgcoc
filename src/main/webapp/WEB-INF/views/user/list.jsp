<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>User Management</title>
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
<script type="text/javascript" src="../assets/js/view/user/list.js"></script>
<script type="text/javascript">


$(document).ready(function(){ 
	$(".date").datepicker(); 
	 var data = new Array();
	 <c:forEach items="${permissionsList}" var="permissions">
		data.push({text:"${permissions.nameField }", clickFunc: "composePermission(${permissions.id })"});
	 </c:forEach>	
	 var options = {
	            type: 2,
	            width: 180,
	            height: 10,
	            selected: "ALL",
	            data: data,
	            dropdownID: null,
	            displayContainerID: "dateType",
	            selectionID: "addUserDropDownList",
	            onDropDownClick: null,
	            extraCssClass: "marginL10 top8 floatL"
	  };
	  var addNewUserDropdown = new eeDropDown("", options);
	  $("#userNameFilter").after(addNewUserDropdown.dropDown());
	
});
</script>
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
			  
				 	<form:form action="../user/search" id="reportFilters" modelAttribute="user" method="post" cssClass="reportFilters">
							<input type="hidden" name="permissionsId" id="permissionsId"/>
							<!-- This starts the top filter-->
							<div class="floatL"> 
								<div id="userNameFilter" class="floatL marginL10">
									<label class="fontGreyGeneral p14Font">User Name</label>	
									<div class="marginL5 displayInlineBlock valueInput" id="contentProvidersSelect" name="contentProviderID" value="3">
										<form:input path="username" class="paddingL10 textField width100" id="lotNo"/>
									</div> 
									<label class="fontGreyGeneral p14Font">Right</label>
								</div> 
								
							 
								<div class="clearBoth"></div>
								    
							</div>
							<div class="floatR">
								 <a id="newBut" class="border1PGreyc5c5c5 cursorPointer floatR dropdownShadow fontGrey666567 fontW700 lightBtn marginR10 p13Font paddingB9 paddingL20 paddingR20 paddingT9 roundedCorner3">New User</a>
								<a id="Search" class="border1PBlack3c3b3e cursorPointer darkBtn dropdownShadow floatR fontGreyeeeeee fontW700 marginR10 p13Font paddingB9 paddingL30 paddingR30 paddingT9 roundedCorner3">Search</a>
							</div>
							<div class="clearBoth"></div>
					</form:form>
					<table class="fixedTableLayout roundedCorner width100P border3PGreye7e7e7 marginT20">
						<tr class="bgLightGreyf5f5f5 fontW700 height40">
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter roundedCorner_TL verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">USER NAME</span>
							</th>
							<th class="border_bottom3Pgreye7e7e7 border_right1Pgreye7e7e7 border_top1PWhite textCenter verticalMiddle ">
								<span class="fontGrey666567 fontW700 marginL5 marginR5 p13Font">RIGHT</span>
							</th>
							 
						</tr>
						
						<c:forEach items="${userList}" var="user">
							<tr class="bgWhite height40">
								<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font ">
									<div class="fontW700 marginL5 marginR5 noWrap overflowHidden"><a class="textLink" onclick="javascript:updateUser('${user.id }','${user.username }','${user.password }','${user.permissionsId }');">${user.username }</a></div>
								</td>
								<td class="border_bottom1Pgreye7e7e7 border_right1Pgreye7e7e7 fontGrey666567 p13Font ">
									<div class="noWrap overflowHidden">
										<ul class="width100P textAlignCenter">
											<c:forEach items="${user.permissions}" var="permission">
												<li class="width100P textAlignCenter borderB1PTable verticalAlignM paddingT10 paddingB10">${permission.nameField }</li>
											</c:forEach>
										</ul>
									</div>
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
	 <div id="userForm" class="centerOuter displayNone">
		<div class="bgWhite border5PGrey666567 centerInner roundedCorner10">
			<div id="close" class="closeBtn cursorPointer positionAbsolute"><img alt="close" src="../assets/img/lightboxCloseBtn.png"></div>
			<div class="bgLightGreyf5f5f5 paddingT30 p13Font roundedCorner">
				<div class="border_bottom1Pgreye7e7e7">
					<div class="floatL marginL30 marginR30">
						<div class="fontGrey666567 fontW700 p13Font textLeft">User Info</div>
						<form:form action="../user/add" id="inputform" modelAttribute="user" method="post" cssClass="bgWhite borderGreydedede fontW400  height310  marginB20 marginT20 paddingT20 paddingL20 paddingR20 roundedCorner textLeft width380">
							<form:hidden path="id"/>
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">User Name</div>
								<form:input path="username" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/>
							</div>												
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Password</div>
								<form:password path="password" cssClass="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3"/> 
							</div>												
							<div class="fontGrey666567 marginT10 p13Font">
								<div class="inlineBlock width150">Password again</div>
								<input type="password" class="border1PGreye7e7e7 boxShadowTextField fontGrey666567 height28 p13Font paddingL10 paddingR10 roundedCorner3" name="assignment title"> 
							</div>
							 <div class="fontW700 p16Font marginT10 marginB10">Which Rights should the user have?</div>
							 
							 <c:forEach items="${permissionsList}" var="permissions">
							 	<div class="checkbox displayInlineBlock width150">
										<input type="checkbox" name="permissionsList" value="${permissions.id }"/>
										<label class="fontGrey666567 p14Font" for="checkbox1-1">${permissions.nameField }</label>	
								</div>
							 </c:forEach>
						</form:form>
					</div>
					 
					<div class="clearBoth"></div>
				</div>	
				<div class="bgGradientLightGrey border_top1PWhite paddingB14 paddingT14 roundedCorner_BL roundedCorner_BR textCenter">
					<a id="newUser" class="bgGradientBlack border1PBlack3c3b3e cursorPointer displayInlineBlock dropdownShadow fontGreyeeeeee fontW700 p13Font paddingB7 paddingL30 paddingR30 paddingT7 roundedCorner3 ">Save</a>
				 </div>	
			</div>									
		</div>
	</div>
	 
</body>
</html>