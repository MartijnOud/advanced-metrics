/* 
 * 
 * Advanced Metrics
 *
 * Google Analytics event/goal tracking
 * Supports gtag() and ga()
 *
 * @version v1.2.0
 *
 */
(function($) {

    function checkAnalyticsVersion() {
      var analytics_version = 0;
      if (window.gtag) {
        var analytics_version = 1;
      } else if (window.ga && ga.loaded) {
        var analytics_version = 2;
      } else if (window._gaq && window._gaq._getTracker) {
        var analytics_version = 3;
      }
      return analytics_version;
    }

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

      var analytics_version = checkAnalyticsVersion();

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
      
      if (analytics_version == 2) {
        ga('send', 'event', eventCategory, eventAction);
      } else {
        gtag('event', eventAction, {
          'event_category': eventCategory
        });
      }

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

        var analytics_version = checkAnalyticsVersion();

        var hostname = new RegExp(location.host);
        var href = $(this).attr('href');
        var target  = $(this).attr('target');

        var eventCategory = 'External';
        var eventAction = href;
        var eventLabel = $(this).text();

        if (href.slice(0, 4) == "http" && !hostname.test(href)) {

          if (analytics_version == 2) {
            ga('send', 'event', eventCategory, eventAction);
          } else {
            gtag('event', eventAction, {
              'event_category': eventCategory
            });
          }

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

      var analytics_version = checkAnalyticsVersion();
      
      var href = $(this).attr('href');
      var target  = $(this).attr('target');
      var eventCategory = 'Download PDF';
      var eventAction = href;

      if (href.toLowerCase().indexOf(".docx") >= 0) {
        var eventCategory = 'Download docx';
      }

      if (analytics_version == 2) {
        ga('send', 'event', eventCategory, eventAction);
      } else {
        gtag('event', eventAction, {
          'event_category': eventCategory
        });
      }

      // Add delay if opening in same window so event is actually sent
      if (target != '_blank') {
        e.preventDefault();
        setTimeout(function() {
          window.location = href;
        }, 500);
      }

    });

}(jQuery));