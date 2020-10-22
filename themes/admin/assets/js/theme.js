(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar-menu-text').hide();
    } else {
      $('.sidebar-menu-text').show();
    };
  });

  $("#sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  //Toggle charts

  $('#electricity-chart').show();
  $('#help-chart').hide();
  $('#socializing-chart').hide();

  $('#toggle-electricity-chart').on('click', e => {
    $('#graph-title').html('Electricity consumption');
    $('#electricity-chart').show();
    $('#help-chart').hide();
    $('#socializing-chart').hide();
  });

  $('#toggle-help-chart').on('click', e => {
    $('#graph-title').html('Help requests');
    $('#help-chart').show();
    $('#electricity-chart').hide();
    $('#socializing-chart').hide();
  });

  $('#toggle-socializing-chart').on('click', e => {
    $('#graph-title').html('Social activity');
    $('#socializing-chart').show();
    $('#help-chart').hide();
    $('#electricity-chart').hide();
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
      $('.sidebar-menu-text').hide(); //sidebar description text
    } else {
      $('.sidebar-menu-text').show();
    };
  });

  //Sidebar description text disappears when below 768px
  if ($(window).width() < 768) {
    $('.sidebar-menu-text').hide();
  } else {
    $('.sidebar-menu-text').show();
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
