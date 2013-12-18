function DropDownList(dropdown,soure,config) {
	var content = new StringBuffer().append("");

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
	dropdown.on('click',function(){
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
