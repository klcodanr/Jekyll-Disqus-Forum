---
layout: none
---

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));
var categoryId = qs['category'];
var threadName = $("<div>"+qs['thread']+"</div>").text();

// Set the Disqus Variables
var disqus_shortname = '{{ site.disqus_shortname }}'; 
var disqus_identifier = threadName;
var disqus_title = threadName;
var disqus_category_id = categoryId;
var disqus_url = '{{ site.url }}/thread.html?thread=' + encodeURIComponent(qs['thread']) + '&category=' + categoryId;

// Update the page based on the thread
document.title = threadName + ' | ' + document.title;
$('.thread-title').html(threadName);

// Include the Disqus Component
(function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

//Get the category data
$.ajax({
	type: 'GET',
	url: "{{ site.baseurl }}/categories.json",
	cache: false,
	dataType: "json",
	success: function (categories) {
		var category = categories[categoryId];
		$('.category-link').html(category.title);
		$('.category-link').attr('href', category.url);
	}
});