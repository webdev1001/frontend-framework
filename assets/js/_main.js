MAIN = (function($) {
    init = function() {
        // Code here runs straight away

        $(DOMready); 
    },
    DOMready = function() {
        // Code here runs when the DOM is ready

    };

    return {
        start : init
    };
})(jQuery);

MAIN.start(); 

// Grunticon stylesheet loader
grunticon([ "assets/grunticon/icons.data.svg.css", "assets/grunticon/icons.data.png.css", "assets/grunticon/icons.fallback.css" ]);