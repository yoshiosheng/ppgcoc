<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <title><tiles:insertAttribute name="title"/></title>
	    <meta name="description" content=""/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    	<!-- jquery library --> 
    	<link title="html5doctor.com Reset Stylesheet" media="screen" href="../assets/styles/reset.css" type="text/css" rel="stylesheet">
     
    	<!-- in the CSS3 stylesheet you will find examples of some great new features CSS has to offer -->
    	<link media="screen" href="../assets/styles/css3.css" type="text/css" rel="stylesheet">
    
    	<!-- general stylesheet contains some default styles, you do not need this, but it helps you keep a uniform style -->
    	<link media="screen" href="../assets/styles/general.css" type="text/css" rel="stylesheet">
    
    	<!-- special styling for forms, this can be used as a form framework on its own -->
    	<link media="screen" href="../assets/styles/forms.css" type="text/css" rel="stylesheet">
    
    	<link media="screen" href="../assets/styles/styles.css" type="text/css" rel="stylesheet">  
    	<script src="../assets/js/jquery-1.9.1.js"></script>
		
		<!--inline scripts related to this page-->
		
		<script src="../assets/js/view/tiles/layout/mainTemplate.js"></script>
		
	</head>
	<c:choose>
		<c:when test="${empty skin}">
			<c:set var="skinClass" value="skin-1" />
		</c:when>
		<c:otherwise>
			<c:if test="${skin == 'default'}">
				<c:set var="skinClass" value="default" />
			</c:if>
			<c:if test="${skin == 'skin-1'}">
				<c:set var="skinClass" value="skin-1" />
			</c:if>
			<c:if test="${skin == 'skin-2'}">
				<c:set var="skinClass" value="skin-2" />
			</c:if>
			<c:if test="${skin == 'skin-3'}">
				<c:set var="skinClass" value="skin-3" />
			</c:if>
		</c:otherwise>
	</c:choose>
	<c:choose>
		<c:when test="${empty fixedHeader}">
			<c:set var="navbarClass" value="" />
		</c:when>
		<c:otherwise>
			<c:choose>
				<c:when test="${fixedHeader == false}">
					<c:set var="navbarClass" value="" />
				</c:when>
				<c:otherwise>
					<c:set var="navbarClass" value="navbar-fixed" />
				</c:otherwise>
			</c:choose>
		</c:otherwise>
	</c:choose>
	<c:choose>
		<c:when test="${empty fixedBreadcrumbs}">
			<c:set var="breadcrumbsClass" value="" />
		</c:when>
		<c:otherwise>
			<c:choose>
				<c:when test="${fixedBreadcrumbs == false}">
					<c:set var="breadcrumbsClass" value="" />
				</c:when>
				<c:otherwise>
					<c:set var="breadcrumbsClass" value="breadcrumbs-fixed" />
				</c:otherwise>
			</c:choose>
		</c:otherwise>
	</c:choose>
	<c:choose>
		<c:when test="${empty rtl}">
			<c:set var="rtlClass" value="" />
		</c:when>
		<c:otherwise>
			<c:choose>
				<c:when test="${rtl == false}">
					<c:set var="rtlClass" value="" />
				</c:when>
				<c:otherwise>
					<c:set var="rtlClass" value="rtl" />
				</c:otherwise>
			</c:choose>
		</c:otherwise>
	</c:choose>
	<body class="${skinClass} ${navbarClass} ${breadcrumbsClass} ${rtlClass}">
		<tiles:insertAttribute name="navBar"/>
	    <div class="main-container container-fluid">
	    	<a class="menu-toggler" id="menu-toggler" href="#">
				<span class="menu-text"></span>
			</a>
	    	<tiles:insertAttribute name="sideBar"/>
	    	<div class="main-content">
	    		<tiles:insertAttribute name="breadCrumbs"/>
				<tiles:insertAttribute name="pageContent"/>
				<tiles:insertAttribute name="aceSettingsContainer"/>
	    	</div>
	    	<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-small btn-inverse">
				<i class="icon-double-angle-up icon-only bigger-110"></i>
			</a>
	    </div>
	</body>
</html>