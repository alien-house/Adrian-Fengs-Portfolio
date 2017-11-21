import jQuery from 'jquery';
// import { TweenMax, TweenLite, isTweening, Power1, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
const $ = jQuery;

export class ResponsiveSetting {
    
    constructor() {
        this.windowWidth = 0;
    }

    init() {
        let self = this;
        $(window).resize(function () {
            $('.video-wrap').css({ 'height': SiteInfo.getWinHeight() + 'px' });
            self.windowWidth = parseInt($(window).width(), 10);
        });

            $('.video-wrap').css({ 'height': SiteInfo.getWinHeight() + 'px' });
            // console.log(window.screenTop);
            var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
            // var lengh = 500;
        $(document).on(mousewheelevent,function(e){
            // e.preventDefault();
            // var scrSet;
            // var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
            // if (delta < 0){
            //     scrSet =  $(document).scrollTop()+lengh;
            // } else {
            //     scrSet =  $(document).scrollTop()-lengh;
                
            // }
            // TweenLite.to(window, 0.9, {
            //     scrollTo:scrSet,
            //     ease: Power1.easeInOut
            // });
        });
    }
}

export class SiteInfo {
    static spWidth = 768;
    static getWinHeight(){
        return parseInt($(window).outerHeight(), 10);
    }
    static getWinWidth(){
        return parseInt($(window).outerWidth(), 10);
    }
}


