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
        var holder = this.select('slidesHolderSelector');
        holder.width('200%').css({
          'transform': 'scale(0.5)',
          'margin': '-30% 0 0 -50%'
        });
        console.log(holder);
      };

      this.showSlide = function(index) {
        var left  = index * slideWidth;
        this.$node.animate({
          scrollLeft: left
        })
      };

      this.shift = function(number) {
        var nextSlide = this.getCurrSlideIndex() + number;
        this.showSlide(nextSlide);
      };

      this.getCurrSlideIndex = function() {
        var actualScroll = this.$node.scrollLeft();
        return ~~(actualScroll/slideWidth);
      };

      this.onResize = function() {
      };

      this.after("initialize", function() {
        var data = this.getSlides();
        this.$node.append(this.renderSlides(data));
        this.on(document, "uiNextSlideRequested", this.shift.bind(this, 1));
        this.on(document, "uiPreviousSlideRequested", this.shift.bind(this, -1));
        this.on(document, "uiListViewRequested", this.toListView);
      });
    }

  }
);
