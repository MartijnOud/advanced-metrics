/* 
 * 
 * Google Analytics automatisch event/goal tracking
 *
 * @version v1.0.0
 *
 */
$(function () {

    /* Mailto/tel events
    * =====================*/
    $("[href*='tel:'], [href*='mailto:']").click(function(e) {
      
      var href = $(this).attr('href');

      if (href.toLowerCase().indexOf("tel") >= 0) {
        var eventCategory = 'Bellen';
        var eventAction = href.slice(4);
      }
      if (href.toLowerCase().indexOf("mailto") >= 0) {
        var eventCategory = 'Mailen';
        var eventAction = href.slice(7);
      }

      ga('send', 'event', eventCategory, eventAction);

      e.preventDefault();
      setTimeout(function(){
        window.location = href;
      }, 500);
    });

    /* External links
    * =====================*/
    $("a[href]").click(function(e) {

        var hostname = new RegExp(location.host);
        var href = $(this).attr('href');

        var eventCategory = 'External';
        var eventAction = href;
        var eventLabel = $(this).text();

        if (href.slice(0, 4) == "http" && !hostname.test(href)) {
          ga('send', 'event', eventCategory, eventAction, eventLabel);
        }
        
    });

    /* PDF/Doc downloads
    * =====================*/
    $("[href*='.pdf'], [href*='.docx']").click(function(e) {
      
      var href = $(this).attr('href');
      var eventCategory = 'Download PDF';
      var eventAction = 'Download';
      var eventLabel = href;

      if (href.toLowerCase().indexOf(".docx") >= 0) {
        var eventCategory = 'Download docx';
      }

      ga('send', 'event', eventCategory, eventAction, eventLabel);

      e.preventDefault();
      setTimeout(function(){
        window.location = href;
      }, 500);
    });

});