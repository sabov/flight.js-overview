'use strict';

define(

  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/data',
    'app/templates'
  ],

  function(defineComponent, Mustache, dataStore, templates) {
    return defineComponent(slides);

    function slides() {

      var currSlide  = 0;
      var slideWidth = 800;

      this.defaultAttrs({
        //selectors
        slideSelector: '.slide',
        slidesHolderSelector: '.slides-holder',
      });

      this.renderSlides = function(slides) {
        return Mustache.render(templates.slideItem, { slides: slides });
      };

      this.getSlides = function(index) {
        return dataStore.slides;
      };

      this.toListView = function() {
        var slides = this.select('slideSelector');
        console.log(slides);
        var holder = this.select('slidesHolderSelector');
        holder.width('200%').css({
          'transform': 'scale(0.5)',
          'margin': '-30% 0 0 -50%'
        });
        console.log(holder);
      };

      this.showSlide = function(index) {
        var self = this;
        var slides = this.select('slideSelector');
        slides.each(function(key, el) {
          if(index > currSlide) {
            if(key < index) {
              self.hide(el)
            }
          }else {
            if(key > index) {
              self.show(el);
            }
          }
        });
        this.show(slides[index], true);
        currSlide = index;

      };

      this.hide = function(el) {
        $(el).css({
          'transform': 'translate(2000px,100px)'
        });
      };
      
      this.show = function(el, isFirst) {
          var r  = isFirst? 0 : Math.floor((Math.random()*10)+1)-5;
          $(el).css({
            'transform': 'translate(200px,100px) rotate('+ r + 'deg)',
          });
      };

      this.shift = function(number) {
        var nextSlide = this.getCurrSlideIndex() + number;
        this.showSlide(nextSlide);
      };

      this.getCurrSlideIndex = function() {
        return currSlide;
      };

      this.onResize = function() {
      };

      this.move = function() {
        var slides = this.select('slideSelector');
        slides.last().css({
          'transform': 'translate(2000px,100px)'
        });
      };

      this.init = function() {
        var slides = this.select('slideSelector');
        var length = slides.length;
        slides.each(function(key, el) {
          var r  = Math.floor((Math.random()*10)+1)-5;
          r = key == 0? '0' : r;
          $(el).css({
            'transform': 'translate(200px,100px) rotate('+ r + 'deg)',
            'opacity': '1',
            'z-index': (length-key)
          });
        });
      };

      this.after("initialize", function() {
        var data = this.getSlides();
        //this.$node.append(this.renderSlides(data));
        this.on(document, "uiNextSlideRequested", this.shift.bind(this, 1));
        this.on(document, "uiPreviousSlideRequested", this.shift.bind(this, -1));
        this.on(document, "uiListViewRequested", this.toListView);
        this.init();
      });
    }

  }
);
