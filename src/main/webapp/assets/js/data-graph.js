/*function ajaxDataGraph(url, flotDataGraphContainer, flotDataGraph, seriesColor) {
	$.ajax({
		type: "GET",
        url: url,
        dataType: "json",
        success: function(datasets) {
        	if(!datasets) {
        		$(flotDataGraphContainer).html("No data available.");
        	} else {
        		var data = new Array();
            	var xData = new Array();
            	var yData = new Array();
            	$.each(datasets, function(d, i) {
                    xData.push([parseDate(d)]);
                    yData.push([parseInt(i)]);
                    data.push([parseDate(d), parseInt(i)]);
                });
            	var options = {
        			series: { lines: { show: true, fill: false, lineWidth: 3, fillColor: seriesColor }, points: { show: true, radius: 6, fill: true, fillColor: seriesColor } },
        			colors: [seriesColor],
        			grid: { show: true, hoverable: true, clickable: true },
        			tooltip: true,
        			tooltipOpts: { content: "<b>Month</b>: %x;<br /> <b>Activity</b>: %y", shifts: { x: 12, y: -53 }, defaultTheme: false },
        			xaxis: { show: true, mode: "time", timezone: "browser", timeformat: "%Y-%m", ticks: xData, autoscaleMargin: 0.02, labelWidth: 35 },
        			yaxis: { show: true, min: Math.min.apply(Math, yData), tickFormatter: function numberWithCommas(y) { return y.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ","); } }
         		};
            	$.plot($(flotDataGraph), [data], options);
        	}
        }
    });
}*/

function ajaxDataGraphDemographics(url, seriesColor, flotDataGraphContainer, flotDataGraph, flotLegendContainer, flotLegend) {
	var dataFinal = new Array();
	var options = new Array();
	$.ajax({
		type: "GET",
        url: url,
        dataType: "json",
        success: function(datasets) {
        	if(!datasets) {
        		$(flotDataGraph).html("No data available.");
        		$(flotLegendContainer).html("");
        	} else {
        		var compSchemaArr = new Array();
	        	var dataX = new Array();
	        	var dataY = new Array();
	        	var colorPercentage = 0;
	        	var counter = 0;
	        	var content = '<table class="flotLegendTable"><tbody><tr>';
	        	$.each(datasets, function(compSchema, dataline) {
	        		var dataXY = new Array();
	        		compSchemaArr.push([compSchema]);
	        		$.each(dataline[0], function(x, y) {
	        			dataX.push([parseDate(x)]);
	        			dataY.push([parseInt(y)]);
	        			dataXY.push([parseDate(x), parseInt(y)]);
	        		});
	        		dataFinal.push({ label: compSchema, data: dataXY, color: shadeColor(seriesColor, colorPercentage), points: { show: true, fill: true, radius: 5, fillColor: shadeColor(seriesColor, colorPercentage) } });
	        		content += '<td><div class="flotLegendColorContainer">'+
										'<div style="width:4px; height:0; border:5px solid '+ shadeColor(seriesColor, colorPercentage) +'; overflow:hidden;"></div>'+
								'</div></td>'+
								'<td><input type="checkbox" class="flotLegendCheckbox" name="form-field-checkbox" checked id="compSchema'+ (counter++) +'">'+
									'<span class="lbl flotLegendLabel">&nbsp;'+ compSchema +'</span>'+
								'</input></td>';
	        		colorPercentage = colorPercentage - 20;
	        		//counter++;
	        	});
	        	content += "</tr></tbody></table>";
	        	options = {
	    			grid: { show: true, hoverable: true, clickable: true },
	    			series: { 
	    				lines: { show: true, fill: false, lineWidth: 3 }
	    			},
	    			tooltip: true,
	    			tooltipOpts: { content: "<b>Month</b>: %x;<br /> <b>Activity</b>: %y", shifts: { x: 12, y: -53 }, defaultTheme: false },
	    			xaxis: { show: true, mode: "time", timezone: "browser", timeformat: "%Y-%m", ticks: dataX, autoscaleMargin: 0.02, labelWidth: 35 },
	    			yaxis: { show: true, min: 0, minTickSize: 1, tickFormatter: function numberWithCommas(y) { return y.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ","); } }
	        	};
	            $(flotLegend).append(content);
	            $(flotLegend).find("input.flotLegendCheckbox:checked").click(plotSeriesToggle);
	            if(counter>0) {
	            	for(var i=0, X=counter; i<X;) {
	            		$('input.flotLegendCheckbox').eq(++i).trigger('click');
	            	}
	            }
	            plotSeriesToggle();
        	}
        	// Please Don't Move This Function To Other Code Block/Source File, Otherwise It Will Cause Flot Memory Leak Issue
            function plotSeriesToggle() {
        		var plot = null;
            	var data = new Array();
            	var checkedElt = $(flotLegend).find("input.flotLegendCheckbox:checked");
            	checkedElt.each(function(index) {
            		var key = $(this).attr("id").replace("compSchema", "");
            		if (key && dataFinal[key]) {
            			data.push(dataFinal[key]);
            		}
            		var length = checkedElt.length;
                	if(length===1) {
                		checkedElt.prop('disabled', this.checked);
                	} else {
                		checkedElt.removeAttr("disabled");
                	}
            	});
            	if (data.length > 0) {
            		$.plot($(flotDataGraph), data, options);
            	}
            }
        }
    });
}

function ajaxDataGraphProductMetrics(url, seriesColor, flotDataGraphContainer, flotDataGraph, flotLegendContainer, flotLegend) {
	var dataFinal = new Array();
	var options = new Array();
	$.ajax({
		type: "GET",
        url: url,
        dataType: "json",
        success: function(datasets) {
        	if(!datasets) {
        		$(flotDataGraphContainer).html("No data available.");
        		$(flotLegendContainer).html("");
        	} else {
        		var compSchemaArr = new Array();
	        	var dataX = new Array();
	        	var dataY = new Array();
	        	var colorPercentage = 0;
	        	var counter = 0;
	        	var content = '<table class="flotLegendTable"><tbody>';
	        	$.each(datasets, function(compSchema, dataline) {
	        		var dataXY = new Array();
	        		compSchemaArr.push([compSchema]);
	        		$.each(dataline[0], function(x, y) {
	        			dataX.push([parseDate(x)]);
	        			dataY.push([parseInt(y)]);
	        			dataXY.push([parseDate(x), parseInt(y)]);
	        		});
	        		dataFinal.push({ label: compSchema, data: dataXY, color: shadeColor(seriesColor, colorPercentage), points: { show: true, fill: true, radius: 5, fillColor: shadeColor(seriesColor, colorPercentage) } });
	        		content += '<tr><td><div class="flotLegendColorContainer">'+
									'<div style="width:4px; height:0; border:5px solid '+ shadeColor(seriesColor, colorPercentage) +'; overflow:hidden;"></div>'+
								'</div></td>'+
								'<td><input type="checkbox" class="flotLegendCheckbox" name="form-field-checkbox" checked id="compSchema'+ (counter++) +'">'+
									'<span class="lbl">&nbsp;'+ compSchema +'</span>'+
								'</input></td></tr>';
	        		colorPercentage = colorPercentage - 20;
	        	});
	        	content += "</tbody></table>";
	        	options = {
	        		grid: { show: true, hoverable: true, clickable: true },
        			series: { 
        				lines: { show: true, fill: false, lineWidth: 3 }
        			},
        			tooltip: true,
        			tooltipOpts: { content: "<b>Month</b>: %x;<br /> <b>Activity</b>: %y", shifts: { x: 12, y: -53 }, defaultTheme: false },
        			xaxis: { show: true, mode: "time", timezone: "browser", timeformat: "%Y-%m", ticks: dataX, autoscaleMargin: 0.02, labelWidth: 35 },
        			yaxis: { show: true, min: 0, minTickSize: 1, tickFormatter: function numberWithCommas(y) { return y.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ","); } }
	        	};
	        	$(flotLegend).append(content);
	            $(flotLegend).find("input.flotLegendCheckbox:checked").click(plotSeriesToggle);
	            if(counter>0) {
	            	for(var i=0, X=counter; i<X;) {
	            		$('input.flotLegendCheckbox').eq(++i).trigger('click');
	            	}
	            }
	            plotSeriesToggle();
        	}
        	// Please Don't Move This Function To Other Code Block/Source File, Otherwise It Will Cause Flot Memory Leak Issue
            function plotSeriesToggle() {
        		var plot = null;
            	var data = new Array();
            	var checkedElt = $(flotLegend).find("input.flotLegendCheckbox:checked");
            	checkedElt.each(function(index) {
            		var key = $(this).attr("id").replace("compSchema", "");
            		if (key && dataFinal[key]) {
            			data.push(dataFinal[key]);
            		}
            		var length = checkedElt.length;
                	if(length===1) {
                		checkedElt.prop('disabled', this.checked);
                	} else {
                		checkedElt.removeAttr("disabled");
                	}
            	});
            	if (data.length > 0) {
            		$.plot($(flotDataGraph), data, options);
            	}
            }
        }
    });
}

// Construct New Date Object To Solve Unsupported Date Format "yyyy-MM-dd" In IE
function parseDate(dateStr) {
	var date = dateStr.split("-");
	var dateNew = new Date(date[0]+"/"+date[1]+"/"+date[2]);
	return dateNew;
}

// Programmatically Shade The Provided Hexadecimal Color
function shadeColor(color, percent) {   
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, B = (num >> 8 & 0x00FF) + amt, G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}