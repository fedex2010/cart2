$(document).on('ready', function(){

    var stickyTop = $('.gb-site-header-title').offset().top;
    $(document).on( 'scroll', function(){
        if ($(window).scrollTop() >= stickyTop) {
          $('.gb-site-header-title').addClass('gb--sticky');
        } else {
          $('.gb-site-header-title').removeClass('gb--sticky');
        }
    });

    $('.gb-site-header-menu-icon').on('click', function(){
        $('.gb-site-header-title').toggleClass('gb--menu-opened');
    });

    $('.gb-site-header-menu a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - 65
        }, 500);
        return false;
    });
    
});