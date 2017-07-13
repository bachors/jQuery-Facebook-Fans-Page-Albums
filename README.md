# jQuery-Facebook-Fans-Page-Albums
Feed & browser your facebook fan page album photos.

<h3>Example:</h3>
<pre>&lt;!-- CSS --&gt;
&lt;link type="text/css" rel="stylesheet" href="src/fbfpalbums.css" /&gt;
&lt;link type="text/css" rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css"/&gt;

&lt;!-- HTML --&gt;
&lt;div class="anu"&gt;&lt;/div&gt;

&lt;!-- jQuery --&gt;
&lt;script type="text/javascript" src="//code.jquery.com/jquery-2.2.1.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="src/fbfpalbums.js"&gt;&lt;/script&gt;
&lt;script&gt;
$(document).ready(function(){
	
	// Setting fbfpalbums
	$("#anu").fbfpalbums({
		fp: "MemeComicIndonesi", // your username or id facebook fans page
		token: "accessToken" // your facebook accessToken
	});

	// Setting fancybox
	$(".fbfpalbums .popup").fancybox({   
		openEffect : 'fade',
		closeEffect : 'fade'
	});

});
&lt;/script&gt;</pre>
