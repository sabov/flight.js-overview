
'use strict';

define(
  [
    'components/flight/lib/component'
  ],

  function(defineComponent) {

    return defineComponent(slidesControls);

    function slidesControls() {
      this.defaultAttrs({
        //selectors
        nextControlsSelector: 'button.nextSlideBtn',
        previousControlSelector: 'button.prevSlideBtn',
        toListControlSelector: 'button.toListView'
      });

      this.nextSlide = function(ev, data) {
        this.trigger('uiNextSlideRequested');
      };

      this.prevSlide = function(ev, data) {
        this.trigger('uiPreviousSlideRequested');
      };

      this.toList = function(ev, data) {
        this.trigger('uiListViewRequested');
      };

      this.after('initialize', function() {
        this.on('click', {
          'nextControlsSelector': this.nextSlide,
          'previousControlSelector': this.prevSlide,
          'toListControlSelector': this.toList
        });
      });
    }
  }
);

