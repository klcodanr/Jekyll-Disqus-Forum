---
layout: none
---

var loadThreads = function(cursor){
	$("#threads").html('');
	$('#thread-loader').show();
	var data = { 
		api_key: '{{ site.disqus_publickey }}',
		category : $('#threads').attr('data-id')
	};
	if(cursor){
		data.cursor = cursor;
	}
	$.ajax({
		type: 'GET',
		url: "https://disqus.com/api/3.0/categories/listThreads.json",
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
		    		if(thread.isClosed){
		    			thread['status'] = 'glyphicon glyphicon-lock';
		    		}
		    		if(thread.isDeleted){
		    			return;
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
var sanitize = function(){
	$('#title').val($("<div>"+$('#thread-ui').val()+"</div>").text());
	$('#message').val($("<div>"+$('#message-ui').val()+"</div>").text());
}
$('#thread-ui').change(function(){
	sanitize();
});
$('#thread-ui').keyup(function(){
	sanitize();
});
$('#new-thread').submit(function(){
	sanitize();
	$.ajax({
		dataType: 'jsonp',
		url: 'https://disqus.com/api/3.0/threads/create.jsonp',
		data: $('#new-thread').serialize(),
		type: "POST",
		success: function(data){
			window.data = data;
			alert('success');
		},
		error: function( jqXHR, textStatus, errorThrown){
			alert('Fail: '+textStatus+' '+errorThrown);
		}
	})
	if($('.thread').val() == ''){
		$('#new-thread .form-group').addClass('has-error');
		$('#new-thread .help-block').removeClass('hidden');
		return false;
	}
	return false;
});