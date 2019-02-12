$(document).on('ready', function(){

    ////////////////////////////////////
    /////////////// TABS ///////////////
    ////////////////////////////////////

    $('.tab-1-button').on('click', function(){
        $(this).addClass('gb--active').siblings().removeClass('gb--active');
        $(this).parent().parent().find('.tab-1-content').addClass('gb--active').siblings().removeClass('gb--active');
    });

    $('.tab-2-button').on('click', function(){
        $(this).addClass('gb--active').siblings().removeClass('gb--active');
        $(this).parent().parent().find('.tab-2-content').addClass('gb--active').siblings().removeClass('gb--active');
    });

    $('.tab-3-button').on('click', function(){
        $(this).addClass('gb--active').siblings().removeClass('gb--active');
        $(this).parent().parent().find('.tab-3-content').addClass('gb--active').siblings().removeClass('gb--active');
    });

    $('.tab-4-button').on('click', function(){
        $(this).addClass('gb--active').siblings().removeClass('gb--active');
        $(this).parent().parent().find('.tab-4-content').addClass('gb--active').siblings().removeClass('gb--active');
    });

    $('.tab-5-button').on('click', function(){
        $(this).addClass('gb--active').siblings().removeClass('gb--active');
        $(this).parent().parent().find('.tab-5-content').addClass('gb--active').siblings().removeClass('gb--active');
    });






    ///////////////////////////////////////
    /////////////// POPOVER ///////////////
    ///////////////////////////////////////

    // Popover top arrow left
    $('#popover-top-arrow-left-button').on('click', function(){
        $('.gb-site-popover-top-arrow-left').addClass('gb--show');
    });

    $('.gb-site-popover-top-arrow-left .gb-popover-close').on('click', function(){
       $('.gb-site-popover-top-arrow-left').removeClass('gb--show'); 
    });


    // Popover top arrow center
    $('#popover-top-arrow-center-button').on('click', function(){
        $('.gb-site-popover-top-arrow-center').addClass('gb--show');
    });

    $('.gb-site-popover-top-arrow-center .gb-popover-close').on('click', function(){
       $('.gb-site-popover-top-arrow-center').removeClass('gb--show'); 
    });


    // Popover top arrow right
    $('#popover-top-arrow-right-button').on('click', function(){
        $('.gb-site-popover-top-arrow-right').addClass('gb--show');
    });

    $('.gb-site-popover-top-arrow-right .gb-popover-close').on('click', function(){
       $('.gb-site-popover-top-arrow-right').removeClass('gb--show'); 
    });


    // Popover bottom arrow left
    $('#popover-bottom-arrow-left-button').on('click', function(){
        $('.gb-site-popover-bottom-arrow-left').addClass('gb--show');
    });

    $('.gb-site-popover-bottom-arrow-left .gb-popover-close').on('click', function(){
       $('.gb-site-popover-bottom-arrow-left').removeClass('gb--show'); 
    });


    // Popover bottom arrow center
    $('#popover-bottom-arrow-center-button').on('click', function(){
        $('.gb-site-popover-bottom-arrow-center').addClass('gb--show');
    });

    $('.gb-site-popover-bottom-arrow-center .gb-popover-close').on('click', function(){
       $('.gb-site-popover-bottom-arrow-center').removeClass('gb--show'); 
    });


    // Popover bottom arrow right
    $('#popover-bottom-arrow-right-button').on('click', function(){
        $('.gb-site-popover-bottom-arrow-right').addClass('gb--show');
    });

    $('.gb-site-popover-bottom-arrow-right .gb-popover-close').on('click', function(){
       $('.gb-site-popover-bottom-arrow-right').removeClass('gb--show'); 
    });


    // Popover left arrow top
    $('#popover-left-arrow-top-button').on('click', function(){
        $('.gb-site-popover-left-arrow-top').addClass('gb--show');
    });

    $('.gb-site-popover-left-arrow-top .gb-popover-close').on('click', function(){
       $('.gb-site-popover-left-arrow-top').removeClass('gb--show'); 
    });


    // Popover left arrow center
    $('#popover-left-arrow-center-button').on('click', function(){
        $('.gb-site-popover-left-arrow-center').addClass('gb--show');
    });

    $('.gb-site-popover-left-arrow-center .gb-popover-close').on('click', function(){
       $('.gb-site-popover-left-arrow-center').removeClass('gb--show'); 
    });


    // Popover left arrow bottom
    $('#popover-left-arrow-bottom-button').on('click', function(){
        $('.gb-site-popover-left-arrow-bottom').addClass('gb--show');
    });

    $('.gb-site-popover-left-arrow-bottom .gb-popover-close').on('click', function(){
       $('.gb-site-popover-left-arrow-bottom').removeClass('gb--show'); 
    });

    // Popover right arrow top
    $('#popover-right-arrow-top-button').on('click', function(){
        $('.gb-site-popover-right-arrow-top').addClass('gb--show');
    });

    $('.gb-site-popover-right-arrow-top .gb-popover-close').on('click', function(){
       $('.gb-site-popover-right-arrow-top').removeClass('gb--show'); 
    });


    // Popover right arrow center
    $('#popover-right-arrow-center-button').on('click', function(){
        $('.gb-site-popover-right-arrow-center').addClass('gb--show');
    });

    $('.gb-site-popover-right-arrow-center .gb-popover-close').on('click', function(){
       $('.gb-site-popover-right-arrow-center').removeClass('gb--show'); 
    });
    

    // Popover right arrow bottom
    $('#popover-right-arrow-bottom-button').on('click', function(){
        $('.gb-site-popover-right-arrow-bottom').addClass('gb--show');
    });

    $('.gb-site-popover-right-arrow-bottom .gb-popover-close').on('click', function(){
       $('.gb-site-popover-right-arrow-bottom').removeClass('gb--show'); 
    });







    ////////////////////////////////////////
    /////////////// CODE BOX ///////////////
    ////////////////////////////////////////

    $('.tab-html').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().parent().find('.content-html').addClass('active').siblings().removeClass('active');
    });

    $('.tab-scss').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().parent().find('.content-scss').addClass('active').siblings().removeClass('active');
    });

    $('.tab-mixin').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().parent().find('.content-mixin').addClass('active').siblings().removeClass('active');
    });


    
});