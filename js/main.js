let lenis;
$(function() {    
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);
    gsap.registerPlugin(Flip);

    let header = $('header .nav-menu'), mobile_header = $('header .mobile-nav-menu');
    lenis = new Lenis({
        duration: 1.4,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // gsap.ticker.add((time)=>{
    //     lenis.raf(time * 1000);
    // })

    // gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        scrollProgress = progress;
        if(progress * 1e4 > 200){
            header.addClass('scrolled');
            mobile_header.addClass('scrolled');
        } else{
            header.removeClass('scrolled');
            mobile_header.removeClass('scrolled');
        }
    });
});
/**
 *  Buttons
 */
class Button {
    constructor(buttonElement) {
        this.block = buttonElement;
        this.init();
        this.initEvents();
    }

    init() {
        const el = gsap.utils.selector(this.block);

        this.DOM = {
            button: this.block,
            flair: el(".button__flair"),
        };

        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
        this.hasFill = this.DOM.button.classList.contains("button--fill");
    }

    getXY(e) {
        const { left, top, width, height } =
        this.DOM.button.getBoundingClientRect();

        const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
        );

        const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
        );

        return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
        };
    }

    initEvents() {
        this.DOM.button.addEventListener("mouseenter", (e) => {
        const { x, y } = this.getXY(e);

        this.xSet(x);
        this.ySet(y);

        if (this.hasFill) {
            gsap.to(this.DOM.flair, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            });
        } else {
            gsap.to(this.DOM.flair, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            });
        }
        });

        this.DOM.button.addEventListener("mouseleave", (e) => {
        const { x, y } = this.getXY(e);

        gsap.killTweensOf(this.DOM.flair);

        if (this.hasFill) {
            gsap.to(this.DOM.flair, {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            });
        } else {
            gsap.to(this.DOM.flair, {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
            });
        }
        });

        this.DOM.button.addEventListener("mousemove", (e) => {
        const { x, y } = this.getXY(e);

        gsap.to(this.DOM.flair, {
            xPercent: x,
            yPercent: y,
            duration: this.hasFill ? 1 : 0.4,
            ease: "power2",
        });
        });
    }
}
const buttonElements = document.querySelectorAll('[data-block="button"]');
buttonElements.forEach((buttonElement) => {
    new Button(buttonElement);
});

/**
 * Get the page Name by 'body' class name
 */
let pageName = $('body').hasClass('home') ? 'home' : 
$('body').hasClass('shop-page') ? 'shop' : 
$('body').hasClass('product-page') ? 'products' : 
$('body').hasClass('in-the-news-page') ? 'news-page' : 
$('body').hasClass('about-page') ? 'about-page' : 
$('body').hasClass('b2b-page') ? 'b2b-page' : 
$('body').hasClass('cart-page') ? 'cart-page' : 
$('body').hasClass('profile-page') ? 'profile-page' : '';

const playIntro = () => {
    setTimeout(function(){
        const intro_wrapper = document.querySelector('.intro_wrapper');
        // intro_wrapper.style.height = `calc(100dvh + ` + lenis.actualScroll + 'px' + `)`;
        intro_wrapper.classList.add('intro_out');
        const intro_wrapper_inner_div = intro_wrapper.querySelector('div');
        intro_wrapper_inner_div.classList.add('intro_relative');
        const intro_wrapper_svg_paths = intro_wrapper_inner_div.querySelectorAll('path');
        intro_wrapper_svg_paths.forEach(element => {
            element.classList.add('intro_start');
            element.classList.add('intro_show');
        });        
    }, 500);

    setTimeout(function(){
        const intros = document.querySelectorAll('.intro');
        intros.forEach(intro => {
            let intro_letters = intro.querySelectorAll('g');
            intro_letters.forEach(element => {
                element.classList.add('letter_translate');
            });
        });        
    }, 1000);

    setTimeout(() => {
        document.getElementsByTagName("body")[0].classList.remove('loading');
    }, 2500)

    if(pageName === 'home'){
        setTimeout(function(){
            const slides = document.querySelectorAll('.slide');
            const img_wraps = slides[0].querySelectorAll('.img_wrap');
            img_wraps.forEach(img_wrap => {
                img_wrap.classList.add('reveal');
            });
            // const imgs = gsap.utils.toArray('img', slides[0]);
            // const img_divs = gsap.utils.toArray('.img_wrap', slides[0]);
            // var yDist = 100;
    
            // gsap.from(img_divs, {
            //     duration: 0.8,
            //     opacity: 0,
            //     y: i => i == 1 ? -yDist - i * yDist : yDist + i * yDist,
            // });
            // imgs.forEach(img => {
                // gsap.from(img, )
                // console.log(img);
                // let img_wrap = $(img).parent('div');
                // gsap.from(img_wrap, {
                //     duration: 1,
                //     opacity: 0,
                //     y: "100%"
                // });
                // gsap.from(img, {
                //     duration: 1,
                //     x: "30"
                // });
            // });
        }, 2500);
    }    
}

window.onload = function() {
    playIntro();
    setTimeout(function() {
        $('.cursor').css('visibility', 'inherit');
    }, 1e3);
    ScrollTrigger.refresh();
    initMenuSlider();
    initMenu();
};

let gsapMatchMedia = gsap.matchMedia();
let breakPointDesktopLarge = 1900;
let breakPointLaptopLarge = 1440;
let breakPointLaptopMedium = 1366;
let breakPointTabMedium = 768;
let breakPointMobile = 460;

/**
 * Sub-Menu Slider
*/
const initMenuSlider = () => {
    let timeoutIndicator, swiperPlayedOnce = false, autoplayTimout;
    let menuSwiper = new Swiper(".submenu_slider", {
        slidesPerView: 5,
        speed: 800,
        // slidesPerGroup: 5,
        spaceBetween: 40,
        autoplay: {
            delay: 1000,
            // pauseOnMouseEnter: true
        },    
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        grabCursor: true,
        touchEventsTarget: 'container',
        breakpoints: {        
            1360: {
                spaceBetween: 60,
            },
            1920: {
                spaceBetween: 80,
            },
        }
    });
    
    menuSwiper.autoplay.stop();

    const slideOnHover = () => {
        let slideNextDone = false, slidePrevDone = false;
        $('ul.main_submenu.slide_menu').on('mouseover', '.submenu_slider', function (e) {
            let $this = $(this);
            if((e.pageX - this.offsetLeft) < $this.width() / 2){
                setTimeout (function() {
                    if(!slidePrevDone){
                        menuSwiper.slidePrev();
                        slidePrevDone = true;
                    }
                }, 500);
            }
            
            if((e.pageX - this.offsetLeft) > $this.width() / 2){
                setTimeout (function() {
                    if(!slideNextDone){
                        menuSwiper.slideNext();
                        slideNextDone = true;
                    }
                }, 500);
            }
        });
    }

    $('.main_ul li.submenu_holder').hover(() => {
        $('.menu-indicator').addClass('hide');

        if(!swiperPlayedOnce){
            setTimeout (function() {
                menuSwiper.autoplay.start();
                swiperPlayedOnce = true;
            }, 500);
            autoplayTimout = setTimeout (function() {
                menuSwiper.autoplay.stop();
                slideOnHover();
            }, 5000);
        }

        if(timeoutIndicator)
            clearTimeout(timeoutIndicator);
    }, () => {
        timeoutIndicator = setTimeout (function() {
            $('.menu-indicator').removeClass('hide');
            menuSwiper.autoplay.stop();
            slideOnHover();
        }, 800);
    });

    const tilt = $('.js-tilt').tilt({
        maxTilt: 5,
        transition: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
    });
}

/**
 * Menu Hover interactions, Active Status
 */
const initMenu = () => {
    let currenTranslateXValue = -150 + '%';
    let currenTranslateYValue = -50 + '%';
    let currenTransformValue = 'translate(' + currenTranslateXValue + ', ' + currenTranslateYValue + ')';
    let timeOut, paddingVal = 20;

    const setCurrentMenu = () => {
        currenTranslateXValue = $('.main_ul li.current').length ? $('.main_ul li.current').data('l') + '%' : currenTranslateXValue;
        currenTransformValue = 'translate(' + currenTranslateXValue + ', ' + currenTranslateYValue + ')';
        $('.hover_mask').css('transform', currenTransformValue);
        $('.main_ul li.current a').addClass('current');
    };   

    setCurrentMenu();

    $('.main_ul li').hover(function() {
        let index = $(this).index();
        $(this).parent().toggleClass('li_hovered_0'+(index + 1));
        let translateXValue = $(this).data('l') + '%';
        let translateYValue = '-50%';
        let transformValue = 'translate(' + translateXValue + ', ' + translateYValue + ')';
        $('.hover_mask').css('transform', transformValue);
        $(this).parent().find('a').removeClass('current');
        $(this).find('a').addClass('current');
        if(timeOut)
            clearTimeout(timeOut);
    }, function() {
        let links = $(this).parent().find('a');
        timeOut = setTimeout (function() {
            $('.hover_mask').css('transform', currenTransformValue);
            links.removeClass('current');
            setCurrentMenu();
        }, 1000);
    });

    $('.main_ul li').on('mouseenter', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('header').on('mouseleave', function(){
        $('.main_ul li').removeClass('active');
    });
    $('.slide_menu_wrap a').on('mouseenter', function(){
        $('.slide_menu').addClass('submenu_hovered');
        $(this).parents('.swiper-slide').siblings().find('.slide_menu_wrap').addClass('inactive');
    });
    $('.slide_menu_wrap a').on('mouseleave', function(){
        $(this).parents('.swiper-slide').siblings().find('.slide_menu_wrap').removeClass('inactive');
        $('.slide_menu').removeClass('submenu_hovered');
    });
    
    $('#menuToggle input').change(function() {
        if($('#menuToggle input').prop('checked'))
            $('body').css('overflow', 'hidden');
        else
            $('body').css('overflow', 'unset');
    });

    $('.has_sub a').click(function(e){
        e.preventDefault();
        $('.mobile-product-display').addClass('show');
        if($('#menuToggle input').prop('checked'))
            $('body').css('overflow', 'hidden');
            
        else
            $('body').css('overflow', 'unset');
    });
    $('.back-link').click(function(){
        $('.mobile-product-display').removeClass('show');
        if($('#menuToggle input').prop('checked'))
            $('body').css('overflow', 'hidden');
        else
            $('body').css('overflow', 'unset');
    });

    $('.search_link').click(function(){
        $('.search').addClass('active');
    });
    $('.close_search').click(function(){
        $('.search').removeClass('active');
    });
}

if(pageName === 'home') {
    //Custom Cursor
    let cursor_ball = $(".cursor__ball--big");
        document.body.addEventListener("mousemove", (function(e) {
            gsap.to(cursor_ball, .4, {
                x: e.pageX + 20,
                y: e.pageY + 20
            })
        }
    ));
    document.addEventListener("mousemove", (t) => {
        let n = parseInt(t.pageX / window.innerWidth * 100);
        n < 30 ? $(".cursor").addClass("prev__slide") : $(".cursor").removeClass("prev__slide"),
        n > 70 ? $(".cursor").addClass("next__slide") : $(".cursor").removeClass("next__slide")
    });

    var interleaveOffset = 0.5;

    //Swiper Sliders
    let swiperOptionsHeroSlider = {
        parallax: true,
        speed: 1200,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        // watchSlidesProgress: true,
        on:{
            slideChange: (swiper) => {
                if(swiper.previousIndex === 0){
                    let theSlide = $(swiper.slides[swiper.previousIndex]);
                    let imgWraps = theSlide.find('.img_wrap');
                    imgWraps.each((i, e) => {
                        $(e).removeClass('reveal');
                    });
                }
                if(swiper.previousIndex === 1){
                    let theSlide = $(swiper.slides[swiper.activeIndex]);
                    let imgWraps = theSlide.find('.img_wrap');
                    imgWraps.each((i, e) => {
                        $(e).addClass('reveal');
                    });
                }
                // Second Slide
                if(swiper.activeIndex === 1){
                    let theSlide = $(swiper.slides[swiper.activeIndex]);
                    let text = theSlide.find('h1');
                    text.each((i, t) => {
                        $(t).removeClass('reverse');
                        $(t).addClass('reveal');
                    });                
                    let bagImg = theSlide.find('.bag_img');
                    $(bagImg).addClass('reveal');
                }
                if(swiper.activeIndex === 0){
                    let theSlide = $(swiper.slides[swiper.previousIndex]);
                    let text = theSlide.find('h1');
                    text.each((i, t) => {
                        $(t).removeClass('reveal');
                    });
                    setTimeout(() => {
                        let bagImg = theSlide.find('.bag_img');
                        $(bagImg).removeClass('reveal');
                    }, 1000);
                }
                if(swiper.activeIndex === 2){
                    let theSlide = $(swiper.slides[swiper.previousIndex]);
                    let text = theSlide.find('h1');
                    text.each((i, t) => {
                        $(t).addClass('reverse');
                        $(t).removeClass('reveal');
                    });
                    setTimeout(() => {
                        let bagImg = theSlide.find('.bag_img');
                        $(bagImg).removeClass('reveal');
                    }, 1000);
                }
                // Third Slide
                if(swiper.activeIndex === 2){
                    let theSlide = $(swiper.slides[swiper.activeIndex]);
                    let text = theSlide.find('h1');
                    text.each((i, t) => {
                        $(t).removeClass('reverse');
                        $(t).addClass('reveal');
                    });
                    let logoImg = theSlide.find('.inner_cnt img');
                    logoImg.addClass('reveal');
                    let textP = theSlide.find('.inner_cnt p');
                    textP.addClass('reveal');
                    const contentLines = new SplitType(textP, { types: 'lines' });
                    let animateLines = gsap.to(contentLines.lines, {
                        x: 0,
                        opacity: 1,
                        stagger: 0.05,
                        delay: 0.3,
                        duration: 1.2,
                        ease:"power2.out",
                    });
                }
                if(swiper.activeIndex === 1){
                    let theSlide = $(swiper.slides[swiper.previousIndex]);
                    let text = theSlide.find('h1');
                    text.each((i, t) => {
                        $(t).removeClass('reveal');
                    });
                    setTimeout(() => {
                        let logoImg = theSlide.find('.inner_cnt img');
                        logoImg.removeClass('reveal');
                        let textP = theSlide.find('.inner_cnt p');
                        textP.removeClass('reverse');
                    }, 1000);
                }
                if(swiper.activeIndex === 3){
                    let theSlide = $(swiper.slides[swiper.previousIndex]);
                    let text = theSlide.find('h1');
                    text.each((i, t) => {
                        $(t).addClass('reverse');
                        $(t).removeClass('reveal');
                    });
                    setTimeout(() => {
                        let logoImg = theSlide.find('.inner_cnt img');
                        logoImg.removeClass('reveal');
                        let textP = theSlide.find('.inner_cnt p');
                        textP.removeClass('reveal');
                        textP.addClass('reverse');
                    }, 1000);
                }
                //Fourth Slide
                if(swiper.activeIndex === 3){
                    let theSlide = $(swiper.slides[swiper.activeIndex]);
                    let textP = theSlide.find('.cntblk p');
                    textP.addClass('reveal');
                    const contentLines = new SplitType(textP, { types: 'lines' });
                    let animateLines = gsap.to(contentLines.lines, {
                        x: 0,
                        opacity: 1,
                        stagger: 0.05,
                        delay: 0.3,
                        duration: 1.2,
                        ease:"power2.out",
                    });
                }
                if(swiper.activeIndex === 2){
                    let theSlide = $(swiper.slides[swiper.previousIndex]);
                    setTimeout(() => {
                        let textP = theSlide.find('.cntblk p');
                        textP.removeClass('reverse');
                    }, 1000);
                }
            },
        }
    }

    let heroSlider = new Swiper('.hero_slider', swiperOptionsHeroSlider);

    $('.hero_slider').on('click', (e) => {
        const clickTarget = $(e.target).parents('.slide');    
        if(clickTarget.length > 0) {
            const clickTargetWidth = clickTarget[0].offsetWidth;
            const xCoordInClickTarget = e.clientX - clickTarget[0].getBoundingClientRect().left;
            if (clickTargetWidth / 2 > xCoordInClickTarget) {
                heroSlider.slidePrev();
            } else {
                heroSlider.slideNext();
            }
        }    
    });

    let tlSnackingImage = gsap.timeline({
        scrollTrigger: {
            trigger: ".snacking",
            start: ()=>"top+=10% center",
            end: ()=>"+=80%",
            scrub: .8,
            // markers: true,
            toggleActions: "play none play reverse"
        }
    });

    tlSnackingImage.from($('.snacking_imgblk'), 1.2, {
        y: 300,
        x: 220,
        rotation: 50,
        transformOrigin: "50% bottom",
        ease: "power2.out",
    }, 0);
    
    const snackingContentHeading =  new SplitType($('.snacking_cnt h1'), { types: 'chars' });
    const snackingContentP = new SplitType($('.snacking_cnt p'), { types: 'words' });

    let tlSnackingContent = gsap.timeline({
        scrollTrigger: {
            trigger: ".snacking",
            start: ()=>"top center",
            end: ()=>"bottom bottom",
            scrub: false,
            // markers: true,
            toggleActions: "play none play reverse"
        }
    });
    tlSnackingContent.from(snackingContentHeading.chars, {
        autoAlpha: 0,
        yPercent: ()=>gsap.utils.random([-50, 50]),
        duration: ()=>gsap.utils.random(1, 2),
        ease: "elastic.out(1, 0.75)",
        stagger: .06,
    }, 0).from(snackingContentP.words, .5, {
        duration: 0.1,
        opacity: 0,
        stagger: 0.1,
        ease: "Linear.easeNone",
    }, '-=1').from('.snacking_cnt .common_btn', .5, {
        duration: 1.2,
        opacity: 0,
        y: -15,
        ease: "power1.out",
    }, '+=0.4');

    /**
     * Product Slider
     * 
     */
    const slideDuration = 5, slideDelay = 0.5;
    let isProductSlidesPlaying = false;
    const slides = gsap.utils.toArray('.products_slider .slide');
    const bgColors = [
        ["#b33611", "#f94a2a", "#df6d51", "#5e1503"],
        ["#76329d", "#5e0669", "#6f094e", "#5e2a99"],
        ["#ac3708", "#d27d04", "#a18d08", "#d5591b"],
        ["#27d661", "#17d791", "#086ccd", "#06819c"],
    ];
    const setSlides = () => {
        gsap.set(slides, {
            zIndex: (index) => slides.length - index,
        });
    }
    setSlides();

    const setCurrentSlideZIndex = (index) => {
        slides.forEach((s, i) => {
            if(i <= index)
                s.style.zIndex = s.style.zIndex - 1;
            if(i === index + 1)
                s.style.zIndex = slides.length;
        });
    }

    const setReverseSlideZIndex = (index) => {
        slides.forEach((s, i) => {
            if(i === index){
                let oZIndex = parseInt(s.style.zIndex);
                s.style.zIndex = slides.length;
                setTimeout(() => {
                    s.style.zIndex = oZIndex;
                }, (slideDuration * 1000) + (slideDelay * index * 1000));
            }
        });
    }

    const playProductSlider = () => {
        const mainTl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 5, onRepeat: () => {
            setSlides();
        } });

        const colorTl = gsap.timeline();
        const slideTl = gsap.timeline();

        slides.forEach((slide, slideIndex) => {
            const productInfo = slide.querySelector('.product_info');
            const productSliderWrap = slide.querySelector('.products_slider__wrap');
            colorTl.to(productInfo, {
                keyframes: {
                    backgroundColor: [
                        gsap.getProperty(productInfo, "backgroundColor"),
                        ...bgColors[slideIndex]
                    ],
                    easeEach: "none"
                },
                duration: slideDuration,
                delay: slideDelay * slideIndex,
            }, slideIndex === 0 ? 0.5 : slideIndex === 1 ? 1 : (slideDuration * 2 * (slideIndex - 1)) + (slideIndex - 1));
            
            if (slideIndex !== slides.length - 1) {
                slideTl.to(productSliderWrap, {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    duration: slideDuration,
                    ease: "back.inOut(1)",
                    onComplete: () => {
                        setCurrentSlideZIndex(slideIndex);
                    },
                    onReverseComplete: () => {
                        setReverseSlideZIndex(slideIndex);
                    }
                }, slideIndex * (slides.length * 3));
            }
        });

        mainTl.add(colorTl, 0);
        mainTl.add(slideTl, 0);
    }

    const animateTextSVG = (trigger) => {
        // let pathElements = $('.product_info:eq(1) .product_info_category .txt0');
        let pathElements = $('.product_info_category .txt0');
        let txt = gsap.utils.toArray(pathElements);
        let tl = trigger ? gsap.timeline({
            scrollTrigger: trigger
        }) : gsap.timeline();    
        tl.to(txt, {
            strokeDashoffset: 0,
            onStart: ()=>{
                // productsSwiper.init();
                if(!isProductSlidesPlaying){
                    setTimeout(() => {
                        playProductSlider();
                        isProductSlidesPlaying = true;
                    }, 5000);
                }            
            }
        }, 0);
    }

    let scrolT = {
        trigger: '.products_slider',
        start: 'top+=10% center+=20%',
        end: 'bottom-=20% bottom',
        // markers: true,
        scrub: 3
    }

    animateTextSVG(scrolT);

    //Testimonials
    let t;
    let cards = gsap.utils.toArray('#testimonial_cards .card');
    const angle = 10, offsetHeight = 100;
    const overwrite = "auto";
    let pinDistance = window.innerHeight * cards.length;

    ScrollTrigger.create({
        id: "pinned",
        trigger: '.testimonial',
        start: 'top top',
        pin: '.testimonial',
        end: "+=" + pinDistance,
        // markers: true,
        refreshPriority: 1,
        anticipatePin: 1,
        // invalidateOnRefresh: true,
        ease: 'none'
    });

    const animateCardsOnScroll = () => {
        gsapMatchMedia.add({
            isDesktop: `(min-width: ${breakPointDesktopLarge + 1}px)`,
            isDesktopMedium: `(min-width: ${breakPointLaptopLarge + 1}px)`,
            isLaptopLarge: `(max-width: ${breakPointLaptopLarge}px)`,
            isLaptopMedium: `(max-width: ${breakPointLaptopMedium}px)`,
        }, (context) => {
            let { isDesktop, isDesktopMedium, isLaptopLarge, isLaptopMedium } = context.conditions;

            gsap.set(cards, {
                y: 1000,
                rotate: (index) => -angle * index,
                zIndex: (index) => cards.length - index,
            });

            let tlText = gsap.timeline({
                scrollTrigger: {
                    trigger: '.testimonial_wrap',
                    start: 'top-=30% center+=20%',
                    end: 'bottom-=20% bottom',
                    // end: "+=" + pinDistance,
                    // markers: true,
                    id: 'tlText',
                    scrub: 1,
                    // toggleActions: "play none none reverse"
                }
            }), tlTextScrub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.testimonial',
                    start: 'top+=10% center-=20%',
                    end: "+=" + pinDistance,
                    id: 'tlTextScrub',
                    // markers: true,
                    scrub: 3,
                    // toggleActions: "play none play reverse"
                }
            });
            let hOnes = gsap.utils.toArray('.testimonial_wrap_cnt h1');
            tlText.from(hOnes, 2.2, {
                x: (index) => index === 0 ? '1000': index === 2 ? '2400' : '-2000',
            });

            ScrollTrigger.create({
                trigger: '.testimonial_wrap',
                start: 'center center-=10%',
                // pin: true,
                end: '+=' + pinDistance,
                // markers: true,
                onEnter() {
                    gsap.to('.card', {
                    y: 0,
                    duration: 1,
                    delay: 0.5,
                    stagger: {
                        amount: 0.5
                    },
                    overwrite: true,
                    onComplete: cardHoverAnimations(),
                    });
                },
                onLeaveBack() {
                    gsap.to('.card', {
                        y: 1000,
                        duration: 1,
                        stagger: {
                            amount: 0.5,
                        },
                        overwrite: true
                    });
                }
            });

            cards.forEach((card, index) => {
                if((index < cards.length - 1)){
                    let start = 'top+=' + window.innerHeight * (index) +' top';
                    // let end = 'top+=' + window.innerHeight * (index + 1);
                    ScrollTrigger.create({
                        id: 'card'+(index + 1),
                        trigger: card,
                        start: start,
                        // markers: true,
                        // end: end,
                        // refreshPriority: -1,
                        // anticipatePin: 1,
                        end: '+=' + pinDistance,
                        onEnter() {
                            // console.log(index, "enter");
                            gsap.timeline()
                            .to(card, {
                                rotate: -angle * (index + 1),
                                duration: 0.8, 
                                ease: 'power4.out',
                                overwrite: overwrite
                            }).to(card, {
                                y: -1200,
                                duration: 1,
                                ease: 'sine.inOut',
                                overwrite: overwrite
                            }, '-=0.2');
                        },
                        onLeaveBack() {
                            // console.log(index, "back");
                            gsap.timeline()
                            .to(card, {
                                y: 0,
                                duration: 0.8,
                                ease: 'power4.out',
                                overwrite: overwrite                        
                            }).to(card, {
                                rotate: -angle * index,
                                duration: 1, 
                                ease: 'sine.inOut',
                                overwrite: overwrite
                            }, '-=0.3');
                        }
                    });
                }
            });

            tlTextScrub.fromTo(hOnes, 8, {
                xPercent: (index) => index === 0 ? '0': index === 2 ? '0' : '0',
            }, {
                xPercent: (index) => {
                    let translateXValue;
                    switch(index) {
                        case 0:
                            translateXValue = isDesktop ? '-50' : isDesktopMedium ? '-45' : '-40';
                            break;
                        case 1:
                            translateXValue = isDesktop ? '-4' : isDesktopMedium ? '-3' : isLaptopMedium ? '-2' : '-1';
                            break;
                        case 2:
                            translateXValue = isDesktop ? '-6' : isDesktopMedium ? '-5' : isLaptopMedium ? '-4' : '-3';
                            break;
                        default:
                            translateXValue = isDesktop ? '100' : '60';
                    }
                    return translateXValue;
                }
            }, '+=2');
            tlTextScrub.to({}, {duration: 1});
        });
    }
    animateCardsOnScroll();

    const cardHoverAnimations = () => {
        cards.forEach((card, i) => {
            let siblingsLeft = cards.slice(i+1),
                siblingsRight = cards.slice(0, i);
            let zI, rotation, timer, otherCards;
            $(card).hover(() => {
                otherCards = $('.card').not(card);
                
                timer = setTimeout(function () {
                    zI = $(card).css("z-index");
                    rotation = gsap.getProperty(card, "rotation");
                    gsap.to($(card), {
                        zIndex: 5,
                        scale: 1.05,
                        ease: 'back.inOut(1)',
                        // rotate: 0,
                        // ease: "sine.out"
                        overwrite: true
                    })
                }, 500);        
            }, () => {
                gsap.to($(card), {
                    zIndex: parseInt(zI),
                    scale: 1,
                    // ease: "sine.out"
                });
                clearTimeout(timer);
            });
        });
    }

    let testimonialSlider = new Swiper('#goodluckcharms_swiper', {
        effect: 'fade',
        slidesPerView: 'auto',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.goodluck_next_btn',
            prevEl: '.goodluck_prev_btn',
        },
        speed: 500,    
    });

    $('#goodluckcharms').on('show.bs.modal', function (e) {
        var $modal = $(this);
        $modal.addClass('modal_active');
        setTimeout(function () {
            $modal.find('.modal-body').addClass('active');
            $modal.find('.modal-footer').addClass('active');
        }, 1500);
    });

    $('.btn-close').on('click', function (e) {
        var $modal = $('#goodluckcharms');
        $modal.find('.modal-footer').removeClass('active');
        $modal.addClass('out');

        setTimeout(function () {
            $modal.removeClass('out');
            $modal.removeClass('show');
            $modal.modal('hide');
            $modal.removeClass('modal_active');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $modal.find('.modal-body').removeClass('active');
            $('body').css({ overflow: '', paddingRight: '' });        
        }, 1000);
    });


    //Our Inspiration section Animation on Scroll
    const animateOnScroll = () => {
        gsapMatchMedia.add({
            isDesktop: `(min-width: ${breakPointDesktopLarge + 1}px)`,
            isDesktopMedium: `(min-width: ${breakPointLaptopLarge + 1}px)`,
            isLaptopLarge: `(max-width: ${breakPointLaptopLarge}px)`,
            isLaptopMedium: `(max-width: ${breakPointLaptopMedium}px)`,
        }, (context) => {
            let { isDesktop, isDesktopMedium, isLaptopLarge, isLaptopMedium } = context.conditions;
        
            let topTrigger = {
                trigger: '.our_inspiration',
                start: 'top center',
                end: 'bottom center',
                // markers: true,
                // scrub: 0.5
                toggleActions: "play none play reverse"
            };
            let centerTrigger = {
                trigger: '.our_inspiration_wrap',
                start: 'top+=30% center+=20%',
                end: 'bottom-=30% center',
                // markers: true,
                // scrub: 0.5
                toggleActions: "play none play reverse"
            };
            let cardsTl = gsap.timeline({
                scrollTrigger: centerTrigger
            });

            let textsTl = gsap.timeline({
                scrollTrigger: topTrigger
            });

            textsTl.from($('.our_inspiration_title h1'), 2.2, {
                opacity: 0.8,
                x: (index) => index === 0 ? '1250' : '-1750',
                ease: CustomEase.create("custom", "M0,0 C0.11,0.494 0.131,0.714 0.259,0.838 0.418,0.992 0.504,1 1,1 "),
                // skewX: '-20deg',
            }, 0);
            cardsTl.from($('.our_inspiration_cards_single'), 1, {
                y: '100%',
                ease: CustomEase.create("custom", "M0,0 C0.11,0.494 0.131,0.714 0.259,0.838 0.418,0.992 0.504,1 1,1 "),
                stagger: {
                    amount: .2
                },
                skewX: 45,
            }, 0).fromTo($('.our_inspiration_cards_single img'), 0.8, {
                clipPath: isDesktop ? 'inset(2% 10.1% 55% 10% round 33vw)' : isDesktopMedium ? 'inset(2% 10.1% 62% 10% round 33vw)' : 'inset(2% 10.1% 58% 10% round 33vw)',
            }, {
                clipPath: isDesktop ? 'inset(2% 4.1% 47% 4% round 33vw)' : 'inset(2% 4.1% 52% 4% round 33vw)',
                stagger: {
                    amount: .3
                },       
            }, '-=0.3').to($('.our_inspiration_cards_single img'), 0.6, {
                clipPath: 'inset(2% 4.1% -25% 4% round 33vw)',
                stagger: {
                    amount: .3
                },       
            }, '-=0.3');
        });
    }

    animateOnScroll();

    //About Us section Animation on Scroll
    const animateOnScrollAbout = () => {
        const aboutContentP = new SplitType($('.about_content p'), { types: 'words' });
        gsapMatchMedia.add({
            isDesktop: `(min-width: ${breakPointLaptopLarge + 1}px)`,
            isLaptopLarge: `(max-width: ${breakPointLaptopLarge}px)`,
            isLaptopMedium: `(max-width: ${breakPointLaptopMedium}px)`,
        }, (context) => {
            let { isDesktop, isLaptopLarge, isLaptopMedium } = context.conditions;
        
            gsap.set($('.about_image img'), {
                y: '150%',
                clipPath: 'polygon(0% 95%, 100% 95%, 100% 95%, 0% 95%)',
            });

            let topTrigger = {
                trigger: '.about',
                start: 'top center',
                end: 'bottom center',
                // markers: true,
                // scrub: 0.5
                toggleActions: "play none play reverse"
            };
            let centerTrigger = {
                trigger: '.about',
                start: 'top+=10% center+=10%',
                end: 'bottom center',
                // markers: true,
                scrub: 1.5,
            };
            let imageTl = gsap.timeline({
                scrollTrigger: centerTrigger
            });

            let textBigTl = gsap.timeline({
                scrollTrigger: topTrigger
            });

            let textPTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top+=10% center-=10%',
                    end: 'bottom center',
                    // markers: true,
                    scrub: false,
                    toggleActions: "play none play reverse"
                }
            });

            textBigTl.from($('.about_title h1'), 2.2, {
                opacity: 0.8,
                x: (index) => index === 0 ? '-1450' : '750',
                ease: CustomEase.create("custom", "M0,0 C0.11,0.494 0.131,0.714 0.259,0.838 0.418,0.992 0.504,1 1,1 "),
            }, 0);

            imageTl.to($('.about_image img'), 2, {
                y: '0',
                clipPath: isDesktop ? 'polygon(0% 12%, 100% 12%, 100% 92%, 0% 92%)' : 'polygon(0% 12%, 100% 12%, 100% 92%, 0% 92%)',
                ease: CustomEase.create("custom", "M0,0 C0.11,0.494 0.131,0.714 0.259,0.838 0.418,0.992 0.504,1 1,1 "),
            });

            textPTl.from(aboutContentP.words, .5, {
                duration: 0.1,
                opacity: 0,
                stagger: 0.1,
                ease: "Linear.easeNone",
            }, '-=1');
        });
    }

    animateOnScrollAbout();

    //Contact Us section Animation on Scroll
    const animateOnScrollContact = () => {
        const contactTitle = new SplitType($('.contact_title h1'), { types: 'chars' });
        const contactInfoEmail = new SplitType($('.contact_info h2.contact_info_email'), { types: 'chars' });
        const contactInfoPhone = new SplitType($('.contact_info h2.contact_info_phone'), { types: 'chars' });
        gsapMatchMedia.add({
            isDesktop: `(min-width: ${breakPointLaptopLarge + 1}px)`,
            isLaptopLarge: `(max-width: ${breakPointLaptopLarge}px)`,
            isLaptopMedium: `(max-width: ${breakPointLaptopMedium}px)`,
        }, (context) => {
            let { isDesktop, isLaptopLarge, isLaptopMedium } = context.conditions;
        
            gsap.set(contactTitle.chars, {
                transformOrigin: "center center -200px"
            });

            let topTrigger = {
                trigger: '.contact',
                start: 'top center+=20%',
                end: 'bottom center',
                // markers: true,
                // scrub: 0.5
                // toggleActions: "play none play reverse"
            };
            let textsTl = gsap.timeline({
                scrollTrigger: topTrigger
            });

            let textBigTl = gsap.timeline({
                scrollTrigger: topTrigger
            });

            textsTl.from('.contact_info', {
                autoAlpha: 0,
                duration: .7,
                ease: "power3.out"
            }, .6),
            textsTl.from('.contact_info h2.email', {
                autoAlpha: 0,
                y: 20,
                ease: "power3.out",
                duration: .7,
            }, .6),
            textsTl.from(contactInfoEmail.chars, 1, {
                autoAlpha: 0,
                yPercent: ()=>gsap.utils.random([-50, 50]),
                duration: ()=>gsap.utils.random(1, 2),
                ease: "elastic.out(1, 0.75)",
                stagger: .06,
                delay: 0.2,
            }, 1),
            textsTl.from('.contact_info h2.phone', {
                autoAlpha: 0,
                y: 20,
                ease: "power3.out",
                duration: .7,
            }, .8);
            textsTl.from(contactInfoPhone.chars, 1, {
                autoAlpha: 0,
                yPercent: ()=>gsap.utils.random([-50, 50]),
                duration: ()=>gsap.utils.random(1, 2),
                ease: "elastic.out(1, 0.75)",
                stagger: .06,
                delay: 0.2,
            }, 1.2);

            textBigTl.from(contactTitle.chars, {
                rotationX: 90,
                y: -100,
                stagger: 0.05,
                duration: 3,
                ease: 'elastic(1.8, 1.5)',
                delay: 2,
            });

            textBigTl.from(".contact_social li", {
                autoAlpha: 0,
                duration: 0.5,
                x: (index) => -100 * (index - 5),
                stagger: 0.1,
                clearProps: true
            }, '-=2');

        });
    }

    animateOnScrollContact();
}

if(pageName === 'shop') {
    let shopPageProductSwiper = new Swiper(".section__shop-page_products-slider__swiper", {   
        slidesPerView: 4,
        spaceBetween: 5,     
        width : window.innerWidth - 50,
        centeredSlides: true,
        grabCursor: true,
        breakpoints: {
            1440: {
                slidesPerView: 4,
                spaceBetween: 5,
            },
            1280: {
                slidesPerView: 3.75,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 5,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            360: {
                centeredSlides: false,
                slidesPerView: 2,
                spaceBetween: 10,
            },
        }
    });
    
    gsapMatchMedia.add({
        isDesktop: `(min-width: ${breakPointDesktopLarge + 1}px)`,
        isDesktopMedium: `(min-width: ${breakPointLaptopLarge + 1}px)`,
        isLaptopLarge: `(min-width: ${breakPointLaptopLarge}px)`,
        isLaptopMedium: `(min-width: ${breakPointLaptopMedium}px)`,
        isTabMedium: `(min-width: ${breakPointTabMedium}px)`,
        isMobile: `(max-width: ${breakPointMobile}px)`,
    }, (context) => {
        let { isTabMedium } = context.conditions;
        
        const shopBannerHeading =  new SplitType($('.section__shop-page_hero-title h1'), { types: 'chars' });
    
        let tlShopBannerText = gsap.timeline({
            scrollTrigger: {
                trigger: ".section__shop-page_hero",
                start: ()=>"top-=5% top",
                end: ()=>"bottom bottom",
                scrub: false,
            }
        });
        tlShopBannerText.from(shopBannerHeading.chars, {
            delay: 3,
            duration: 1.5,
            yPercent: 100,
            ease: "power4",
            stagger: 0.1
        });

        let productSliders = gsap.utils.toArray('.section__shop-page_products-slider');
        let productSlidersCategoryImages = gsap.utils.toArray('.section__shop-page_products-category-image__wrap img');
        let productSlidersCategoryTexts = gsap.utils.toArray('.section__shop-page_products-category-image__wrap h2');
        productSliders.forEach((slider, index) => {
            let slides = $(slider).find('.swiper-slide');
            let startVal = index === 0 ? isTabMedium ? "top-=20% center-=20%" : "top center+=25%" : isTabMedium ? "top-=20% center+=20%" : "top center+=20%";
            gsap.timeline({
                // delay: isMobile ? 3 : 0,
                scrollTrigger: {
                    trigger: slider,
                    start: ()=>startVal,
                    end: ()=>"bottom bottom",                    
                    // markers: true,
                    // toggleActions: "play none play reverse"
                }
            }).fromTo(productSlidersCategoryImages[index], 1, {
                x: '-150%',
                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            },{
                x: '0',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)',
                ease: CustomEase.create("custom", "M0,0 C0.11,0.494 0.131,0.714 0.259,0.838 0.418,0.992 0.504,1 1,1 "),
            }, 0).from(productSlidersCategoryTexts[index], 1, {
                duration: 1.5,
                ease: "power4",
                xPercent: 100,
            }, 0).from(slides, {
                duration: 1.5,
                xPercent: 20,
                opacity: 0,
                ease: "power4",
                stagger: 0.1
            }, '0.5')
        }); 
    });
    const stars_container = document.getElementsByClassName('stars-container');
    for(let element of stars_container){
        let rate = element.getAttribute('data-rate');
        let starsfill = element.getElementsByClassName('starfill');
        for(let i = 0; i < 5; i++){
            let star = element.getElementsByClassName('starfill')[i];
            if (rate > i) {
                if (rate < i+1) {
                    star.style.width = `${(rate - i) * 100 }%`;
                } else {
                    star.style.width = '100%';
                }
            } else {
                star.style.width = '0%';
            }
        }

    }
}

if(pageName === 'products') {
    const shopBannerHeading =  new SplitType($('.section__product-page_hero-title h1'), { types: 'chars' });
    
    gsapMatchMedia.add({
        isDesktop: `(min-width: ${breakPointDesktopLarge + 1}px)`,
        isDesktopMedium: `(min-width: ${breakPointLaptopLarge + 1}px)`,
        isLaptopLarge: `(min-width: ${breakPointLaptopLarge}px)`,
        isLaptopMedium: `(min-width: ${breakPointLaptopMedium}px)`,
        isTabMedium: `(min-width: ${breakPointTabMedium}px)`,
        isMobile: `(max-width: ${breakPointMobile}px)`,
    }, (context) => {
        let { isDesktop, isDesktopMedium, isLaptopLarge, isLaptopMedium, isTabMedium, isMobile } = context.conditions;

        let tlShopBannerText = gsap.timeline({
            scrollTrigger: {
                trigger: ".section__product-page_hero",
                start: ()=>"top-=5% top",
                end: ()=>"bottom bottom",
                scrub: false,
            }
        });
        tlShopBannerText.from(shopBannerHeading.chars, {
            delay: 3,
            duration: 1.5,
            yPercent: 100,
            ease: "power4",
            stagger: 0.05
        });

        let productIntroTitle = new SplitType($('.section__product-page_category_title h2'), { types: 'words' });
        let productBg = new SplitType($('.section__product-page_category_bg h1'), { types: 'chars' });
        let productAbout = isMobile ? new SplitType($('.product_category__content__about p'), { types: 'lines' }) : new SplitType($('.product_category__content__about p'), { types: 'words' });
        gsap.timeline({
            scrollTrigger: {
                trigger: '.section__product-page_category',
                start: ()=> isMobile ? "top+=10% center+=15%" : "top+=20% center+=10%",
                end: ()=>"bottom bottom",
                // markers: true,
                // toggleActions: "play none play reverse"
            }
        }).from(productIntroTitle.words, .8, {
            opacity: 0,
            y: 50,
            skewY: 2,
            stagger: {
                amount: .3
            },
        }, 0).fromTo(productBg.chars, {
            opacity: 0,
        },{
            opacity: 0.28,
            stagger: 0.25,
        }, 0.5).from('.product_category__image img', 1.5, {
            opacity: 0,
            scale: .8,
            rotationZ: 10,
            skewY: 10,
            ease: 'expo.out',
        }, isMobile ? 1 : 0.5).from(isMobile ? productAbout.lines : productAbout.words, .8, {
            opacity: 0,
            stagger: .08,
        }, 0).from('.product_category__content__usp-list li .usp_icon', 0.8, {
            opacity: 0,
            scale: .2,
            stagger: .2,
            ease: 'elastic(1.8, 1.5)',
        }, isMobile ? 1 : 0.5).from('.product_category__content__usp-list li .usp_content p', 1, {
            opacity: 0,
            stagger: .3,
        }, isMobile ? 1.2 : 0.8);

        let productsTitle = new SplitType($('.section__product-page_products_title h2'), { types: 'words' });
        let productsBg = new SplitType($('.section__product-page_products_bg h1'), { types: 'chars' });
        gsap.timeline({
            scrollTrigger: {
                trigger: '.section__product-page_products',
                start: ()=>"top center",
                end: ()=>"bottom bottom",
                // markers: true,
                // toggleActions: "play none play reverse"
            }
        }).from(productsTitle.words, .8, {
            opacity: 0,
            y: 50,
            skewY: 2,
            stagger: {
                amount: .3
            },
        }, 0).fromTo(productsBg.chars, {
            opacity: 0,
        },{
            opacity: 0.28,
            stagger: 0.25,
        }, 0.5);

        let productsSlides = $('.section__product-page_products-slider__swiper').find('.swiper-slide');
        gsap.timeline({
            scrollTrigger: {
                trigger: '.section__product-page_products-slider__swiper',
                start: ()=>"top+=10% center",
                end: ()=>"bottom bottom",
                // markers: true,
                // toggleActions: "play none play reverse"
            }
        }).from($(productsSlides).find('.product_image-wrapper'), {
            duration: 1.5,
            yPercent: 20,
            opacity: 0,
            ease: "power4",
            stagger: 0.1
        }, 0).from($(productsSlides).find('.product_info'), {
            duration: 1.5,
            yPercent: -10,
            opacity: 0,
            ease: "power4",
            stagger: 0.1
        }, 0.5);

        let productDetails = gsap.utils.toArray('.section__product-page_product-details .product-details__wrap');
        productDetails.forEach((productDetailsWrap, index) => {        
            if(index === 0){
                let productDetailsTitle = new SplitType($(productDetailsWrap).find('.product_info_intro__title h3'), { types: 'chars' });
                let productAbout = isMobile ? new SplitType($(productDetailsWrap).find('.product_info_description__about p'), { types: 'lines' }) : new SplitType($(productDetailsWrap).find('.product_info_description__about p'), { types: 'words' });
                let pathElements = $(productDetailsWrap).find('.product_info_category .txt0');
                let txt = gsap.utils.toArray(pathElements);
                gsap.timeline({
                    scrollTrigger: {
                        trigger: productDetailsWrap,
                        start: ()=>"top center+=20%",
                        end: ()=>"bottom bottom",
                        // markers: true,
                        // toggleActions: "play none play reverse"
                    }
                }).from(productDetailsTitle.chars, {
                    duration: 1.5,
                    xPercent: -50,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.1
                }, 0).from($(productDetailsWrap).find('.icon_card'), {
                    duration: 1.5,
                    yPercent: 20,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.1
                }, 0.5).from(isMobile ? productAbout.lines : productAbout.words, 0.8, {
                    duration: 1.5,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.1
                }, 1).from([$(productDetailsWrap).find('.product_info_description__specs h2'), 
                $(productDetailsWrap).find('.product_info_description__specs p'), 
                $(productDetailsWrap).find('.product_info_description__specs .product__add-to-cart-button')], 1.2, {
                    duration: 1.5,
                    xPercent: (index) => (index === 0 || index === 1) ? '10' : 0,
                    yPercent: (index) => index === 2 ? '100' : 0,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.5
                }, 1.5).to(txt, 3, {
                    strokeDashoffset: 0,
                    ease: "power4",
                    stagger: 0.1
                }, 0.5);
            } else if(index === 1){
                let productSpecsHeadingFacts = isMobile ? new SplitType($(productDetailsWrap).find('.product_details__facts h3'), { types: 'words' }) : new SplitType($(productDetailsWrap).find('.product_details__facts h3'), { types: 'chars' });
                let productSpecsHeadingAllergen = new SplitType($(productDetailsWrap).find('.product_details__allergen-info h3'), { types: 'chars' });
                let productSpecsHeadingIngredients = new SplitType($(productDetailsWrap).find('.product_details__ingredients-list h3'), { types: 'chars' });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: productDetailsWrap,
                        start: ()=>"top+=10% center+=20%",
                        end: ()=>"bottom bottom",
                        // markers: true,
                        // toggleActions: "play none play reverse"
                    }
                }).from(isMobile ? productSpecsHeadingFacts.words :productSpecsHeadingFacts.chars, 0.8, {
                    xPercent: -50,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.03
                }, 0).from($(productDetailsWrap).find('.facts_wrap'), 0.8, {
                    yPercent: 20,
                    opacity: 0,
                    ease: "power4"
                }, 0.5).from(productSpecsHeadingIngredients.chars, 0.8, {
                    xPercent: -50,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.03
                }, 0).from($(productDetailsWrap).find('.product_details__ingredients-list p'), 0.8, {
                    yPercent: 20,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.15
                }, 0.5).from($(productDetailsWrap).find('.product_details__features-list p'), 0.8, {
                    y: 50,
                    skewY: 8,
                    opacity: 0,
                    ease: 'elastic(1.8, 1.5)',
                    stagger: 0.2
                }, 1);
                
                gsap.timeline({
                    scrollTrigger: {
                        trigger: productDetailsWrap,
                        start: ()=>isMobile ? "top+=20% center+=20%" : "top+=50% center+=20%",
                        end: ()=>"bottom bottom",
                        // markers: true,
                        // toggleActions: "play none play reverse"
                    }
                }).from(productSpecsHeadingAllergen.chars, 0.8, {
                    xPercent: -50,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.03
                }, 0).from($(productDetailsWrap).find('.info_card .info_card_img'), 0.8, {
                    opacity: 0,
                    scale: .3,
                    ease: 'elastic(1.8, 1.5)',
                    stagger: 0.3
                }, 0.5).from($(productDetailsWrap).find('.info_card .info_card_description'), 0.8, {
                    yPercent: 20,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.35
                }, 0.5).from([$(productDetailsWrap).find('.product_details__specs h2'), 
                $(productDetailsWrap).find('.product_details__specs p'), 
                $(productDetailsWrap).find('.product_details__specs .product__add-to-cart-button')], 1.2, {
                    duration: 1.5,
                    xPercent: (index) => (index === 0 || index === 1) ? '10' : 0,
                    yPercent: (index) => index === 2 ? isMobile ? '20'  : '100' : 0,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.5
                }, 1);

                if(isMobile){
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: $('.product_details__ingredients-wrap'),
                            start: ()=>"center+=10% center",
                            end: ()=>"bottom bottom",
                            // markers: true,
                            // toggleActions: "play none play reverse",
                            onEnter: () => {
                                // let imageHeight = $('.product_img img').innerHeight(), padHeight = 52;
                                // let topOffset = (document.querySelector('.product_img img').getBoundingClientRect().top / 2) + document.querySelector('.product_details__ingredients-wrap').getBoundingClientRect().top + imageHeight + padHeight;
                                // let topOffset = $('.section__product-page_product-details').offset().top;
                                // console.log(document.querySelector('.product_img img').getBoundingClientRect().top / 2);
                                $('.product_img').addClass('stop');
                                // $('.product_img').css({
                                //     // top: "calc(28vh + "+topOffset+"px)"
                                //     top: +topOffset+"px"
                                // });
                            },
                            onLeaveBack: () => {
                                $('.product_img').removeClass('stop');
                                // $('.product_img').css({
                                //     top: "0px"
                                // });
                            }
                        }
                    })
                    // .to($('.product_img'), 0.1, {
                    //     opacity: 0,
                    //     zIndex: -1
                    // });
                }
            } else {
                let productReviewHeadings = new SplitType($(productDetailsWrap).find('.product_reviews__info h3'), { types: 'chars' });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: productDetailsWrap,
                        start: ()=>"top+=10% center+=20%",
                        end: ()=>"bottom bottom",
                        // markers: true,
                        // toggleActions: "play none play reverse"
                    }
                }).from(productReviewHeadings.chars, 0.8, {
                    xPercent: -50,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.03
                }, 0).from($(productDetailsWrap).find('.user-review__wrap'), 1.2, {
                    yPercent: 10,
                    opacity: 0,
                    ease: "power4",
                    stagger: 0.3
                }, 0.5).from([$(productDetailsWrap).find('.product_reviews__specs h2'), 
                $(productDetailsWrap).find('.product_reviews__specs p'), 
                $(productDetailsWrap).find('.product_reviews__specs .product__add-to-cart-button'), 
                $(productDetailsWrap).find('.product_reviews__specs .product__explore-button')], 0.8, {
                    duration: 1,
                    xPercent: (index) => (index === 0 || index === 1) ? '10' : 0,
                    yPercent: (index) => (index === 2 || index === 3) ? '100' : 0,
                    opacity: 0,
                    ease: 'power4',
                    stagger: 0.5
                }, 1);
            }        
        })

        let productPageProductSwiper = new Swiper(".section__product-page_products-slider__swiper", {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            centeredSlides: true,
            initialSlide: 2,
            speed: 800,
            parallax: true,
            loop: true,
            spaceBetween: 100,
            grabCursor: true,
            touchEventsTarget: 'container',
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: -100,
                depth: 200,
                modifier: 1,
                scale: 1,
                slideShadows: false,
            },
            breakpoints: {
                768: {
                    spaceBetween: 60,
                },
                360: {
                    spaceBetween: 20,
                    coverflowEffect: {
                        depth: 300,
                    }
                },
            },
        });
        const stars_container = document.getElementsByClassName('stars-container');
        for(let element of stars_container){
            let rate = element.getAttribute('data-rate');
            let starsfill = element.getElementsByClassName('starfill');
            for(let i = 0; i < 5; i++){
                let star = element.getElementsByClassName('starfill')[i];
                if (rate > i) {
                    if (rate < i+1) {
                        star.style.width = `${(rate - i) * 100 }%`;
                    } else {
                        star.style.width = '100%';
                    }
                } else {
                    star.style.width = '0%';
                }
            }

        }
    });
}

if(pageName === 'news-page') {
    let newsBannerHeadings = gsap.utils.toArray('.section__in-the-news_hero h1');
    let newsBannerMainTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section__in-the-news_hero',
            start: ()=>"top-=5% top",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    });

    newsBannerHeadings.forEach((newsBannerHeading, index) => {
        let theHeading = new SplitType($(newsBannerHeading), { types: 'chars' });
        newsBannerMainTl.from(theHeading.chars, {
            delay: 3,
            duration: 1.5,
            yPercent: 100,
            ease: "power4",
            stagger: 0.05
        }, index * 0.25);
    });

    const newsArticlesIntro =  new SplitType($('.section__in-the-news_articles_intro h2'), { types: 'lines' });    
    let tlNewsArticlesIntroText = gsap.timeline({
        scrollTrigger: {
            trigger: ".section__in-the-news_articles",
            start: ()=>"top center+=20%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    });
    tlNewsArticlesIntroText.from(newsArticlesIntro.lines, .8, {
        opacity: 0,
        stagger: .12,
    }).from('.news_articles .swiper-wrapper', .8, {
        opacity: 0,
        y: 50,
    }, 0.5);

    const newsNumbersIntro =  new SplitType($('.section__in-the-news_numbers_intro h1'), { types: 'words' });    
    let tlNewsNumbersIntroText = gsap.timeline({
        scrollTrigger: {
            trigger: ".section__in-the-news_numbers",
            start: ()=>"top center+=20%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    });
    tlNewsNumbersIntroText.from(newsNumbersIntro.words, .8, {
        duration: 1.5,
        xPercent: 50,
        opacity: 0,
        ease: "power4",
        stagger: 0.1
    }, 0.5).from('.section__in-the-news_number', .8, {
        opacity: 0,
        y: 40,
        stagger: .1,
    }, 1);

    let newsPageSwiper = new Swiper(".swiper-container", {
        slidesPerView: 'auto',
        effect: 'slide',
        speed: 1200,
        loop: true,
        direction: 'vertical',
        height : window.innerHeight - 320,
        spaceBetween: 60,
        grabCursor: true,
        breakpoints: {
            1440: {
                spaceBetween: 60,
            },
            1024: {
                spaceBetween: 40,
            },
            768: {
                spaceBetween: 30,
            },
            375: {
                direction: 'horizontal',
                spaceBetween: 15,
            },
        },
        pagination: {
            el: ".pagination-bullets",
            clickable: true,
        },
    });
}

if(pageName === 'about-page') {
    const aboutBannerHeading =  new SplitType($('.section__about-page_hero-title h1'), { types: 'chars' });
    
    let tlAboutBannerText = gsap.timeline({
        scrollTrigger: {
            trigger: ".section__about-page_hero",
            start: ()=>"top-=5% top",
            end: ()=>"bottom bottom",
            scrub: false,
        }
    });
    tlAboutBannerText.from(aboutBannerHeading.chars, {
        delay: 3,
        duration: 1.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.05
    });

    let aboutMissionTitle = new SplitType($('.section__about-page_mission-title h2'), { types: 'lines' });
    let aboutMissionContent = new SplitType($('.section__about-page_mission-title p'), { types: 'lines' });
    
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_mission',
            start: ()=>"top+=10% center+=20%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from(aboutMissionTitle.lines, .8, {
        opacity: 0,
        y: 50,        
        skewY: 2,
        stagger: {
            amount: .3
        },
    }, 0).from(aboutMissionContent.lines, .8, {
        opacity: 0,
        stagger: .12,
    }, 1).from([$('.section__about-page_mission-statement'), 
    $('.section__about-page_vision-statement')], 0.8, {
        duration: 1,
        xPercent: (index) => (index === 0) ? '-20' : '20',
        opacity: 0,
        ease: 'power4',
        stagger: 0.4
    }, 2);

    let aboutHistoryContent = new SplitType($('.section__about-page_history-info p'), { types: 'lines' });
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_history',
            start: ()=>"top center+=20%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from(aboutHistoryContent.lines, .8, {
        opacity: 0,
        stagger: .12,
    });

    let aboutOperationsTitle = new SplitType($('.section__about-page_operations-title h2'), { types: 'lines' });
    let aboutOperationContent = new SplitType($('.section__about-page_operations-title p'), { types: 'lines' });
    
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_operations',
            start: ()=>"top+=10% center+=10%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from(aboutOperationsTitle.lines, .8, {
        opacity: 0,
        y: 50,        
        skewY: 2,
        stagger: {
            amount: .3
        },
    }, 0).from(aboutOperationContent.lines, .8, {
        opacity: 0,
        stagger: .12,
    }, 1);

    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_local',
            start: ()=>"top center+=10%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from('.section__about-page_local-wrap .nav-link', .8, {
        opacity: 0,
        x: -30,
        stagger: {
            amount: .3
        },
    }, 0).from('.section__about-page_local-wrap .tab-content', .8, {
        opacity: 0,
        x: 20,
    }, 0.5);

    let aboutFounderTitle = new SplitType($('.section__about-page_founder-info h2'), { types: 'lines' });
    let aboutFounderInfo = new SplitType($('.section__about-page_founder-info p'), { types: 'lines' });    
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_founder-info',
            start: ()=>"top+=20% center+=10%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from(aboutFounderTitle.lines, .8, {
        opacity: 0,
        y: -30,
        stagger: {
            amount: .3
        },
    }, 0).fromTo('.section__about-page_founder-info img', {
        clipPath: 'polygon(0px 0px, 0px 0px, 0px 100%, 0px 100%)',
    }, {
        duration: 1.5,
        clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)',
        ease: 'expo.inOut',
    }, 1).from(aboutFounderInfo.lines, .8, {
        opacity: 0,
        stagger: .12,
    }, 1.5);

    let aboutTeamTitle = new SplitType($('.section__about-page_team-title h2'), { types: 'words' });

    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_team',
            start: ()=>"top+=20% center+=10%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from(aboutTeamTitle.words, .8, {
        opacity: 0,
        y: 50,        
        skewY: 2,
        stagger: {
            amount: .3
        },
    }, 0).from('.section__about-page_team-member', 0.8, {
        opacity: 0,
        y: 20,
        stagger: {
            amount: .2
        },
    }, 1);

    let aboutContactTitles = gsap.utils.toArray('.section__about-page_contact h1');
    let contactMainTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section__about-page_contact',
            start: ()=>"top center+=10%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    });

    aboutContactTitles.forEach((aboutContactTitle, index) => {
        let theTitle = new SplitType($(aboutContactTitle), { types: 'chars' });
        contactMainTl.from(theTitle.chars, .8, {
            opacity: 0,
            x: 50,
            stagger: {
                amount: .3
            },
        }, index * 2.5);
    });

    let contactIntroTitle = new SplitType($('.intro-details-wrap h2'), { types: 'lines' });
    let contactIntroInfo = new SplitType($('.intro-details-wrap p'), { types: 'words' });

    let contactIntro = gsap.timeline().from(contactIntroTitle.lines, 0.8, {
        opacity: 0,
        y: 10,
        stagger: {
            amount: .3
        },
    }, 0).from(contactIntroInfo.words, 0.8, {
        opacity: 0,
        stagger: .12,
    }, 0.5);

    let contactSocialTitle = new SplitType($('.social-details-wrap h2'), { types: 'words' });
    let contactSocialTl = gsap.timeline().from(contactSocialTitle.words, 0.8, {
        opacity: 0,
        y: 20,
        stagger: {
            amount: .3
        },
    }, 0).from('.social-details-wrap li', 0.8, {
        opacity: 0,
        x: 20,
        stagger: .12,
    }, 1);

    contactMainTl.add(contactIntro, 0.5);
    contactMainTl.add(contactSocialTl, 3);

    document.querySelectorAll('#v-pills-tab .nav-link').forEach(function(everyitem){
        var tabTrigger = new bootstrap.Tab(everyitem)
        everyitem.addEventListener('mouseenter', function(){
            tabTrigger.show();
        });	
    });

}

if(pageName === 'b2b-page') {
    const b2bBannerHeading =  new SplitType($('.section__b2b-page_hero-title h1'), { types: 'chars' });    
    let tlShopBannerText = gsap.timeline({
        scrollTrigger: {
            trigger: ".section__b2b-page_hero",
            start: ()=>"top-=5% top",
            end: ()=>"bottom bottom",
            scrub: false,
        }
    });
    tlShopBannerText.from(b2bBannerHeading.chars, {
        delay: 3,
        duration: 1.5,
        yPercent: 100,
        ease: "power4",
        stagger: 0.05
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__b2b-page_business',
            start: ()=>"top center",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from('.section__b2b-page_business-wrap .image', 0.8, {
        opacity: 0,
        x: -40,
    }, 0);

    gsap.timeline({
        scrollTrigger: {
            trigger: '.section__b2b-page_business',
            start: ()=>"top center-=10%",
            end: ()=>"bottom bottom",
            // markers: true,
            // toggleActions: "play none play reverse"
        }
    }).from(['.section__b2b-page_business-wrap .business', '.section__b2b-page_business-wrap .partners', '.section__b2b-page_business-wrap .numbers'], 0.8, {
        opacity: 0,
        y: 40,
        stagger: 0.5
    }, 0.5)

    let partnersLogoSwiper = new Swiper(".logo-swiper", {
        slidesPerView: 3,
        effect: 'slide',
        speed: 1200,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            reverseDirection: false,
            disableOnInteraction: false,
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 2,
            },
            360: {
                slidesPerView: 2,
            },
        }
    });

    $('.show_business__content').click(function(e) {
        e.preventDefault();
        $('.business__content').addClass('show');
    });
    $('.close_business__content').click(function(e) {
        e.preventDefault();
        $('.business__content').removeClass('show');
    });

    $('.show_partners__content').click(function(e) {
        e.preventDefault();
        $('.partners__content').addClass('show');
    });
    $('.close_partners__content').click(function(e) {
        e.preventDefault();
        if(!$('.partners__content__wrap__intro').hasClass('hide')){
            $('.partners__content').removeClass('show');
        } else {
            $('.partner-details > .show').removeClass('show');
            $('.partners__content__wrap__intro').removeClass('hide');
            $('.partners__content').css('overflow-y', 'hidden');
        }
    });

    $('.show_numbers__content').click(function(e) {
        e.preventDefault();
        $('.numbers__content').addClass('show');
    });
    $('.close_numbers__content').click(function(e) {
        e.preventDefault();
        $('.numbers__content').removeClass('show');
    });

    $('li.logo').click(function(){
        let contentId = $(this).data('content-id');
        $('.partners__content__wrap__intro').addClass('hide');
        $('.partners__content').css('overflow-y', 'scroll');
        $('.partner-details').find(`[data-content='${contentId}']`).addClass('show');
    });

    /**
     * Enable Scrolling if needed
     */
    // const lenisNumbersContainer = new Lenis({
    //     wrapper: document.querySelector('.numbers-details'),
    // });
    // function rafNumbersContainer(time) {
    //     lenisNumbersContainer.raf(time);
    //     requestAnimationFrame(rafNumbersContainer);
    // }
    // requestAnimationFrame(rafNumbersContainer);    
}

if(pageName === 'cart-page') {
    const cartHeading =  new SplitType($('.section__cart-page-items__wrap .title h1'), { types: 'chars' });    
    let tlCartTitle = gsap.timeline({
        scrollTrigger: {
            trigger: ".section__cart-page-items",
            start: ()=>"top-=5% top",
            end: ()=>"bottom bottom",
            scrub: false,
        }
    });
    tlCartTitle.from(cartHeading.chars, {
        delay: 3,
        duration: 1.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.05
    }, 0).from('.item-row', 0.8, {
        opacity: 0,
        y: 20,
        stagger: {
            amount: .3
        },
    }, 3.5).from('.section__cart-page-items__order-summary', 0.8, {
        opacity: 0,
    }, 4);

    // Order Summary Slider
    let orderSummarySwiper = new Swiper(".order-summary", {
        slidesPerView: 1,
        effect: 'slide',
        speed: 800,
        direction: 'vertical',
        spaceBetween: 20,
        allowTouchMove: false,
        pagination: {
            el: '.cart-pagination',
            type: 'bullets',
            clickable: false,
        },
        autoHeight: true,
        on:{
            slideChangeTransitionStart:function(swiper){
                swiper.pagination.bullets.forEach((bullet, i) => {
                    if(i < swiper.activeIndex)
                        bullet.classList.add('swiper-pagination-bullet-complete');
                    else
                        bullet.classList.remove('swiper-pagination-bullet-complete');
                });           
            },
        }
    });

    $('a[data-next-step]').on('click', function () {
        orderSummarySwiper.slideNext();
    });

    $('.to-confirm').on('click', function () {
        $('.cart-info').addClass('order-confirmed');
        $('.cart-page-empty').addClass('order-confirmed');
        $('.slide-wrap-payment').addClass('confirmed');
        $('.card-info__wrap').addClass('confirmed');
        $('.order-confirmation').addClass('confirmed');
    });

    const cleaveZen = window.cleaveZen
    const {
        formatCreditCard,
        registerCursorTracker,
        DefaultCreditCardDelimiter,
        formatNumeral,
        formatDate,
        formatGeneral,
        DefaultDateDelimiter
    } = cleaveZen

    const initInputFormat = () => {
        const creditcardInput = document.querySelector('.creditcard-input')
        const cvvInput = document.querySelector('.cvvInput')
        const dateInput = document.querySelector('.dateInput')
        const mobileNoInput = document.querySelector('.mobileNoInput')
        registerCursorTracker({
            input: creditcardInput,
            delimiter: DefaultCreditCardDelimiter,
        })
        creditcardInput.addEventListener('input', e => {
            creditcardInput.value = formatCreditCard(e.target.value)
        })
        registerCursorTracker({
            input: cvvInput,
        })
        cvvInput.addEventListener('input', e => {
            cvvInput.value = formatNumeral(e.target.value, {
                stripLeadingZeroes: false,
                numeralIntegerScale: 3,
                numeralPositiveOnly: true,
                numeralThousandsGroupStyle: 'none',
            })
        })
        registerCursorTracker({
            input: dateInput,
            delimiter: DefaultDateDelimiter,
        })
        dateInput.addEventListener('input', e => {
            dateInput.value = formatDate(e.target.value, {
                datePattern: ['m', 'y'],
            })
        })
        registerCursorTracker({
            input: mobileNoInput,
        })
        mobileNoInput.addEventListener('input', e => {
            mobileNoInput.value = formatGeneral(e.target.value, {
                stripLeadingZeroes: false,
                delimiter: ' ',
                prefix: '+91',
                blocks: [3, 5, 5],
                numericOnly: true,
            })
        })
    }

    initInputFormat();

    function initSpinners() {
        // enable active states for buttons in mobile safari
        document.addEventListener("touchstart", function () {}, false);
    
        setInputButtonState();
    }
    
    function handleNumberInput() {
        setInputButtonState();
    }
    
    function handleNumberInputBlur(event) {
        const value = event.target.value;
    
        if (event.target.hasAttribute("min") && value < parseFloat(event.target.min))
            event.target.value = event.target.min;
    
        if (event.target.hasAttribute("max") && value > parseFloat(event.target.max))
            event.target.value = event.target.max;
    }
    
    function setInputButtonState() {
        const inputs = document.getElementsByClassName("number-input-text-box");
    
        for (let input of inputs) {
            if (input.id.length > 0) {
                const value = input.value;
                const parent = input.parentElement.parentElement;
    
                if (parent.children[0] && input.hasAttribute("min"))
                    parent.children[0].disabled = value <= parseFloat(input.min);
    
                if (parent.children[2] && input.hasAttribute("max"))
                    parent.children[2].disabled = value >= parseFloat(input.max);
            }
        }
    }
    
    function setNumber(event) {
        let button = event.target;
        let input = document.getElementById(button.dataset.inputId);
    
        if (input) {
            let value = parseFloat(input.value);
            let step = parseFloat(input.dataset.step);    
            if (button.dataset.operation === "decrement") {
                value -= isNaN(step) ? 1 : step;
            } else if (button.dataset.operation === "increment") {
                value += isNaN(step) ? 1 : step;
            }    
            if (input.hasAttribute("min") && value < parseFloat(input.min)) {
                value = input.min;
            }    
            if (input.hasAttribute("max") && value > parseFloat(input.max)) {
                value = input.max;
            }    
            if (input.value !== value) {
                setInputValue(input, value);
                setInputButtonState();
            }
        }
    }
    
    function setInputValue(input, value) {
        let newInput = input.cloneNode(true);
        const parentBox = input.parentElement.getBoundingClientRect();    
        input.id = "";    
        newInput.value = value;    
        if (value > input.value) {
            input.parentElement.appendChild(newInput);
            input.style.marginTop = -parentBox.height + "px";
        } else if (value < input.value) {
            newInput.style.marginTop = -parentBox.height + "px";
            input.parentElement.prepend(newInput);
            window.setTimeout(function () {
                newInput.style.marginTop = 0
            }, 20);
        }    
        window.setTimeout(function () {
            input.parentElement.removeChild(input);
        }, 250);
    }

    initSpinners();
}

if(pageName === 'profile-page') {
    let productImagesSwiper = new Swiper(".product-images-swiper", {
        slidesPerView: 'auto',
        effect: 'slide',
        spaceBetween: 10,
        speed: 1200,
        loop: false,
        grabCursor: true,        
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 2.5,
            },
            360: {
                slidesPerView: 2.5,
            },
        }
    });

    /**
     * Navigation - Enable Scrolling if needed
     */
    const lenisProfileNav = new Lenis({
        wrapper: document.querySelector('.navigation'),
    });
    function rafProfileNavContainer(time) {
        lenisProfileNav.raf(time);
        requestAnimationFrame(rafProfileNavContainer);
    }
    requestAnimationFrame(rafProfileNavContainer);

    /**
     * Profile Side-bar Menu Toggle
     */
    $('.menu_toggle').click(function(){
        $('.navigation').addClass('active');
    });
    $('.close_menu').click(function(){
        $('.navigation').removeClass('active');
    });
}