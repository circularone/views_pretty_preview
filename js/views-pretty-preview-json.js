(function ($, Drupal) {
  Drupal.behaviors.beautifyViewsJson = {
    attach: function (context, settings) {
      var livePreview = $('body').find('.views-live-preview');

      if (livePreview[0] && livePreview[0].children) {
        for (var i = 0; i < livePreview[0].children.length; i++) {
          if (livePreview[0].children[i].localName
            && livePreview[0].children[i].localName === 'pre') {

            var exists = $('body').find('#views-pretty-preview-json');

            if (!exists.length) {
              var json = JSON.parse(livePreview[0].children[i].innerHTML);
              var formatter = new JSONFormatter(json, 'Infinity', { theme: 'dark' });
              formatter.openAtDepth(10);

              livePreview[0]
                .children[i]
                .style = 'display: none;';

              var container = $('<div id="views-pretty-preview-json" style="background:#353535;padding:20px;border-radius:5px;"></div>');
              container[0].appendChild(formatter.render());

              document
                .getElementById('views-live-preview')
                .appendChild(container[0]);
            }
          }
        }
      }
    }
  };
})(jQuery, Drupal);
