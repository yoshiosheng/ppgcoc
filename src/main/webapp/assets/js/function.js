function callAjax(ajaxURL, callback, datastring){
	var dataStr = isBlank(datastring) ? "{}" : datastring.toString();
	jQuery.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: ajaxURL,
		data: dataStr,
		dataType: "json",
		success: callback
	});
}

function validateUploadImageFormat(imageFile){
	if(imageFile){
		if(imageFile.value.length < 1){
			alert("Please select an image.");
			return false;
		}
	}
	var re = /(\\+)/g;
	var filename = imageFile.value.replace(re,"#");
	var one = filename.split("#");
	var two = one[one.length-1];
	var three = two.split(".");
	var last = three[three.length-1];
	var tp ="jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF";
	var rs=tp.indexOf(last);
	if(rs!=-1){
		return true;
	}else{
		alert("Please upload JPG, JPEG, PNG, GIF format picture");
		return false;
	}
} 
function replacePercentCharacter(srcString){
	srcString = srcString.replace(/\%/g,"%25").replace(/#/g, "%23 "); 
	return srcString;
}
function forDight(Dight,How){    
   Dight  =  Math.round(Dight*Math.pow(10,How))/Math.pow(10,How);    
   return  Dight;    
}  

function DataString(){
	this.sb = new StringBuffer();

	this.put = function(key, value){
		if(isBlank(value))return;
		this.sb.append(key);
		this.sb.append('=');
		this.sb.append(value);
		this.sb.append('&');
	};
	
	this.append = function(string){
		if(isBlank(string))return;
		this.sb.append(string);
		this.sb.append('&');
	};
	
	this.toString = function(){
		return this.sb.toString();
	};
	
	this.isEmpty = function(){
		var s = jQuery.trim(this.toString());
		return isBlank(s) || s == '';
	};
	
	
}

function PlatformUrl(base){
	this.base = base;
	this.query;
	this.datastring = new DataString();
	
	this.addParam = function(key, value){
		this.datastring.put(key, value);
	};
	
	this.toString = function(){
		var fullUrl = base;
		if(!this.datastring.isEmpty()){
			fullUrl += '?' + this.datastring.toString();
		}
		
		return fullUrl;
	};
	
	this.go = function(){
		window.location = this.toString();
	};
	
}

function getDateByHours(hours){
	return new Date().setTime(new Date().getTime()+(1000*60*60*hours));
}
function getDateByMinutes(minutes){
	return new Date().setTime(new Date().getTime()+(1000*60*minutes));
}
function createHistoryCookie(name,value){
	jQuery.cookie(name, value,{expires: getDateByHours(2), path: '/'});
}
function isEmptyObject(object){
	for (var x in object){
	    return false;
	  }
	  return true;
}
function isBlank(object){
	// should not consider 0, 0 == '' is true.
	if(object == 0){
		return false;
	}
	return (object == undefined) || (object == null) || (object == '');
}
function isNumber(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}
/*StringBuffer implementation*/
function StringBuffer(){
	this.buffer = [];
}
StringBuffer.prototype.append = function append(string){
	this.buffer.push(string);
	return this;
};
StringBuffer.prototype.toString = function toString(){
	return this.buffer.join("");
};
StringBuffer.prototype.clear = function toString(){
	this.buffer = [];
};
/*End StringBuffer*/
/*Validator*/
function FieldValidator(fields){
	this.dateRegex = /^((((0[13578])|(1[02]))[\/]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\/]?(([0-2][0-9])|(30)))|(02[\/]?[0-2][0-9]))[\/]?\d{4}$/; 
	this.errorFieldsAry = null;
	this.fieldAry = fields;
	this.validate = function(){
		this.errorFieldsAry = new Array();
    	for(var n=0; n<this.fieldAry.length;n++){
    		var field = this.fieldAry[n];
    		var type = jQuery(field).attr('validation-type');
    		if(type == 'date'){
    			var dateVal = jQuery.trim(field.value);
    			if( dateVal != '' && !isBlank(dateVal) && !dateVal.match(this.dateRegex) ){
    				this.errorFieldsAry.push(field);
        			var className = field.className;
        			if(className.indexOf('error') == -1){
        				field.className = className + ' error';
        			}
    			}else{
    				if(dateVal.substring(3, 5) == '00'){
    					this.errorFieldsAry.push(field);
            			var className = field.className;
            			if(className.indexOf('error') == -1){
            				field.className = className + ' error';
            			}
    				}else {
    	   				jQuery(field).removeClass('error');
    				}
 
    			}
    			
    		}
    		else if (type == 'number'){
	    		var numberVal = jQuery.trim(field.value);
	    		if (numberVal == ''){
		    		jQuery(field).removeClass('error');
	    		}
    			else if(isNaN(numberVal)){
    				this.errorFieldsAry.push(field);
        			var className = field.className;
        			if(className.indexOf('error') == -1){
        				field.className = className + ' error';
        			}
	    		}		
			}
    		else if(jQuery.trim(field.value)==''){
    			this.errorFieldsAry.push(field);
    			var className = field.className;
    			if(className.indexOf('error') == -1){
    				field.className = className + ' error';
    			}
    		}else{
    			var className = field.className;
    			if(className.indexOf('error') != -1){
    				field.className = className.substring(0,className.indexOf('error'));
    			}
    		}
    	}
    	return this.errorFieldsAry;
	};
	this.changeFields = function(toRed){
    	for(var n=0; n<this.fieldAry.length;n++){
    		var field = this.fieldAry[n];
			var className = field.className;
			if(toRed){
    			if(className.indexOf('error') == -1){
    				field.className = className + ' error';
    			}
			}else{
				if(className.indexOf('error') != -1){
					field.className = className.substring(0,className.indexOf('error'));
				}
	    	}
    	}
    	errorFieldsAry = new Array();
	};
}
/*BEGIN TABLES AND PAGES*/
var tables = new Array();
function showPage(timestampID){
	var propsFromCookie = getDeepLinksCookies(timestampID);
	var name = propsFromCookie['tableName'];
	var pageNum = propsFromCookie['pageNum'];
	var table = tables[name];
	if( isBlank(table) ){
		var totalsize = propsFromCookie['totalsize'];
		var numPerPage = propsFromCookie['numPerPage'];
		table = new Table(name, pageNum,totalsize,numPerPage);
	}else{
		table.showPage(pageNum);
	}
}
function Table(name, currentPageNum, totalsize, numPerPage){
	this.name = name;
	this.totalsize = totalsize;
	this.numPerPage = (numPerPage==null?20:numPerPage);
	this.currentPageNum = currentPageNum;
	this.nextCtrl = new PaginationCtrl("next");
	this.prevCtrl = new PaginationCtrl("previous");
	
	this.getNumPages = function(){
		var d = Math.floor( this.totalsize / this.numPerPage );
		var m = this.totalsize % this.numPerPage;
		
		if( m == 0 ){
			return d;
		}else{
			return d + 1;
		}
		
		
	};
	
	this.setTotalSize = function(totalSize) {
		this.totalsize = totalSize;
	};
	
	this.incrementTotalSize = function(){
		this.totalsize++;
	};
	
	this.decrementTotalSize = function(){
		this.totalsize--;
	};
	
	this.showLastPage = function(){
		//total size not set.  just show the first page
		if( isBlank(this.totalsize) ){
			this.showPage(1);
			return;
		}
		
		var lastPageNum = this.getNumPages();
		this.showPage(lastPageNum);
	};
	
	
	this.showPage = function(num){
		// if the num is larger than the total pageNum. use the total pageNum instead.
		if(num > this.getNumPages()) {
			num = this.getNumPages();
		}
		// if the num is less than 1. default to display the 1st page.
		if(num < 1) {
			num = 1;
		}
		//hide current page
        if( !isBlank(this.currentPageNum) ){
        	jQuery('#' + this.name).find("[page=\""+this.currentPageNum+"\"]").hide();
        }
        
        this.currentPageNum = num;
		
        //show new page
        jQuery('#' + this.name).find("[page=\""+num+"\"]").show();
        
		if(num < this.getNumPages()){
			this.nextCtrl.enable(this);
		}else{
			this.nextCtrl.disable(this);
		}
		
		if(num != 1){
			this.prevCtrl.enable(this);
		}else{
			this.prevCtrl.disable(this);
		}
		if(jQuery('#'+this.name+'Count')!=null){
			var start = (this.currentPageNum-1) * this.numPerPage + 1;
			var end = this.currentPageNum * this.numPerPage;
			if(this.totalsize!= null && end>this.totalsize){
				end = start+(this.totalsize%this.numPerPage)-1;
			}
			if(this.totalsize == 0){
				start = 0;
			}
			jQuery('#'+this.name+'Count').html(start +' thru '+end);
			jQuery('#'+this.name+'Count').addClass("width100");
		}
	};
	
	var table = tables[name];
	if( isBlank(table) ){
		if( isBlank(this.currentPageNum) ){
			this.showPage(1);
		}else{
		    this.showPage(this.currentPageNum);
		}
		tables[name] = this;	
	}else{
		tables[name] = this;
	}
}

function PaginationCtrl(direction){
	this.direction = direction;
	this.cssClass = direction == "next" ? "arrow" : "arrow rotate";
	this.text = direction == "next" ? "next" : "previous";
        this.margin = direction == "next" ? "" : "margin-right: 30px";

	this.enable = function(parentTbl){
		var pageToShow = direction == "next" ? Number(parentTbl.currentPageNum) + 1 : Number(parentTbl.currentPageNum) - 1;
		var sb = new StringBuffer();
		sb.append("<span class=\"float-right\" style=\""+this.margin+" \">");
		if( this.direction == 'next' ){
		    sb.append("<a href=\"#\" onclick=\"createDeepLinkCookie(this,'showPage', 'tableName="+parentTbl.name+"&pageNum="+pageToShow+"&tableSize="+parentTbl.size+"&currentPage="+parentTbl.currentPageNum+"&totalsize="+parentTbl.totalsize+"&numPerPage="+parentTbl.numPerPage+"')\">"+this.text+"&nbsp;<img src=\"/img/arrow_blue.png\" width=\"9\" height=\"11\" alt=\""+this.text+"\" class=\""+this.cssClass+"\" /></a>");
		}else{
		    sb.append("<a href=\"#\" onclick=\"createDeepLinkCookie(this,'showPage', 'tableName="+parentTbl.name+"&pageNum="+pageToShow+"&tableSize="+parentTbl.size+"&currentPage="+parentTbl.currentPageNum+"&totalsize="+parentTbl.totalsize+"&numPerPage="+parentTbl.numPerPage+"')\"><img src=\"/img/arrow_blue.png\" width=\"9\" height=\"11\" alt=\""+this.text+"\" class=\""+this.cssClass+"\" />&nbsp;"+this.text+"</a>");
		}
		
		sb.append("</span>");
		
		//get jQuery Obj for parent
		var jqParent = jQuery('#'+parentTbl.name);
		jqParent.find('[direction="'+this.direction+'"]').html(sb.toString());
	};
	
	this.disable = function(parentTbl){
		var sb = new StringBuffer();
		sb.append("<span class=\"float-right\" style=\""+this.margin+"\">");
		if( this.direction == 'next' ){
		    sb.append("<span class=\"link-disabled\">"+this.text+"</span>&nbsp;<img src=\"/img/arrow_disabled.png\" width=\"9\" height=\"11\" alt=\""+this.text+"\" class=\""+this.cssClass+"\"/>");
		}else{
		    sb.append("<span class=\"link-disabled\"><img src=\"/img/arrow_disabled.png\" width=\"9\" height=\"11\" alt=\""+this.text+"\" class=\""+this.cssClass+"\"/>&nbsp;"+this.text+"</span>");
		}
		
		sb.append("</span>");
		
		//get jQuery Obj for parent
		var jqParent = jQuery('#'+parentTbl.name);
		jqParent.find('[direction="'+this.direction+'"]').html(sb.toString());
	};
}
/*END TABLES AND PAGES*/

/*Deep Link Stuff*/
function createDeepLinkCookie(aLink,functionName,params){
	var deepLinks = jQuery.cookie('DeepLinks');
	if(deepLinks == null){
		deepLinks = "";
	}
	var now = new Date();
	if(aLink != null){
		var timeStamp = now.getTime();
		aLink.href = "#"+functionName +"("+timeStamp+")";
		window.setTimeout(function(){
			showPage(timeStamp);
		}, 200);
	}
	if(deepLinks!=""){
		deepLinks+="::";
	}
	deepLinks+=now.getTime();
	if(params!= ""){
		deepLinks+="??"+params;
	}
	var clicks = deepLinks.split("::");
	if(clicks.length>10){
		createHistoryCookie('DeepLinks', deepLinks.substring(deepLinks.indexOf("::")+2));
	}else{
		createHistoryCookie('DeepLinks', deepLinks);
	}
	
	if(aLink == null){
		return now.getTime();
	}else{
		return true;
	}
}
function getDeepLinksCookies(timeMillis){
	var deepLinksStr = jQuery.cookie('DeepLinks');
	var results = new Array();
	if(deepLinksStr == null){
		createHistoryCookie('DeepLinks', "");
		return results;
	}else{
		var clicks = deepLinksStr.split("::");
		for(var n = 0; n<clicks.length; n++){
			var click = clicks[n];
			var timeAndParam = click.split("??");
			var time = timeAndParam[0];
			if(Number(time) == Number(timeMillis)){
				var paramsStr = timeAndParam[1];
				if(paramsStr.indexOf("&")==-1){
					var paramAry = paramsStr.split("=");
					results[paramAry[0]]=paramAry[1];
				}else{
					var paramArys = paramsStr.split("&");
					for(var m=0; m<paramArys.length; m++){
						var paramAryStr = paramArys[m];
						var paramAry = paramAryStr.split("=");
						results[paramAry[0]]=paramAry[1];
					}
				}
			}
		}
		return results;
	}
}
/*End Deep Link*/

/*BEGIN LinkedMap*/
/*
	functions - 
	map.put(key, value);
	map.remove(key);            //removes and returns the element keyed on "key". this resizes the map
	map.get(key);                   //returns but does not remove the element keyed on "key"
	map.elementAt(idx)         // the map is backed by a list (hence the Link!). return the elements at "idx"
	map.length();
	
	to iterate the map, do something like -
	for(var idx = 0; idx < map.length(); idx++){
	    map.elementAt(idx);
	}
 * 
 */
function LinkedMap(){
	this.list = new Array();
	this.indices = new Object();

	this.put = function(key, value){
		//check to see if this value is in there. if so overwrite
		var isNew = false;
		
		var idx = this.indices[key];
		if( isBlank(idx) ){
			idx = this.list.length;
			isNew = true;
		}
		this.list[idx] = new KeyVal(key, value);
		this.indices[key] = idx;
		return isNew;
	};
	
	this.remove = function(key){
		var idx = this.indices[key];
		if( isBlank(idx) ) return null;
		
		delete (this.indices[key]);
		var removed = this.list.splice(idx, 1);
		
		//shift indices since list was altered. yea yea. complexity
		//and blah blah.  if you find a better way to do this, be my guest.
		for(var k in this.indices){
			var toShift = this.indices[k];
			if( toShift > idx ){
				this.indices[k] = toShift-1;
				if(!isBlank(this.list[toShift-1].value.index)){
					this.list[toShift-1].value.index = toShift; 
				}
			}
		}
		
		return removed[0].value;
	};
	this.reorderIndex = function(){
		if(!isBlank(this.list)){
			for(var k=0,len=this.list.length; k<len; k++){
				this.list[k].value.index = k + 1;
			}
		}
	};

	this.moveElement = function(oldIdx, newIdx){
		var valsChanged = new Array();
		var keyValToMove = this.list[oldIdx];
		//return if val doesn't exist, or new idx is out of bounds, or old index is equal to new one i.e not moving 
		if( isBlank(keyValToMove) || newIdx > this.list.length || oldIdx == newIdx )return;
		var keyToMove = keyValToMove.key;
		var goingDown = newIdx < oldIdx;
		
		var numToShift = Math.abs(oldIdx - newIdx);
		var iter = 0;
		var runner = oldIdx;
		while(iter < numToShift){
			//runner = 1;
			var nextIdx;
			if(goingDown){
				nextIdx = runner - 1;
			}else{
				nextIdx = runner + 1;
			}
			
			
			this.list[runner] = this.list[nextIdx];
			
			
			
			//update the values in the map pointing to the list
			var keyValMoved = this.list[runner];
			var key = keyValMoved.key;
			this.indices[key] = runner;
			
			//if the value has an index field, update it, too
			if(!isBlank(keyValMoved.value.index)){
				keyValMoved.value.index = runner;
				this.list[runner] = keyValMoved;
			}
			runner = nextIdx;
			
			valsChanged.push(keyValMoved.value);
			iter++;
		}
		

		//if the value has an index field, update it, too
		if(!isBlank(keyValToMove.value.index)){
			keyValToMove.value.index = newIdx;
		}
		
		this.list[newIdx] = keyValToMove;
		this.indices[keyToMove] = newIdx;
		
		valsChanged.push(keyValToMove.value);
		return valsChanged; 
	};
	
	this.get = function(key){
		var idx = this.indices[key];
		if(isBlank(idx))return null;
		return this.list[idx].value;
	};
	
	this.elementAt = function(idx){
		if(isBlank(this.list[idx]))return null;
		return this.list[idx].value;
	};
	
	this.length = function(){
		return this.list.length;
	};
}

function KeyVal(key, value){
	this.key = key;
	this.value = value;
}
/*END LinkedMap*/

function toggleSwitchView(name){
	// use the position() method to make the switchControll component works normally 
	// whatever the parent node's position is "relative" or "static", "absolute"  
	var pos = jQuery("#swCon" + name).position();
	var width = jQuery("#swCon" + name).width();
	var y = pos.top + jQuery("#swCon" + name).height()+20;
	
	jQuery("#swBox"+name).css( { "left": (pos.left)-245 + "px", "top":y + "px" } );
	jQuery("#swBox"+name).toggle();
}
function downloadReport(dataString){
//	window.location = "/CannedReportServlet?"+dataString;
	if(typeof(dataString) != 'string' ) {
		dataString = dataString.toString();
	}
	var form = document.getElementById("downloadReportForm");
	if(form != null) {
		document.body.removeChild(form);
	} 
	form = document.createElement("form");
	form.method = "POST";
	form.action = "/CannedReportServlet";
	form.style.display = "none"; 
	var kv = dataString.split("&");
    for (var x in kv) {
    	var keyValue = kv[x].trim();
    	if(keyValue.length < 1) {
    		continue;
    	}
    	var params = keyValue.split("=");
        var input = document.createElement("input"); 
        input.type = "hidden";
        input.name = params[0];        
        input.value = params[1];
        form.appendChild(input);        
    }     
	document.body.appendChild(form);  
	form.submit();
}
function bindMouseLeave(divID) {
	jQuery(divID).mouseleave(function(){
		jQuery(divID).hide();
	});
	return jQuery(divID);
}
function bindMouseLeaveFade(divID){
	jQuery(divID).mouseleave(function(){
		jQuery(divID).fadeOut();
	});
	return jQuery(divID);
}
function removeSelectedItem(itemList) {  
	jQuery(itemList+' option:selected').remove();  
}  
function removeItem(itemList, items) {
	for (var n = 0; n<items.length;n++){
		var tempID = items[n][0];
		jQuery(itemList+" option[value='"+tempID+"']").remove();
	} 
}
function addItem(itemList, itemId, itemName){
	jQuery(itemList).append('<option value='+itemId+'>'+itemName+'</option>');
}
function truncateString(source, maxLength) {
	if(source == null || source.length < 1 || source.length <= maxLength) {
		return source;
	}
	return source.substring(0, maxLength) + "...";
}
function fixIE9ModalLayout(dataItemId) {
	// the model dialog cannot calculate the positions in IE9
	if (jQuery.browser.msie && jQuery.browser.version == 9.0){
		jQuery('#simplemodal-container').css("left", "0px");
		var modalDialogData = document.getElementById(dataItemId);
		if(modalDialogData.offsetLeft == 0) {
			modalDialogData.style.left = (window.innerWidth - modalDialogData.clientWidth)/2 + "px";
		}
	}
}
function hslToHex(h, s, l) {
	var rgb = hsl2rgb(h,s,l);
	var hex = rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
	return "#"+hex[0]+hex[1]+hex[2];
}
function rgbToHex(r,g,b) {
    return [
            (r < 16 ? "0" : "") + r.toString(16),
            (g < 16 ? "0" : "") + g.toString(16),
            (b < 16 ? "0" : "") + b.toString(16)
    ];
}
function hsl2rgb(h, s, l) {
	var m1, m2, hue;
	var r, g, b;
	s /=100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = HueToRgb(m1, m2, hue + 1/3);
		g = HueToRgb(m1, m2, hue);
		b = HueToRgb(m1, m2, hue - 1/3);
	}
	return {r: r, g: g, b: b};
}

function HueToRgb(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
}
function fillJsonColor(json, hasStandardLevels){
	var sl_l = [80,70,60,50];
	var hue = 0;
	var cluster_l = 90;
	var increment = null;
	if(hasStandardLevels == "true"){
		for(var slIdx =0;slIdx<json.children.length;slIdx++){
			var standardLevel = json.children[slIdx];
			standardLevel.color = hslToHex(0,0,sl_l[slIdx%sl_l.length]);
			increment = (hue <= 80 && hue >= 10)?50:0;
			for(var dIdx = 0;dIdx<standardLevel.children.length;dIdx++){
				var domain = standardLevel.children[dIdx];
				domain.color = hslToHex(hue,40+increment,60);
				cluster_l = 90;
				for(var cIdx = 0;cIdx<domain.children.length;cIdx++){
					var cluster = domain.children[cIdx];
					if(cluster_l == 90 && cIdx == domain.children.length -1){
						cluster.color = hslToHex(hue,(hue <= 80 && hue >= 10)?70:30+increment,(hue <= 80 && hue >= 10)?60:50);
					}else{
						cluster.color = hslToHex(hue,50+increment,cluster_l);
					}
					for(var sIdx = 0; sIdx<cluster.children.length;sIdx++){
						var standard = cluster.children[sIdx];
						if(cluster_l == 90 && cIdx == domain.children.length -1){
							standard.color = hslToHex(hue,(hue <= 80 && hue >= 10)?70:30+increment,(hue <= 80 && hue >= 10)?60:50);
						}else{
							standard.color = hslToHex(hue,50+increment,cluster_l);
						}
					}
					cluster_l = cluster_l - 10;
					if(cluster_l <20){
						cluster_l = 90;
					}
				}
				hue+=90;
				if(hue > 350){
					hue%=350;
					hue+=40;
				}
			}
		}
	}else{
		for(var dIdx = 0;dIdx<json.children.length;dIdx++){
			increment = (hue <= 80 && hue >= 10)?50:0;
			var domain = json.children[dIdx];
			domain.color = hslToHex(hue,40+increment,60);
			cluster_l = 90;
			for(var cIdx = 0;cIdx<domain.children.length;cIdx++){
				var cluster = domain.children[cIdx];
				if(cluster_l == 90 && cIdx == domain.children.length -1){
					cluster.color = hslToHex(hue,(hue <= 80 && hue >= 10)?70:30+increment,(hue <= 80 && hue >= 10)?60:50);
				}else{
					cluster.color = hslToHex(hue,50+increment,cluster_l);
				}
				for(var sIdx = 0; sIdx<cluster.children.length;sIdx++){
					var standard = cluster.children[sIdx];
					if(cluster_l == 90 && cIdx == domain.children.length -1){
						standard.color = hslToHex(hue,(hue <= 80 && hue >= 10)?70:30+increment,(hue <= 80 && hue >= 10)?60:50);
					}else{
						standard.color = hslToHex(hue,50+increment,cluster_l);
					}
				}
				cluster_l = cluster_l - 10;
				if(cluster_l <20){
					cluster_l = 90;
				}
			}
			hue+=90;
			if(hue > 350){
				hue%=350;
				hue+=40;
			}
		}
	}
	return json;
}
function findPosX(obj)
{
  var curleft = 0;
  if(obj.offsetParent)
      while(1) 
      {
        curleft += obj.offsetLeft;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.x)
      curleft += obj.x;
  return curleft;
}

function findPosY(obj)
{
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}

function getScrollBarWidth(){
	var scrollbarWidth = 0;
	
	if ( !scrollbarWidth ) {
		if ( $.browser.msie ) {
			var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
					.css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
				$textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
					.css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
			scrollbarWidth = $textarea1.width() - $textarea2.width() + 2; // + 2 for border offset
			$textarea1.add($textarea2).remove();
		} else {
			var $div = $('<div />')
				.css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
				.prependTo('body').append('<div />').find('div')
					.css({ width: '100%', height: 200 });
			scrollbarWidth = 100 - $div.width();
			$div.parent().remove();
		}
	}
	
	return scrollbarWidth;
}

function testBrowseTypeAndVersion(){
    var browserName=navigator.userAgent.toLowerCase();
    
    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
        return 'IE';
    }else if(/firefox/i.test(browserName)){
        return 'Firefox';
    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
        return 'Chrome';
    }else if(/opera/i.test(browserName)){
        return 'Opera';
    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
        return 'Safari';
    }else{
    	return 'other';
    }
}

function exitToDashboardForStudent() {
	var isVlogin = $.cookie("IS_VLOGIN_VIEW");
	if(isVlogin != null && "true" == isVlogin) {
		redirectToStudentDashboardForVlogin();
	}
	else {
		window.location.href="/home";
	}
}

function redirectToStudentDashboardForVlogin() {
	if(document.getElementById("studentLaunchPadDashboardForm") == null) {
		var frm = $("<form action=\"/vlogin\" method=\"post\" id=\"studentLaunchPadDashboardForm\">"+
				"<input type=\"hidden\" name=\"teacherAvatarID\" value=\""+$.cookie("teacherAvatarID")+"\">"+
				"<input type=\"hidden\" name=\"courseID\" value=\""+$.cookie("courseID")+"\">"+
				"<input type=\"hidden\" name=\"studentID\" value=\""+$.cookie("studentID")+"\">"+
				"<input type=\"hidden\" name=\"studentAvatarID\" value=\""+$.cookie("studentAvatarID")+"\">"+
				"<input type=\"hidden\" name=\"vpass\" value=\""+$.cookie("vpass")+"\">"+
			"</form>");
		$(document.body).append(frm);
	}
	document.getElementById("studentLaunchPadDashboardForm").submit();
}
function replaceURLCharacter(srcString){
	srcString = srcString.replace(/[%]/g, "@@percent@@").replace(/[&]/g, "@@ampersand@@");
	return srcString;
}
function replaceStringSpecialCharacter(srcString){
	srcString = srcString.replace(/["]/g, "@@double_quote@@").replace(/[']/g, "@@single_quote@@").replace(/&#034;/g, "@@double_quote@@").replace(/&#039;/g, "@@single_quote@@").replace(/ /g, "@@space@@").replace(/[\\]/g, "@@back_slash@@").replace(/[\\\\]/g, "@@double_back_slash@@");
	return srcString;
}
function restoreStringSpecialCharacter(srcString){
	srcString = srcString.replace(/@@single_quote@@/g, "'").replace(/@@double_quote@@/g, '"').replace(/@@space@@/g, " ").replace(/@@back_slash@@/g, "\\").replace(/@@double_back_slash@@/g, "\\\\");
	return srcString;
}
function replaceQuotString(srcString){
	srcString = srcString.replace(/["]/g, "&#034;").replace(/[']/g, "&#039;");
	return srcString;
}
function replaceContentSettingSpecialCharacter(srcString){
	srcString = srcString.replace(/[']/g, "@@single_quote@@").replace(/ /g, "@@space@@").replace(/[\\]/g, "@@back_slash@@").replace(/[\\\\]/g, "@@double_back_slash@@").replace(/&#060/g, "@@less_than@@").replace(/&#062/g, "@@greater_than@@").replace(/&#061/g, "@@equal_sign@@").replace(/&#043/g, "@@plus_sign@@").replace(/&#124/g, "@@vertical_bar@@").replace(/[&]/g, "@@ampersand@@").replace(/&#036/g, "@@dollar_sign@@").replace(/&#036/g, "@@dollar_sign@@").replace(/&#037/g, "@@percent_sign@@").replace(/&#035/g, "@@number_sign@@").replace(/&#058/g, "@@colon@@");
	return srcString;
}

/**
 * A custom jQuery plugin to wrap around the jQuery.datatables plugin.
 * This to standardize all the datatables view that exist in the system.
 */
(function($){
	$.fn.dataTableHelper = function(setting) {
		
		/** The targeted table */
		var datatable = $(this);
		
		/** The datatable rows per page cookies name */
		var DATATABLES_ROWS_PER_PAGE_COOKIE_NAME = "__datatable_RowsPerPage__";
		
		/** The datatable default setting for system-wide */
		var DATATABLES_DEFAULT_SETTING = {
			bAutoWidth: false,
			bFilter: false,
			bPaginate: true,
			bLengthChange: true,
			bInfo: true,
			bStateSave: false,
			sDom: '<fr>t<".custom-datatables-footer" <".left" l><".right" p><".paginate-info-right" i>>',
			oLanguage: {
				sLengthMenu: "Showing _MENU_ items",
				sInfo: "_START_ to _END_ of _TOTAL_"
			},
			aLengthMenu: [[-1, 10, 25, 50], ['All', 10, 25, 50]],
			iDisplayLength: parseInt(jQuery.cookie(DATATABLES_ROWS_PER_PAGE_COOKIE_NAME) || 25), // Default is 25 items per page across the system-wide if cookies is not set
			fnDrawCallback: function() {
				fixDatatableFooterWidth();
			}
		};

		/**
		 * Replace the datatable factory select with a link select.
		 */
		function replaceRowsPerPageSelectToLinkSelection($select) {
		    var span = $("<span />");
		    var now = $select.val();
		    $select.find("option").each(function(k, v){
		        if($(v).val() != now) {
		            span.append(
		                $("<a />").attr("href", "javascript: void(0);")
		                	.html($(v).text())
		                	.bind("click", function() {
		                		changeRowsPerPage($(v).val());
		                	})
		            );
		        } else {
		            span.append($("<span />").html($(v).text()));
		        }
		    });
		    
		    $select.next().remove().end().after(span).hide()
		        .unbind("change.customLength")
		        .bind("change.customLength", function() {
		            replaceRowsPerPageSelectToLinkSelection($(this));
		    });
		}

		/**
		 * Change the number of rows per page.
		 */
		function changeRowsPerPage(rowsPerPage) {
			$(".dataTables_length select").val(rowsPerPage).trigger("change");
			// Store rows per page into cookies
			jQuery.cookie(DATATABLES_ROWS_PER_PAGE_COOKIE_NAME, rowsPerPage);
		}
		
		/**
		 * Adjust datatable footer width
		 */
		function fixDatatableFooterWidth() {
			var footerInnerElementsTotalWidth = 0;
			datatable.next().children().each(function(i, v) {
				footerInnerElementsTotalWidth += $(v).outerWidth(true);
			});
			
			if(datatable.width() > footerInnerElementsTotalWidth) {
				datatable.next().width(datatable.width());
			} else {
				datatable.width(footerInnerElementsTotalWidth);
				datatable.next().width(footerInnerElementsTotalWidth);
			}
		}
		
		/**
		 * Merge the datatable option. There will be 2 different setting:- 
		 * i.e. 1. System-wide setting & 2. User setting. If its configuration
		 * exist in both setting, the User setting has the highest priority.
		 * Perform deep copy and return new object without altering original object.
		 */
		function mergeWithSystemDefaultDatatablesSetting(local) {
			if(local.iDisplayLength) {
				local.iDisplayLength = getLocalizedRowsPerPage(local.iDisplayLength);
			}
			return $.extend(true, {}, DATATABLES_DEFAULT_SETTING, local, mergeFunctions(DATATABLES_DEFAULT_SETTING, local));
		}
		
		/**
		 * Merge a function.
		 * 
		 * If function exist in both object merge them.
		 */
		function mergeFunctions(a, b) {
			var merged = {};

			for(var i in a){
			    if($.isFunction(a[i]) && $.isFunction(b[i])) {
			    	merged[i] = function() {
			            a[i]();
			            b[i]();
			        };
			    }
			}
			
			return merged;
		}
		
		/**
		 * Returns the final number of rows per page. Priority will go as below:-
		 * 1. Value stored in cookies
		 * 2. Pre-defined by user
		 * 3. System-wide setting
		 */
		function getLocalizedRowsPerPage(localRowsPerPage) {
			// If cookies is not set, then use local default rows per page.
			return parseInt(jQuery.cookie(DATATABLES_ROWS_PER_PAGE_COOKIE_NAME) || localRowsPerPage);
		}
		
		/**
		 * Main function.
		 * Return each so that we don't break the chain
		 */
		var dataTableTargetObject;
		this.each(function() {
			// The datatable final setting
			var finalSettings = mergeWithSystemDefaultDatatablesSetting(setting);
			
			// Create datatables
			dataTableTargetObject = datatable.dataTable(finalSettings).show();
			if(finalSettings.bPaginate){
				var dropDownCtrl = jQuery('#'+datatable.attr('id')+'_length');
				var pageCtrl = jQuery('#'+datatable.attr('id')+'_paginate');
				var infoCtrl = jQuery('#'+datatable.attr('id')+'_info');
				var offset = dropDownCtrl.offset().left;
				var pageControlWidth = pageCtrl.outerWidth();
				var infoCtrlWidth = infoCtrl.outerWidth();
				var dropDownLeft = 0;
				var pageLeft = jQuery(window).width() - pageControlWidth - (2*infoCtrlWidth) -datatable.width() - 20;
				var infoLeft = pageLeft;
				var max = 0;
				var min = 0;
				
				dropDownLeft = Math.max(dropDownLeft, min);
				pageLeft = Math.min(pageLeft, max);
				infoLeft = Math.min(infoLeft, max);
				dropDownCtrl.css("position", "relative").css("left", dropDownLeft);
				pageCtrl.css("position", "relative").css("left", pageLeft).css("top",2.3);
				infoCtrl.css("position", "relative").css("left", infoLeft).css("top",2.5);
				if (window.chrome) { 
						infoCtrl.css("position", "relative").css("left", infoLeft).css("top",5);
						pageCtrl.css("position", "relative").css("left", pageLeft).css("top",5);
				}
				jQuery(window).resize(function(){
					var dropDownLeft = jQuery(window).scrollLeft()-offset+20;
					dropDownLeft = Math.max(dropDownLeft+10, min);
					dropDownCtrl.css("position", "relative").css("left", dropDownLeft);
					var pageLeft = jQuery(window).scrollLeft() + jQuery(window).width() - pageControlWidth - (2*infoCtrlWidth) -datatable.width() - 20;
					var infoLeft = pageLeft;
					pageLeft = Math.min(pageLeft, max);
					infoLeft = Math.min(infoLeft, max);
					pageCtrl.css("position", "relative").css("left", pageLeft).css("top",2.3);
					infoCtrl.css("position", "relative").css("left", infoLeft).css("top",2.5);
					if (window.chrome) { 
						infoCtrl.css("position", "relative").css("left", infoLeft).css("top",5);
						pageCtrl.css("position", "relative").css("left", pageLeft).css("top",5);
					}
				});
				jQuery(window).scroll(function(){
					var dropDownLeft = jQuery(window).scrollLeft()-offset+20;
					dropDownLeft = Math.max(dropDownLeft+10, min);
					dropDownCtrl.css("position", "relative").css("left", dropDownLeft);
					var pageLeft = jQuery(window).scrollLeft() + jQuery(window).width() - pageControlWidth - (2*infoCtrlWidth) -datatable.width() - 20;
					var infoLeft = pageLeft;
					pageLeft = Math.min(pageLeft, max);
					infoLeft = Math.min(infoLeft, max);
					pageCtrl.css("position", "relative").css("left", pageLeft).css("top",2.3);
					infoCtrl.css("position", "relative").css("left", infoLeft).css("top",2.5);
					if (window.chrome) { 
						infoCtrl.css("position", "relative").css("left", infoLeft).css("top",5);
						pageCtrl.css("position", "relative").css("left", pageLeft).css("top",5);
					}
				});
			}
			// Replace select with link selection
			//replaceRowsPerPageSelectToLinkSelection(datatable.closest("div[id*=_wrapper]").find(".dataTables_length select"));
		});
		
		return dataTableTargetObject;
	};
})(jQuery);


(function($) {	
	// Constructor
	$.expandableTableColumn = function(setting) {
		if(!(this instanceof $expandableTable))
			return new $expandableTable(setting);
		this.table = setting.table || $();
		this.tableID = setting.tableId;
		this.groupPrefix = setting.groupPrefix || "group-";
		this.groupMap = $expandableTable.getGroupMap(this.table, this.groupPrefix);
		$expandableTable.addLegacyClassname(this.table, this.groupMap);
		
		return this;
	};
	// Reference to class
	var $expandableTable = $.expandableTableColumn;
	// Extend class
	$.extend($expandableTable, {
		getGroupMap: function(table, groupPrefix) {
			var groupMap = {};
			table.find("thead tr:first th").each(function(){
			    var name = this.className.match(groupPrefix  + '([^ ]*)');
			    if(name) groupMap[name[0]] = {};
			});
			return groupMap;
		},
		addLegacyClassname: function(table, groupMap) {
			for(var group in groupMap) {
				table.find("." + group).each(function() {
					$(this).addClass("legacy-" + group);
				});
				table.find("tr").each(function() {
					$(this).find("." + group + ":first").removeClass("legacy-" + group);
				});
				
				table.find("tr").each(function() {
					$(this).find("."+group+":first").addClass("first");
					$(this).find("."+group+":last").addClass("last");
				});
				
				table.find("thead tr:first").each(function() {
					$(this).find("."+group).addClass("header");
				});
				table.find("tfoot tr:last").each(function() {
					$(this).find("."+group).addClass("footer");
				});
			}
		},
		expandGroup: function(table, group, tableID) {
			$.rule((tableID==null ? "" : "#" +tableID + " ") + ".legacy-" + group, "style").remove();
		},
		collapseGroup: function(table, group, tableID) {
			$.rule((tableID==null ? "" : "#" +tableID + " ") +".legacy-" + group + " { display: none; }").appendTo("style");
		},
		selectGroup: function(table, group, isExpanded, tableID) {
			$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".first { border-left: 2px solid black; }").appendTo("style");
			$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".header { border-top: 2px solid black; }").appendTo("style");
			$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".footer { border-bottom: 2px solid black; }").appendTo("style");
			if(isExpanded) {
				$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".last { border-right: 2px solid black; }").appendTo("style");
				$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".first { border-right: none; }").appendTo("style");
			} else {
				$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".first { border-right: 2px solid black; }").appendTo("style");
			}
			// Highlight header
			table.find("thead tr:first th."+group)
				.removeClass("tableUnselectedHeaderContentProviderGroup")
				.addClass("tableHeaderContentProviderGroup");
			table.find("thead tr:last th."+group)
				.removeClass("tableUnselectedSecondHeaderContentProviderGroup");
		},
		unselectGroup: function(table, group, isExpanded, tableID) {
			$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".first { border-left: 1px solid gray; }").appendTo("style");
			$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".header { border-top: 1px solid gray; }").appendTo("style");
			$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".footer { border-bottom: 1px solid gray; }").appendTo("style");
			if(isExpanded) {
				$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".last { border-right: 1px solid gray; }").appendTo("style");
			} else {
				$.rule((tableID==null ? "" : "#" +tableID + " ") + "."+group+".first { border-right: 1px solid gray; }").appendTo("style");
			}
			// Remove highlight header
			table.find("thead tr:first th."+group)
				.removeClass("tableHeaderContentProviderGroup")
				.addClass("tableUnselectedHeaderContentProviderGroup");
			table.find("thead tr:last th."+group)
				.addClass("tableUnselectedSecondHeaderContentProviderGroup");
		}
	});
	// Prototype
	$expandableTable.fn = $expandableTable.prototype = {
		expand: function(group) {
			var groupKey = this.getGroupKey(group);
			$expandableTable.expandGroup(this.table, groupKey, this.tableID);
			this.groupMap[groupKey].expanded = true;
			this.select(group);
		},
		collapse: function(group) {
			var groupKey = this.getGroupKey(group);
			$expandableTable.collapseGroup(this.table, groupKey, this.tableID);
			this.groupMap[groupKey].expanded = false;
			if (this.isCurrentSelectedGroup(groupKey)) {
				$expandableTable.selectGroup(this.table, groupKey, this.getStatus(group), this.tableID);
			} else {
				$expandableTable.unselectGroup(this.table, groupKey, this.getStatus(group), this.tableID);
			}
		},
		select: function(group) {
			var groupKey = this.getGroupKey(group);
			$expandableTable.selectGroup(this.table, groupKey, this.getStatus(group), this.tableID);
			if (this.selectedGroup && !this.isCurrentSelectedGroup(groupKey)) {
				$expandableTable.unselectGroup(this.table, this.selectedGroup, this.groupMap[this.selectedGroup].expanded, this.tableID);
			}
			this.selectedGroup = groupKey;
		},
		isCurrentSelectedGroup: function(groupKey) {
			return this.selectedGroup && (this.selectedGroup == groupKey);
		},
		expandAll: function() {
			// Not implemented at the moment
		},
		collapseAll: function() {
			for(var group in this.groupMap) {
				this.collapse(group.replace(this.groupPrefix, ""), this.tableID);
			}
		},
		getGroupKey: function(group) {
			return this.groupPrefix + group;
		},
		getStatus: function(group) {
			return this.groupMap[this.getGroupKey(group)].expanded;
		}
	};
})(jQuery);

var intv;
var winObj;
function beginPollingLaunchWindows(openedWin){
	var jsonStr = jQuery.cookie("CP_LAUNCH_WIN");
	if(jsonStr != null){
		var jsonObj = JSON.parse(jsonStr);
		winObj = openedWin;//window.open("", jsonObj.win);
		intv = setInterval(areLaunchWindowsClosed, 2000);
	}	
}




function areLaunchWindowsClosed(){
	if(winObj && winObj.closed){
		var jsonStr = jQuery.cookie("CP_LAUNCH_WIN");
		var jsonObj = JSON.parse(jsonStr);
		var cus = jsonObj.cus;
		jQuery.cookie("CP_LAUNCH_WIN", null);
		winObj=null;
		callAjax("/contentProviderlauncher/closeBrowser/contentUsageSession/"+cus+".JSON", function(data){
			clearInterval(intv);
		});
	}
}

function drawCircleWithLabel(eleExp, opt) {
	var radius = opt.radius;
	var width = radius * 2;
	var height = radius * 2;
	var circleColor = opt.circleColor == null ? "#000000" : opt.circleColor; 
	var textColor = opt.textColor == null ? "#ffffff" :  opt.textColor;
	var vis = d3.select(eleExp)
		.append("svg:svg")
		.attr("width", width)
		.attr("height", height);
	
	vis.append("svg:circle")
		.attr("cx", radius)
		.attr("cy", radius)
		.attr("r", radius)
		.attr("fill", circleColor)
		.style("stroke-width",'0.5px')
		.style("stroke", circleColor);
	
	vis.append("svg:text")
		.attr("class","label")
		.attr("x", width / 2 - (""+opt.text).length * 2.5 )
		.attr("y",height / 2 - 3)
    	.attr("dy", ".71em")
    	.attr("text-anchor", "right")
    	.style("font-size", 12+"px")
    	.style("font-weight", "bold")
    	.attr("fill", textColor)
    	.text(opt.text);
}

function drawSingleRectBar(eleExp, opt) {
	var width = opt.width;
	var height = opt.height;
	var barColor = opt.barColor == null ? "#000000" : opt.barColor;
	var vis = d3.select(eleExp)
		.append("svg:svg")
		.attr("width", width)
		.attr("height", height);
	
	vis.append("svg:rect")
	 	.attr("width", width)
	 	.attr("x", 0)
	 	.attr("y", 0)
	 	.attr("height", height)
		.attr("class", barColor);
//		.style("stroke-width",'2px');
//	 	.style("stroke", barColor);
	
	if(opt.text != null){
		var x = width/2 - ((""+opt.text).length * 6)/2;
		vis.append("svg:text")
		.attr("class","label")
		.attr("x", x)
		.attr("y", height/2 - 3)
      	.attr("dy", ".71em")
      	.attr("text-anchor", "right")
      	.style("font-size", 10+"px")
      	.text(opt.text);
	}
}

function drawPieChart(eleExp, opt) {
	 var w = opt.width, //width
	 h = opt.height, //height
	 r = opt.radius, //radius
	 color = d3.scale.ordinal().range(opt.colors);
	 
	 data = opt.data;
	 
	 var vis = d3.select(eleExp)
	 .append("svg:svg")
	 .data([data])
	 .attr("width", w)
	 .attr("height", h)
	 .append("svg:g")
	 .attr("transform", "translate(" + r + "," + r + ")");
	  
	 var arc = d3.svg.arc()
	 .outerRadius(r);
	 	  
	 var pie = d3.layout.pie().sort(null).value(function(d) { return d.value; });
	  
	 var arcs = vis.selectAll("g.slice")
	 .data(pie)
	 .enter()
	 .append("svg:g")
	 .attr("class", "slice");
	  
	 arcs.append("svg:path")
	 .attr("class", function(d, i) { return color(i); } )
	 .attr("d", arc);
	 
	 if(data[0].label != null) {
		 arcs.append("svg:text")
		 .attr("transform", function(d) {
			 d.innerRadius = 0;
			 d.outerRadius = r;
			 return "translate(" + arc.centroid(d) + ")"; 
		 })
		 .attr("text-anchor", "middle")
		 .text(function(d, i) { return data[i].label; });
	 }
}

function studentDetailsTabDataSerializer(sourceAry, categorySrc){
	this.tempTabDataAry = sourceAry;
	this.category = categorySrc;
	this.tabDataAryLengthStr = null;
	this.eachDataBeginStr = null;

	this.getSerializedStr = function(){
		var rtnSerializedStr = "";
		if (this.category == 'Siblings') {
			this.eachDataBeginStr = 'siblings';
			this.tabDataAryLengthStr = 'tempSiblingsTable_length';
			for ( var idx = 0; idx < this.tempTabDataAry.length; idx++) {
				if (idx==0) {
					rtnSerializedStr += "" + this.eachDataBeginStr +"[" + idx + "].uid=" + this.tempTabDataAry[idx][0];
				} else {
					rtnSerializedStr += "&" + this.eachDataBeginStr +"[" + idx + "].uid=" + this.tempTabDataAry[idx][0];
				}
			}
		}
		if (this.category == 'Classes' || this.category == 'ContentProvider') {
			this.eachDataBeginStr = 'courseEnrollments';
			this.tabDataAryLengthStr = 'tempCoursesTable_length';
			for ( var idx = 0; idx < this.tempTabDataAry.length; idx++) {
				if (idx==0) {
					rtnSerializedStr += "" + this.eachDataBeginStr +"[" + idx + "].courseID=" + this.tempTabDataAry[idx][0];
				} else {
					rtnSerializedStr += "&" + this.eachDataBeginStr +"[" + idx + "].courseID=" + this.tempTabDataAry[idx][0];
				}
			}
		}
		rtnSerializedStr += "&" + this.tabDataAryLengthStr + "=" + this.tempTabDataAry.length;
		return rtnSerializedStr;
	};
}

function isEmptyMap(map){
	for(var key in map){
		return false;
	}
	return true;
}
