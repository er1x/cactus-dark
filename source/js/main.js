document.addEventListener('DOMContentLoaded', function () {
  var $ = function (selector) {
    return document.querySelector(selector);
  }

  var hidden = function (elem) {
    var width = elem.offsetWidth,
        height = elem.offsetHeight;

    return ( width === 0 && height === 0 ) ||
           (((elem.style && elem.style.display) || getComputedStyle(elem)['display']) === "none");
  }

  var toggleVisibility = function (elem) {
    if (elem.style.display == "block") {
      elem.style.display = 'none';
    } else {
      elem.style.display = 'block';
    }
  }

  Array.from(document.querySelectorAll("#menu-icon, #menu-icon-tablet")).forEach(function (el) {
    el.addEventListener('click', function () {
      if ( getComputedStyle($('#menu'))['visibility'] === 'hidden' ) {
        $('#menu').style.visibility = 'visible';
        $('#menu-icon, #menu-icon-tablet').classList.add('active');

        var topDistance = $("#menu > #nav").getBoundingClientRect().top + document.body.scrollTop;

        if ( getComputedStyle($('#menu'))['visibility'] !== 'hidden' && topDistance < 50 ) {
          $("#menu > #nav").style.display = '';
        } else if (getComputedStyle($('#menu'))['visibility'] !== 'hidden' && topDistance > 100) {
          $("#menu > #nav").style.display = 'none';
        }
        return false;
      } else {
        $('#menu').style.visibility = 'hidden';
        $('#menu-icon, #menu-icon-tablet').classList.remove('active');
        return false;
      }
    })
  });
  
  if ($('#actions-footer #toc a')) {
    $('#actions-footer #toc a').addEventListener('click', function (e) {
      e.preventDefault();
      toggleVisibility($('#toc-footer'))
    });
  }
  if ($('#actions-footer #menu a')) {
    $('#actions-footer #menu a').addEventListener('click', function (e) {
      e.preventDefault();
      toggleVisibility($('#nav-footer'))
    });
  }
  
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  if ($("#header > #nav > ul > .icon")) {
    $("#header > #nav > ul > .icon").addEventListener('click', function() {
      $("#header > #nav > ul").classList.toggle("responsive");
    });
  }

  if ( $( "#menu" ) !== null ) {
    window.addEventListener('scroll', function () {
      var topDistance = $("#menu > #nav").getBoundingClientRect().top + document.body.scrollTop;
      if ( getComputedStyle($('#menu'))['visibility'] !== 'hidden' && topDistance < 50 ) {
        $("#menu > #nav").style.display = '';
      } else if (getComputedStyle($('#menu'))['visibility'] !== 'hidden' && topDistance > 100) {
        $("#menu > #nav").style.display = 'none';
      }

      if ( hidden($('#menu-icon')) && topDistance < 50 ) {
        $("#menu-icon-tablet").style.display = '';
        $("#top-icon-tablet").style.display = 'none';
      } else if (hidden($('#menu-icon')) && topDistance > 100) {
        $("#menu-icon-tablet").style.display = 'none';
        $("#top-icon-tablet").style.display = '';
      }
    });
  }

  if ( $( "#footer-post" ) !== null ) {
    var lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      var topDistance = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (topDistance > lastScrollTop){
        // downscroll code
        $("#footer-post").style.display = 'none';
      } else {
        // upscroll code
        $("#footer-post").style.display = '';
      }
      lastScrollTop = topDistance;

      $("#nav-footer").style.display = 'none';
      $("#toc-footer").style.display = 'none';

      if ( topDistance < 50 ) {
        $("#actions-footer > ul > #top").style.display = 'none';
        $("#actions-footer > ul > #menu").style.display = '';
      } else if ( topDistance > 100 ) {
        $("#actions-footer > ul > #menu").style.display = 'none';
        $("#actions-footer > ul > #top").style.display = '';
      }
    });
  }
})
