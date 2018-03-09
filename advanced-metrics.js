/* 
 * 
 * Google Analytics event/goal tracking for gtag.js
 *
 * @version v1.1.1
 *
 */
(function($) {

    /*
    * 
    * Mailto/tel events
    *
    * Category: 
    *     Bellen
    *     Mailen
    * 
    * Action:
    *     $href
    * 
    * Label:
    *     n/a
    * 
    * Value:
    *     n/a
    * =====================*/
    $(document).on("click", "[href*='tel:'], [href*='mailto:']", function(e) { 

      var href = $(this).attr('href');
      var target  = $(this).attr('target');

      if (href.toLowerCase().indexOf("tel") >= 0) {
        var eventCategory = 'Bellen';
        var eventAction = href.slice(4);
      }
      if (href.toLowerCase().indexOf("mailto") >= 0) {
        var eventCategory = 'Mailen';
        var eventAction = href.slice(7);
      }

      gtag('event', 'event_name', {
        'event_category': eventCategory,
        'event_action': eventAction
      });

      // Add delay if opening in same window so event is actually sent
      if (target != '_blank') {
        e.preventDefault();
        setTimeout(function() {
          window.location = href;
        }, 500);
      }

    });

    /*
    * 
    * External links
    *
    * Category: 
    *     External
    * 
    * Action:
    *     $href
    * 
    * Label:
    *     $value
    * 
    * Value:
    *     n/a
    * =====================*/
    $(document).on("click", "a[href]", function(e) {  

        var hostname = new RegExp(location.host);
        var href = $(this).attr('href');
        var target  = $(this).attr('target');

        var eventCategory = 'External';
        var eventAction = href;
        var eventLabel = $(this).text();

        if (href.slice(0, 4) == "http" && !hostname.test(href)) {
          gtag('event', 'event_name', {
            'event_category': eventCategory,
            'event_action': eventAction,
            'event_label': eventLabel
          });

          // Add delay if opening in same window so event is actually sent
          if (target != '_blank') {
            e.preventDefault();
            setTimeout(function() {
              window.location = href;
            }, 500);
          }

        }
      
    });

    /*
    * 
    * .pdf / .docx downloads
    *
    * Category: 
    *     Download PDF
    *     Download docx
    * 
    * Action:
    *     $href
    * 
    * Label:
    *     n/a
    * 
    * Value:
    *     n/a
    * =====================*/
    $(document).on("click", "[href*='.pdf'], [href*='.docx']", function(e) { 
      
      var href = $(this).attr('href');
      var target  = $(this).attr('target');
      var eventCategory = 'Download PDF';
      var eventAction = href;

      if (href.toLowerCase().indexOf(".docx") >= 0) {
        var eventCategory = 'Download docx';
      }

      gtag('event', 'event_name', {
        'event_category': eventCategory,
        'event_action': eventAction
      });


      // Add delay if opening in same window so event is actually sent
      if (target != '_blank') {
        e.preventDefault();
        setTimeout(function() {
          window.location = href;
        }, 500);
      }

    });

}(jQuery));