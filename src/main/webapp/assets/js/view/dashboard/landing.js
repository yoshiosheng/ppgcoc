$(function() {
	//set side bar active class
	$("#dashboardSideBarDashboard").addClass("active");

	$('.dialogs,.comments').slimScroll({
        height: '300px'
    });
	
	$('#tasks').sortable();
	$('#tasks').disableSelection();
	$('#tasks input:checkbox').removeAttr('checked').on('click', function(){
		if(this.checked) $(this).closest('li').addClass('selected');
		else $(this).closest('li').removeClass('selected');
	});

	var oldie = $.browser.msie && $.browser.version < 9;
	$('.easy-pie-chart.percentage').each(function(){
		var $box = $(this).closest('.infobox');
		var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
		var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
		var size = parseInt($(this).data('size')) || 50;
		$(this).easyPieChart({
			barColor: barColor,
			trackColor: trackColor,
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: parseInt(size/10),
			animate: oldie ? false : 1000,
			size: size
		});
	})

	$('.sparkline').each(function(){
		var $box = $(this).closest('.infobox');
		var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
		$(this).sparkline('html', {tagValuesAttribute:'data-values', type: 'bar', barColor: barColor , chartRangeMin:$(this).data('min') || 0} );
	});

	var d1 = [];
	for (var i = 0; i < Math.PI * 2; i += 0.5) {
		d1.push([i, Math.sin(i)]);
	}

	var d2 = [];
	for (var i = 0; i < Math.PI * 2; i += 0.5) {
		d2.push([i, Math.cos(i)]);
	}

	var d3 = [];
	for (var i = 0; i < Math.PI * 2; i += 0.2) {
		d3.push([i, Math.tan(i)]);
	}
	

	var sales_charts = $('#sales-charts').css({'width':'100%' , 'height':'220px'});
	$.plot("#sales-charts", [
		{ label: "Domains", data: d1 },
		{ label: "Hosting", data: d2 },
		{ label: "Services", data: d3 }
	], {
		hoverable: true,
		shadowSize: 0,
		series: {
			lines: { show: true },
			points: { show: true }
		},
		xaxis: {
			tickLength: 0
		},
		yaxis: {
			ticks: 10,
			min: -2,
			max: 2,
			tickDecimals: 3
		},
		grid: {
			backgroundColor: { colors: [ "#fff", "#fff" ] },
			borderWidth: 1,
			borderColor:'#555'
		}
	});

	$('#recent-box [data-rel="tooltip"]').tooltip({placement: tooltip_placement});
	function tooltip_placement(context, source) {
		var $source = $(source);
		var $parent = $source.closest('.tab-content')
		var off1 = $parent.offset();
		var w1 = $parent.width();

		var off2 = $source.offset();
		var w2 = $source.width();

		if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
		return 'left';
	}
})