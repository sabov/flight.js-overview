'use strict';

define(

  [
    'app/component_data/slides',
    'app/component_ui/slides_controls'
  ],

  function(
    SlidesData,
    SlidesControlsUI) {

    function initialize() {
      SlidesData.attachTo('.slides');
      SlidesControlsUI.attachTo('.slidesControls');
    }

    return initialize;
  }
);
