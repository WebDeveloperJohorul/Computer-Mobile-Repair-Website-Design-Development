(function($) {
    "use strict";
    var THEMEMASCOT = {};

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    var $document = $(document);
    var $document_body = $(document.body);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $wrapper = $('#wrapper');
    var $header = $('#header');
    var $header_nav = $('#header .header-nav');
    var $header_navbar_scrolltofixed = $('body.tm-enable-navbar-scrolltofixed');
    var $footer = $('#footer');
    var $sections = $('.vc_row.vc-row-tm-parent-section');
    var windowHeight = $window.height();

    var $gallery_isotope = $(".isotope-layout");

    var gallery_isotope_filter_string = ".isotope-layout-filter";
    var $gallery_isotope_filter_parent = $(gallery_isotope_filter_string);
    var gallery_isotope_filter = gallery_isotope_filter_string + " a";
    var $gallery_isotope_filter_first_child = $(gallery_isotope_filter + ":eq(0)");

    var gallery_isotope_sorter_string = ".isotope-layout-sorter";
    var $gallery_isotope_sorter_parent = $(gallery_isotope_sorter_string);
    var gallery_isotope_sorter = ".isotope-layout-sorter a";

    THEMEMASCOT.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (THEMEMASCOT.isMobile.Android() || THEMEMASCOT.isMobile.BlackBerry() || THEMEMASCOT.isMobile.iOS() || THEMEMASCOT.isMobile.Opera() || THEMEMASCOT.isMobile.Windows());
        }
    };

    function admin_bar_height() {
        var admin_bar_height = 0;
        if ($body.hasClass('admin-bar')) {
            admin_bar_height = $('#wpadminbar').height();
        }
        return admin_bar_height;
    }

    function tmProgressBarCounter(pBar, pPercent) {
        var percent = parseFloat(pPercent);
        if (pBar.length) {
            pBar.each(function() {
                var current_item = $(this);
                current_item.css('opacity', '1');
                current_item.countTo({
                    from: 0,
                    to: percent,
                    speed: 2000,
                    refreshInterval: 50
                });
            });
        }
    }

    THEMEMASCOT.isRTL = {
        check: function() {
            if ($("html").attr("dir") === "rtl") {
                return true;
            } else {
                return false;
            }
        }
    };

    THEMEMASCOT.isLTR = {
        check: function() {
            if ($("html").attr("dir") !== "rtl") {
                return true;
            } else {
                return false;
            }
        }
    };

    THEMEMASCOT.urlParameter = {
        get: function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        }
    };

    THEMEMASCOT.initialize = {

        init: function() {
            THEMEMASCOT.initialize.TM_yith_wcwl();
            THEMEMASCOT.initialize.TM_navbar_scrolltofixed_hide();
            THEMEMASCOT.initialize.TM_dataTables();
            THEMEMASCOT.initialize.TM_toggleNavSearchIcon();
            THEMEMASCOT.initialize.TM_fixedFooter();
            THEMEMASCOT.initialize.TM_ddslick();
            THEMEMASCOT.initialize.TM_sliderRange();
            THEMEMASCOT.initialize.TM_platformDetect();
            THEMEMASCOT.initialize.TM_customDataAttributes();
            THEMEMASCOT.initialize.TM_parallaxBgInit();
            THEMEMASCOT.initialize.TM_resizeFullscreen();
            THEMEMASCOT.initialize.TM_lightgallery_lightbox();
            THEMEMASCOT.initialize.TM_lightgallery_lightbox_reset();
            THEMEMASCOT.initialize.TM_prettyPhoto_lightbox();
            THEMEMASCOT.initialize.TM_nivolightbox();
            THEMEMASCOT.initialize.TM_YTPlayer();
            THEMEMASCOT.initialize.TM_CustomColumnsHolderResponsiveStyler();
            THEMEMASCOT.initialize.TM_equalHeightDivs();
            THEMEMASCOT.initialize.TM_wow();
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------- Hide Navbar on Scroll Down  ------------------ */
        /* ---------------------------------------------------------------------- */
        TM_yith_wcwl: function() {
            $('.yith-wcwl-add-to-wishlist').each(function() {
                var $this = $(this);
                var $yithWcwlAddButton = $this.find('.yith-wcwl-add-button');
                var $yithWcwlWishlistaddedbrowse = $this.find('.yith-wcwl-wishlistaddedbrowse');
                var $yithWcwlWishlistexistsbrowse = $this.find('.yith-wcwl-wishlistexistsbrowse');

                var $yithWcwlAddButtonLink = $yithWcwlAddButton.find('a');
                $yithWcwlAddButtonLink.attr('title', $yithWcwlAddButtonLink.text().trim());

                $yithWcwlWishlistaddedbrowse.find('a').attr('title', $yithWcwlWishlistaddedbrowse.find('.feedback').text().trim());
                $yithWcwlWishlistexistsbrowse.find('a').attr('title', $yithWcwlWishlistexistsbrowse.find('.feedback').text().trim());

                $this.find('a').on('click', function() {
                    var $self = $(this);
                    $self.toggleClass('active');
                    setTimeout(function() {
                        $self.toggleClass('active');
                    }, 1000);
                });
            });
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------- Hide Navbar on Scroll Down  ------------------ */
        /* ---------------------------------------------------------------------- */
        TM_navbar_scrolltofixed_hide: function() {
            if (!$header_navbar_scrolltofixed.hasClass("tm-enable-navbar-always-visible-on-scroll")) {
                var $navbar_scrolltofixed = $header_navbar_scrolltofixed.find('.navbar-scrolltofixed');
                if ($navbar_scrolltofixed.length > 0) {
                    var prevScrollpos = $window.scrollTop();
                    var $header_height = $header.height();
                    var $navbar_height = $navbar_scrolltofixed.height();
                    $window.on('scroll', function() {
                        var currentScrollPos = $window.scrollTop();
                        if (prevScrollpos > currentScrollPos) {
                            $navbar_scrolltofixed.css('top', 0);
                        } else {
                            if ($document.scrollTop() > $header_height + 200) {
                                $navbar_scrolltofixed.css('top', '-' + $navbar_height + 'px');
                            }
                        }
                        prevScrollpos = currentScrollPos;
                    });
                }
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------ Data Table  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_dataTables: function() {
            var $data_table = $('table.data-table');

            if ($data_table.length > 0) {
                $($data_table).DataTable({
                    "paging": false,
                    "info": false,
                    "searching": false
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------ portfolio-sticky-side  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_portfolioStickyScrollMagic: function() {
            //Sticky Side Text in Shop Single Product Page
            var portfolio_sticky_parent_div = '.portfolio-sticky-side-text';
            var scroll_magic_controller = null;
            var width = $window.width();

            function initScrollMagic() {
                // init controller
                scroll_magic_controller = new ScrollMagic.Controller();
                var pinned_obj = (portfolio_sticky_parent_div + ' .portfolio-details');
                var start_from = $(portfolio_sticky_parent_div).offset().top - $header_nav.outerHeight(true) - 30;
                var duration = $('.portfolio-container').outerHeight(true) - $(pinned_obj).outerHeight(true);
                var scene = new ScrollMagic.Scene({
                        offset: start_from,
                        duration: duration // pin the element for a total of 400px
                    })
                    .setPin(pinned_obj); // the element we want to pin
                // Add Scene to ScrollMagic Controller
                scroll_magic_controller.addScene(scene);
            }

            if ($(portfolio_sticky_parent_div).length > 0) {
                //767 is bootstrap mobile breakpoint
                if (width >= 768) {
                    setTimeout(initScrollMagic, 2000);
                }
                $window.resize(function() {
                    //reset values when page size changes
                    //my scroll magic is used on multiple pages, duration depends on item heights
                    width = $window.width();

                    if (width < 768) {
                        //you can just use 'controller' here as it will return true or false, you dont need all the conditionals
                        if (scroll_magic_controller) {
                            scroll_magic_controller = scroll_magic_controller.destroy(true)
                        }
                    } else if (width > 767) {
                        //same here 
                        if (!scroll_magic_controller) {
                            initScrollMagic()
                        }
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------------- */
        /* -------------------------------- ScrollMagic ------------------------------- */
        /* ---------------------------------------------------------------------------- */
        TM_shopSingleStickyScrollMagic: function() {
            //Sticky Side Text in Shop Single Product Page
            var single_product_sticky_parent_div = '.single-product-sticky-side-text';
            var scroll_magic_controller = null;
            var width = $window.width();

            function initScrollMagic() {
                // init controller
                scroll_magic_controller = new ScrollMagic.Controller();
                var pinned_obj = (single_product_sticky_parent_div + ' .summary.entry-summary');
                var start_from = $(single_product_sticky_parent_div).offset().top - $header_nav.outerHeight(true) - 30;
                var duration = $('.woocommerce-product-gallery').outerHeight(true) - $(pinned_obj).outerHeight(true);
                var scene = new ScrollMagic.Scene({
                        offset: start_from,
                        duration: duration // pin the element for a total of 400px
                    })
                    .setPin(pinned_obj); // the element we want to pin
                // Add Scene to ScrollMagic Controller
                scroll_magic_controller.addScene(scene);
            }

            if ($(single_product_sticky_parent_div).length > 0) {
                //767 is bootstrap mobile breakpoint
                if (width >= 768) {
                    setTimeout(initScrollMagic, 2000);
                }
                $window.resize(function() {
                    //reset values when page size changes
                    //my scroll magic is used on multiple pages, duration depends on item heights
                    width = $window.width();

                    if (width < 768) {
                        //you can just use 'controller' here as it will return true or false, you dont need all the conditionals
                        if (scroll_magic_controller) {
                            scroll_magic_controller = scroll_magic_controller.destroy(true)
                        }
                    } else if (width > 767) {
                        //same here 
                        if (!scroll_magic_controller) {
                            initScrollMagic()
                        }
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Toggle Nav Search Icon  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_toggleNavSearchIcon: function() {

            $document_body.on('click', '#top-nav-search-btn', function(e) {
                $('#top-nav-search-form').stop(true, true).fadeIn(100).find('input[type=text]').focus();
                return false;
            });
            $document_body.on('click', '#close-search-btn', function(e) {
                $('#top-nav-search-form').stop(true, true).fadeOut(100);
                return false;
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Fixed Footer  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_fixedFooter: function() {
            var $fixed_footer = $('.fixed-footer');
            var $boxed_layout = $('body.tm-boxed-layout');
            var margin_bottom = $fixed_footer.height();

            if ($fixed_footer.length > 0) {
                if ($window.width() >= 1200) {} else {
                    margin_bottom = 0;
                }

                if ($boxed_layout.length > 0) {
                    var boxed_layout_padding_bottom = $boxed_layout.css('padding-bottom');
                    $fixed_footer.css('bottom', boxed_layout_padding_bottom);
                }
                $('body.has-fixed-footer .main-content').css('margin-bottom', margin_bottom);
            }
        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------------- ddslick  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_ddslick: function() {
            var $ddslick = $("select.ddslick");
            if ($ddslick.length > 0) {
                $ddslick.each(function() {
                    var name = $(this).attr('name');
                    var id = $(this).attr('id');
                    $("#" + id).ddslick({
                        width: '100%',
                        imagePosition: "left",
                        onSelected: function(selectedData) {
                            $("#" + id + " .dd-selected-value").prop('name', name);
                        }
                    });
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- slider range  -------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_sliderRange: function() {
            var $slider_range = $(".slider-range");
            if ($slider_range.length > 0) {
                $slider_range.each(function() {
                    var id = $(this).attr('id');
                    var target_id = $(this).data('target');
                    $("#" + target_id).slider({
                        range: "max",
                        min: 2001,
                        max: 2016,
                        value: 2010,
                        slide: function(event, ui) {
                            $("#" + id).val(ui.value);
                        }
                    });
                    $("#" + id).val($("#" + target_id).slider("value"));
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Preloader  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_preLoaderClickDisable: function() {
            var $preloader = $('#preloader');
            $preloader.children('#disable-preloader').on('click', function(e) {
                $preloader.fadeOut();
                return false;
            });
        },

        TM_preLoaderOnLoad: function() {
            var $preloader = $('#preloader');
            if ($preloader.length > 0) {
                $preloader.delay(200).fadeOut('slow');
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------------- Platform detect  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_platformDetect: function() {
            if (THEMEMASCOT.isMobile.any()) {
                $html.addClass("mobile");
            } else {
                $html.addClass("no-mobile");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Hash Forwarding  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_hashForwarding: function() {
            if (window.location.hash) {
                var hash_offset = $(window.location.hash).offset().top;
                $("html, body").animate({
                    scrollTop: hash_offset
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------- Background image, color ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_customDataAttributes: function() {
            $('[data-tm-bg-color]').each(function() {
                $(this).css("cssText", "background: " + $(this).data("tm-bg-color") + " !important;");
            });
            $('[data-tm-bg-img]').each(function() {
                $(this).css('background-image', 'url(' + $(this).data("tm-bg-img") + ')');
            });
            $('[data-tm-text-color]').each(function() {
                $(this).css('color', $(this).data("tm-text-color"));
            });
            $('[data-tm-font-size]').each(function() {
                $(this).css('font-size', $(this).data("tm-font-size"));
            });
            $('[data-tm-opacity]').each(function() {
                $(this).css('opacity', $(this).data("tm-opacity"));
            });
            $('[data-tm-height]').each(function() {
                $(this).css('height', $(this).data("tm-height"));
            });
            $('[data-tm-width]').each(function() {
                $(this).css('width', $(this).data("tm-width"));
            });
            $('[data-tm-border]').each(function() {
                $(this).css('border', $(this).data("tm-border"));
            });
            $('[data-tm-margin-top]').each(function() {
                $(this).css('margin-top', $(this).data("tm-margin-top"));
            });
            $('[data-tm-margin-right]').each(function() {
                $(this).css('margin-right', $(this).data("tm-margin-right"));
            });
            $('[data-tm-margin-bottom]').each(function() {
                $(this).css('margin-bottom', $(this).data("tm-margin-bottom"));
            });
            $('[data-tm-margin-left]').each(function() {
                $(this).css('margin-left', $(this).data("tm-margin-left"));
            });
        },



        /* ---------------------------------------------------------------------- */
        /* -------------------------- Background Parallax ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_parallaxBgInit: function() {
            if (!THEMEMASCOT.isMobile.any() && $window.width() >= 800) {
                $('.parallax').each(function() {
                    var data_parallax_ratio = ($(this).data("parallax-ratio") === undefined) ? '0.5' : $(this).data("parallax-ratio");
                    $(this).parallax("50%", data_parallax_ratio);
                });
            } else {
                $('.parallax').addClass("mobile-parallax");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Home Resize Fullscreen ------------------- */
        /* ---------------------------------------------------------------------- */
        TM_resizeFullscreen: function() {
            var $fullscreen = $('.section-fullscreen');
            if ($window.width() >= 991) {
                var windowHeight = $window.height();
                $fullscreen.height(windowHeight);
            } else {
                $fullscreen.css('height', 'auto');
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Magnific Popup ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_magnificPopup_lightbox: function() {

            var $image_popup_lightbox = $('.image-popup-lightbox');
            if ($image_popup_lightbox.length > 0) {
                $image_popup_lightbox.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
                    image: {
                        verticalFit: true
                    }
                });
            }

            var $image_popup_vertical_fit = $('.image-popup-vertical-fit');
            if ($image_popup_vertical_fit.length > 0) {
                $image_popup_vertical_fit.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    mainClass: 'mfp-img-mobile',
                    image: {
                        verticalFit: true
                    }
                });
            }

            var $image_popup_fit_width = $('.image-popup-fit-width');
            if ($image_popup_fit_width.length > 0) {
                $image_popup_fit_width.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    image: {
                        verticalFit: false
                    }
                });
            }

            var $image_popup_no_margins = $('.image-popup-no-margins');
            if ($image_popup_no_margins.length > 0) {
                $image_popup_no_margins.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    image: {
                        verticalFit: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300 // don't foget to change the duration also in CSS
                    }
                });
            }

            var $popup_gallery = $('.popup-gallery');
            if ($popup_gallery.length > 0) {
                $popup_gallery.magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                        }
                    }
                });
            }

            var $zoom_gallery = $('.zoom-gallery');
            if ($zoom_gallery.length > 0) {
                $zoom_gallery.magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    closeOnContentClick: false,
                    closeBtnInside: false,
                    mainClass: 'mfp-with-zoom mfp-img-mobile',
                    image: {
                        verticalFit: true,
                        titleSrc: function(item) {
                            return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                        }
                    },
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300, // don't foget to change the duration also in CSS
                        opener: function(element) {
                            return element.find('img');
                        }
                    }

                });
            }

            var $popup_yt_vimeo_gmap = $('.popup-youtube, .popup-vimeo, .popup-gmaps');
            if ($popup_yt_vimeo_gmap.length > 0) {
                $popup_yt_vimeo_gmap.magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,

                    fixedContentPos: false
                });
            }

            var $popup_with_zoom_anim = $('.popup-with-zoom-anim');
            if ($popup_with_zoom_anim.length > 0) {
                $popup_with_zoom_anim.magnificPopup({
                    type: 'inline',

                    fixedContentPos: false,
                    fixedBgPos: true,

                    overflowY: 'auto',

                    closeBtnInside: true,
                    preloader: false,

                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                });
            }

            var $popup_with_move_anim = $('.popup-with-move-anim');
            if ($popup_with_move_anim.length > 0) {
                $popup_with_move_anim.magnificPopup({
                    type: 'inline',

                    fixedContentPos: false,
                    fixedBgPos: true,

                    overflowY: 'auto',

                    closeBtnInside: true,
                    preloader: false,

                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-slide-bottom'
                });
            }

            var $ajaxload_popup = $('.ajaxload-popup');
            if ($ajaxload_popup.length > 0) {
                $ajaxload_popup.magnificPopup({
                    type: 'ajax',
                    alignTop: true,
                    overflowY: 'scroll', // as we know that popup content is tall we set scroll overflow by default to avoid jump
                    callbacks: {
                        parseAjax: function(mfpResponse) {
                            THEMEMASCOT.initialize.TM_sliderRange();
                            THEMEMASCOT.initialize.TM_ddslick();
                        }
                    }
                });
            }

            var $form_ajax_load = $('.form-ajax-load');
            if ($form_ajax_load.length > 0) {
                $form_ajax_load.magnificPopup({
                    type: 'ajax'
                });
            }

            var $popup_with_form = $('.popup-with-form');
            if ($popup_with_form.length > 0) {
                $popup_with_form.magnificPopup({
                    type: 'inline',
                    preloader: false,
                    focus: '#name',

                    mainClass: 'mfp-no-margins mfp-fade',
                    closeBtnInside: false,
                    fixedContentPos: true,

                    // When elemened is focused, some mobile browsers in some cases zoom in
                    // It looks not nice, so we disable it:
                    callbacks: {
                        beforeOpen: function() {
                            if ($window.width() < 700) {
                                this.st.focus = false;
                            } else {
                                this.st.focus = '#name';
                            }
                        }
                    }
                });
            }

            var $mfpLightboxAjax = $('[data-lightbox="ajax"]');
            if ($mfpLightboxAjax.length > 0) {
                $mfpLightboxAjax.magnificPopup({
                    type: 'ajax',
                    closeBtnInside: false,
                    callbacks: {
                        ajaxContentAdded: function(mfpResponse) {},
                        open: function() {},
                        close: function() {}
                    }
                });
            }

            //lightbox image
            var $mfpLightboxImage = $('[data-lightbox="image"]');
            if ($mfpLightboxImage.length > 0) {
                $mfpLightboxImage.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    image: {
                        verticalFit: true
                    }
                });
            }

            //lightbox gallery
            var $mfpLightboxGallery = $('[data-lightbox="gallery"]');
            if ($mfpLightboxGallery.length > 0) {
                $mfpLightboxGallery.each(function() {
                    var element = $(this);
                    element.magnificPopup({
                        delegate: 'a[data-lightbox="isotope-item"]',
                        type: 'image',
                        closeOnContentClick: true,
                        closeBtnInside: false,
                        fixedContentPos: true,
                        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                        image: {
                            verticalFit: true
                        },
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                        },
                        zoom: {
                            enabled: true,
                            duration: 300, // don't foget to change the duration also in CSS
                            opener: function(element) {
                                return element.find('img');
                            }
                        }

                    });
                });
            }

            //lightbox iframe
            var $mfpLightboxIframe = $('[data-lightbox="iframe"]');
            if ($mfpLightboxIframe.length > 0) {
                $mfpLightboxIframe.magnificPopup({
                    disableOn: 600,
                    type: 'iframe',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            //lightbox inline
            var $mfpLightboxInline = $('[data-lightbox="inline"]');
            if ($mfpLightboxInline.length > 0) {
                $mfpLightboxInline.magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-no-margins mfp-zoom-in',
                    closeBtnInside: false,
                    fixedContentPos: true
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- lightbox popup ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_lightgallery_lightbox: function() {
            //lightgallery lightbox
            var $lightgallery_lightbox = $(".lightgallery-lightbox");
            if ($lightgallery_lightbox.length > 0) {
                $lightgallery_lightbox.lightGallery({
                    // Please read about gallery options here: http://sachinchoolur.github.io/lightGallery/docs/api.html
                    // lightgallery core 
                    selector: '.lightgallery-trigger',
                    mode: 'lg-fade', // Type of transition between images ('lg-fade' or 'lg-slide').
                    height: '100%', // Height of the gallery (ex: '100%' or '300px').
                    width: '100%', // Width of the gallery (ex: '100%' or '300px').
                    iframeMaxWidth: '100%', // Set maximum width for iframe.
                    loop: true, // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
                    speed: 600, // Transition duration (in ms).
                    closable: true, // Allows clicks on dimmer to close gallery.
                    escKey: true, // Whether the LightGallery could be closed by pressing the "Esc" key.
                    keyPress: true, // Enable keyboard navigation.
                    hideBarsDelay: 5000, // Delay for hiding gallery controls (in ms).
                    controls: true, // If false, prev/next buttons will not be displayed.
                    mousewheel: true, // Chane slide on mousewheel.
                    download: false, // Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers. If you want you can provide another url for download via data-download-url.
                    counter: true, // Whether to show total number of images and index number of currently displayed image.
                    swipeThreshold: 50, // By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
                    enableDrag: true, // Enables desktop mouse drag support.
                    enableTouch: true, // Enables touch support.

                    // thumbnial plugin
                    thumbnail: true, // Enable thumbnails for the gallery.
                    showThumbByDefault: true, // Show/hide thumbnails by default.
                    thumbMargin: 5, // Spacing between each thumbnails.
                    toogleThumb: true, // Whether to display thumbnail toggle button.
                    enableThumbSwipe: true, // Enables thumbnail touch/swipe support for touch devices.
                    exThumbImage: 'data-exthumbimage', // If you want to use external image for thumbnail, add the path of that image inside "data-" attribute and set value of this option to the name of your custom attribute.

                    // autoplay plugin
                    autoplay: false, // Enable gallery autoplay.
                    autoplayControls: true, // Show/hide autoplay controls.
                    pause: 6000, // The time (in ms) between each auto transition.
                    progressBar: true, // Enable autoplay progress bar.
                    fourceAutoplay: false, // If false autoplay will be stopped after first user action

                    // fullScreen plugin
                    fullScreen: true, // Enable/Disable fullscreen mode.

                    // zoom plugin
                    zoom: true, // Enable/Disable zoom option.
                    scale: 0.5, // Value of zoom should be incremented/decremented.
                    enableZoomAfter: 50, // Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.

                    // video options
                    videoMaxWidth: '1000px', // Set limit for video maximal width.

                    // Youtube video options
                    loadYoutubeThumbnail: true, // You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true.
                    youtubeThumbSize: 'default', // You can specify the thumbnail size by setting respective number: 0, 1, 2, 3, 'hqdefault', 'mqdefault', 'default', 'sddefault', 'maxresdefault'.
                    youtubePlayerParams: { // Change youtube player parameters: https://developers.google.com/youtube/player_parameters
                        modestbranding: 0,
                        showinfo: 1,
                        controls: 1
                    },

                    // Vimeo video options
                    loadVimeoThumbnail: true, // You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
                    vimeoThumbSize: 'thumbnail_medium', // Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'.
                    vimeoPlayerParams: { // Change vimeo player parameters: https://developer.vimeo.com/player/embedding#universal-parameters 
                        byline: 1,
                        portrait: 1,
                        title: 1,
                        color: 'CCCCCC',
                        autopause: 1
                    }

                });
            }
        },
        TM_lightgallery_lightbox_reset: function() {
            //lightgallery lightbox reset after ajaxload button
            var $loadmore_btn_lightgallery_lightbox = $(".tm-loadmore-btn-trigger-lightgallery");
            if ($loadmore_btn_lightgallery_lightbox.length > 0) {
                $loadmore_btn_lightgallery_lightbox.on('click', function(e) {
                    $(".lightgallery-lightbox").data("lightGallery").destroy(true);
                    THEMEMASCOT.initialize.TM_lightgallery_lightbox();
                });
            }
        },
        TM_prettyPhoto_lightbox: function() {
            //prettyPhoto lightbox
            var $pretty_photo_lightbox = $("a[data-rel^='prettyPhoto']");
            if ($pretty_photo_lightbox.length > 0) {
                $pretty_photo_lightbox.prettyPhoto({
                    hook: 'data-rel',
                    animation_speed: 'normal',
                    theme: 'dark_square',
                    slideshow: 3000,
                    autoplay_slideshow: false,
                    social_tools: false
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Nivo Lightbox ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_nivolightbox: function() {
            var $nivo_lightbox = $('a[data-lightbox-gallery]');
            if ($nivo_lightbox.length > 0) {
                $nivo_lightbox.nivoLightbox({
                    effect: 'fadeScale',
                    afterShowLightbox: function() {
                        var $nivo_iframe = $('.nivo-lightbox-content > iframe');
                        if ($nivo_iframe.length > 0) {
                            var src = $nivo_iframe.attr('src');
                            $nivo_iframe.attr('src', src + '?autoplay=1');
                        }
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Fit Vids ------------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_fitVids: function() {
            $body.fitVids();
        },



        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Wow initialize  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_wow: function() {
            var wow = new WOW({
                mobile: false // trigger animations on mobile devices (default is true)
            });
            wow.init();
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- YT Player for Video -------------------- */
        /* ---------------------------------------------------------------------- */
        TM_YTPlayer: function() {
            var $ytube_player = $(".ytplayer");
            if ($ytube_player.length > 0) {
                $ytube_player.mb_YTPlayer();
            }
        },


        /* ---------------------------------------------------------------------- */
        /* --------------- Custom Columns Holder Responsive Style --------------- */
        /* ---------------------------------------------------------------------- */
        TM_CustomColumnsHolderResponsiveStyler: function() {

            var customColumnsHolder = $('.tm-sc-custom-columns-holder');

            if (customColumnsHolder.length) {
                customColumnsHolder.each(function() {
                    var thisElementsHolder = $(this),
                        customColumnsHolderItem = thisElementsHolder.children('.tm-sc-custom-columns-holder-item'),
                        style = '',
                        responsiveStyle = '';

                    customColumnsHolderItem.each(function() {
                        var thisItem = $(this),
                            itemClass = '',

                            down_1199 = '',
                            down_991 = '',
                            down_767 = '',
                            down_575 = '',

                            only_992_1199 = '',
                            only_768_991 = '',
                            only_576_767 = '',

                            up_1200 = '',
                            up_992 = '',
                            up_768 = '',
                            up_576 = '';

                        if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
                            itemClass = thisItem.data('item-class');
                        }


                        //media-breakpoint-down
                        if (typeof thisItem.data('1199-down') !== 'undefined' && thisItem.data('1199-down') !== false) {
                            down_1199 = thisItem.data('1199-down');
                        }
                        if (typeof thisItem.data('991-down') !== 'undefined' && thisItem.data('991-down') !== false) {
                            down_991 = thisItem.data('991-down');
                        }
                        if (typeof thisItem.data('767-down') !== 'undefined' && thisItem.data('767-down') !== false) {
                            down_767 = thisItem.data('767-down');
                        }
                        if (typeof thisItem.data('575-down') !== 'undefined' && thisItem.data('575-down') !== false) {
                            down_575 = thisItem.data('575-down');
                        }


                        //media-breakpoint-only
                        if (typeof thisItem.data('992-1199') !== 'undefined' && thisItem.data('992-1199') !== false) {
                            only_992_1199 = thisItem.data('992-1199');
                        }
                        if (typeof thisItem.data('768-991') !== 'undefined' && thisItem.data('768-991') !== false) {
                            only_768_991 = thisItem.data('768-991');
                        }
                        if (typeof thisItem.data('576-767') !== 'undefined' && thisItem.data('576-767') !== false) {
                            only_576_767 = thisItem.data('576-767');
                        }


                        //media-breakpoint-up
                        if (typeof thisItem.data('1200-up') !== 'undefined' && thisItem.data('1200-up') !== false) {
                            up_1200 = thisItem.data('1200-up');
                        }
                        if (typeof thisItem.data('992-up') !== 'undefined' && thisItem.data('992-up') !== false) {
                            up_992 = thisItem.data('992-up');
                        }
                        if (typeof thisItem.data('768-up') !== 'undefined' && thisItem.data('768-up') !== false) {
                            up_768 = thisItem.data('768-up');
                        }
                        if (typeof thisItem.data('576-up') !== 'undefined' && thisItem.data('576-up') !== false) {
                            up_576 = thisItem.data('576-up');
                        }



                        if (down_1199.length || down_991.length || down_767.length || down_575.length || only_992_1199.length || only_768_991.length || only_576_767.length || up_1200.length || up_992.length || up_768.length || up_576.length) {

                            if (down_1199.length) {
                                responsiveStyle += "@media (max-width: 1199.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + down_1199 + " !important; } }";
                            }
                            if (down_991.length) {
                                responsiveStyle += "@media (max-width: 991.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + down_991 + " !important; } }";
                            }
                            if (down_767.length) {
                                responsiveStyle += "@media (max-width: 767.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + down_767 + " !important; } }";
                            }
                            if (down_575.length) {
                                responsiveStyle += "@media (max-width: 575.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + down_575 + " !important; } }";
                            }



                            if (only_992_1199.length) {
                                responsiveStyle += "@media (min-width: 992px) and (max-width: 1199.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + only_992_1199 + " !important; } }";
                            }
                            if (only_768_991.length) {
                                responsiveStyle += "@media (min-width: 768px) and (max-width: 991.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + only_768_991 + " !important; } }";
                            }
                            if (only_576_767.length) {
                                responsiveStyle += "@media (min-width: 576px) and (max-width: 767.98px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + only_576_767 + " !important; } }";
                            }



                            if (up_1200.length) {
                                responsiveStyle += "@media (min-width: 1200px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + up_1200 + " !important; } }";
                            }
                            if (up_992.length) {
                                responsiveStyle += "@media (min-width: 992px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + up_992 + " !important; } }";
                            }
                            if (up_768.length) {
                                responsiveStyle += "@media (min-width: 768px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + up_768 + " !important; } }";
                            }
                            if (up_576.length) {
                                responsiveStyle += "@media (min-width: 576px) {.tm-sc-custom-columns-holder-item .item-content." + itemClass + " { padding: " + up_576 + " !important; } }";
                            }
                        }
                    });

                    if (responsiveStyle.length) {
                        style = '<style type="text/css" data-type="mascot_style_handle_shortcodes_custom_css">' + responsiveStyle + '</style>';
                    }

                    if (style.length) {
                        $('head').append(style);
                    }
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ---------------------------- equalHeights ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_equalHeightDivs: function() {
            /* equal heigh */
            var $equal_height = $('.equal-height');
            if ($equal_height.length > 0) {
                $equal_height.children('div').css('min-height', 'auto');
                if ($window.width() >= 768) {
                    $equal_height.equalHeights();
                } else {
                    $equal_height.css('height', 'auto');
                }
            }

            /* equal heigh inner div */
            var $equal_height_inner = $('.equal-height-inner');
            if ($equal_height_inner.length > 0) {
                $equal_height_inner.children('div').css('min-height', 'auto');
                $equal_height_inner.children('div').children('div').css('min-height', 'auto');
                $equal_height_inner.equalHeights();
                $equal_height_inner.children('div').each(function() {
                    if ($window.width() >= 768) {
                        $(this).children('div').css('min-height', $(this).css('min-height'));
                    } else {
                        $(this).children('div').css('height', 'auto');
                    }
                });
            }

            /* pricing-table equal heigh*/
            var $equal_height_pricing_table = $('.equal-height-pricing-table');
            if ($equal_height_pricing_table.length > 0) {
                $equal_height_pricing_table.children('div').css('min-height', 'auto');
                $equal_height_pricing_table.children('div').children('div').css('min-height', 'auto');
                $equal_height_pricing_table.equalHeights();
                $equal_height_pricing_table.children('div').each(function() {
                    $(this).children('div').css('min-height', $(this).css('min-height'));
                });
            }
        }

    };


    THEMEMASCOT.header = {

        init: function() {

            var t = setTimeout(function() {
                THEMEMASCOT.header.TM_VC_RTL();
                THEMEMASCOT.header.TM_VC_Vertical();
                THEMEMASCOT.header.TM_VC_Boxed_Fullwidth_Fit_Container();
                THEMEMASCOT.header.TM_verticalNavHeaderPadding();
                THEMEMASCOT.header.TM_Memuzord_Megamenu();
                THEMEMASCOT.header.TM_TopNav_Dropdown_Position();
                THEMEMASCOT.header.TM_fullscreenMenu();
                THEMEMASCOT.header.TM_sidePanelReveal();
                THEMEMASCOT.header.TM_scroolToTopOnClick();
                THEMEMASCOT.header.TM_scrollToFixed();
                THEMEMASCOT.header.TM_topnavAnimate();
                THEMEMASCOT.header.TM_scrolltoTarget();
                THEMEMASCOT.header.TM_navLocalScorll();
                THEMEMASCOT.header.TM_menuCollapseOnClick();
                THEMEMASCOT.header.TM_homeParallaxFadeEffect();
                THEMEMASCOT.header.TM_topsearch_toggle();
            }, 0);

        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- VC RTL Support ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_VC_RTL: function() {
            if (jQuery('html').attr('dir') == 'rtl') {
                jQuery('[data-vc-full-width="true"]').each(function(i, v) {
                    var $this = jQuery(this);
                    setTimeout(function() {
                        //$this.css('right' , $this.css('left') ).css( 'left' , 'auto');
                    }, 1000);
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------- VC Vertical Support -------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_VC_Vertical: function() {
            if ($body.hasClass("tm-vertical-nav") && $window.width() >= 1200) {
                $window.off("resize.vcRowBehaviour");
                jQuery('[data-vc-stretch-content="true"]').each(function(i, v) {
                    var $el = jQuery(this);
                    setTimeout(function() {
                        var $el_full = $el.next(".vc_row-full-width");
                        if ($el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")), $el_full.length) {
                            var padding, paddingRight, el_margin_left = parseInt($el.css("margin-left"), 10),
                                el_margin_right = parseInt($el.css("margin-right"), 10),
                                offset = 0 - $el_full.offset().left - el_margin_left,
                                width = $(window).width();

                            var header_width = $header.css('width');
                            header_width = parseInt(header_width, 10);
                            header_width = Math.abs(header_width);

                            //now fix width for vertical nav
                            width = width - header_width;
                            offset = offset + header_width;

                            if ("rtl" === $el.css("direction") && (offset -= $el_full.width(), offset += width, offset += el_margin_left, offset += el_margin_right),
                                $el.css({
                                    position: "relative",
                                    left: offset,
                                    "box-sizing": "border-box",
                                    width: width
                                }), !$el.data("vcStretchContent")) "rtl" === $el.css("direction") ? ((padding = offset) < 0 && (padding = 0), (paddingRight = offset) < 0 && (paddingRight = 0)) : ((padding = -1 * offset) < 0 && (padding = 0), (paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right) < 0 && (paddingRight = 0)), $el.css({
                                "padding-left": padding + "px",
                                "padding-right": paddingRight + "px"
                            });
                        }
                    }, 1000);
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- VC BOXED full-width Support ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_VC_Boxed_Fullwidth_Fit_Container: function() {
            if ($body.hasClass("tm-boxed-layout")) {
                jQuery('[data-vc-stretch-content="true"]').each(function(i, v) {
                    var $this = jQuery(this);
                    var padding_left_right = 15;
                    var left = $this.css('left');
                    left = parseInt(left, 10);
                    left = Math.abs(left) - padding_left_right;
                    $this.css('padding-left', left + 'px').css('padding-right', left + 'px');
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- menufullpage ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_fullscreenMenu: function() {
            var $menufullpage = $('.menu-full-page .fullpage-nav-toggle');
            if ($menufullpage.length > 0) {
                $menufullpage.menufullpage();
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------- Side Push Panel ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_sidePanelReveal: function() {
            if ($('.side-panel-trigger').length > 0) {
                $body.addClass("has-side-panel side-panel-right");
            }
            $('.side-panel-trigger').on('click', function(e) {
                $body.toggleClass("side-panel-open");
                if (THEMEMASCOT.isMobile.any()) {
                    $body.toggleClass("overflow-hidden");
                }
                return false;
            });

            $('.has-side-panel .side-panel-body-overlay').on('click', function(e) {
                $body.toggleClass("side-panel-open");
                return false;
            });

            //sitebar tree
            $('.side-panel-nav .nav .tree-toggler').on('click', function(e) {
                $(this).parent().children('ul.tree').toggle(300);
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- scrollToTop  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_scroolToTop: function() {
            if ($window.scrollTop() > 600) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        },

        TM_scroolToTopOnClick: function() {
            $document_body.on('click', '.scrollToTop', function(e) {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        },


        /* ---------------------------------------------------------------------------- */
        /* --------------------------- One Page Nav close on click -------------------- */
        /* ---------------------------------------------------------------------------- */
        TM_menuCollapseOnClick: function() {
            $document.on('click', '.onepage-nav a', function(e) {
                if (/#/.test(this.href)) {
                    if ($(this).find('.indicator').length == 0) {
                        $('.showhide').trigger('click');
                    }
                }
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------- Active Menu Item on Reaching Different Sections ---------- */
        /* ---------------------------------------------------------------------- */
        TM_activateMenuItemOnReach: function() {
            var $onepage_nav = $('.onepage-nav');
            if ($onepage_nav.length > 0) {
                var cur_pos = $window.scrollTop() + 2;
                var nav_height = $onepage_nav.outerHeight();
                $sections.each(function() {
                    var top = $(this).offset().top - nav_height - 80,
                        bottom = top + $(this).outerHeight();

                    if (cur_pos >= top && cur_pos <= bottom) {
                        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
                        $sections.removeClass('current').removeClass('active');

                        $onepage_nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current').addClass('active');
                    }

                    if (cur_pos <= nav_height && cur_pos >= 0) {
                        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
                        $onepage_nav.find('a[href="#header"]').parent().addClass('current').addClass('active');
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------- on click scrool to target with smoothness -------- */
        /* ---------------------------------------------------------------------- */
        TM_scrolltoTarget: function() {
            //jQuery for page scrolling feature - requires jQuery Easing plugin
            $('.smooth-scroll-to-target, .fullscreen-onepage-nav a').on('click', function(e) {
                e.preventDefault();

                var $anchor = $(this);

                var $hearder_top = $('.header .header-nav');
                var hearder_top_offset = 0;
                if ($hearder_top[0]) {
                    hearder_top_offset = $hearder_top.outerHeight(true);
                } else {
                    hearder_top_offset = 0;
                }

                // if adminbar exist
                var $wpAdminBar = $('#wpadminbar');
                var wpAdminBar_height = 0;
                if ($wpAdminBar.length) {
                    wpAdminBar_height = $wpAdminBar.height();
                }

                //for vertical nav, offset 0
                if ($body.hasClass("tm-vertical-nav")) {
                    hearder_top_offset = 0;
                }

                var top = $($anchor.attr('href')).offset().top - hearder_top_offset - wpAdminBar_height;
                $('html, body').stop().animate({
                    scrollTop: top
                }, 1500, 'easeInOutExpo');

            });
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Scroll navigation ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_navLocalScorll: function() {
            var data_offset = -60;
            var $local_scroll = $("#header .onepage-nav");
            if ($local_scroll.length > 0) {
                $local_scroll.localScroll({
                    target: "body",
                    duration: 400,
                    offset: data_offset,
                    easing: "easeInOutExpo"
                });
            }

            var $local_scroll_other = $("#menuzord-side-panel .menuzord-menu, #menuzord-verticalnav .menuzord-menu, #fullpage-nav");
            if ($local_scroll_other.length > 0) {
                $local_scroll_other.localScroll({
                    target: "body",
                    duration: 400,
                    offset: 0,
                    easing: "easeInOutExpo"
                });
            }
        },

        /* ---------------------------------------------------------------------------- */
        /* ------------------------------- scroll to fixed ---------------------------- */
        /* ---------------------------------------------------------------------------- */
        TM_scrollToFixed: function() {
            $('.navbar-scrolltofixed').scrollToFixed();
            $('.scrolltofixed').scrollToFixed({
                marginTop: $header.find('.header-nav').outerHeight(true) + 10,
                limit: function() {
                    var limit = $('#footer').offset().top - $(this).outerHeight(true);
                    return limit;
                }
            });
            $('.sidebar-scrolltofixed').scrollToFixed({
                marginTop: $header.find('.header-nav').outerHeight() + 20,
                limit: function() {
                    var limit = $('#footer').offset().top - $('#sidebar').outerHeight() - 20;
                    return limit;
                }
            });
        },

        /* ---------------------------------------------------------------------------- */
        /* ------------------------------- Vertical Nav ------------------------------- */
        /* ---------------------------------------------------------------------------- */
        TM_verticalNavHeaderPadding: function() {
            if ($body.hasClass("tm-vertical-nav")) {
                var $header_nav_wrapper = $('#header .header-nav-wrapper');
                var $header_nav_wrapper_menuzordmenu = $('#header .header-nav-wrapper .menuzord-menu');
                if ($header_nav_wrapper.css("position") === "fixed" && $window.width() <= 1199) {

                    var header_nav_wrapper_menuzordmenu_height = 0;
                    if ($($header_nav_wrapper_menuzordmenu).is(":visible")) {
                        header_nav_wrapper_menuzordmenu_height = $header_nav_wrapper_menuzordmenu.height();
                    }

                    $body.css('padding-top', $header_nav_wrapper.height() - header_nav_wrapper_menuzordmenu_height - admin_bar_height());

                } else {
                    $body.css('padding-top', 0);
                }
            }
        },

        /* ----------------------------------------------------------------------------- */
        /* --------------------------- Menuzord - Responsive Megamenu ------------------ */
        /* ----------------------------------------------------------------------------- */
        TM_menuzord: function() {

            var $menuzord = $("#menuzord");
            if ($menuzord.length > 0) {
                $menuzord.menuzord({
                    align: "left",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $menuzord_right = $("#menuzord-right");
            if ($menuzord_right.length > 0) {
                $menuzord_right.menuzord({
                    align: "right",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $menuzord_side_panel = $("#menuzord-side-panel");
            if ($menuzord_side_panel.length > 0) {
                $menuzord_side_panel.menuzord({
                    align: "right",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $menuzord_vertical_nav = $("#menuzord-verticalnav");
            if ($menuzord_vertical_nav.length > 0) {
                $menuzord_vertical_nav.menuzord({
                    align: "right",
                    effect: "slide",
                    animation: "none",
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            //Main Top Primary Nav
            var $menuzord_top_main_nav = $("#top-primary-nav");
            var $menuzord_top_main_nav_menuzord_menu = $menuzord_top_main_nav.find('.menuzord-menu');
            if ($menuzord_top_main_nav.length > 0 && $menuzord_top_main_nav_menuzord_menu.length) {
                var effect = ($menuzord_top_main_nav.data("effect") === undefined) ? "slide" : $menuzord_top_main_nav.data("effect");
                var animation = ($menuzord_top_main_nav.data("animation") === undefined) ? "none" : $menuzord_top_main_nav.data("animation");
                var align = ($menuzord_top_main_nav.data("align") === undefined) ? "right" : $menuzord_top_main_nav.data("align");
                $menuzord_top_main_nav.menuzord({
                    align: align,
                    effect: effect,
                    animation: animation,
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            var $nav_items = $('#top-primary-nav  #main-nav').clone();
            $('#top-primary-nav-clone #main-nav-clone').append($nav_items);

            //Clone Top Primary Nav
            var $menuzord_top_main_nav_clone = $("#top-primary-nav-clone");
            var $menuzord_top_main_nav_clone_menuzord_menu = $menuzord_top_main_nav_clone.find('.menuzord-menu');
            if ($menuzord_top_main_nav_clone.length > 0 && $menuzord_top_main_nav_clone_menuzord_menu.length) {
                var effect = ($menuzord_top_main_nav_clone.data("effect") === undefined) ? "slide" : $menuzord_top_main_nav_clone.data("effect");
                var animation = ($menuzord_top_main_nav_clone.data("animation") === undefined) ? "none" : $menuzord_top_main_nav_clone.data("animation");
                var align = ($menuzord_top_main_nav_clone.data("align") === undefined) ? "right" : $menuzord_top_main_nav_clone.data("align");
                $menuzord_top_main_nav_clone.menuzord({
                    align: align,
                    effect: effect,
                    animation: animation,
                    indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                    indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                });
            }

            //If click on Top Primary Nav Show Hide => it will show clone mobile nav
            $menuzord_top_main_nav.on('click', '.showhide', function(e) {
                $menuzord_top_main_nav_clone.find('.showhide').trigger('click');
            });


        },


        /* ----------------------------------------------------------------------------- */
        /* ------------------------- Menuzord -  Megamenu Dynamic Left ----------------- */
        /* ----------------------------------------------------------------------------- */
        TM_Memuzord_Megamenu: function() {
            if ($window.width() >= 1200) {
                $('.menuzord-menu').children('.menu-item').find('.megamenu').each(function() {
                    var $item = $(this);
                    if ($item.length > 0) {

                        $item.css('left', 0);
                        $item.css('right', 'auto');

                        if ($item.closest('.container').length) {
                            var $container = $item.closest('.container');
                        } else if ($item.closest('.container-fluid').length) {
                            var $container = $item.closest('.container-fluid');
                        } else {
                            var $container = $item.closest('.header-nav-container');
                        }

                        var container_width = $container.width(),
                            container_padding_left = parseInt($container.css('padding-left')),
                            container_padding_right = parseInt($container.css('padding-right')),
                            parent_width = $item.closest('.menuzord-menu').outerWidth();

                        var megamenu_width = $item.outerWidth();

                        if (megamenu_width > parent_width) {
                            var left = -(megamenu_width - parent_width) * 0.5;
                        } else {
                            var left = 0;
                        }

                        var container_offset = $container.offset();
                        var megamenu_offset = $item.offset();

                        left = -(megamenu_offset.left - container_offset.left - container_padding_left);

                        if ($item.hasClass('megamenu-three-quarter-width')) {
                            container_width = container_width * 0.75;
                            left = $item.css('left');
                        } else if ($item.hasClass('megamenu-half-width')) {
                            container_width = container_width * 0.5;
                        } else if ($item.hasClass('megamenu-quarter-width')) {
                            container_width = container_width * 0.25;
                            left = $item.css('left');
                        }

                        if ($item.hasClass('megamenu-fullwidth')) {
                            //do nothing
                        } else if ($item.hasClass('megamenu-position-left')) {
                            left = 0;
                        } else if ($item.hasClass('megamenu-position-center')) {
                            parent_width = $item.closest('.menu-item-has-children').outerWidth();
                            left = -(megamenu_width - parent_width) * 0.5;
                            $item.css('right', 'auto');
                        } else if ($item.hasClass('megamenu-position-right')) {
                            left = 'auto';
                            $item.css('right', 0);
                        }


                        $item.css('width', container_width);
                        $item.css('left', left);
                    }
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* --------------------------- Waypoint Top Nav Sticky ------------------ */
        /* ---------------------------------------------------------------------- */
        TM_TopNav_Dropdown_Position: function() {
            if ($window.width() >= 1200) {
                var $top_primary_nav = $('#top-primary-nav');
                var menuItems = $top_primary_nav.find(".menuzord-menu > .menu-item.menu-item-has-children");
                menuItems.each(function(i) {
                    var $this = $(this);

                    var browserWidth = $top_primary_nav.find(".menuzord-menu").width(); // 16 is width of scroll bar
                    var menuItemPosition = $this.position().left;
                    var dropdownMenuWidth = $this.find('.dropdown').width();

                    var menuItemFromLeft = 0;
                    if ($body.hasClass("tm-boxed-layout")) {
                        menuItemFromLeft = qodef.boxedLayoutWidth - (menuItemPosition - (browserWidth - qodef.boxedLayoutWidth) / 2);
                    } else {
                        menuItemFromLeft = browserWidth - menuItemPosition;
                    }

                    var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true
                    if ($this.find('li.menu-item-has-children').length > 0) {
                        dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
                    }

                    if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
                        $(this).find('.dropdown').addClass('dropdown-right-zero');
                        $this.find('li.menu-item-has-children').find('.dropdown').addClass('dropdown-left');
                    }

                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Waypoint Top Nav Sticky ------------------ */
        /* ---------------------------------------------------------------------- */
        TM_topnavAnimate: function() {
            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated").removeClass("animated-active");
            } else {
                $(".navbar-sticky-animated").addClass("animated-active");
            }

            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated .header-nav-wrapper .container, .navbar-sticky-animated .header-nav-wrapper .container-fluid").removeClass("add-padding");
            } else {
                $(".navbar-sticky-animated .header-nav-wrapper .container, .navbar-sticky-animated .header-nav-wrapper .container-fluid").addClass("add-padding");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------- home section on scroll parallax & fade -------------- */
        /* ---------------------------------------------------------------------- */
        TM_homeParallaxFadeEffect: function() {
            if ($window.width() >= 1200) {
                var scrolled = $window.scrollTop();
                $('.content-fade-effect .home-content .home-text').css('padding-top', (scrolled * 0.0610) + '%').css('opacity', 1 - (scrolled * 0.00120));
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Top search toggle  ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_topsearch_toggle: function() {
            $document_body.on('click', '#top-search-toggle', function(e) {
                e.preventDefault();
                $('.search-form-wrapper.toggle').toggleClass('active');
                return false;
            });
        }

    };

    THEMEMASCOT.widget = {

        init: function() {

            var t = setTimeout(function() {
                THEMEMASCOT.widget.TM_shopClickEvents();
                THEMEMASCOT.widget.TM_masonryIsotop();
                THEMEMASCOT.widget.TM_pieChart();
                THEMEMASCOT.widget.TM_progressBar();
                THEMEMASCOT.widget.TM_funfact();
                THEMEMASCOT.widget.TM_instagramFeed();
                THEMEMASCOT.widget.TM_jflickrfeed();
                THEMEMASCOT.widget.TM_accordion_toggles();
                THEMEMASCOT.widget.TM_tooltip();
                THEMEMASCOT.widget.TM_countDownTimer();
            }, 0);

        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Shop Plus Minus ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_shopClickEvents: function() {
            $document_body.on('click', '.quantity .plus', function(e) {
                var currentVal = parseInt($(this).parent().children(".qty").val(), 10);
                if (!isNaN(currentVal)) {
                    $(this).parent().children(".qty").val(currentVal + 1);
                }
                $('.shop_table.cart').find('button[name="update_cart"]').removeAttr("disabled");
                return false;
            });

            $document_body.on('click', '.quantity .minus', function(e) {
                var currentVal = parseInt($(this).parent().children(".qty").val(), 10);
                if (!isNaN(currentVal) && currentVal > 0) {
                    $(this).parent().children(".qty").val(currentVal - 1);
                }
                $('.shop_table.cart').find('button[name="update_cart"]').removeAttr("disabled");
                return false;
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Masonry Isotope ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_masonryIsotop: function() {
            //isotope firsttime loading
            if ($gallery_isotope.length > 0) {
                $gallery_isotope.each(function() {
                    var $each_istope = $(this);
                    $each_istope.imagesLoaded(function() {
                        if ($each_istope.hasClass("masonry")) {
                            $each_istope.isotope({
                                isOriginLeft: THEMEMASCOT.isLTR.check(),
                                itemSelector: '.isotope-item',
                                layoutMode: "masonry",
                                masonry: {
                                    columnWidth: '.isotope-item-sizer'
                                },
                                getSortData: {
                                    name: function(itemElem) {
                                        return $(itemElem).find('.title').text();
                                    },
                                    date: '[data-date]',
                                },
                                filter: "*"
                            });
                        } else {
                            $each_istope.isotope({
                                isOriginLeft: THEMEMASCOT.isLTR.check(),
                                itemSelector: '.isotope-item',
                                layoutMode: "fitRows",
                                getSortData: {
                                    name: function(itemElem) {
                                        return $(itemElem).find('.title').text();
                                    },
                                    date: '[data-date]',
                                },
                                filter: "*"
                            });
                        }
                    });

                    //search for isotope with single item and add a class to remove left right padding.
                    var count = $each_istope.find('.isotope-item:not(.isotope-item-sizer)').length;
                    if (count == 1) {
                        $each_istope.addClass('isotope-layout-single-item');
                    }
                });
            }

            //isotope filter
            $('.isotope-layout-filter').on('click', 'a', function(e) {
                var $this = $(this);
                var $this_parent = $this.parent('div');
                $this.addClass('active').siblings().removeClass('active');

                var fselector = $this.data('filter');
                var linkwith = $this_parent.data('link-with');
                if ($('#' + linkwith).hasClass("masonry")) {
                    $('#' + linkwith).isotope({
                        isOriginLeft: THEMEMASCOT.isLTR.check(),
                        itemSelector: '.isotope-item',
                        layoutMode: "masonry",
                        masonry: {
                            columnWidth: '.isotope-item-sizer'
                        },
                        filter: fselector
                    });
                } else {
                    $('#' + linkwith).isotope({
                        isOriginLeft: THEMEMASCOT.isLTR.check(),
                        itemSelector: '.isotope-item',
                        layoutMode: "fitRows",
                        filter: fselector
                    });
                }
                return false;
            });

            //isotope sorter
            $('.isotope-layout-sorter').on('click', 'a', function(e) {
                var $this = $(this);
                var $this_parent = $this.parent('div');
                $this.addClass('active').siblings().removeClass('active');

                var sortby = $this.data('sortby');
                var linkwith = $this_parent.data('link-with');
                if (sortby === "shuffle") {
                    $('#' + linkwith).isotope('shuffle');
                } else {
                    $('#' + linkwith).isotope({
                        isOriginLeft: THEMEMASCOT.isLTR.check(),
                        sortBy: sortby
                    });
                }
                return false;
            });

        },


        TM_isotopeGridRearrange: function() {
            if ($gallery_isotope.hasClass("masonry")) {
                $gallery_isotope.isotope({
                    isOriginLeft: THEMEMASCOT.isLTR.check(),
                    itemSelector: '.isotope-item',
                    layoutMode: "masonry"
                });
            } else {
                $gallery_isotope.isotope({
                    isOriginLeft: THEMEMASCOT.isLTR.check(),
                    itemSelector: '.isotope-item',
                    layoutMode: "fitRows"
                });
            }
        },

        TM_isotopeGridShuffle: function() {
            $gallery_isotope.isotope('shuffle');
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- CountDown ------------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_finalCountdown: function() {},
        TM_countDownTimer: function() {
            //Modern Circular
            var $timer_modern_circular = $('.final-countdown-modern-circular .countdown');
            if ($timer_modern_circular.length > 0) {
                $timer_modern_circular.each(function() {
                    var $this = $(this);

                    var borderwidth = $this.data('borderwidth');
                    var bordercolor_second = $this.data('bordercolor-second');
                    var bordercolor_minutes = $this.data('bordercolor-minutes');
                    var bordercolor_hours = $this.data('bordercolor-hours');
                    var bordercolor_days = $this.data('bordercolor-days');

                    var defaults = {
                        start: undefined,
                        end: undefined,
                        now: undefined,
                        selectors: {
                            value_seconds: '.clock-seconds .val',
                            canvas_seconds: 'canvas-seconds',

                            value_minutes: '.clock-minutes .val',
                            canvas_minutes: 'canvas-minutes',

                            value_hours: '.clock-hours .val',
                            canvas_hours: 'canvas-hours',

                            value_days: '.clock-days .val',
                            canvas_days: 'canvas-days'
                        },
                        seconds: {
                            borderColor: bordercolor_second,
                            borderWidth: borderwidth
                        },
                        minutes: {
                            borderColor: bordercolor_minutes,
                            borderWidth: borderwidth
                        },
                        hours: {
                            borderColor: bordercolor_hours,
                            borderWidth: borderwidth
                        },
                        days: {
                            borderColor: bordercolor_days,
                            borderWidth: borderwidth
                        }
                    };
                    $this.final_countdown(defaults);
                });
            }


            //Basic coupon site
            var $timer_smart_style = $('.final-countdown-smart-style .countdown-timer');
            if ($timer_smart_style.length > 0) {
                $timer_smart_style.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');


                    var word_hr = $this.data('word-hr');
                    var word_min = $this.data('word-min');
                    var word_sec = $this.data('word-sec');
                    var word_days = $this.data('word-days');

                    var str = '<div class="counter">' +
                        '<span class="value">%D</span>' +
                        '<span class="label">' + word_days + '</span>' +
                        '</div>' +
                        '<div class="counter">' +
                        '<span class="value">%H</span>' +
                        '<span class="label">' + word_hr + '</span>' +
                        '</div>' +
                        '<div class="counter">' +
                        '<span class="value">%M</span>' +
                        '<span class="label">' + word_min + '</span>' +
                        '</div>' +
                        '<div class="counter">' +
                        '<span class="value">%S</span>' +
                        '<span class="label">' + word_sec + '</span>' +
                        '</div>';

                    $this.countdown(future_date, function(event) {
                        var $this = $(this).html(event.strftime(str));
                    });
                });
            }


            //Advanced coupon site
            var $timer_advanced_coupon = $('.final-countdown-advanced-coupon .countdown-container');
            if ($timer_advanced_coupon.length > 0) {
                $timer_advanced_coupon.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');
                    var word_weeks = $this.data('word-weeks');
                    var word_days = $this.data('word-days');

                    $this.countdown(future_date)
                        .on('update.countdown', function(event) {
                            if (showtime) {
                                var format = '%H:%M:%S';
                            } else {
                                var format = '';
                            }
                            if (event.offset.totalDays > 0) {
                                format = '<span>%-d</span> ' + word_days + ' ' + format;
                            }
                            if (event.offset.weeks > 0) {
                                format = '<span>%-w</span> ' + word_weeks + ' ' + format;
                            }
                            $(this).html(event.strftime(format));
                        })
                        .on('finish.countdown', function(event) {
                            $(this).html('This offer has expired!')
                                .parent().addClass('disabled');

                        });
                });
            }


            //Basic coupon site
            var $timer_basic_coupon = $('.final-countdown-basic-coupon .countdown-container');
            if ($timer_basic_coupon.length > 0) {
                $timer_basic_coupon.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');
                    var word_days = $this.data('word-days');

                    $this.countdown(future_date, function(event) {
                        if (showtime) {
                            var hour_format = ' %H:%M:%S';
                        } else {
                            var hour_format = '';
                        }
                        $(this).html(event.strftime('<span>%D</span> ' + word_days + '' + hour_format));
                    });
                });
            }


            //Days Offsets
            var $timer_days_offset = $('.final-countdown-days-offsets .countdown-container');
            if ($timer_days_offset.length > 0) {
                $timer_days_offset.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');

                    var word_hr = $this.data('word-hr');
                    var word_min = $this.data('word-min');
                    var word_sec = $this.data('word-sec');
                    var word_days = $this.data('word-days');

                    $this.countdown(future_date, function(event) {
                        if (showtime) {
                            var hour_format = ' <span>%H</span> ' + word_hr + ' ' +
                                '<span>%M</span> ' + word_min + ' ' +
                                '<span>%S</span> ' + word_sec + '';
                        } else {
                            var hour_format = '';
                        }
                        var $this = $(this).html(event.strftime('' +
                            '<span>%D</span> ' + word_days + '' + hour_format));
                    });
                });
            }


            // Sum of total hours remaining
            var $timer_sum_hours_remaining = $('.final-countdown-sum-hours-remaining .countdown-container');
            if ($timer_sum_hours_remaining.length > 0) {
                $timer_sum_hours_remaining.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');

                    var word_hr = $this.data('word-hr');
                    var word_min = $this.data('word-min');
                    var word_sec = $this.data('word-sec');

                    $this.countdown(future_date, function(event) {
                        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
                        var hour_format = ' <span> ' + totalHours + '</span> ' + word_hr + ' ' +
                            '<span>%M</span> ' + word_min + ' ' +
                            '<span>%S</span> ' + word_sec + '';
                        $(this).html(event.strftime(hour_format));
                    });
                });
            }


            //  Legacy style
            var $timer_legacy_style = $('.final-countdown-legacy-style .countdown-container');
            if ($timer_legacy_style.length > 0) {
                $timer_legacy_style.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');

                    var word_hr = $this.data('word-hr');
                    var word_min = $this.data('word-min');
                    var word_sec = $this.data('word-sec');
                    var word_weeks = $this.data('word-weeks');
                    var word_days = $this.data('word-days');

                    $this.countdown(future_date, function(event) {
                        if (showtime) {
                            var hour_format = ' <span>%H</span> ' + word_hr + ' ' +
                                '<span>%M</span> ' + word_min + ' ' +
                                '<span>%S</span> ' + word_sec + '';
                        } else {
                            var hour_format = '';
                        }
                        var $this = $(this).html(event.strftime('' +
                            '<span>%w</span> ' + word_weeks + ' ' +
                            '<span>%d</span> ' + word_days + '' + hour_format));
                    });
                });
            }


            //   Months offsets
            var $timer_months_offsets = $('.final-countdown-months-offsets .countdown-container');
            if ($timer_months_offsets.length > 0) {
                $timer_months_offsets.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');

                    var word_hr = $this.data('word-hr');
                    var word_min = $this.data('word-min');
                    var word_sec = $this.data('word-sec');
                    var word_month = $this.data('word-month');
                    var word_days = $this.data('word-days');

                    $this.countdown(future_date, function(event) {
                        if (showtime) {
                            var hour_format = ' <span>%H</span> ' + word_hr + ' ' +
                                '<span>%M</span> ' + word_min + ' ' +
                                '<span>%S</span> ' + word_sec + '';
                        } else {
                            var hour_format = '';
                        }
                        var $this = $(this).html(event.strftime('' +
                            '<span>%m</span> ' + word_month + ' ' +
                            '<span>%n</span> ' + word_days + '' + hour_format));
                    });
                });
            }


            //   Weeks offsets
            var $timer_weeks_offsets = $('.final-countdown-weeks-offsets .countdown-container');
            if ($timer_weeks_offsets.length > 0) {
                $timer_weeks_offsets.each(function() {
                    var $this = $(this);
                    var future_date = $this.data('future-date');
                    var showtime = $this.data('showtime');

                    var word_hr = $this.data('word-hr');
                    var word_min = $this.data('word-min');
                    var word_sec = $this.data('word-sec');
                    var word_weeks = $this.data('word-weeks');
                    var word_days = $this.data('word-days');

                    $this.countdown(future_date, function(event) {
                        if (showtime) {
                            var hour_format = ' <span>%H</span> ' + word_hr + ' ' +
                                '<span>%M</span> ' + word_min + ' ' +
                                '<span>%S</span> ' + word_sec + '';
                        } else {
                            var hour_format = '';
                        }
                        var $this = $(this).html(event.strftime('' +
                            '<span>%w</span> ' + word_weeks + ' ' +
                            '<span>%d</span> ' + word_days + '' + hour_format));
                    });
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------- pie chart / circle skill bar ----------------- */
        /* ---------------------------------------------------------------------- */
        TM_pieChart: function() {
            var piechart = '.tm-sc-pie-chart .pie-chart';
            var $piechart = $(piechart);
            if ($piechart.length > 0) {
                $piechart.appear();
                $document_body.on('appear', piechart, function() {
                    var current_item = $(this);
                    if (!current_item.hasClass('appeared')) {
                        current_item.easyPieChart({
                            onStep: function(from, to, percent) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }
                        });
                        current_item.addClass('appeared');
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------- progress bar / horizontal skill bar -------------- */
        /* ---------------------------------------------------------------------- */
        TM_progressBar: function() {
            var $progress_bar = $('.tm-sc-progress-bar');
            if ($progress_bar.length > 0) {
                $progress_bar.appear();
                $document_body.on('appear', '.tm-sc-progress-bar', function() {
                    var current_item = $(this);
                    if (!current_item.hasClass('appeared')) {
                        var percentage = current_item.data('percent');
                        var bar_height = current_item.data('bar-height');
                        var percent = current_item.find('.percent');
                        var bar_holder = current_item.find('.progress-holder');
                        var bar = current_item.find('.progress-content');

                        if (current_item.hasClass('progress-bar-default')) {
                            tmProgressBarCounter(bar.find('span.value'), percentage);
                        } else {
                            tmProgressBarCounter(percent.find('span.value'), percentage);
                        }

                        bar.css('width', '0%').animate({
                            'width': percentage + '%'
                        }, 2000);

                        if (current_item.hasClass('progress-bar-floating-percent')) {
                            percent.css('left', '0%').animate({
                                'left': percentage + '%'
                            }, 2000);
                        }

                        if (bar_height != '') {
                            bar_holder.css('height', bar_height);
                            bar.css('height', bar_height);
                        }


                        var barcolor = current_item.data('barcolor');
                        bar.css('background-color', barcolor);
                        current_item.addClass('appeared');
                    }

                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Funfact Number Counter ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_funfact: function() {
            var $animate_number = $('.animate-number');
            if ($animate_number.length > 0) {
                $animate_number.appear();
                $document_body.on('appear', '.animate-number', function() {
                    $animate_number.each(function() {
                        var current_item = $(this);
                        if (!current_item.hasClass('appeared')) {
                            current_item.animateNumbers(current_item.attr("data-value"), true, parseInt(current_item.attr("data-animation-duration"), 10)).addClass('appeared');
                        }
                    });
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Instagram Feed ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_instagramFeed: function() {
            var $instagram_feed_grid = $('.instagram-feed-grid');
            if ($instagram_feed_grid.length > 0) {
                $instagram_feed_grid.each(function() {
                    var current_div = $(this);
                    var instagramFeed = new Instafeed({
                        target: current_div.attr('id'),
                        get: 'user',
                        userId: current_div.data('userid'),
                        accessToken: current_div.data('accesstoken'),
                        resolution: current_div.data('resolution'),
                        limit: current_div.data('limit'),
                        template: '<div class="item"><figure><img src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="fa fa-link"></i></a></figure></div>',
                        after: function() {}
                    });
                    instagramFeed.run();
                });
            }

            var $instagram_feed_carousel = $('.instagram-feed-carousel');
            if ($instagram_feed_carousel.length > 0) {
                $instagram_feed_carousel.each(function() {
                    var current_div = $(this);
                    var instagramFeed = new Instafeed({
                        target: current_div.attr('id'),
                        get: 'user',
                        userId: current_div.data('userid'),
                        accessToken: current_div.data('accesstoken'),
                        resolution: current_div.data('resolution'),
                        limit: current_div.data('limit'),
                        template: '<div class="item img-fullwidth"><figure><img width="250" src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="fa fa-link"></i></a></figure></div>',
                        after: function() {
                            current_div.addClass("owl-carousel owl-theme").owlCarousel({
                                autoplay: true,
                                autoplayTimeout: 4000,
                                loop: true,
                                margin: 30,
                                dots: false,
                                nav: true,
                                navText: [
                                    '<i class="fa fa-chevron-left"></i>',
                                    '<i class="fa fa-chevron-right"></i>'
                                ],
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    768: {
                                        items: 1
                                    },
                                    1000: {
                                        items: 1
                                    }
                                }
                            });
                        }
                    });
                    instagramFeed.run();
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Flickr Feed ----------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_jflickrfeed: function() {
            var $jflickrfeed = $(".flickr-widget .flickr-feed, .jflickrfeed");
            if ($jflickrfeed.length > 0) {
                $jflickrfeed.each(function() {
                    var current_div = $(this);
                    current_div.jflickrfeed({
                        limit: 9,
                        qstrings: {
                            id: current_div.data('userid')
                        },
                        itemTemplate: '<a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_m}}" alt="{{title}}">  </a>'
                    });
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------- accordion & toggles ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_accordion_toggles: function() {
            var $panel_group_collapse = $('.panel-group .collapse');
            $panel_group_collapse.on("show.bs.collapse", function(e) {
                $(this).closest(".panel-group").find("[href='#" + $(this).attr("id") + "']").addClass("active");
            });
            $panel_group_collapse.on("hide.bs.collapse", function(e) {
                $(this).closest(".panel-group").find("[href='#" + $(this).attr("id") + "']").removeClass("active");
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- tooltip  ----------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_tooltip: function() {
            var $tooltip = $('[data-toggle="tooltip"]');
            if ($tooltip.length > 0) {
                $tooltip.tooltip();
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Twitter Feed  --------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_twittie: function() {
            var $twitter_feed_list = $('.twitter-feed-list');
            if ($twitter_feed_list.length > 0) {
                var count = ($twitter_feed_list.data("count") === undefined) ? 4 : $twitter_feed_list.data("count");
                var username = ($twitter_feed_list.data("username") === undefined) ? 'Envato' : $twitter_feed_list.data("username");
                var ajaxurl = ($twitter_feed_list.data("ajaxurl") === undefined) ? '' : $twitter_feed_list.data("ajaxurl");
                $twitter_feed_list.twittie({
                    username: username,
                    count: count,
                    dateFormat: '%b. %d, %Y',
                    template: '{{tweet}} <div class="date">{{date}}</div>',
                    loadingText: 'Loading!',
                    action: 'mascot_twitter_tweetie_api_action',
                    apiPath: ajaxurl
                });
            }

            var $twitter_feed_carousel = $('.twitter-feed-carousel');
            if ($twitter_feed_carousel.length > 0) {
                var count = ($twitter_feed_carousel.data("count") === undefined) ? 4 : $twitter_feed_carousel.data("count");
                var username = ($twitter_feed_carousel.data("username") === undefined) ? 'Envato' : $twitter_feed_carousel.data("username");
                var ajaxurl = ($twitter_feed_carousel.data("ajaxurl") === undefined) ? '' : $twitter_feed_carousel.data("ajaxurl");
                $twitter_feed_carousel.twittie({
                    username: username,
                    count: count,
                    dateFormat: '%b. %d, %Y',
                    template: '{{tweet}} <div class="date">{{date}}</div>',
                    loadingText: 'Loading!',
                    action: 'mascot_twitter_tweetie_api_action',
                    apiPath: ajaxurl
                }, function() {
                    var data_dots = ($twitter_feed_carousel.data("dots") === undefined) ? false : $twitter_feed_carousel.data("dots");
                    var data_nav = ($twitter_feed_carousel.data("nav") === undefined) ? false : $twitter_feed_carousel.data("nav");
                    var data_duration = ($twitter_feed_carousel.data("duration") === undefined) ? 4000 : $twitter_feed_carousel.data("duration");
                    var animate_out = ($twitter_feed_carousel.data("animateout") === undefined) ? '' : $twitter_feed_carousel.data("animateout");
                    var animate_in = ($twitter_feed_carousel.data("animatein") === undefined) ? '' : $twitter_feed_carousel.data("animatein");

                    $twitter_feed_carousel.find('ul').addClass('owl-carousel').owlCarousel({
                        autoplay: true,
                        autoplayTimeout: data_duration,
                        loop: true,
                        items: 1,
                        margin: 30,
                        smartSpeed: 450,
                        dots: data_dots,
                        nav: data_nav,
                        animateOut: animate_out,
                        animateIn: animate_in,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                    });
                });
            }
        }
    };

    THEMEMASCOT.slider = {

        init: function() {

            var t = setTimeout(function() {
                THEMEMASCOT.slider.TM_MultiScrollSlider();
                THEMEMASCOT.slider.TM_FullPageSlider();
                THEMEMASCOT.slider.TM_PagePilingSlider();
                THEMEMASCOT.slider.TM_typedAnimation();
                THEMEMASCOT.slider.TM_owlCarousel();
                THEMEMASCOT.slider.TM_slick();
                THEMEMASCOT.slider.TM_maximageSlider();
                THEMEMASCOT.slider.TM_bxslider();
                THEMEMASCOT.slider.TM_beforeAfterSlider();
            }, 0);

        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------- Multi Scroll Slider  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_MultiScrollSlider: function() {
            var $multi_scrolling_slider = $('.tm-divided-multi-scrolling-slider');
            $multi_scrolling_slider.height(windowHeight).animate({
                opacity: 1
            }, 300);
            if ($multi_scrolling_slider.length > 0) {

                var data_anchor_menu = ($multi_scrolling_slider.data("anchor-menu") === undefined) ? '' : $multi_scrolling_slider.data("anchor-menu");
                var data_anchor_menu = data_anchor_menu.split(',');
                for (var i = 0; i < data_anchor_menu.length; i += 1) {
                    data_anchor_menu[i] = '' + $.trim(data_anchor_menu[i]);
                }

                var data_navigation = ($multi_scrolling_slider.data("navigation") === undefined) ? true : $multi_scrolling_slider.data("navigation");
                var data_navigationPosition = ($multi_scrolling_slider.data("navigation-position") === undefined) ? 'right' : $multi_scrolling_slider.data("navigation-position");
                var data_navigationTooltip_show = ($multi_scrolling_slider.data("navigation-tooltip") === undefined) ? false : $multi_scrolling_slider.data("navigation-tooltip");

                var data_navigationTooltip = ($multi_scrolling_slider.data("navigation-tooltips") === undefined) ? '' : $multi_scrolling_slider.data("navigation-tooltips");
                var data_navigationTooltip = data_navigationTooltip.split(',');
                for (var i = 0; i < data_navigationTooltip.length; i += 1) {
                    data_navigationTooltip[i] = '' + $.trim(data_navigationTooltip[i]);
                }

                var data_scrollingSpeed = ($multi_scrolling_slider.data("scrolling-speed") === undefined) ? 700 : $multi_scrolling_slider.data("scrolling-speed");
                var data_responsiveWidth = ($multi_scrolling_slider.data("responsive-width") === undefined) ? 1000 : $multi_scrolling_slider.data("responsive-width");
                var data_easing = ($multi_scrolling_slider.data("easing") === undefined) ? 'easeInQuart' : $multi_scrolling_slider.data("easing");
                var data_looptop = ($multi_scrolling_slider.data("looptop") === undefined) ? true : $multi_scrolling_slider.data("looptop");
                var data_loopbottom = ($multi_scrolling_slider.data("loopbottom") === undefined) ? true : $multi_scrolling_slider.data("loopbottom");

                var navigationTooltips = '';
                if (data_navigationTooltip_show === true) {
                    navigationTooltips = data_navigationTooltip;
                }

                $($multi_scrolling_slider).multiscroll({
                    navigation: data_navigation,
                    scrollingSpeed: data_scrollingSpeed,
                    anchors: data_anchor_menu,
                    navigationTooltips: navigationTooltips,
                    menu: '#multi-scrolling-menu',
                    navigationPosition: data_navigationPosition,
                    loopTop: data_looptop,
                    loopBottom: data_loopbottom,
                    easing: data_easing,
                    responsiveWidth: data_responsiveWidth,
                    responsiveExpandKey: 'QU5ZX2xHYmNtVnpjRzl1YzJsMlpVVjRjR0Z1WkE9PXpTUw==',
                    responsiveExpand: true,
                    //events
                    onLeave: function(index, nextIndex, direction) {
                        $.force_appear();
                    },
                    afterLoad: function(anchorLink, index) {
                        $.force_appear();
                    },
                    afterRender: function() {
                        $.force_appear();
                    },
                    afterResize: function() {
                        $.force_appear();
                    },
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------- Full Page Slider  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_FullPageSlider: function() {
            var $full_page_slider = $('.tm-full-page-slider');
            $full_page_slider.height(windowHeight).animate({
                opacity: 1
            }, 300);
            if ($full_page_slider.length > 0) {

                var data_anchor_menu = ($full_page_slider.data("anchor-menu") === undefined) ? '' : $full_page_slider.data("anchor-menu");
                var data_anchor_menu = data_anchor_menu.split(',');
                for (var i = 0; i < data_anchor_menu.length; i += 1) {
                    data_anchor_menu[i] = '' + $.trim(data_anchor_menu[i]);
                }

                var data_navigation = ($full_page_slider.data("navigation") === undefined) ? true : $full_page_slider.data("navigation");
                var data_navigationPosition = ($full_page_slider.data("navigation-position") === undefined) ? 'right' : $full_page_slider.data("navigation-position");
                var data_navigationTooltip_show = ($full_page_slider.data("navigation-tooltip") === undefined) ? false : $full_page_slider.data("navigation-tooltip");

                var data_navigationTooltip = ($full_page_slider.data("navigation-tooltips") === undefined) ? '' : $full_page_slider.data("navigation-tooltips");
                var data_navigationTooltip = data_navigationTooltip.split(',');
                for (var i = 0; i < data_navigationTooltip.length; i += 1) {
                    data_navigationTooltip[i] = '' + $.trim(data_navigationTooltip[i]);
                }

                var data_slidesNavigation = ($full_page_slider.data("horizontal-navigation") === undefined) ? true : $full_page_slider.data("horizontal-navigation");
                var data_scrollingSpeed = ($full_page_slider.data("scrolling-speed") === undefined) ? 700 : $full_page_slider.data("scrolling-speed");
                var data_responsiveWidth = ($full_page_slider.data("responsive-width") === undefined) ? 1000 : $full_page_slider.data("responsive-width");
                var data_easing = ($full_page_slider.data("easing") === undefined) ? 'easeInOutCubic' : $full_page_slider.data("easing");
                var data_looptop = ($full_page_slider.data("looptop") === undefined) ? true : $full_page_slider.data("looptop");
                var data_loopbottom = ($full_page_slider.data("loopbottom") === undefined) ? true : $full_page_slider.data("loopbottom");

                var navigationTooltips = '';
                if (data_navigationTooltip_show === true) {
                    navigationTooltips = data_navigationTooltip;
                }

                $($full_page_slider).fullpage({
                    navigation: data_navigation,
                    anchors: data_anchor_menu,
                    navigationTooltips: navigationTooltips,
                    menu: '#tm-full-page-menu',
                    scrollingSpeed: data_scrollingSpeed,
                    navigationPosition: data_navigationPosition,
                    loopTop: data_looptop,
                    loopBottom: data_loopbottom,
                    easing: data_easing,
                    scrollOverflow: true,
                    slidesNavigation: data_slidesNavigation,
                    responsiveWidth: data_responsiveWidth,
                    //events
                    onLeave: function(origin, destination, direction) {
                        $.force_appear();
                    },
                    afterLoad: function(origin, destination, direction) {
                        $.force_appear();
                    },
                    afterRender: function() {
                        $.force_appear();
                    },
                    afterResize: function(width, height) {
                        $.force_appear();
                    },
                    afterResponsive: function(isResponsive) {}
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- Page Piling Slider  ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_PagePilingSlider: function() {
            var $page_piling_slider = $('.tm-page-piling-slider');
            $page_piling_slider.height(windowHeight).animate({
                opacity: 1
            }, 300);
            if ($page_piling_slider.length > 0) {

                var data_anchor_menu = ($page_piling_slider.data("anchor-menu") === undefined) ? '' : $page_piling_slider.data("anchor-menu");
                var data_anchor_menu = data_anchor_menu.split(',');
                for (var i = 0; i < data_anchor_menu.length; i += 1) {
                    data_anchor_menu[i] = '' + $.trim(data_anchor_menu[i]);
                }

                var data_navigation = ($page_piling_slider.data("navigation") === undefined) ? true : $page_piling_slider.data("navigation");
                var data_navigationPosition = ($page_piling_slider.data("navigation-position") === undefined) ? 'right' : $page_piling_slider.data("navigation-position");
                var data_navigationTooltip_show = ($page_piling_slider.data("navigation-tooltip") === undefined) ? false : $page_piling_slider.data("navigation-tooltip");

                var data_navigationTooltip = ($page_piling_slider.data("navigation-tooltips") === undefined) ? '' : $page_piling_slider.data("navigation-tooltips");
                var data_navigationTooltip = data_navigationTooltip.split(',');
                for (var i = 0; i < data_navigationTooltip.length; i += 1) {
                    data_navigationTooltip[i] = '' + $.trim(data_navigationTooltip[i]);
                }

                var data_scrollingSpeed = ($page_piling_slider.data("scrolling-speed") === undefined) ? 700 : $page_piling_slider.data("scrolling-speed");
                var data_scrollingDirection = ($page_piling_slider.data("scrolling-direction") === undefined) ? 'vertical' : $page_piling_slider.data("scrolling-direction");
                var data_easing = ($page_piling_slider.data("easing") === undefined) ? 'easeInOutCubic' : $page_piling_slider.data("easing");
                var data_looptop = ($page_piling_slider.data("looptop") === undefined) ? true : $page_piling_slider.data("looptop");
                var data_loopbottom = ($page_piling_slider.data("loopbottom") === undefined) ? true : $page_piling_slider.data("loopbottom");

                var navigationTooltips = '';
                if (data_navigationTooltip_show === true) {
                    navigationTooltips = data_navigationTooltip;
                }

                $($page_piling_slider).pagepiling({
                    direction: data_scrollingDirection,
                    anchors: data_anchor_menu,
                    menu: '#tm-page-piling-menu',
                    scrollingSpeed: data_scrollingSpeed,
                    loopTop: data_looptop,
                    loopBottom: data_loopbottom,
                    easing: data_easing,
                    navigation: {
                        'position': data_navigationPosition,
                        'tooltips': navigationTooltips
                    },
                    //events
                    onLeave: function(index, nextIndex, direction) {
                        $.force_appear();
                    },
                    afterLoad: function(anchorLink, index) {
                        $.force_appear();
                    },
                    afterRender: function() {
                        $.force_appear();
                    },
                });
                $window.resize(function() {
                    var height = $window.height();
                    $page_piling_slider.css('height', height);
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------- Typed Text Carousel  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_typedAnimation: function() {
            var $typed_text_carousel = $('.typed-text-carousel');
            if ($typed_text_carousel.length > 0) {
                $typed_text_carousel.each(function() {
                    var string_1 = $(this).find('span:first-child').text();
                    var string_2 = $(this).find('span:nth-child(2)').text();
                    var string_3 = $(this).find('span:nth-child(3)').text();
                    var str = '';
                    var $this = $(this);
                    if (!string_2.trim() || !string_3.trim()) {
                        str = [string_1];
                    }
                    if (!string_3.trim() && string_2.length) {
                        str = [string_1, string_2];
                    }
                    if (string_1.length && string_2.length && string_3.length) {
                        str = [string_1, string_2, string_3];
                    }
                    var speed = $(this).data('speed');
                    var back_delay = $(this).data('back_delay');
                    var loop = $(this).data('loop');
                    $(this).typed({
                        strings: str,
                        typeSpeed: speed,
                        backSpeed: 0,
                        backDelay: back_delay,
                        cursorChar: "|",
                        loop: loop,
                        contentType: 'text',
                        loopCount: false
                    });
                });
            }
        },



        /* ---------------------------------------------------------------------- */
        /* -------------------------------- Slick Carousel  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_slick: function() {
            var $slick_carousel_1col = $('.slick-carousel-1col');
            if ($slick_carousel_1col.length > 0) {
                $slick_carousel_1col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_duration = ($this.data("duration") === undefined) ? 3000 : $this.data("duration");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");

                    var items_desktop = 2;
                    var items_laptop = ($this.data("laptop") === undefined) ? 2 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 2 : $this.data("tablet");

                    $this.slick({
                        infinite: data_loop,
                        autoplay: data_autoplay,
                        autoplaySpeed: data_duration,
                        slidesToShow: items_desktop,
                        arrows: data_nav,
                        dots: data_dots,
                        dotsClass: 'tm-slick-dots',
                        adaptiveHeight: true,
                        easing: 'easeOutCubic',
                        prevArrow: '<span class="tm-slick-prev tm-prev-icon"><i class="fa fa-chevron-left"></i></span>',
                        nextArrow: '<span class="tm-slick-next tm-next-icon"><i class="fa fa-chevron-right"></i></span>',
                        responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                });
            }


            var $slick_thumbnail_slider = $('.slick-thumbnail-slider');
            if ($slick_thumbnail_slider.length > 0) {
                $slick_thumbnail_slider.each(function() {
                    var $this = $(this);
                    var id = $this.attr('id');
                    $this.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        fade: true,
                        asNavFor: '.slider-nav-' + id
                    });

                    $('.slider-nav-' + id).slick({
                        slidesToShow: 7,
                        slidesToScroll: 1,
                        asNavFor: $this,
                        dots: false,
                        centerMode: false,
                        focusOnSelect: true
                    });

                });
            }
        },



        /* ---------------------------------------------------------------------- */
        /* -------------------------------- Owl Carousel  ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_owlCarousel: function() {
            var $owl_thumb_carousel = $('.tm-owl-thumb-carousel');
            if ($owl_thumb_carousel.length > 0) {
                if (!$owl_thumb_carousel.hasClass("owl-carousel")) {
                    $owl_thumb_carousel.addClass("owl-carousel owl-theme");
                }
                $owl_thumb_carousel.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");

                    $this.owlCarousel({
                        // Enable thumbnails
                        thumbs: true,
                        // When only using images in your slide (like the demo) use this option to dynamicly create thumbnails without using the attribute data-thumb.
                        thumbImage: false,
                        // Enable this if you have pre-rendered thumbnails in your html instead of letting this plugin generate them. This is recommended as it will prevent FOUC
                        thumbsPrerendered: true,
                        // Class that will be used on the thumbnail container
                        thumbContainerClass: 'tm-owl-thumbs',
                        // Class that will be used on the thumbnail item's
                        thumbItemClass: 'tm-owl-thumb-item',



                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 1,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ]
                    });
                });
            }


            var $owl_carousel_1col = $('.tm-owl-carousel-1col');
            if ($owl_carousel_1col.length > 0) {
                if (!$owl_carousel_1col.hasClass("owl-carousel")) {
                    $owl_carousel_1col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_1col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 1,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ]
                    });
                });
            }

            var $owl_carousel_2col = $('.tm-owl-carousel-2col');
            if ($owl_carousel_2col.length > 0) {
                if (!$owl_carousel_2col.hasClass("owl-carousel")) {
                    $owl_carousel_2col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_2col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 2;
                    var items_laptop = ($this.data("laptop") === undefined) ? 2 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 2 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 2,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }

            var $owl_carousel_3col = $('.tm-owl-carousel-3col');
            if ($owl_carousel_3col.length > 0) {
                if (!$owl_carousel_3col.hasClass("owl-carousel")) {
                    $owl_carousel_3col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_3col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 3;
                    var items_laptop = ($this.data("laptop") === undefined) ? 2 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 2 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 3,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }


            var $owl_carousel_4col = $('.tm-owl-carousel-4col');
            if ($owl_carousel_4col.length > 0) {
                if (!$owl_carousel_4col.hasClass("owl-carousel")) {
                    $owl_carousel_4col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_4col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 4;
                    var items_laptop = ($this.data("laptop") === undefined) ? 3 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 2 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 4,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }

            var $owl_carousel_5col = $('.tm-owl-carousel-5col');
            if ($owl_carousel_5col.length > 0) {
                if (!$owl_carousel_5col.hasClass("owl-carousel")) {
                    $owl_carousel_5col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_5col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 5;
                    var items_laptop = ($this.data("laptop") === undefined) ? 3 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 2 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 5,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }

            var $owl_carousel_6col = $('.tm-owl-carousel-6col');
            if ($owl_carousel_6col.length > 0) {
                if (!$owl_carousel_6col.hasClass("owl-carousel")) {
                    $owl_carousel_6col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_6col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 6;
                    var items_laptop = ($this.data("laptop") === undefined) ? 4 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 2 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 6,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }

            var $owl_carousel_7col = $('.tm-owl-carousel-7col');
            if ($owl_carousel_7col.length > 0) {
                if (!$owl_carousel_7col.hasClass("owl-carousel")) {
                    $owl_carousel_7col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_7col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 7;
                    var items_laptop = ($this.data("laptop") === undefined) ? 5 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 3 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 7,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }

            var $owl_carousel_8col = $('.tm-owl-carousel-8col');
            if ($owl_carousel_8col.length > 0) {
                if (!$owl_carousel_8col.hasClass("owl-carousel")) {
                    $owl_carousel_8col.addClass("owl-carousel owl-theme");
                }
                $owl_carousel_8col.each(function() {
                    var $this = $(this);
                    var data_dots = ($this.data("dots") === undefined) ? false : $this.data("dots");
                    var data_nav = ($this.data("nav") === undefined) ? false : $this.data("nav");
                    var data_duration = ($this.data("duration") === undefined) ? 4000 : $this.data("duration");
                    var data_smartspeed = ($this.data("smartspeed") === undefined) ? 2000 : $this.data("smartspeed");
                    var data_autoplay = ($this.data("autoplay") === undefined) ? false : $this.data("autoplay");
                    var data_loop = ($this.data("loop") === undefined) ? false : $this.data("loop");
                    var data_margin = ($this.data("margin") === undefined) ? 30 : $this.data("margin");
                    var data_stagePadding = ($this.data("stagepadding") === undefined) ? 0 : $this.data("stagepadding");

                    var items_desktop = 8;
                    var items_laptop = ($this.data("laptop") === undefined) ? 6 : $this.data("laptop");
                    var items_tablet = ($this.data("tablet") === undefined) ? 4 : $this.data("tablet");

                    $this.owlCarousel({
                        rtl: THEMEMASCOT.isRTL.check(),
                        autoplay: data_autoplay,
                        autoplayTimeout: data_duration,
                        smartSpeed: data_smartspeed,
                        autoHeight: true,
                        responsiveClass: true,
                        loop: data_loop,
                        items: 8,
                        margin: data_margin,
                        stagePadding: data_stagePadding,
                        dots: data_dots,
                        nav: data_nav,
                        navText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            768: {
                                items: items_tablet,
                                stagePadding: 0,
                            },
                            1024: {
                                items: items_laptop
                            },
                            1200: {
                                items: items_desktop
                            }
                        }
                    });
                });
            }


            /* animate filter */
            var owlAnimateFilter = function(even) {
                $(this)
                    .addClass('__loading')
                    .delay(70 * $(this).parent().index())
                    .queue(function() {
                        $(this).dequeue().removeClass('__loading')
                    })
            }

            $('.carousel-layout-filter').on('click', 'a', function(e) {
                e.preventDefault();
                var $this = $(this);

                var $this_parent = $this.parent('div');

                $this.addClass('active').siblings().removeClass('active');

                var filter_data = $this.data('filter');
                var linkwith = $this_parent.data('link-with');

                /* Filter */
                $('#' + linkwith).owlFilter(filter_data, function(_owl) {
                    $(_owl).find('.tm-carousel-item').each(owlAnimateFilter);
                });
            })

        },


        /* ---------------------------------------------------------------------- */
        /* ---------- maximage Fullscreen Parallax Background Slider  ----------- */
        /* ---------------------------------------------------------------------- */
        TM_maximageSlider: function() {
            var $maximage_slider = $('#maximage');
            if ($maximage_slider.length > 0) {
                $maximage_slider.each(function() {
                    $(this).maximage({
                        cycleOptions: {
                            fx: 'fade',
                            speed: 1500,
                            prev: '.img-prev',
                            next: '.img-next'
                        }
                    });
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------------- BxSlider  ------------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_bxslider: function() {
            var $bxslider = $('.bxslider');
            if ($bxslider.length > 0) {
                $bxslider.each(function() {
                    var $this = $(this);
                    $this.bxSlider({
                        mode: 'vertical',
                        minSlides: ($this.data("minslides") === undefined) ? 2 : $this.data("minslides"),
                        slideMargin: 20,
                        pager: false,
                        auto: ($this.data("autoplay") === undefined) ? true : $this.data("autoplay"),
                        prevText: '<i class="fa fa-angle-left"></i>',
                        nextText: '<i class="fa fa-angle-right"></i>'
                    });
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------ Before After Slider  ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_beforeAfterSlider: function() {
            var $before_after_slider = $('.twentytwenty-container');
            if ($.isFunction($.fn.twentytwenty)) {
                if ($before_after_slider.length > 0) {
                    $before_after_slider.each(function() {
                        var $this = $(this);
                        var data_offset_pct = ($this.data("offset-percent") === undefined) ? 0.5 : $this.data("offset-percent");
                        var data_orientation = ($this.data("orientation") === undefined) ? 'horizontal' : $this.data("orientation");
                        var data_before_label = ($this.data("before-label") === undefined) ? 'Before' : $this.data("before-label");
                        var data_after_label = ($this.data("after-label") === undefined) ? 'After' : $this.data("after-label");
                        var data_no_overlay = ($this.data("no-overlay") === undefined) ? true : $this.data("no-overlay");
                        $this.twentytwenty({
                            default_offset_pct: data_offset_pct, // How much of the before image is visible when the page loads
                            orientation: data_orientation, // Orientation of the before and after images ('horizontal' or 'vertical')
                            before_label: data_before_label, // Set a custom before label
                            after_label: data_after_label, // Set a custom after label
                            no_overlay: data_no_overlay //Do not show the overlay with before and after
                        });
                    });
                }
            }
        }
    };


    /* ---------------------------------------------------------------------- */
    /* ---------- document ready, window load, scroll and resize ------------ */
    /* ---------------------------------------------------------------------- */
    //document ready
    THEMEMASCOT.documentOnReady = {
        init: function() {
            THEMEMASCOT.initialize.init();
            THEMEMASCOT.header.init();
            THEMEMASCOT.slider.init();
            THEMEMASCOT.widget.init();
            THEMEMASCOT.windowOnscroll.init();
        }
    };

    //window on load
    THEMEMASCOT.windowOnLoad = {
        init: function() {
            var t = setTimeout(function() {
                THEMEMASCOT.initialize.TM_magnificPopup_lightbox();
                THEMEMASCOT.initialize.TM_preLoaderOnLoad();
                THEMEMASCOT.initialize.TM_parallaxBgInit();
                THEMEMASCOT.widget.TM_twittie();
                THEMEMASCOT.header.TM_VC_RTL();
                THEMEMASCOT.header.TM_VC_Vertical();
                THEMEMASCOT.header.TM_VC_Boxed_Fullwidth_Fit_Container();
                THEMEMASCOT.initialize.TM_portfolioStickyScrollMagic();
                THEMEMASCOT.initialize.TM_shopSingleStickyScrollMagic();
                THEMEMASCOT.initialize.TM_fitVids();
            }, 0);
            $window.trigger("scroll");
            $window.trigger("resize");
        }
    };

    //window on scroll
    THEMEMASCOT.windowOnscroll = {
        init: function() {
            $window.on('scroll', function() {
                THEMEMASCOT.header.TM_scroolToTop();
                THEMEMASCOT.header.TM_activateMenuItemOnReach();
                THEMEMASCOT.header.TM_topnavAnimate();
            });
        }
    };

    //window on resize
    THEMEMASCOT.windowOnResize = {
        init: function() {
            var t = setTimeout(function() {
                THEMEMASCOT.initialize.TM_equalHeightDivs();
                THEMEMASCOT.initialize.TM_resizeFullscreen();
                THEMEMASCOT.header.TM_Memuzord_Megamenu();
                THEMEMASCOT.header.TM_TopNav_Dropdown_Position();
                THEMEMASCOT.header.TM_verticalNavHeaderPadding();
                THEMEMASCOT.header.TM_VC_RTL();
                THEMEMASCOT.header.TM_VC_Vertical();
                THEMEMASCOT.header.TM_VC_Boxed_Fullwidth_Fit_Container();
                THEMEMASCOT.header.TM_navLocalScorll();
                THEMEMASCOT.initialize.TM_fixedFooter();
            }, 400);
        }
    };


    THEMEMASCOT.header.TM_menuzord();


    /* ---------------------------------------------------------------------- */
    /* ---------------------------- Call Functions -------------------------- */
    /* ---------------------------------------------------------------------- */
    $document.ready(
        THEMEMASCOT.documentOnReady.init
    );
    $window.on('load',
        THEMEMASCOT.windowOnLoad.init
    );
    $window.on('resize',
        THEMEMASCOT.windowOnResize.init
    );

    //call function before document ready
    THEMEMASCOT.initialize.TM_preLoaderClickDisable();

})(jQuery);