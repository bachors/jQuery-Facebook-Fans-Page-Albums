/***********************************************************
* #### jQuery Facebook Fans Page Albums v2.0 ####
* Coded by Ican Bachors 2016.
* https://github.com/bachors/jQuery-Facebook-Fans-Page-Albums/
* Updates will be posted to this site.
***********************************************************/

$.fn.fbfpalbums = function(set) {
    $(this).html('<div class="fbfpalbums"><div class="fbfpback"></div><div class="galleri"></div><div class="aload"><a class="amore">Load More</a></div><div class="pload"><a class="pmore">Load More</a></div></div>');
	get_albums("html", "");

    function get_albums(d, e) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + set.fp + '/albums?access_token=' + set.token + '&fields=id,count,cover_photo,created_time,from,link,name,type,updated_time&after=' + e,
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function(b) {
			var c = '';
            $.each(b.data, function(i, a) {
                c += '<div class="thumbnail-wrapper"><a class="thumbnail" data-albumnama="' + b.data[i].name + '" data-albumid="' + b.data[i].id + '" style="background: url(http://graph.facebook.com/' + b.data[i].cover_photo.id + '/picture)"><div class="title">' + b.data[i].name + '</div><div class="count">' + b.data[i].count + '</div></a></div>'
            });
            if (b.paging.cursors.before != b.paging.cursors.after && b.paging.next != undefined && b.paging.next != null) {
                $(".aload").css("display", "block");
            }
            if (d == "html") {
                $('.galleri').html(c)
            } else {
                $('.galleri').append(c)
            }
            $('.thumbnail').click(function() {
                var a = $(this).data("albumid"),
                    albumnama = $(this).data("albumnama");
                get_photos("html", a, "");
                $(".fbfpback").css("display", "block");
                $(".fbfpback").html('<b>' + b.data[0].from.name + '</b> / ' + albumnama);
                return false
            });
            $('.amore').click(function() {
                $(".aload").css("display", "none");
                get_albums("", b.paging.cursors.after);
                return false
            })
        })
    }

    function get_photos(d, e, f) {
        $.ajax({
            url: 'https://graph.facebook.com/v2.9/' + e + '/photos?access_token=' + set.token + '&fields=id,created_time,from,height,icon,images,link,name,picture,updated_time,width,source&after=' + f,
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function(b) {
            var c = '';
            $.each(b.data, function(i, a) {
				var t = b.data[i].images.length - 1;
                c += '<div class="thumbnail-wrapper"><a href="' + b.data[i].images[0].source + '" class="thumbnail popup" rel="popup" title="' + (b.data[i].name != undefined && b.data[i].name != null ? b.data[i].name : 'By ' + b.data[i].from.name) + '"style="background: url(' + b.data[i].images[t].source + ')"><div class="title"></div><div class="count">' + relative_time(b.data[i].created_time) + '</div></a></div>'
            });
            if (b.paging.cursors.before != b.paging.cursors.after && b.paging.next != undefined && b.paging.next != null) {
                $(".pload").css("display", "block");
            }
            if (d == "html") {
                $('.galleri').html(c)
            } else {
                $('.galleri').append(c)
            }
            $('.pmore').click(function() {
                $(".pload").css("display", "none");
                get_photos("", e, b.paging.cursors.after);
                return false
            });
            $('.fbfpback').click(function() {
                $(".fbfpback").css("display", "none");
                get_albums("html", "");
                return false
            })
        })
    }

    function relative_time(a) {
        if (!a) {
            return
        }
        a = $.trim(a);
        a = a.replace(/\.\d\d\d+/, "");
        a = a.replace(/-/, "/").replace(/-/, "/");
        a = a.replace(/T/, " ").replace(/Z/, " UTC");
        a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        var b = new Date(a);
        var c = (arguments.length > 1) ? arguments[1] : new Date();
        var d = parseInt((c.getTime() - b) / 1000);
        d = (d < 2) ? 2 : d;
        var r = '';
        if (d < 60) {
            r = 'Just now'
        } else if (d < 120) {
            r = 'a min'
        } else if (d < (45 * 60)) {
            r = (parseInt(d / 60, 10)).toString() + ' mins ago'
        } else if (d < (2 * 60 * 60)) {
            r = 'an hr'
        } else if (d < (24 * 60 * 60)) {
            r = '' + (parseInt(d / 3600, 10)).toString() + ' hrs ago'
        } else if (d < (48 * 60 * 60)) {
            r = 'a day'
        } else {
            r = (parseInt(d / 86400, 10)).toString() + ' days ago'
        }
        return r
    }
}
