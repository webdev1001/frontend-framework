var tabs = function() {
    $( '.tab__item:not(.tab__item--current)' ).addClass( 'tab__item--hidden' );

    $( '.tab__head' ).click(function(e){
        var parent = $(this).parent();

        if(!parent.hasClass( 'tab__item--current' )) {
            $( '.tab__item' ).removeClass( 'tab__item--current' ).addClass( 'tab__item--hidden' );
            parent.removeClass( 'tab__item--hidden' ).addClass( 'tab__item--current' );
        } else {
            return false;
        }
        e.preventDefault();
    });
};

// To call this, use 'tabs();' in the '_main.js' file