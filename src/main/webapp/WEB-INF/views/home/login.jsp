<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <meta charset="utf-8">
    <title> PPG Aerospace</title> 
    
    <!-- jquery library --> 
    <link title="html5doctor.com Reset Stylesheet" media="screen" href="assets/styles/reset.css" type="text/css" rel="stylesheet">
     
    <!-- in the CSS3 stylesheet you will find examples of some great new features CSS has to offer -->
    <link media="screen" href="assets/styles/css3.css" type="text/css" rel="stylesheet">
    
    <!-- general stylesheet contains some default styles, you do not need this, but it helps you keep a uniform style -->
    <link media="screen" href="assets/styles/general.css" type="text/css" rel="stylesheet">
    
    <!-- special styling for forms, this can be used as a form framework on its own -->
    <link media="screen" href="assets/styles/forms.css" type="text/css" rel="stylesheet">
    
    <link media="screen" href="assets/styles/styles.css" type="text/css" rel="stylesheet">  
    <script src="assets/js/jquery-1.9.1.js"></script>
    
	<script language="javascript" type="text/javascript">
		 function submitForm(){
			 $( "#loginCommand" ).submit();
		 }
	</script>
</head>
<body>
<div class="row-narrow"><header><div class="col_10 col"><img width="175" height="44" alt="Education Elements" src="assets/images/logo.jpg"></div><div class="clear"></div></header></div>
<div style="" class="row-narrow rounded box_shadow_container" id="main-narrow"> 
  <div class="col_10"> 
<section class="ee-signin" id="forms"> 
      <h2 class="fontface">Sign In</h2> 
    
 <form:form name="f" modelAttribute="loginCommand">
      <fieldset> 
      	<ul class="no-margin no-padding"> 
          <li> 
            <label class="display-inline" style="padding-right:5px;">Username</label> 
            <form:input id="j_username" path="username" type="text" cssClass="box_shadow medium display-inline"/>
          </li> 
          <li> 
            <label class="display-inline" style="padding-right:8px;">Password</label> 
            <form:password id="j_password" path="password" cssClass="box_shadow medium display-inline"/>
          </li> 
          <li> 
          	<a class="btn margin-right-15 box_shadow_container_strong" onclick="javascript:submitForm()" href="#">Sign In</a> 
          </li> 
		</ul> 
      </fieldset>
      <input type="hidden" value="" id="forwardView" name="forwardView">
 </form:form>
    <div style="height:30px;" class="clear"></div>
</section>

  </div> 
</div> 
<footer class="row"><div class="col_16 col">Copyright &copy 2013, PPG Aerospace</div></footer>
 
</body></html>