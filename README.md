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

    // Setting fancybox
    $(".fbfppopup").fancybox({   
        openEffect : 'fade',
        closeEffect : 'fade'
    });
    
    // Setting fbfpalbums
    $(".anu").fbfpalbums(
        fp = "MemeComicIndonesi", // your username or id facebook fans page
        token = "775908159169504|cYEIsh0rs25OQQC8Ex2hXyCOut4" // your facebook accessToken
    );

});
&lt;/script&gt;</pre>

<h3><a href="http://ibacor.com/demo/jquery-facebook-fans-page-albums">DEMO</a></h3>
