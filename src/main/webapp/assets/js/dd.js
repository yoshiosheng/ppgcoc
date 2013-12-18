
<div id="datesSelect" value="ALLTIME" name="dateRangeType" 	class="displayInlineBlock marginL5 valueInput">
							<a style="width: 150px;" class="defaultLink  arrowGreyDropDown" title="All Time">All Time</a>
							<ul style="width: 180px;" class="dropdownUl displayNone">
								<li style="width: 180px;">
									<a class="selectionsLi"	value="ALLTIME"	title="All Time">All Time</a>
								</li>
								<li style="width: 180px;">
									<a class="selectionsLi"	value="Yesterday"	title="Yesterday">Yesterday</a>
								</li>
								<li style="width: 180px;">
									<a class="selectionsLi"	value="The past week"	title="All Time">The past week</a>
								</li>
								<li style="width: 180px;">
									<a class="selectionsLi"	value="The past month"	title="All Time">The past month</a>
								</li>
								 
							</ul>
						</div>


var allStandardLevels = null; 
var filteredDomains = null;
var totalStandardsNumber;
   
var contentProviderDropDown;
var groupDropDown;
var dateTypeDropDown;

var contentSubjectDropDown;
var gradelevelDropDown;
var domainDropDown;
var clusterDropDown;

jQuery(function($) {
	$("#standardsFilterDIV").hide(); 
	getAllDataByCourseID(); 
	
});



function getAllDataByCourseID() {
	var cookieObj = getCookieJsonObj();
	currCourseID = cookieObj.courseId;
 
	callAjax('/myreport/getFilterBarDataByCourseID.JSON?courseID= ' + currCourseID , prepareAllData);
}

function getTooltipsInformation() {
	var params = new DataString();
	var cpID = $("#contentProvidersSelect").attr("value");
	params.put("contentProviderID", cpID);
	if (typeof(reportCode) != "undefined"){
		params.put("reportCode",reportCode);
	}
	callAjax('/myreport/toolTipsInfor.JSON?'+ params,function(json){
		$("#toolTipsInforID").html(json.toolTipsInfor);
	});
}
 
function prepareAllData(json) {
	prepareTopBarData(json); 
	 
	//prepare StandardFilterPanel
	prepareStandardFilterPanelData(json); 
	
	//prepareAdvanceFilterPanel(json); 
	addEventHandlerForApplyButton();
	//show report
	if (typeof(reportCode) != "undefined") {
		
		getReport(reportCode);
		configFilters(reportCode);
		currentView.show();
	} 
}

function prepareTopBarData(json) {
	// cp
	var allContentProviders= json.contentProviders;
//	allContentProviders.unshift({uid:"",nameField:"ALL CONTENT PROVIDERS"});
 
	//draw content provider dropdown List
	contentProviderDropDown = new DropDownList($("#contentProvidersSelect"),allContentProviders,{valueField:"uid",nameField:"nameField",click:function(dropdownList,option, value,name){refreshTime(value);currentView.getData( getFilterQueryParams());return false;}
																	,defaultValue:json.contentProviderID,defaultName:json.contentProviderName});
	refreshTime(json.contentProviderID); 
	//student
	var source = new Array();
	source.push({id:-1,name:"All Students"});
	for ( var key in json.csAndGroupList) {
		var option = {};
		var content = json.csAndGroupList[key];
		
		option.id = content[0];
		
		var rgName = content[1]; 
		var csName = content[3]; 
		
		if(content[4] == true){
			option.name = rgName;
		}else{
			option.name = csName+"-"+rgName;
		} 
		source.push(option);
	} 
	//advance option 
	source.push({id:-2,name:"Advanced Student Filter"});
	 
	//draw content provider dropdown List
	groupDropDown = new DropDownList($("#studentsSelect"),source,{valueField:"id",nameField:"name",click:function(dropdownList,option, value,name){	selectGroup(value);currentView.getData( getFilterQueryParams());return false;},defaultValue:"-1",defaultName:"All Students"});
 
	var source = new Array({value:"ALLTIME",name:"All Time"},{value:"YESTERDAY",name:"Yesterday"},{value:"PASTWEEK",name:"The past week"},{value:"PASTMONTH",name:"The past month"} );
	 
	//draw content provider dropdown List
	dateTypeDropDown = new DropDownList($("#datesSelect"),source,{valueField:"value",nameField:"name",click:function(dropdownList,option, value,name){selectDomain(option, value,name);currentView.getData( getFilterQueryParams());return false;}
																	,defaultValue:"ALLTIME",defaultName:"All Time"});
	
	initScopeRangeDropdown(json);
}
var currentPrimaryScope = null;
function initScopeRangeDropdown(json) {
	var scopeDropdown = $("#scopeSelectDropdown");
	//scopeDropdown.css("z-index", "209");
	$("#scopeSelect a.textUppercase").bind("click", function(){
		scopeDropdown.show();
		return false;
	});
	$(document).bind("click", function(){
		scopeDropdown.hide();
	});
	var courseScope = json.courseScopes;
	var allAttemptLi = $("<li refScope='all'><a class='bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize cursorPointer width180'>All Attempted</a></li>");
	scopeDropdown.append(allAttemptLi);
	allAttemptLi.unbind("click").bind("click", function(){
		$("#scopeSelect a.textUppercase").html("All Attempted");
		$("#showAttemptedOnlyParam").val("true");
		scopeDropdown.hide();
		$("#standardfilter").hide();
		currentView.getData( getFilterQueryParams());
		return false;
	});
	if(courseScope != null && courseScope.length > 0) {
		for(var idx in courseScope) {
			var cs = courseScope[idx];
			if(cs.isPrimary) {
				currentPrimaryScope = cs;
			}
			for(var idx2 in cs.scopes) {
				var scope = cs.scopes[idx2];
				var scopeLi = null;
				scopeLi = $("<li refScope='"+scope.guid+"'><a class='bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize cursorPointer'>"+scope.nameField+"</a></li>");
				scopeDropdown.append(scopeLi);
				scopeLi.bind("click", function(){
					$("#scopeSelect a.textUppercase").html($(this).find("a.textCapitalize").html());
					$("#showAttemptedOnlyParam").val("false");
					scopeDropdown.hide();
					$("#standardfilter").hide();
					currentView.getData( getFilterQueryParams() + "&scopeID=" + $(this).attr("refScope"));
					return false;
				});
				for(var idx3 in scope.subScopes) {
					var subScope = scope.subScopes[idx3];
					scopeLi = $("<li refScope='"+subScope.subScopeID+"' style='margin-left:10px;'><a class='bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize cursorPointer'>"+subScope.subScopeName+"</a></li>");
					scopeDropdown.append(scopeLi);
					scopeLi.bind("click", function(){
						$("#scopeSelect a.textUppercase").html($(this).find("a.textCapitalize").html());
						$("#showAttemptedOnlyParam").val("false");
						scopeDropdown.hide();
						$("#standardfilter").hide();
						currentView.getData( getFilterQueryParams() + "&scopeID=" + $(this).attr("refScope"));
						return false;
					});
				}
			}
		}
	}
	else if(_CURRENT_ROLE_ == 'Teacher'){ 
		// if current role is teacher, we will check if this teacher is primary teacher.
		var isCurrentPrimary = false;
		for(var idx in json.primaryTeachers) {
			if(json.primaryTeachers[idx] == _CURRENT_LOGGED_TEACHER_ID_) {
				isCurrentPrimary = true;
				break;
			}
		}
		
		if(isCurrentPrimary) {
			scopeDropdown.append($("<li><a href='/coursescopes/list' class='bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 textCapitalize width180 whiteSpaceNormalImportant'>No scopes available. Please click here to set up scopes.</a></li>"));	
		}
	}
	var manullySelect = $("<li refScope='manually'><a class='bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize cursorPointer width180'>Manually Selected</a></li>");
	scopeDropdown.append(manullySelect);
	manullySelect.unbind("click").bind("click", function(){
		$("#scopeSelect a.textUppercase").html("Manually Selected");
		$("#showAttemptedOnlyParam").val("false");
		scopeDropdown.hide();
		$("#standardfilter").show();
		return false;
	});
}

function prepareStandardFilterPanelData(json) { 
 
	contentSubjectDropDown = new DropDownList($("#contentSubjectSelecterDIV"),json.contentSubjects,{valueField:"uid",nameField:"nameField",click:function(dropdownList,option, value,name){loadStandardLevels();}
																			,defaultValue:json.contentSubjectID,defaultName:json.contentSubjectName});
 
	gradelevelDropDown = new DropDownList($("#gradelevelSelecterDIV"),json.gradelevels,{valueField:"uid",nameField:"nameField" ,click:function(dropdownList,option, value,name){loadStandardLevels();}
																			,defaultValue:json.course.gradeLevel.uid,defaultName:json.course.gradeLevel.nameField});
	var filterJson = JSON.parse(jQuery.cookie("FILTER_SELECT_JSON"));
	if(filterJson) {
		refreshFilterBar(filterJson);
	}
	else {
		// select the gradelevel and contentsubject if current course has the primary scope.
		if(currentPrimaryScope != null) {
			contentSubjectDropDown.select(currentPrimaryScope.scopes[0].contentSubjectID); 
			gradelevelDropDown.select(currentPrimaryScope.scopes[0].gradeLevelID);
		}
		loadStandardLevels();
	}
	$("#quickSearchStandards").keyup(function(){
		filterStandardLevel();
		drawStandardListPanel(filteredDomains);
	});
	getTooltipsInformation();
}
function loadStandardLevels(){
	var cpId = $("#contentProvidersSelect").attr("value");
	var csId = $("#contentSubjectSelecterDIV").attr("value");
	var glId = $("#gradelevelSelecterDIV").attr("value");
	
	
	$("#standardsListPanel").html('<img id="loading_div" src="/img/icon_loading.gif" alt="Loaing Data..." height="32" width="32">');
	var cookieObj = getCookieJsonObj();
	currCourseID = cookieObj.courseId;
	var params = new DataString();
	 
	params.put("contentSubjectID", csId); 
	params.put("gradeLevelID", glId); 
	params.put("courseID", currCourseID); 
	
	callAjax('/myreport/getStandardLevelDataByGLIDCSID.JSON?' + params.toString() , function(json){
		
		allStandardLevels=json.standardLevels; 
		totalStandardsNumber = countStandardsNumber(allStandardLevels);
		
		filterStandardLevel();
		
		domainDropDown = new DropDownList($("#domainSelecterDIV"),filteredDomains,{valueField:"uid",nameField:"valueField",click:function(dropdownList,option, value,name){selectDomain( value,name);}
																							,defaultValue:"",defaultName:"All Domains"});
		 
		clusterDropDown = new DropDownList($("#clusterSelecterDIV"),new Array()
				,{valueField:"uid",nameField:"valueField",click:function(dropdownList,option, value,name){selectCluster(value,name);}
					,defaultValue:"",defaultName:"All Clusters"});
		$("#clusterSelecterDIV").addClass("disabled"); 
		drawStandardListPanel(filteredDomains);
		 
	});
	
}


 
function selectDomain( value,name){
 
	filterStandardLevel();
	var clusterArray = new Array();
	if(filteredDomains.length>0)clusterArray = filteredDomains[0].clusters;
	clusterDropDown = new DropDownList($("#clusterSelecterDIV"),clusterArray
						,{valueField:"uid",nameField:"valueField",click:function(dropdownList,option, value,name){selectCluster(value,name);}
							,defaultValue:"",defaultName:"All Clusters"});
	$("#clusterSelecterDIV").removeClass("disabled"); 
	drawStandardListPanel(filteredDomains);
	
}
function selectCluster( value,name){
 
	filterStandardLevel();
	
	drawStandardListPanel(filteredDomains);
}

function filterStandardLevel(){ 
	filteredDomains = new Array();
	var allStandards = $.extend(true,{},allStandardLevels);
	for(var slIdx in allStandards){
		var sl = allStandards[slIdx]; 
		filteredDomains = filteredDomains.concat(filterDomain(sl.domains));
		 
	}
	  
}

function filterDomain(domains){
	//if domainID is selected
	var domainID = $("#domainSelecterDIV").attr("value"); 
	if(domainID){ 
		var tempDomains = new Array();
		for ( var idx in domains) {
			var domain = domains[idx];
			 if(domain.uid == domainID ){
				 
				 tempDomains.push(domain);
				 break;
			 }
		}
		domains = tempDomains;
	}
	
	var result = new Array();
	for ( var idx in domains) {
		var domain = domains[idx];
		var clusters = filterCluster(domain.clusters);
		if(clusters.length > 0){
			domain.clusters = clusters;
			result.push(domain);
		}
	}
	return result;
	  
}

function filterCluster(clusters){
	//if clusterID is selected
	var clusterID = $("#clusterSelecterDIV").attr("value"); 
	if(clusterID){ 
		var temp = new Array();
		for ( var idx in clusters) {
			var cluster = clusters[idx];
			 if(cluster.uid == clusterID ){
				 temp.push(cluster); 
				 break;
			 }
		}
		clusters =  temp;
	}
	
	var result = new Array();
	for ( var idx in clusters) {
		var cluster = clusters[idx];
		var standards = filterStandard(cluster.standards);
		if(standards.length > 0){
			cluster.standards = standards;
			result.push(cluster);
		}
	}
	
	
	return result;
	  
}

function filterStandard(standards){
	var keyword = $("#quickSearchStandards").val();
	if(!keyword || keyword=='Type a Keyword or standard code'  ) return standards;
	
	var result = new Array();
	for ( var idx in standards) {
		var standard = standards[idx]; 
		if(matchKeyword(keyword, standard)){ 
			result.push(standard);
		}
	}
	return result;
	 
}

function matchKeyword(keyword, standard) {
	var match = false;
	var matchWord = keyword.toLowerCase();
	var balanceWord1 = standard.codeField.toLowerCase();
	var balanceWord2 = standard.valueField.toLowerCase();
	
	if(balanceWord1.indexOf(matchWord) != -1 || balanceWord2.indexOf(matchWord) != -1) {
		match = true;
	}
	return match;
}
function drawStandardListPanel(filteredDomains) {
	var standardIDs = new Array();
	$.each($(".selectedStandardId"),function(i,n){standardIDs.push($(n).attr("value"));});
	var content = new StringBuffer();
	var standardCount = 0;
	for ( var domainIdx in filteredDomains) {
		var domain = filteredDomains[domainIdx];
		var clusters = domain.clusters;
		content.append("<div>");
		content.append("<div class=\"fontW700 fontGreyGeneral marginT35 p16Font\">" + domain.codeField + " " + domain.valueField + "</div>");
		for ( var c_index in clusters) {
			var cluster = clusters[c_index];
			var standards = cluster.standards;
			content.append("<div class=\"fontW700 fontGreyGeneral marginT20 p16Font\">" + cluster.valueField + " (" + cluster.codeField + ")" + "</div>");
			for ( var s_index in standards) {
				var standard = standards[s_index];
				content.append("<div id=\"s_"+ standard.uid +"\" class=\"slpElement checkbox marginT20\">");
				if(standardIDs.length > 0 && standardIDs.indexOf(""+standard.uid) != -1) {
					content.append("<input class=\"standardElementInput\" type=\"checkbox\" checked=\"true\" s_id=\""+ standard.uid +"\" s_name=\""+ standard.codeField +"\" name=\"standard\" value=\""+ standard.uid +"\">");
				} else {
					content.append("<input class=\"standardElementInput\" type=\"checkbox\" s_id=\""+ standard.uid +"\" s_name=\""+ standard.codeField +"\" name=\"standard\" value=\""+ standard.uid +"\">");
				}
				content.append("<label class=\"standardElement\" class=\"fontGreyGeneral p14Font\">");
				content.append("<span class=\"fontW700\">" + standard.codeField + "</span> ");
				content.append(standard.valueField);
				content.append("</label>");
				content.append("</div>");
				standardCount++;
			}
		}
		content.append("</div>");
	}
 
	$("#standardsListPanel").html(content.toString());
	$("#standardCount").html("SHOWING "+standardCount+" OF "+totalStandardsNumber+" STANDARDS");
	
	$(".standardElement").click(function(){
		var checkbox =   $(this).prev();
		
		var selectedId =  checkbox.attr("s_id");
		 if(checkbox.is(":checked")){
			 	uncheckStandard(selectedId,checkbox.attr("s_name")); 
				checkbox.prop("checked",false);
	        }else{
	        	checkStandard(selectedId,checkbox.attr("s_name")); 
	        	checkbox.prop("checked",true);
	        	
	        } 
	});
	$(".standardElementInput").click(function(){
		var checkbox = $(this); 
		var selectedId =  checkbox.attr("s_id");
		 if(checkbox.is(":checked")){
			 	checkStandard(selectedId,checkbox.attr("s_name")); 
	        }else{
	        	uncheckStandard(selectedId,checkbox.attr("s_name")); 
	        } 
	});
	$("#main-single-col").css("height","auto");
	$("#main-single-col").css("height",Math.max($("#filterContentID").height()+140,$("#main-single-col").height()));
}
function checkStandard(value,name){
	 
	$("#standardsFilterTray").append('<div id="selectedStandardId'+value+'" class="marginB5 marginL5 marginT5 tagStandards selectedStandardId" value="'+value+'" code="'+name+'">'+ name+'<span class="alertClose marginL10">X</span></div>');
	$("#selectedStandardId"+value+" .alertClose").click(function(){
		uncheckStandard(value,name);
		currentView.getData( getFilterQueryParams());
	});
}
function uncheckStandard(value,name){
 
    $("#selectedStandardId"+value).remove(); 
    $("#standardsListPanel #s_"+value+" input").prop("checked",false);  
}
var dropdownListZindex =208;
function DropDownList(dropdown,soure,config) {
	var content = new StringBuffer().append("");
	if(config.defaultName=="All Domains"){
		content.append("<li>");
		content.append("<a value=\"\" title=\"All Domains\" class=\"bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize\" href=\"#\">");
		content.append( "All Domains" );
		content.append("</a>");
		content.append("</li>");
	}
	if(config.defaultName=="All Clusters"){
		content.append("<li>");
		content.append("<a value=\"\" title=\"All Clusters\" class=\"bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize\" href=\"#\">");
		content.append( "All Clusters" );
		content.append("</a>");
		content.append("</li>");
	}
	for(var idx in soure) {
		var option = soure[idx];
		if(option){
			content.append("<li>");
			content.append("<a value=\""+ option[config.valueField]  +"\" title=\""+option[config.nameField]+"\" class=\"bgWhite fontGreyGeneral p12Font paddingB9 paddingL10 paddingT9 textCapitalize width200\" href=\"#\">");
			content.append( option[config.nameField] );
			content.append("</a>");
			content.append("</li>");
		}
	}
	if(config.defaultValue || config.defaultValue=="") dropdown.attr("value",config.defaultValue);
	if(config.defaultName || config.defaultName=="") dropdown.children("a").html(config.defaultName);
	dropdown.children("ul").html(content.toString());
	dropdown.children("ul").addClass("maxHeight300");
	
	//select one option of dropdown list
	dropdown.find("li a").click(function(){
		var text=$(this).text();
		if(text.length>=15){
			text=text.substring(0,15)+"...";
		}
		dropdown.children("a").text(text);
		dropdown.children("a").attr("title",$(this).text());
		dropdown.attr("value",$(this).attr("value"));
		
		 
		dropdown.children("a").addClass("roundedCorner_BL3P").addClass("roundedCorner_BR3P");
		dropdown.children("ul").addClass("displayNone ");
		dropdown.removeClass("dropdownOpen");
		if(config.click)
			config.click(dropdown,$(this),$(this).attr("value"),$(this).text());
		
		return false;
	});
	//hide or show the dropdownlist when clicking 
	dropdown.unbind("click");
	dropdown.bind('click',function(){
		if($(this).is(".disabled"))return false;
		var isOpen = $(this).is(".dropdownOpen");
		$(".dropdownOpen").each(function(i,n){
			$(n).children("a").addClass("roundedCorner_BL3P").addClass("roundedCorner_BR3P");
			$(n).children("ul").addClass("displayNone");
			$(n).removeClass("dropdownOpen");
		});
		
		if(isOpen){
			dropdown.children("a").addClass("roundedCorner_BL3P").addClass("roundedCorner_BR3P");
			dropdown.children("ul").addClass("displayNone");
			$(this).removeClass("dropdownOpen");
		}else{
			dropdown.children("ul").css("z-index",dropdownListZindex++);
			dropdown.children("a").removeClass("roundedCorner_BL3P").removeClass("roundedCorner_BR3P");
			dropdown.children("ul").removeClass("displayNone");
			$(this).addClass("dropdownOpen");
		}
		return false;
	});
	//hide all dropdownlist for filtering bar
	$("body").click(function(){
		 dropdown.children("a").addClass("roundedCorner_BL3P").addClass("roundedCorner_BR3P");
		 dropdown.children("ul").addClass("displayNone");
		 dropdown.removeClass("dropdownOpen");
	});
	this.select = function(value){
		if(!value) return;
		var text = dropdown.find("a[value='"+value+"']").last().text();
		
		dropdown.children("a").text(text);
		dropdown.attr("value",value);
		  
	};
	this.val = function(){
		return dropdown.attr("value");
	};
	this.disabled = function(){
		dropdown.addClass("disabled");
	};
	this.enabled = function(){
		dropdown.removeClass("disabled");
	};
	this.change = function(func){
		dropdown.find("li a").click(function(){
			func($(this).attr("value"),$(this).text());
		}); 
	};
}

function refreshFilterBar(filterJson){ 
	contentProviderDropDown.select(filterJson.contentProviderID);
	groupDropDown.select(filterJson.rotationalGroupID);
	dateTypeDropDown.select(filterJson.dateRangeType);
	contentSubjectDropDown.select(filterJson.contentSubjectID); 
	gradelevelDropDown.select(filterJson.gradeLevelID);
	// select the gradelevel and contentsubject if current course has the primary scope.
	if(currentPrimaryScope != null) {
		contentSubjectDropDown.select(currentPrimaryScope.scopes[0].contentSubjectID); 
		gradelevelDropDown.select(currentPrimaryScope.scopes[0].gradeLevelID);
	}
	
	var standardJson = filterJson.standard;
 
	for ( var idx in standardJson) { 
		checkStandard(idx,standardJson[idx]);
	}
	//load domain data
	var cpId = $("#contentProvidersSelect").attr("value");
	var csId = $("#contentSubjectSelecterDIV").attr("value");
	var glId = $("#gradelevelSelecterDIV").attr("value");
	
	$("#standardsListPanel").html('<img id="loading_div" src="/img/icon_loading.gif" alt="Loaing Data..." height="32" width="32">');
	
	
	var cookieObj = getCookieJsonObj();
	currCourseID = cookieObj.courseId;
	
	
	var params = new DataString();
	
	params.put("contentProviderID", cpId); 
	params.put("contentSubjectID", csId); 
	params.put("gradeLevelID", glId); 
	params.put("courseID", currCourseID); 
	
	callAjax('/myreport/getStandardLevelDataByGLIDCSID.JSON?' + params.toString() , function(json){
		
		allStandardLevels=json.standardLevels; 
		totalStandardsNumber = countStandardsNumber(allStandardLevels);
		
		filterStandardLevel();
		
		domainDropDown = new DropDownList($("#domainSelecterDIV"),filteredDomains,{valueField:"uid",nameField:"valueField",click:function(dropdownList,option, value,name){selectDomain( value,name);}
																							,defaultValue:"",defaultName:"All Domains"});
		 
		domainDropDown.select(filterJson.domainID);
		if(filterJson.domainID)
			selectDomain(filterJson.domainID,"");
		if(filterJson.clusterID)
			clusterDropDown.select(filterJson.clusterID);
		
		
		
		filterStandardLevel();
		
		drawStandardListPanel(filteredDomains);
		 
	});
	
}
function refreshFilters(json){
	
}
function addEventHandlerForApplyButton(){
	$("#applyFilter").click(function(){
 
		currentView.getData( getFilterQueryParams());
		if ($("#standardsFilterDIV").is(":visible")){
			
			$("#standardsFilterDIV").hide("slow");
			$("#tagStandardsFilter").toggleClass("bgWhite border_bottom1PWhite border_bottom1Pgreye7e7e7 border_left1Pgreye7e7e7 border_right1Pgreye7e7e7");
			$("#tagContent").toggleClass("bgWhite border_bottom1PWhite border_bottom1Pgreye7e7e7 border_left1Pgreye7e7e7 border_right1Pgreye7e7e7");
			
			//
			$("#main-single-col").css("height","auto");
		}

	});
	
} 

function getAdvnceFilterParams(){
	
	currentView.getData( getFilterQueryParams());
	$.modal.close(); 
}

function getFilterQueryParams(){
	var filterJson = {};
	filterJson["standard"]={};
	//create hidden input to save the value of dropdown list
	$("#reportFilters .valueInput,#standardsFilterDIV .valueInput").each(function (){
		var name = $(this).attr("name");
		var input =$("#reportFilters input[name='"+name+"']");
		if(input.length == 0){
			$("#reportFilters").append("<input name='"+name+"' type='hidden'>");
			input=$("#reportFilters input[name='"+name+"']");
		}
		input.val($(this).attr("value"));
		filterJson[name] = $(this).attr("value");
	});
	
	var params = new DataString();
	//process the selected standards
	$("#standardsFilterTray .selectedStandardId").each(function (){
		params.put("standardIDs", $(this).attr("value"));
		filterJson["standard"][ $(this).attr("value")] = $(this).attr("code");
	});
	jQuery.cookie("FILTER_SELECT_JSON", JSON.stringify(filterJson), {path: '/'});
	//process the current courseid
	var jsonObj=getCookieJsonObj(); 
	params.put("courseID", jsonObj.courseId);
	
	//
	var filters = jQuery("#reportFilters");
	
	return "&"+params.toString()+filters.serialize()+"&"+$("#advanceFilter").serialize();
}

function hideStandardsFilter() {
 
	if ($("#standardsFilterDIV").is(":visible")){
		
		$("#standardsFilterDIV").hide("slow");
		$("#tagStandardsFilter").toggleClass("bgWhite border_bottom1PWhite border_bottom1Pgreye7e7e7 border_left1Pgreye7e7e7 border_right1Pgreye7e7e7");
		$("#tagContent").toggleClass("bgWhite border_bottom1PWhite border_bottom1Pgreye7e7e7 border_left1Pgreye7e7e7 border_right1Pgreye7e7e7");
		
		$("#main-single-col").css("height","auto");
	}
	//refresh the selected standard
	var filterJson = JSON.parse(jQuery.cookie("FILTER_SELECT_JSON"));
	if(filterJson){
		var standardJson = filterJson.standard;
		$("#standardsFilterTray .selectedStandardId").each(function (){
			if(!standardJson[$(this).attr("value")]) {
				uncheckStandard($(this).attr("value"),"");
				$(this).remove();
			}
		}); 
	}else{ 
		$("#standardsFilterTray .selectedStandardId").each(function (){ 
			uncheckStandard($(this).attr("value"),"");
			$(this).remove();
		}); 
	}
	
	
	
}
function showStandardsFilter() {
 
	if (!$("#standardsFilterDIV").is(":visible")){
		
		$("#standardsFilterDIV").show("slow",function(){
			$("#main-single-col").css("height",Math.max($("#filterContentID").height()+140,$("#main-single-col").height()));
		});
		$("#tagStandardsFilter").toggleClass("bgWhite border_bottom1PWhite border_bottom1Pgreye7e7e7 border_left1Pgreye7e7e7 border_right1Pgreye7e7e7");
		$("#tagContent").toggleClass("bgWhite border_bottom1PWhite border_bottom1Pgreye7e7e7 border_left1Pgreye7e7e7 border_right1Pgreye7e7e7");
	}
}
function countStandardsNumber(standardLevels) {
	var filteringStandardsNumber = 0;
	for ( var sl_index in standardLevels) {
		var standardLevel = standardLevels[sl_index];
		var domains = standardLevel.domains;
		for ( var d_index in domains) {
			var domain = domains[d_index];
			var clusters = domain.clusters;
			for ( var c_index in clusters) {
				var cluster = clusters[c_index];
				var standards = cluster.standards;
				filteringStandardsNumber=filteringStandardsNumber + standards.length;
				 
			}
		}
	}
	return filteringStandardsNumber;
}
function selectGroup(value) {
	if(value == "-2") {
		$("#advanceFilterId").modal(); 
	}
}

function closeAdanceFiltersWindow() {
	$.modal.close(); 
}

function refreshTime(cpID){
	var params = new DataString();
	params.put("contentProviderID", cpID);
	callAjax('/myreport/lastRefreshTime.JSON?'+ params,showTime);
}
function showTime(json){
	var myDate = json.date;
	if(myDate ==""||myDate == null){
		myDate ="N/A";
		$("#lastTime").html("Last Refreshed:"+myDate);
	}else{
		myDate = new Date(myDate);
		$("#lastTime").html("Last Refreshed:"+ ($.datepicker.formatDate("MM dd, yy", myDate)));
	}

}
function prepareAdvanceFilterPanel(json){
	var dgs = json.demographicGroups;
	for ( var index in dgs) {
		var dg = dgs[index];
		var content = new StringBuffer();
		content.append('<div class="border3PGreye7e7e7 floatR marginB10 marginL10 marginR10 marginT10 roundedCorner width350">');
			content.append('<div class="bgLightGreyf5f5f5 border_bottom1Pgreye7e7e7 border_top1PWhite displayCell fontGreyGeneral fontW700 height40 p12Font paddingL20 roundedCorner_TL roundedCorner_TR verticalMiddle">'+dg.nameField+'</div>');
			content.append('<div class="bgWhite padding20 roundedCorner_BL roundedCorner_BR">');
				var demographics = dg.demographics;
				for ( var dIndex in demographics) {
					var d = demographics[dIndex];
					var options = d.demographicOptions;
					if(options.length >0){
						 for ( var oIndex in options) {
							var option = options[oIndex];
							content.append('<div class="checkbox">');
								content.append('<input id="appliedDemographicFilters_'+option.uid+'" name="appliedDemographicFilters['+d.uid+']" value="'+option.uid+'##'+option.nameField+'" type="checkbox">');
								content.append('<label class="fontGreyGeneral p14Font">'+option.nameField+'</label>');
							content.append('</div>');
						}
					}else{
						content.append('<div class="checkbox">');
							content.append('<input id="appliedDemographicFilters_'+d.uid+'" name="appliedDemographicFilters['+d.uid+']" value="__NOOPTION__##'+d.nameField+'" type="checkbox">');
							content.append('<label class="fontGreyGeneral p14Font">'+d.nameField+'</label>');
						content.append('</div>');
						
					}
						
				}
			content.append('</div>'); 
		content.append('</div>');
		$("#groupsections").append(content.toString());
	}
}
function configFilters(reportCode){
	var hideFilters = ["SCHOOL_GROWTH_SUMMARY", "SCHOOL_GOAL_STRAND_DETAIL_REPORT", "CLASS_TEST_SNAPSHOT_REPORT","SCHOOL_TEST_SNAPSHOT_REPORT", "CLASS_GROWTH_SUMMARY_REPORT", "CLASS_GOAL_STRAND_DETAIL_REPORT", "STATE_TEST_STRAND_DETAIL_REPORT", "STATE_TEST_TEST_SNAPSHOT_REPORT"]; 
	var disabledGroups = ["TEACHER_LOGIN_INFORMATION_REPORT", "TEACHER_CONTENT_SYSTEM_USER_REPORT", "TEACHER_USAGE_TRENDS_REPORT"];
	var disabledContentProviders = ["TEACHER_PROFICIENCY_STANDARD_REPORT", "CURRENT_READING_PERFORMANCE_REPORT", "TEACHER_STUDENT_STANDARD_REPORT", "CLASS_READING_PERFORMANCE_TREND_REPORT","TEACHER_PERFORMANCE_REPORT"];
	for(var i=0; i<hideFilters.length; i++){
		if(hideFilters[i] == reportCode)
			$("#filteringbar").hide();
	}
	for(var i=0; i<disabledGroups.length; i++){
		if(disabledGroups[i] == reportCode)
			groupDropDown.disabled(); 
	}
	for(var i=0; i<disabledContentProviders.length; i++){
		if(disabledContentProviders[i] == reportCode)
			groupDropDown.change(function(value,name){
				   if(value==-1){
				    contentProviderDropDown.select("");
				    contentProviderDropDown.disabled();
				   }else{
					contentProviderDropDown.enabled(); 
				   }
				    
			});
	}
}
$(function(){
	$("#quickSearchStandards").focusin(function(event){
		if($(this).val() =='Type a Keyword or standard code')$(this).val("");
	});
	$("#quickSearchStandards").focusout(function(event){
		if($(this).val() =='')$(this).val("Type a Keyword or standard code");
	});
});