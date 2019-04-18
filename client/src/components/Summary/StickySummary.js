
// On scroll...
let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;


let summaryGbChk = document.getElementsByClassName("summary-gbChk");


if(summaryGbChk.length){
    document.onscroll = function(){
        let $headerCompra = document.getElementsByClassName('gb-main-header').offsetHeight || document.getElementsByClassName('.cp-main-header').offsetHeight,
        $elementCompra = document.getElementsByClassName("summary-gbChk"),
        $alturaCompra =  document.getElementsByClassName('product-gbChk').offset().top - 20,   
        $gbNewsletterSubscribe = document.getElementsByClassName('gb-newsletter-subscribe').offset().top,
        $docBrowserCompu = document.offsetHeight,
        $footerWithoutCarrusel = document.getElementsByClassName("footer").offsetHeight,       
        $top,
        $cartsproductsLengthCompra = document.getElementsByClassName('cart-item').length;
        //$warrantysCompra = $("#warrantys");
        //$box2 = $(".gb-box-2");
        if(document.getElementsByClassName("carousel").offset() != undefined) {
            var $alturaBrowserCarrusel = document.getElementsByClassName("carousel").offset().top;
            var $alturaCarrusel = document.getElementsByClassName("carousel").offsetHeight;
            var $bottomCompra = $alturaBrowserCarrusel - $alturaCarrusel - 100; 
        }else {
           //var $bottomCompra = $gbNewsletterSubscribe - 65;
           var $bottomCompra = $docBrowserCompu - $footerWithoutCarrusel - 400; 
        }
       

        if($headerCompra === 61) {

             if(isIE11){
                $top = document.documentElement.scrolltop;
            }else {
                $top = window.scrolltop;
            }
            
            if($top >= $alturaCompra && window.innerWidth > 992 && $cartsproductsLengthCompra > 3) {
               //agregar la class summary-fixed
               //Remover la class summary-absolute


                if(isIE11){
                    
                    if($top >= $bottomCompra){
                         //Remover la class summary-fixed
                         //Agregar la class summary-absolute
                    }else{
                       //agregar la class summary-fixed
                       //Remover la class summary-absolute
                    }
                }else{
                   
                    if($top >= $bottomCompra){
                        //Remover la class summary-fixed
                         //Agregar la class summary-absolute
                    }else{
                         //agregar la class summary-fixed
                       //Remover la class summary-absolute
                    }


                }
            } else {
                //Remover la class summary-fixed
               
            }
        } else {
            if ($headerCompra === 31) {
                if (window.scrolltop >= 51 && $cartsproductsLengthCompra <= 3) {
                    //$elementCompra.addClass('fixed-resume-medium')
                } else {
                    //$elementCompra.removeClass('fixed-resume-medium');

                }
            }
        }
    };

}
