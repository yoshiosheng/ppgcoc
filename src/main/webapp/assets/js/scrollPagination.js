(function($) {
	$.fn.scrollPagination = function(options) {
		var settings = { 
			nop     : 10, // The number of posts per scroll to be loaded
			offsetInternal  : 10, // Initial offset, begins at 0 in this case for internal contact
			offsetExternal  : 10, // Initial offset, begins at 0 in this case for external contact
			error   : 'No more contacts!', // When the user reaches the end this is the message that is displayed.
			delay   : 500, // When you scroll down the posts will load after a delayed amount of time.
			               // This is mainly for usability concerns. You can alter this as you see fit
			scroll  : false // The main bit, if set to false posts will not load as the user scrolls. 
			               // but will still load if the user clicks.
		};
		
		// Extend the options so they work with the plugin
		if(options) {
			$.extend(settings, options);
		}
		
		return this.each(function() {
			$this = $(this);
			$settings = settings;
			var offsetInternal = $settings.offsetInternal;
			var offsetExternal = $settings.offsetExternal;
			var contactType = $settings.contactType;
			var busy = false; // Checks if the scroll action is happening 
			                  // so we don't run it multiple times
			
			// Custom messages based on settings
			if($settings.scroll == true) $initmessage = 'Scroll for more or click here';
			else $initmessage = 'Click here to see more';

			// Append custom messages and extra UI
			$this.append('<div class="align-right loading-bar-'+contactType+'">'+$initmessage+'</div>');
			
			function getData() {
				var offsetVal = offsetInternal;
				if(contactType == "externalContact")  offsetVal = offsetExternal; 
				
				$.ajax({
					type: 'POST',
					url: $settings.url,
					dataType:'html',
					data: { accountId: $settings.accountID, contactType: contactType,
							limit: $settings.nop, offset: offsetVal },
					beforeSend: function () {
						// Change loading bar content (it may have been altered)
						$this.parent().find('.loading-bar-'+contactType).html($initmessage);
					},
					success: function(data) {
						$this.parent().find('.loading-bar-'+contactType).html($initmessage);
						// If there is no data returned, there are no more posts to be shown. Show error
						if(data == "") {
							$this.parent().find('.loading-bar-'+contactType).html($settings.error);	
						}
						else {
							// Append the data to the content div
						    if(contactType == "internalContact") {
								offsetInternal = offsetInternal + $settings.nop; 
							   	$('#accordion2').append(data);
							   	
						    } else if(contactType == "externalContact"){
						    	offsetExternal = offsetExternal + $settings.nop;
							   	$('#accordion1').append(data);
						    }
							
							// No longer busy!	
							busy = false;
						}
					}
				});					
			}
			
			// If scrolling is enabled
			if($settings.scroll == true) {
				$(window).scroll(function() {
					// Check the user is at the bottom of the element
					if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
						busy = true;
						$this.find('.loading-bar-'+contactType).html('Loading Posts');
						setTimeout(function() {
							getData();
						}, $settings.delay);
					}	
				});
			}
			
			// Also content can be loaded by clicking the loading bar/
			$this.find('.loading-bar-'+contactType).click(function() {
				if(busy == false) {
					busy = true;
					getData();
				}
			});
		});
	};
})(jQuery);
