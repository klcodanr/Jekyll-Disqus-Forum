---
layout: none
---

var loadThreads = function(cursor){
	$("#threads").html('');
	var data = { 
		api_key: '{{ site.disqus_publickey }}',
		category : $('#threads').attr('data-id')
	};
	if(cursor){
		data.cursor = cursor;
	}
	$.ajax({
		type: 'GET',
		url: "https://disqus.com/api/3.0/categories/listThreads.jsonp",
		data: data,
		cache: false,
		dataType: "jsonp",
		success: function (result) {
			var authors = [];
			$.Mustache.load('{{ site.baseurl }}/templates/thread.html').done(function() {
				$('#thread-loader').hide();
		    	$.each(result.response,function(idx, thread){
		    		thread.startDate = new Date(thread.createdAt).toLocaleString();
		    		if(authors.indexOf(thread.author) == -1){
		    			authors.push(thread.author);
		    		}
		    		$('#threads').mustache('thread', thread);
				});
	    		$('.pager .next, .pager .previous').unbind('click').addClass('disabled');
		    	if(result.cursor.hasNext){
		    		$('.pager .next').removeClass('disabled').click(function(){
		    			loadThreads(result.cursor.next);
		    		})
		    	}
		    	if(result.cursor.hasPrev){
		    		$('.pager .previous').removeClass('disabled').click(function(){
		    			loadThreads(result.cursor.prev);
		    		})
		    	}
				$.each(authors,function(idx, author){
					$.ajax({
						type: 'GET',
						url: "https://disqus.com/api/3.0/users/details.jsonp",
						data: { 
							api_key: '{{ site.disqus_publickey }}',
							user : author
						},
						dataType: "jsonp",
						success: function(result){
							$('.author-'+author).mustache('author', result.response);
						}
					})
				});
		    });
		}
	});
}
loadThreads();