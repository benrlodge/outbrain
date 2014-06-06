(function() {
  window.MyOutbrain = {
    recs: {
      load: function(recs, wrapper, container, id) {
        var limit, outbrain_callback, recsHTML, request_data, vars, widgetContainer, widgetId, widgetWrapper;
        widgetWrapper = wrapper;
        widgetContainer = container;
        widgetId = id;
        limit = recs - 1;
        recsHTML = '';
        vars = {
          widgetWrapper: wrapper,
          widgetContainer: container
        };
        request_data = {
          permalink: document.URL,
          widgetId: id
        };
        outbrain_callback = function(json) {
          $.each(json.doc, function(index, value) {
            recsHTML += " \n<li class='ob-item'> <a data-outbrain-url=\"" + value.url + "\" href='" + value.orig_url + "'>\n	<img src=\"" + value.thumbnail.url + "\" alt=\"image\">\n	<span class='title'>" + value.content + "</span>\n	</a>\n</li>";
            if (index === limit) {
              return false;
            }
          });
          return $(widgetWrapper).show().find(widgetContainer).append(recsHTML);
        };
        return OBR.extern.callRecs(request_data, outbrain_callback);
      }
    }
  };

  $(document).ready(function() {
    return $('body').on('click', '.ob-widget-items-container .ob-item a', function(e) {
      var blog_link, callBackFuncObj, ob_url, reqData;
      e.preventDefault();
      blog_link = $(this).attr('href');
      ob_url = $(this).data('outbrain-url');
      reqData = {
        link: ob_url
      };
      callBackFuncObj = function() {
        return window.location.href = blog_link;
      };
      return OBR.extern.callClick(reqData, callBackFuncObj);
    });
  });

}).call(this);
