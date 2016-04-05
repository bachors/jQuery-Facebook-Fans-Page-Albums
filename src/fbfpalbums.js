/***********************************************************
* #### jQuery Facebook Fans Page Albums v0.0.01 ####
* Coded by Ican Bachors 2016.
* http://ibacor.com/labs/jquery-facebook-fans-page-albums
* Updates will be posted to this site.
***********************************************************/

$.fn.fbfpalbums = function(g, h) {
    $(this).html('<a class="fbfpback">Back</a><ul class="fbfpalbums"></ul>');
    get_albums("html", "");

    function get_albums(d, e) {
        $.ajax({
            url: 'https://graph.facebook.com/' + g + '/albums?access_token=' + h + '&fields=id,count,cover_photo,created_time,from,link,name,type,updated_time&after=' + e,
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function(b) {
            var c = '';
            $.each(b.data, function(i, a) {
                c += '<li class="fbfpalbum" data-albumnama="' + b.data[i].name + '" data-albumid="' + b.data[i].id + '"><img src="http://graph.facebook.com/' + b.data[i].cover_photo + '/picture"/><div class="title">' + b.data[i].name + '</div><div class="count">' + b.data[i].count + '</div></li>'
            });
            if (b.paging.cursors.before != b.paging.cursors.after && b.paging.next != null) {
                c += '<div class="aload"><a class="amore">Load More</a></div>'
            }
            if (d == "html") {
                $('.fbfpalbums').html(c)
            } else {
                $('.fbfpalbums').append(c)
            }
            $('.fbfpalbum').click(function() {
                var a = $(this).data("albumid"),
                    albumnama = $(this).data("albumnama");
                get_photos("html", a, "");
                $(".fbfpback").css("display", "block");
                $(".fbfpback").html('Back / ' + albumnama);
                return false
            });
            $('.amore').click(function() {
                $(".aload").remove();
                get_albums("", b.paging.cursors.after);
                return false
            })
        })
    }

    function get_photos(d, e, f) {
        $.ajax({
            url: 'https://graph.facebook.com/' + e + '/photos?access_token=' + h + '&fields=id,created_time,from,height,icon,images,link,name,picture,updated_time,width,source&after=' + f,
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function(b) {
            var c = '';
            $.each(b.data, function(i, a) {
                c += '<li class="fbfpphoto"><a href="' + b.data[i].images[0].source + '" class="fbfppopup" rel="fbfppopup" title="' + (b.data[i].name != null ? b.data[i].name : "") + '"><img src="' + b.data[i].picture + '"/></a><div class="count">' + relative_time(b.data[i].created_time) + '</div></li>'
            });
            if (b.paging.cursors.before != b.paging.cursors.after && b.paging.next != null) {
                c += '<div class="pload"><a class="pmore">Load More</a></div>'
            }
            if (d == "html") {
                $('.fbfpalbums').html(c)
            } else {
                $('.fbfpalbums').append(c)
            }
            $('.pmore').click(function() {
                $(".pload").remove();
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
