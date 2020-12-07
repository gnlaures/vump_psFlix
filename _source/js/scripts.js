// init base functions
$(window).on('load', function () {
    classOnBody($('main').attr('id'));
    scrollDirection();
    initGettersAndSetters();
    changeTouchClickText();
});
$(window).on('hashchange', function () {
    initGettersAndSetters();
});

// nav
if ($('.l-nav').length) {
    // vars
    var nav_scrollInit = 0;
    var nav_classActive = 'is-active';
    var nav_el = {
        body: $('body'),
        hamburguer: $('.c-hamburguer'),
        mask: $('.l-nav__maskMenu'),
        nav: $('.l-nav'),
        navContentHero: $('.l-nav__contentHero'),
        liWithOneLevelSubMenu: $('.liWithOneLevelSubMenu > a'),
        liWithTwoLevelsSubMenu: $('.liWithTwoLevelsSubMenu > a'),
        liWithoutSubMenu: $('.liWithoutSubMenu > a'),
        firstSubMenu: $('.firstSubMenu'),
        secondSubMenu: $('.secondSubMenu'),
        openSecondSubMenu: $('.openSecondSubMenu'),
    };

    // functions
    function showMask() {
        nav_el.mask.addClass(nav_classActive);
    }
    function hideMask() {
        nav_el.mask.removeClass(nav_classActive);
    }
    function closeAllSubMenus() {
        nav_el.liWithOneLevelSubMenu.parent('li').removeClass(nav_classActive);
        nav_el.liWithTwoLevelsSubMenu.parent('li').removeClass(nav_classActive);
    }
    function overflowBlocked() {
        nav_el.body.addClass('u-overflowBlocked');
    }
    function overflowFree() {
        nav_el.body.removeClass('u-overflowBlocked');
    }
    function closeNavContent() {
        nav_el.navContentHero.removeClass(nav_classActive);
    }
    function openNavContent() {
        nav_el.navContentHero.addClass(nav_classActive);
    }
    function inactiveHamburguer() {
        nav_el.hamburguer.removeClass(nav_classActive);
    }
    function activeHamburguer() {
        nav_el.hamburguer.addClass(nav_classActive);
    }

    function closeAllMenuItens() {
        hideMask();
        closeAllSubMenus();
        overflowFree();
        closeNavContent();
        inactiveHamburguer();
    }
    function openAllMenuItens() {
        showMask();
        overflowBlocked();
        openNavContent();
        activeHamburguer()
    }

    // effect on scroll
    $(window).on('scroll', function(event) {
        var scrollBody = $(this).scrollTop();

        // scroll up to 99
        if (scrollBody > 99) {
            nav_el.nav.addClass('scrolled');
        } else {
            nav_el.nav.removeClass('scrolled');
        }

        // middle class
        if (scrollBody > 600) {
            nav_el.nav.addClass('hidden');
            nav_el.nav.addClass('scrolledMiddle');
        } else {
            nav_el.nav.removeClass('hidden');
            nav_el.nav.removeClass('scrolledMiddle');
        }

        // scroll up or down
        if (scrollBody < nav_scrollInit) {
            nav_el.nav.removeClass('hidden');
            nav_el.nav.addClass('scrolledUp');
            nav_el.nav.removeClass('scrolledDown');
        } else {
            nav_el.nav.removeClass('scrolledUp');
            nav_el.nav.addClass('scrolledDown');
        }

        // close menus on hidden nav
        if(nav_el.nav.hasClass('hidden')) {
            closeAllMenuItens();
        }

        // reference var
        nav_scrollInit = scrollBody;
    });
    $(window).on('load', function(event) {
        var scrollBody = $(this).scrollTop();
        if (scrollBody > 1) {
            nav_el.nav.addClass('scrolled');
        } else {
            nav_el.nav.removeClass('scrolled');
        }
    });

    // open/close/menus/submenus/hamburguer on clicks
    nav_el.hamburguer.on('click', function() {
        if ($(this).hasClass(nav_classActive)) {
            closeAllMenuItens();
        } else {
            openAllMenuItens();
        }
    });
    nav_el.mask.on('click', function() {
        closeAllMenuItens()
    });
    nav_el.liWithoutSubMenu.on('click', function() {
        closeAllMenuItens();
    });
    nav_el.firstSubMenu.children('li').on('click', function() {
        if(!$(this).hasClass('openSecondSubMenu')) {
            closeAllMenuItens();
        }
    });
    nav_el.secondSubMenu.children('li').on('click', function() {
        closeAllMenuItens();
    });
}
if ($('.l-nav--withSubMenus').length) {
    // open close submenus with clicks
    nav_el.liWithOneLevelSubMenu.on('click', function (event) {
        event.preventDefault();
        if (is.mobile()) {
            // mobile
            $(this).parent('li').toggleClass(nav_classActive);
            $(this).parent('li').children('a').toggleClass(nav_classActive);
            showMask();
        } else {
            // desktop
            nav_el.liWithOneLevelSubMenu.parent('li').removeClass(nav_classActive);
            nav_el.liWithTwoLevelsSubMenu.parent('li').removeClass(nav_classActive);
            $(this).parent('li').addClass(nav_classActive);
            showMask();
        }
    });
    nav_el.liWithTwoLevelsSubMenu.on('click', function (event) {
        event.preventDefault();
        if (is.mobile()) {
            // mobile
            $(this).parent('li').toggleClass(nav_classActive);
            $(this).parent('li').children('a').toggleClass(nav_classActive);
            showMask()
        } else {
            // desktop
            nav_el.liWithOneLevelSubMenu.parent('li').removeClass(nav_classActive);
            nav_el.liWithTwoLevelsSubMenu.parent('li').removeClass(nav_classActive);
            $(this).parent('li').addClass(nav_classActive);
            showMask()
        }
    });
    nav_el.openSecondSubMenu.on('click', function(event) {
        // event.preventDefault();
        if (is.mobile()) {
            $(this).children('.secondSubMenu').toggleClass(nav_classActive);
        } else {
            // desktop
            nav_el.secondSubMenu.removeClass(nav_classActive);
            $(this).children('.secondSubMenu').addClass(nav_classActive);
        }
    });
}

// sections
if ($('.l-headerHomeMobile').length) {
    var swiper__headerHome = new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 0,
        // pagination: {
        //     el: '.swiper__headerHome .swiper-pagination',
        //     type: 'bullets',
        //     clickable: true,
        // },
    });
}
if ($('.s-categories').length) {
    $(window).on('scroll', function () {stickyPosition('.u-stickyElement', 0, get__navHeight());});
    $(window).on('load', function () {stickyPosition('.u-stickyElement', 0, get__navHeight());});
}
if ($('.s-plans').length) {
    var swiper__listOfPlans;

    function makeSwiper() {
        $('.s-plans__list').addClass('swiper-wrapper');
        swiper__listOfPlans = new Swiper('.swiper__listOfPlans', {
            speed: 400,
            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: true,
            width: 460,
            pagination: {
                el: '.swiper__listOfPlans .swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                400: {
                    width: 290,
                },
                640: {
                    width: 360,
                }
            }
        });
    }
    function destroySwiper() {
        if ($('.swiper__listOfPlans').hasClass('swiper-container')) {
            swiper__listOfPlans.destroy(true, true);
        }
    }

    $(window).on('load', function() {
       var screenW = window.innerWidth;
       if (screenW < 1180) {
           makeSwiper();
       } else {
           destroySwiper();
       }
    });
    $(window).on('resize', function() {
        var screenW = window.innerWidth;
        if (screenW < 1180) {
            makeSwiper();
        } else {
            //destroySwiper();
            if ($('.swiper__listOfPlans').hasClass('swiper-container-horizontal')) {
                document.location.reload(true);
            }
        }
    });
}
if ($('.s-gamesGrid').length) {
    var swiper__gamesGrid = new Swiper('.swiper__gamesGrid', {
        speed: 400,
        spaceBetween: 30,
        slidesPerView: 5,
        pagination: {
            el: '.swiper__gamesGrid .swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper__gamesGrid .swiper-button-next',
            prevEl: '.swiper__gamesGrid .swiper-button-prev',
        },
        breakpoints: {
            400: {
                slidesPerView: 1,
                centeredSlides: true,
                width: 220,
            },
            660: {
                slidesPerView: 2,
            },
            880: {
                slidesPerView: 3,
            },
            1130: {
                slidesPerView: 4,
            }
        }
    });
}
if ($('.s-navGamePage').length) {
    $(window).on('scroll', function () {stickyPosition('.s-navGamePage', 50, get__navHeight() * 2);});
    $(window).on('load', function () {stickyPosition('.s-navGamePage', 50, get__navHeight() * 2);});

    $('.productMenu a').on('click', function (e) {
        e.preventDefault();
        var finalDestiny = $(this).attr('href');
        goToSection__scroll(finalDestiny, 200, 201, 700, 10);
    });
}
if ($('.s-warn').length) {
    $('.js-removeWarn').on('click', function() {
        $('.s-warn').remove();
    })
}