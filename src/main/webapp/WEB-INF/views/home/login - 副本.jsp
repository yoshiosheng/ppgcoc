<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title> &middot; Sign in</title>

		<meta name="description" content="User login page" />
	</head>

	<body class="login-layout">
		<form:form name="f" modelAttribute="loginCommand">
			<fieldset>
				<label>
						<span class="block input-icon input-icon-right">
							<form:input id="j_username" path="username" type="text" placeholder="Username" cssClass="span12"/>
							<i class="icon-user"></i>
						</span>
				</label>

				<label>
						<span class="block input-icon input-icon-right">
							<form:password id="j_password" path="password" placeholder="Password" cssClass="span12"/>
							<i class="icon-lock"></i>
						</span>
				</label>
		
				<div class="clearfix">
					<label class="inline checkbox form-remember-me">
       					<form:checkbox path="rememberMe"/>
       					<span class="lbl"> Remember my login on this computer</span>
       		  		</label>

					<button class="width-35 pull-right btn btn-small btn-primary" type="submit">
						<i class="icon-key"></i>
						Login
					</button>
				</div>
														
				<div class="space-4"></div>
														
				<div>
		  				<form:errors path="*" element="div" cssClass="alert alert-error"/>
				</div>
			</fieldset>										
		</form:form>

		<!--basic scripts-->

		<script src="assets/js/jquery-1.10.2.min.js"></script>
		<script src="assets/js/jquery-migrate-1.2.1.min.js"></script>

		<!--page specific plugin scripts-->
		
		<script src="assets/js/jquery.watermark.min.js"></script>

		<!--inline scripts related to this page-->

		<script src="assets/js/view/home/login.js"></script> 
	</body>
</html>
