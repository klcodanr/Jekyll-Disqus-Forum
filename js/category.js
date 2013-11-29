$.ajax({
	type: 'GET',
	url: "https://disqus.com/api/3.0/categories/listThreads.jsonp",
	data: { 
		api_key: '{{ site.disqus_publickey }}',
		category : '{{ page.id }}'
	},
	cache: false,
	dataType: "jsonp",
	success: function (result) {
		$.Mustache.load('{{ site.baseurl }}/templates/thread.html').done(function() {
	    	$.each(result.response,function(idx, thread){
	    		$('#threads').mustache('thread', thread);
			});
	    });
	}
});