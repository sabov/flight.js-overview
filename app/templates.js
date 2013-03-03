'use strict';

define(
  function() {

    var slideItem =
      '<div class="slides-holder">\
        {{#slides}}\
          <div class="slide"><h1>{{title}}</h1><p>{{content}}</p></div>\
        {{/slides}}\
      </div>';

    return {
      slideItem: slideItem
    }
  }
);
