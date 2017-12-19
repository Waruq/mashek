/*
Author: Dot Themes
*/
(function($) {
    "use strict";

    smoothScroll.init();

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    $('body').scrollspy({
        target: '.navbar-fixed-top'
    });


    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });


    $(window).scroll(function(event) {
        Scroll();
    });


    $("a[data-gal^='prettyPhoto']").prettyPhoto();


    $(document).ready(function() {
        $("#owl-example").owlCarousel();
        var owl = $("#fn-feedbacks");
        owl.owlCarousel({
            items: 3,
            itemsDesktop: [1000, 2],
            itemsDesktopSmall: [900, 1],
            itemsTablet: [600, 1],
            itemsMobile: false
        });

        /* ==========  START GOOGLE MAP ========== */
        google.maps.event.addDomListener(window, 'load', init);

        function init() {
            var myLatLng = new google.maps.LatLng(33.727817, 75.150122);

            var mapOptions = {
                zoom: 15,
                center: myLatLng,
                disableDefaultUI: true,
                scrollwheel: false,
                navigationControl: true,
                mapTypeControl: false,
                scaleControl: false,
                draggable: true,

                styles: [{
                    featureType: 'water',
                    stylers: [{
                        color: '#ECC731'
                    }, {
                        visibility: 'on'
                    }]
                }, {
                    featureType: 'landscape',
                    stylers: [{
                        color: '#f2f2f2'
                    }]
                }, {
                    featureType: 'road',
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 45
                    }]
                }, {
                    featureType: 'road.highway',
                    stylers: [{
                        visibility: 'simplified'
                    }]
                }, {
                    featureType: 'road.arterial',
                    elementType: 'labels.icon',
                    stylers: [{
                        visibility: 'off'
                    }]
                }, {
                    featureType: 'administrative',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#444444'
                    }]
                }, {
                    featureType: 'transit',
                    stylers: [{
                        visibility: 'off'
                    }]
                }, {
                    featureType: 'poi',
                    stylers: [{
                        visibility: 'off'
                    }]
                }]
            };
            var mapElement = document.getElementById('map-canvas');
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.70968790739889, -74.06913757324219),
                map: map,
                icon: 'img/icons/map-marker.png',
            });
        }
        // ========== END GOOGLE MAP ========== //
    });


    $(window).load(function() {
        'use strict';
        var $gallery_selectors = $('.gallery-filter >li>a');
        var $gallery = $('.gallery-items');
        $gallery.isotope({
            itemSelector: '.gallery-item',
            layoutMode: 'fitRows'
        });

        $gallery_selectors.on('click', function() {
            $gallery_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $gallery.isotope({
                filter: selector
            });
            return false;
        });
    });

})(jQuery);

$.fn.serializeObject = function() {
    "use strict";
    var a = {},
        b = function(b, c) {
            var d = a[c.name];
            "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
        };
    return $.each(this.serializeArray(), b), a
};
$(document).on('click', 'a[href="#contact"],a[href="#team"],a[href="#about"],a[href="#home"],a[href="#fn-success"],a[href="#gallery"]', function(e) {
    var $anchor = $(this);
    $('html, body').animate({
        scrollTop: $($anchor.attr('href')).offset().top,
        specialEasing: {
            width: "linear ",
            height: "easeOutBounce "
        }
    }, 1500);
    e.preventDefault();
});

$('#contactus').submit(function(e) {
    $('#loader').removeAttr('style');
    var url = "https://script.google.com/macros/s/AKfycbx_U0gkMX2myfPYpJ-qVGY1pjxujHw5QgDHHB4AFvL6xhqsdPdU/exec";
    e.preventDefault();
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        crossOrigin: true,
        data: $('#contactus').serializeObject(),
        success: function(result) {
            $('#loader').css('display', 'none');
            document.getElementById('contactus').reset();
            swal("Thanks for contacting us", "We will get back to you soon", "success");
        },
        error: function(result) {
            $('#loader').css('display', 'none');
            swal("Sorry something went wrong ", "Please try again", "error");
        }
    });


});