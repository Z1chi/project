$(".popup").magnificPopup();

setTimeout(function() {
  $('input, select').styler();
}, 100);

var callback = function(){

    $(document).ready(function(){
  $(".owl-carousel-reviews-eng").owlCarousel({
    items:2,
    loop:true,
    dotse:false,
    smartSpeed:1500,
    stagePadding: 200,
    margin:50,
    responsive:{
        0:{
            items:1,
            margin:20,
           stagePadding: 50
       },
       560:{
           items:1,
            stagePadding: 100
       },
       950:{
           stagePadding: 100
       },
       1040:{
           stagePadding: 150,
       },
       1500:{
           stagePadding: 250
       }
   }
  });


  var owl = $('.owl-carousel-reviews-eng');
    owl.owlCarousel();
// Go to the next item
    $('.reviews-owl-arrow-next-eng').click(function() {
        owl.trigger('next.owl.carousel');
});

     var owl = $('.owl-carousel-reviews-eng');
    owl.owlCarousel();
// Go to the next item
    $('.reviews-owl-arrow-prev-eng').click(function() {
        owl.trigger('prev.owl.carousel');
});
});

$(document).ready(function(){
  $(".owl-carousel-reviews-rus").owlCarousel({
    items:2,
    loop:true,
    dotse:false,
    smartSpeed:1500,
    stagePadding: 200,
    margin:50,
    responsive:{
        0:{
            items:1,
            margin:20,
           stagePadding: 50
       },
       560:{
           items:1,
            stagePadding: 100
       },
       950:{
           stagePadding: 100
       },
       1040:{
           stagePadding: 150,
       },
       1500:{
           stagePadding: 250
       }
   }
  });


  var owl = $('.owl-carousel-reviews-rus');
    owl.owlCarousel();
// Go to the next item
    $('.reviews-owl-arrow-next-rus').click(function() {
        owl.trigger('next.owl.carousel');
});

     var owl = $('.owl-carousel-reviews-rus');
    owl.owlCarousel();
// Go to the next item
    $('.reviews-owl-arrow-prev-rus').click(function() {
        owl.trigger('prev.owl.carousel');
});
});

$(document).ready(function(){
  $(".owl-carousel-offer").owlCarousel({
    items:1,
    loop:true,
    dotse:true,
    smartSpeed:1500,
    stagePadding: 250,
    margin:100,
    responsive:{
       0:{
           margin:30,
           stagePadding: 40
       },
       700:{
           margin:50,
           stagePadding: 150
       },
       1040:{
           stagePadding: 150
       },
       1350:{
           stagePadding: 250
       }
   }
  });


  var owl = $('.owl-carousel-offer');
    owl.owlCarousel();
// Go to the next item
    $('.offers-owl-arrow-next').click(function() {
        owl.trigger('next.owl.carousel');
});

     var owl = $('.owl-carousel-offer');
    owl.owlCarousel();
// Go to the next item
    $('.offers-owl-arrow-prev').click(function() {
        owl.trigger('prev.owl.carousel');
});
});

};
$('#close').click(function() {
        $.magnificPopup.close();
    });

$('#close2').click(function() {
        $.magnificPopup.close();
    });

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

$('.main-screen-header-mob-top-menu').on('click', function () {
  $('.main-screen').toggleClass('active');
}); 

$(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});


$(document).ready(function(){
    $("#menu2").on("click","a", function (event) {
        $('.main-screen').removeClass('active');
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});


$( ".main-screen__last-line-sing-a" ).mouseenter(function() {
  $( ".main-screen" ).addClass( "hover-active" );
});


$( ".main-screen__last-line-sing-a" ).mouseleave(function() {
  $( ".main-screen" ).removeClass( "hover-active" );
});

new WOW().init();

$(document).ready(function(){   
    var $element = $('#block');
    let counter = 0;
$(window).scroll(function() {
  var scroll = $(window).scrollTop() + $(window).height();
  //Если скролл до конца елемента
  //var offset = $element.offset().top + $element.height();
  //Если скролл до начала елемента
  var offset = $element.offset().top;
 
  if (scroll > offset && counter == 0) {
    $('#block').addClass('active');
    counter = 1;
  }
});
});

$(document).ready(function(){   
    var $element = $('#offers');
    let counter = 0;
$(window).scroll(function() {
  var scroll = $(window).scrollTop() + $(window).height();
  //Если скролл до конца елемента
  //var offset = $element.offset().top + $element.height();
  //Если скролл до начала елемента
  var offset = $element.offset().top;
 
  if (scroll > offset && counter == 0) {
    $('.line').css('animation-name','toggleOpacity');
    $('.line-back').css('animation-name','toggleOpacity');
    counter = 1;
  }
});
});

$(document).ready(function(){   
    var $element = $('#statistic');
    let counter = 0;
$(window).scroll(function() {
  var scroll = $(window).scrollTop() + $(window).height();
  //Если скролл до конца елемента
  //var offset = $element.offset().top + $element.height();
  //Если скролл до начала елемента
  var offset = $element.offset().top;
 
  if (scroll > offset && counter == 0) {
    $('.line').css('animation-name','toggleOpacity');
    $('.line-back').css('animation-name','toggleOpacity');
    counter = 1;
  }
});
});

$('.statistic-main-wrapp-show').on('click', function () {
  $('.statistic-main-wrapp').toggleClass('active');
}); 


$(document).ready(function(){   
    var $element = $('#offers');
    let counter = 0;
$(window).scroll(function() {
  var scroll = $(window).scrollTop() + $(window).height();
  //Если скролл до конца елемента
  //var offset = $element.offset().top + $element.height();
  //Если скролл до начала елемента
  var offset = $element.offset().top;
 
  if (scroll > offset && counter == 0) {
    $('.arrow-white').css('display','flex');
  } else {
    $('.arrow-white').css('display','none');
  }
});
});

$('.arrow-white').on('click', function () {
  $('body,html').animate({scrollTop: 0}, 1500);
}); 

$('.languages').on('click', function () {
  $(this).toggleClass('opened');
}); 

$('.languages a.languages-ru').on('click', function () {
  $('body').addClass('body-ru');
  $('body').removeClass('body-en');
  $('.languages a').removeClass('active');
  $(this).addClass('active');

    setCookie('language', 'ru', 365);
}); 

$('.languages a.languages-en').on('click', function () {
  $('body').removeClass('body-ru');
  $('body').addClass('body-en');
  $('.languages a').removeClass('active');
  $(this).addClass('active');

  setCookie('language', 'en', 365);
});


// Set a Cookie
function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}


















