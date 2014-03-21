MAIN = (function ($) {

	init = function () {
		// Code here runs straight away
		
		$(DOMready); 
	},

	DOMready = function () {
		// Code here runs when the DOM is ready
	
	};

	return {
		start : init
	};

})(jQuery);

MAIN.start(); 