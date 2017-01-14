/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

/*===========================
 1. function declearetion
 ==========================*/
var themeApp = {

	setNavbar: function() {
		if(typeof fixed_navbar != "undefined" && fixed_navbar == true) {
			$('#main-navbar').addClass('navbar-fixed-top');
			$('body').addClass('has-fixed-navbar');
		}
	},

	latestSlider: function() {
		var latest = $("#title-slider");
		var latestPost;
		if(latest.length && typeof Latest_slider_post_count !== 'undefined') {
			var string = '';
			$.get(ghost.url.api('posts', {include:"tags", limit: Latest_slider_post_count})).done(function (data){
				latestPost = data.posts;
				if (latestPost.length > 0) {
					for(i = 0; i< latestPost.length ; i++) {
						var title = latestPost[i].title;
						var link = latestPost[i].url;						
						var tags = latestPost[i].tags;
						var tag_link = '';
						for(j = 0; j< tags.length ; j++) {
							var tag_name = tags[j].name;
							var tag_slug = tags[j].slug;
							tag_link += '<a class="tagged-in" href="/tag/'+tag_slug+'/">'+tag_name+'</a>';
						}
						string +='<div class="item">\
								'+tag_link+'\
								<a href="'+link+'" class="heading" title="'+title+'">'+title+'</a>\
							</div>';
					}
					latest.append(string);
					latest.owlCarousel({
						singleItem : true,
						autoPlay : 4000,
						pagination : false,
						slideSpeed : 100,
						paginationSpeed : 100,
						transitionStyle : "goDown",
					});
				}
			}).fail(function (err){
				console.log(err);
			});
			$(".latest-prev").click(function(e){
				e.preventDefault();
				latest.trigger('owl.prev');
			});
			$(".latest-next").click(function(e){
				e.preventDefault();
				latest.trigger('owl.next');
			});
		}
	},

	specialPostsSetOne: function(data){
		if($('#category-container').length && typeof special_tag_one !== 'undefined' && typeof tag_one_post_count !== 'undefined') {
			var filteredPosts;
			special_tag_one = special_tag_one.toLowerCase();
			$.get(ghost.url.api('posts', {filter:"tags:["+special_tag_one+"]", include:"tags", limit: tag_one_post_count})).done(function (data){
				filteredPosts = data.posts;
				var string = '';
				if (filteredPosts.length > 0) {
					string = '<div class="category-wrap" id="category-type-one">\
						<h2 class="h4 category-name"><span>'+special_tag_one+'</span></h2>\
						<div class="row default-layout">';
					for(i = 0; i< filteredPosts.length ; i++) {
						if( i < tag_one_post_count) {
							var title = filteredPosts[i].title;
							var link = filteredPosts[i].url;
							var image_link = filteredPosts[i].image;
							var tags = filteredPosts[i].tags;
							var published_at = themeApp.formatDate(filteredPosts[i].published_at);
							var content = $(filteredPosts[i].html).text().replace("<code>", "&lt;code&gt;").replace("<", "&lt;").replace(">", "&gt;");
							var content = content.split(/\s+/).slice(0,50).join(" ");
							var featured_media = '';
							var tag_link = '';
							for(j = 0; j< tags.length ; j++) {
								var tag_name = tags[j].name;
								var tag_slug = tags[j].slug;
								tag_link += '<a href="/tag/'+tag_slug+'/">'+tag_name+'</a>';
							}
							if (image_link !== null) {
								featured_media = '<div class="featured-media">\
										<a href="'+link+'" title="'+title+'">\
											<div class="image-container" style="background-image: url('+image_link+');">\
											</div>\
										</a>\
										<div class="tag-list">'+tag_link+'</div>\
									</div>';
							} else {
								featured_media = '<div class="featured-media">\
										<div class="tag-list">'+tag_link+'</div>\
									</div>';
							}
							string += '<!-- start post -->\
								<article class="col-sm-6 post-wrap">\
								'+featured_media+'\
									<h2 class="title h3"><a href="'+link+'">'+title+'</a></h2>\
									<div class="post-meta">\
			                            <span class="date">\
			                                <i class="fa fa-calendar-o"></i>&nbsp;' + published_at + '\
			                            </span>\
			                            <span class="comment">\
			                                <i class="fa fa-comment-o"></i>\
			                                <a href="'+link+'#disqus_thread">0 Comments</a>\
			                            </span>\
									</div>\
									<div class="post-entry">'+content+'</div>\
									<a class="permalink" href="'+link+'">Read More...</a>\
								</article>\
								<!-- end post -->';
						}
					}
					string += '</div></div>';
					$("#category-container").append(string);
					themeApp.commentCount();
				}
			}).fail(function (err){
				console.log(err);
			});
		}
	},

	specialPostsSetTwo: function(data) {
		if($('#category-container').length && typeof special_tag_two !== 'undefined' && typeof tag_two_post_count !== 'undefined') {
			var filteredPosts;
			special_tag_two = special_tag_two.toLowerCase();
			$.get(ghost.url.api('posts', {filter:"tags:["+special_tag_two+"]", include:"tags", limit: tag_one_post_count})).done(function (data){
				filteredPosts = data.posts;
				var string = '';
				if (filteredPosts.length > 0) {
					string = '<div class="category-wrap">\
						<h2 class="h4 category-name"><span>'+special_tag_two+'</span></h2>\
						<div class="row default-layout">'
					for(i = 0; i< filteredPosts.length ; i++) {
						if( i < tag_two_post_count) {
							var title = filteredPosts[i].title;
							var link = filteredPosts[i].url;
							var image_link = filteredPosts[i].image;
							var tags = filteredPosts[i].tags;
							var published_at = themeApp.formatDate(filteredPosts[i].published_at);
							var content = $(filteredPosts[i].content).text().replace("<code>", "&lt;code&gt;").replace("<", "&lt;").replace(">", "&gt;");
							var content = content.split(/\s+/).slice(0,50).join(" ");
							var featured_media = '';
							var featured_media_small = '';
							var post_class = '';
							var category_link = '';
							var tag_link = '';
							for(j = 0; j< tags.length ; j++) {
								var tag_name = tags[j].name;
								var tag_slug = tags[j].slug;
								tag_link += '<a href="/tag/'+tag_slug+'/">'+tag_name+'</a>';
							}
							if ( image_link !== null) {
								featured_media = '<div class="featured-media">\
										<a href="'+link+'">\
											<div class="image-container" style="background-image: url('+image_link+');">\
											</div>\
										</a>\
										<div class="tag-list">'+tag_link+'</div>\
									</div>';
								featured_media_small = '<div class="featured-media">\
										<a href="'+link+'">\
											<div class="image-container" style="background-image: url('+image_link+');">\
											</div>\
										</a>\
									</div>';
							} else {
								post_class = 'no-image';
							}
							if(i == 0) {
								string += '<!-- start post -->\
									<article class="col-sm-6 post-wrap">\
									'+featured_media+'\
										<h2 class="title h3"><a href="'+link+'">'+title+'</a></h2>\
										<div class="post-meta">\
				                            <span class="date">\
				                                <i class="fa fa-calendar-o"></i>&nbsp;'+published_at+'\
				                            </span>\
				                            <span class="comment">\
				                                <i class="fa fa-comment-o"></i>\
				                                <a href="'+link+'#disqus_thread">0 Comments</a>\
				                            </span>\
										</div>\
										<div class="post-entry">'+content+'</div>\
										<a class="permalink" href="'+link+'">Read More...</a>\
									</article>\
									<!-- end post -->';
							} else {
								string +='<!-- start post -->\
							<article class="col-sm-6 post-wrap small-entry '+post_class+' clearfix">\
								'+featured_media_small+'\
								<div class="post-details">\
								<div class="tag-list">'+tag_link+'</div>\
									<h2 class="title h5"><a href="'+link+'">'+title+'</a></h2>\
									<div class="post-meta">\
			                            <span class="date">\
			                                <i class="fa fa-calendar-o"></i>&nbsp;'+published_at+'\
			                            </span>\
			                            <span class="comment">\
			                               <i class="fa fa-comment-o"></i>\
				                                <a href="'+link+'#disqus_thread">0 Comments</a>\
			                            </span>\
									</div>\
								</div>\
							</article>\
							<!-- end post -->';
							}
						}
					}
					string += '</div></div>';
					$('#category-container').append(string);
					themeApp.commentCount();
				}
			}).fail(function (err){
				console.log(err);
			});
		}
	},

	recentPosts: function(data) {
		var container = $(".recent-post");
		var recentPost;
		if(container.length && typeof recent_post_count !== 'undefined') {
			$.get(ghost.url.api('posts', {limit: recent_post_count})).done(function (data){
				recentPost = data.posts;
				var string = '';
				if (recentPost.length > 0) {
					for(i = 0; i< recentPost.length ; i++) {
						var link = recentPost[i].url;
						var title = recentPost[i].title;
						var published_at = themeApp.formatDate(recentPost[i].published_at);
						var image_link  = recentPost[i].image;
						if ( image_link !== null ) {
							var image = '<div class="post-thumb pull-left" style="background-image:url(' + image_link + ')"></div>';
							var helper_class = 'have-image';
						} else {
							var image ='<div class="post-thumb pull-left"><i class="fa fa-image"></i></div>';
							var helper_class = '';
						}
						string +='<div class="recent-single-post clearfix ' +helper_class+ '"><a href="' + link + '" class="post-title">\
						'+ image +'\
						<div class="post-info"><h4 class="h5">' + title + '</h4><div class="date"><i class="fa fa-calendar-o"></i>' + published_at + '</div></div>\
						</a></div>'
					}
				}
				container.append(string);
			}).fail(function (err){
				console.log(err);
			});
		}
	},

	formatDate: function(dt) {
		var d = new Date(dt);
		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = month_name[d.getMonth()];
		var date = d.getDate();
		var year = d.getFullYear();
		var formatted_dt = month+' '+date+','+' '+year;
		return formatted_dt;
	},

	featuredMedia: function(){
		if ($(".full-post").length > 0) {
			$(".full-post").each(function() {
				var thiseliment = $(this);
				var media_wrapper = $(this).find('featured');
				var media_content_embeded = media_wrapper.find('iframe');
				var container = thiseliment.find('.featured-media');
				container.find('.image-container').hide();
				if (media_content_embeded.length > 0) {
					container.find('.image-container').remove();
					container.addClass('has-iframe');
					container.prepend(media_content_embeded);
				} else {
					container.addClass('no-iframe');
					thiseliment.find('.featured-media').find('.image-container').show();
				}
			});
		}
	},

	responsiveIframe: function() {
		$('.full-post').fitVids();
	},

	commentCount: function () {
	    var s = document.createElement('script'); s.async = true;
	    s.type = 'text/javascript';
	    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
	    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
	},

	highlighter: function() {
		$('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		});
	},

	facebook:function() {
		if ($('.fb').length) {
			var facebook_sdk_script = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
			var fb_page = '<div class="fb-page" data-href="'+facebook_page_url+'" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore">Facebook</div></div>';
			$('body').append(facebook_sdk_script);
			$('.fb').append(fb_page);
			$(".fb").fitVids();
		}
	},

	mailchimp:function() {
		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
		var form = $('#mc-embedded-subscribe-form');
		form.attr("action", mailchimp_form_url);
		var message = $('#message');
		var submit_button = $('mc-embedded-subscribe');
		form.submit(function(e){
			e.preventDefault();
			$('#mc-embedded-subscribe').attr('disabled','disabled');
			if($('#mce-EMAIL').val() != '' && IsEmail($('#mce-EMAIL').val())) {
				message.html('please wait...').fadeIn(1000);
				var url=form.attr('action');
				if(url=='' || url=='YOUR_MAILCHIMP_WEB_FORM_URL_HERE') {
					alert('Please config your mailchimp form url for this widget');
					return false;
				}
				else{
					url=url.replace('?u=', '/post-json?u=').concat('&c=?');
					console.log(url);
					var data = {};
					var dataArray = form.serializeArray();
					$.each(dataArray, function (index, item) {
					data[item.name] = item.value;
					});
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						dataType: 'json',
						success: function(response, text){
							if (response.result === 'success') {
								message.html(success_message).delay(10000).fadeOut(500);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').val('');
							}
							else{
								message.html(response.result+ ": " + response.msg).delay(10000).fadeOut(500);
								console.log(response);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').focus().select();
							}
						},
						dataType: 'jsonp',
						error: function (response, text) {
							console.log('mailchimp ajax submit error: ' + text);
							$('#mc-embedded-subscribe').removeAttr('disabled');
							$('#mce-EMAIL').focus().select();
						}
					});
					return false;
				}
			}
			else {
				message.html('Please provide valid email').fadeIn(1000);
				$('#mc-embedded-subscribe').removeAttr('disabled');
				$('#mce-EMAIL').focus().select();
			}            
		});
	},

	searchPopup: function() {
		$('#search-open').on('click', function(e) {
			e.preventDefault();
			$('.search-popup').addClass('visible');
			$('#search-input').css('visibility', 'visible').focus();
		});
		$('.close-button').on('click', function(e) {
			e.preventDefault();
			$('.search-popup').removeClass('visible');
			$('#search-input').css('visibility', 'hidden');
		});
		$('#popup-outer').on('click', function(e) {
			if(e.target.id === 'popup-outer') {
				$('.search-popup').removeClass('visible');
				$('#search-input').css('visibility', 'hidden');
			}
		});
		$('#search-input').ghostHunter({
			results: "#search-results ul",
			zeroResultsInfo     : false,
			onKeyUp: true,
			info_template   : "<li class=\"info\">Number of posts found: {{amount}}</li>",
			result_template : '<li><a href="{{link}}"><i class="fa fa-long-arrow-right fa-fw"></i>{{title}}</a></li>',
		});
	},

	backToTop: function() {
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
	},
	
	init:function(){
		themeApp.setNavbar();
		themeApp.latestSlider();
		themeApp.specialPostsSetOne();
		themeApp.specialPostsSetTwo();
		themeApp.recentPosts();
		themeApp.facebook();
		themeApp.featuredMedia();
		themeApp.responsiveIframe();
		themeApp.highlighter();
		themeApp.mailchimp();
		themeApp.searchPopup();
		themeApp.backToTop();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
	themeApp.init();
});