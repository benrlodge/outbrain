window.MyOutbrain =

	recs:

		load: (recs, wrapper, container, id) ->		
			widgetWrapper = wrapper
			widgetContainer = container
			widgetId = id
			limit = recs - 1
			recsHTML = ''

			vars = 
				widgetWrapper: wrapper
				widgetContainer: container

			request_data =
				permalink: document.URL
				widgetId: id

			outbrain_callback = (json) ->

				$.each json.doc, (index, value) ->
					recsHTML += """ 
					<li class='ob-item'> <a data-outbrain-url="#{value.url}" href='#{value.orig_url}'>
						<img src="#{value.thumbnail.url}" alt="image">
						<span class='title'>#{value.content}</span>
						</a>
					</li>
					"""
					return false if index is limit

				$(widgetWrapper).show()
					.find(widgetContainer)
					.append(recsHTML)

			OBR.extern.callRecs(request_data, outbrain_callback)





$(document).ready ->

	$('body').on 'click', '.ob-widget-items-container .ob-item a', (e) ->
		e.preventDefault()

		blog_link = $(this).attr('href')
		ob_url = $(this).data('outbrain-url') ## get outbrain url from link
		reqData = link: ob_url

		callBackFuncObj = ->
			window.location.href = blog_link

		OBR.extern.callClick reqData, callBackFuncObj
		



