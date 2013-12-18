<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<c:choose>
	<c:when test="${empty fixedSidebar}">
		<c:set var="sidebarClass" value="" />
	</c:when>
	<c:otherwise>
		<c:choose>
			<c:when test="${fixedSidebar == false}">
				<c:set var="sidebarClass" value="" />
			</c:when>
			<c:otherwise>
				<c:set var="sidebarClass" value="fixed" />
			</c:otherwise>
		</c:choose>
	</c:otherwise>
</c:choose>

<c:set var="purchasedProd" value="${purchasedProduct}" />
<c:set var="accId" value="${accountId}" />

<div class="sidebar ${sidebarClass}" id="sidebar">
	<div class="sidebar-shortcuts" id="sidebar-shortcuts">
		<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
			<button class="btn btn-small btn-success">
				<i class="icon-signal"></i>
			</button>

			<button class="btn btn-small btn-info">
				<i class="icon-pencil"></i>
			</button>

			<button class="btn btn-small btn-warning">
				<i class="icon-group"></i>
			</button>

			<button class="btn btn-small btn-danger">
				<i class="icon-cogs"></i>
			</button>
		</div>

		<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
			<span class="btn btn-success"></span>

			<span class="btn btn-info"></span>

			<span class="btn btn-warning"></span>

			<span class="btn btn-danger"></span>
		</div>
	</div><!--#sidebar-shortcuts-->

	<ul class="nav nav-list">
		<c:url var="demographicsUrl" value="/account/accounts">
			<c:param name="accountId" value="${fn:escapeXml(accId)}" />
		</c:url>
		<li id="sideBarDemographics">
			<a href="<c:out value='${demographicsUrl}' />">
				<i class="icon-globe"></i>
				<span class="menu-text"> Demographics </span>
			</a>
		</li>
		<c:url var="externalContactsUrl" value="/externalcontacts/ecs">
			<c:param name="accountId" value="${fn:escapeXml(accId)}" />
	  		<c:param name="limit" value="10"/>
	  		<c:param name="offset" value="0"/>
	  	</c:url>
	  	<li id="sideBarContacts">
			<a href="<c:out value='${externalContactsUrl}' />">
				<i class="icon-phone"></i>
				<span class="menu-text"> Contacts </span>
			</a>
	  	</li>
	  	
	  	<c:url var="casesUrl" value="/cases/cases">
			<c:param name="accountId" value="${fn:escapeXml(accId)}" />
	  	</c:url>
	  	<li id="sideBarCases">
			<a href="<c:out value='${casesUrl}' />">
				<i class="icon-briefcase"></i>
				<span class="menu-text"> Cases </span>
			</a>
	  	</li>

		<li id="sideBarProductMetrics">
			<a class="dropdown-toggle" href="#">
				<i class="icon-bar-chart"></i>
				<span class="menu-text"> Product Metrics </span>
				<b class="arrow icon-angle-down"></b>
			</a>
			<ul class="submenu">
				<!-- Performance Management -->
			  	<c:if test="${(purchasedProd.pm==1) || isDataGraphPmExist || (allValidPm>0 || pastYearPm>0)}">
					<c:url var="productUsagePmUrl" value="/productusage/pm">
						<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
						<a id="pmUrl" href="<c:out value='${productUsagePmUrl}' />">
							<i class="icon-double-angle-right"></i>
							Performance Management
						</a>
					</li>
				</c:if>
				<!-- 360 Feedback -->
			  	<c:if test="${(purchasedProd.s360d==1) || isDataGraph360Exist || (allValid360>0 || pastYear360>0)}">
					<c:url var="productUsage360Url" value="/productusage/360">
						<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
						<a id="s360Url" href="<c:out value='${productUsage360Url}' />">
							<i class="icon-double-angle-right"></i>
							360 Feedback
						</a>
					</li>
			  	</c:if>
			  	<!-- (Total) Goal Management -->
			  	<c:if test="${(purchasedProd.tgm==1) || isDataGraphGmExist || (allValidTgm>0 || pastYearTgm>0)}">
					<c:url var="productUsageGmUrl" value="/productusage/gm">
						<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
						<a id="gmUrl" href="<c:out value='${productUsageGmUrl}' />">
							<i class="icon-double-angle-right"></i>
							Goal Management
						</a>
					</li>
				</c:if>
			  	<!-- Career Development Plan -->
			  	<c:if test="${(purchasedProd.cdp==1) || isDataGraphCdpExist || (allValidCdp>0 || pastYearCdp>0)}">
					<c:url var="productUsageCdpUrl" value="/productusage/cdp">
						<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li data-icon="false">
						<a id="cdpUrl" href="<c:out value='${productUsageCdpUrl}' />">
							<i class="icon-double-angle-right"></i>
							Career Development Plan
						</a>
					</li>
			  	</c:if>
			  	<!-- Compensation -->
			  	<c:if test="${(purchasedProd.comp==1) || isDataGraphCompExist || (allValidComp>0 || pastYearComp>0)}">
					<c:url var="productUsageCompUrl" value="/productusage/compensation">
						<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
						<a id="compUrl" href="<c:out value='${productUsageCompUrl}' />">
							<i class="icon-double-angle-right"></i>
							Compensation
						</a>
					</li>
			  	</c:if>
			  	<!-- Succession Planning (=SM) -->
			  	<c:if test="${(purchasedProd.sp==1) || isDataGraphSpExist || (allValidSp>0 || pastYearSp>0)}">
					<c:url var="productUsageSpUrl" value="/productusage/successionplanning">
						<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
						<a id="spUrl" href="<c:out value='${productUsageSpUrl}' />">
							<i class="icon-double-angle-right"></i>
							Succession Planning
						</a>
					</li>
			  	</c:if>
			  	<!-- Employee Profile -->
			  	<c:url var="productUsageEpUrl" value="/productusage/employeeprofile">
					<c:param name="accountId" value="${fn:escapeXml(accId)}" />
			  	</c:url>
			  	<li>
					<a id="lpUrl" href="<c:out value='${productUsageEpUrl}' />">
						<i class="icon-double-angle-right"></i>
						Employee Profile
					</a>
			  	</li>
			  	<!-- Recruiting -->
			  	<c:if test="${(purchasedProd.recruiting==1) || isDataGraphRecExist || (allValidRec>0 || pastYearRec>0)}">
					<c:url var="productUsageRecUrl" value="/productusage/recruiting">
				  		<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
				  		<a id="recUrl" href="<c:out value='${productUsageRecUrl}' />">
					  		<i class="icon-double-angle-right"></i>
					  		Recruiting
				  		</a>
					</li>
			  	</c:if>
			  	<!-- Variable Pay -->
			   	<c:if test="${(purchasedProd.varpay==1) || isDataGraphVpExist || (allValidVp>0 || pastYearVp>0)}">
					<c:url var="productUsageVpUrl" value="/productusage/variablepay">
				  		<c:param name="accountId" value="${fn:escapeXml(accId)}" />
					</c:url>
					<li>
				  		<a id="vpUrl" href="<c:out value='${productUsageVpUrl}' />">
					  		<i class="icon-double-angle-right"></i>
					  		Variable Pay
				  		</a>
					</li>
			  	</c:if>
			</ul>
		</li>
	</ul><!--/.nav-list-->

	<div class="sidebar-collapse" id="sidebar-collapse">
		<i class="icon-double-angle-left"></i>
	</div>
</div>