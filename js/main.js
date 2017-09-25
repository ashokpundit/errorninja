(function(c) {
	var b = c.scrollTo = function(e, d, f) {
		c(window).scrollTo(e, d, f)
	};
	b.defaults = {
		axis : "xy",
		duration : parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1,
		limit : true
	};
	b.window = function(d) {
		return c(window)._scrollable()
	};
	c.fn._scrollable = function() {
		return this.map(function() {
			var e = this, f = !e.nodeName || c.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
			if (!f) {
				return e
			}
			var d = (e.contentWindow || e).document || e.ownerDocument || e;
			return /webkit/i.test(navigator.userAgent) || d.compatMode == "BackCompat" ? d.body : d.documentElement
		})
	};
	c.fn.scrollTo = function(i, h, d) {
		if ( typeof h == "object") {
			d = h;
			h = 0
		}
		if ( typeof d == "function") {
			d = {
				onAfter : d
			}
		}
		if (i == "max") {
			i = 9000000000
		}
		d = c.extend({}, b.defaults, d);
		h = h || d.duration;
		d.queue = d.queue && d.axis.length > 1;
		if (d.queue) {
			h /= 2
		}
		d.offset = a(d.offset);
		d.over = a(d.over);
		return this._scrollable().each(function() {
			if (i == null) {
				return
			}
			var m = this, j = c(m), k = i, g, e = {}, l = j.is("html,body");
			switch (typeof k) {
				case "number":
				case "string":
					if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
						k = a(k);
						break
					}
					k = c(k, this);
					if (!k.length) {
						return
					}
				case "object":
					if (k.is || k.style) {
						g = ( k = c(k)).offset()
					}
			}
			c.each(d.axis.split(""), function(s, q) {
				var o = q == "x" ? "Left" : "Top", u = o.toLowerCase(), r = "scroll" + o, p = m[r], n = b.max(m, q);
				if (g) {
					e[r] = g[u] + ( l ? 0 : p - j.offset()[u]);
					if (d.margin) {
						e[r] -= parseInt(k.css("margin" + o)) || 0;
						e[r] -= parseInt(k.css("border" + o + "Width")) || 0
					}
					e[r] += d.offset[u] || 0;
					if (d.over[u]) {
						e[r] += k[q == "x" ? "width" : "height"]() * d.over[u]
					}
				} else {
					var t = k[u];
					e[r] = t.slice && t.slice(-1) == "%" ? parseFloat(t) / 100 * n : t
				}
				if (d.limit && /^\d+$/.test(e[r])) {
					e[r] = e[r] <= 0 ? 0 : Math.min(e[r], n)
				}
				if (!s && d.queue) {
					if (p != e[r]) {
						f(d.onAfterFirst)
					}
					delete e[r]
				}
			});
			f(d.onAfter);

			function f(n) {
				j.animate(e, h, d.easing, n &&
				function() {
					n.call(this, i, d)
				})

			}

		}).end()
	};
	b.max = function(h, g) {
		var k = g == "x" ? "Width" : "Height", f = "scroll" + k;
		if (!c(h).is("html,body")) {
			return h[f] - c(h)[k.toLowerCase()]()
		}
		var j = "client" + k, i = h.ownerDocument.documentElement, e = h.ownerDocument.body;
		return Math.max(i[f], e[f]) - Math.min(i[j], e[j])
	};

	function a(d) {
		return typeof d == "object" ? d : {
			top : d,
			left : d
		}
	}

})(jQuery);
(function(b) {
	(jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;( function(r, p, n) {
		var w = "placeholder" in p.createElement("input"), t = "placeholder" in p.createElement("textarea"), o = n.fn, u = n.valHooks, l, m;
		if (w && t) {
			m = o.placeholder = function() {
				return this
			};
			m.input = m.textarea = true
		} else {
			m = o.placeholder = function() {
				var a = this;
				a.filter(( w ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
					"focus.placeholder" : v,
					"blur.placeholder" : s
				}).data("placeholder-enabled", true).trigger("blur.placeholder");
				return a
			};
			m.input = w;
			m.textarea = t;
			l = {
				get : function(a) {
					var b = n(a);
					return b.data("placeholder-enabled") && b.hasClass("placeholder") ? "" : a.value
				},
				set : function(a, c) {
					var b = n(a);
					if (!b.data("placeholder-enabled")) {
						return a.value = c
					}
					if (c == "") {
						a.value = c;
						if (a != p.activeElement) {
							s.call(a)
						}
					} else {
						if (b.hasClass("placeholder")) {
							v.call(a, true, c) || (a.value = c)
						} else {
							a.value = c
						}
					}
					return b
				}
			};
			w || (u.input = l);
			t || (u.textarea = l);
			n(function() {
				n(p).delegate("form", "submit.placeholder", function() {
					var a = n(".placeholder", this).each(v);
					setTimeout(function() {
						a.each(s)
					}, 10)
				})
			});
			n(r).bind("beforeunload.placeholder", function() {
				n(".placeholder").each(function() {
					this.value = ""
				})
			})
		}

		function q(a) {
			var b = {}, c = /^jQuery\d+$/;
			n.each(a.attributes, function(d, e) {
				if (e.specified && !c.test(e.name)) {
					b[e.name] = e.value
				}
			});
			return b
		}

		function v(a, d) {
			var b = this, c = n(b);
			if (b.value == c.attr("placeholder") && c.hasClass("placeholder")) {
				if (c.data("placeholder-password")) {
					c = c.hide().next().show().attr("id", c.removeAttr("id").data("placeholder-id"));
					if (a === true) {
						return c[0].value = d
					}
					c.focus()
				} else {
					b.value = "";
					c.removeClass("placeholder");
					b == p.activeElement && b.select()
				}
			}
		}

		function s() {
			var c, b = this, d = n(b), a = d, e = this.id;
			if (b.value == "") {
				if (b.type == "password") {
					if (!d.data("placeholder-textinput")) {
						try {
							c = d.clone().attr({
								type : "text"
							})
						} catch (f) {
							c = n("<input>").attr(n.extend(q(this), {
								type : "text"
							}))
						}
						c.removeAttr("name").data({
							"placeholder-password" : true,
							"placeholder-id" : e
						}).bind("focus.placeholder", v);
						d.data({
							"placeholder-textinput" : c,
							"placeholder-id" : e
						}).before(c)
					}
					d = d.removeAttr("id").hide().prev().attr("id", e).show()
				}
				d.addClass("placeholder");
				d[0].value = d.attr("placeholder")
			} else {
				d.removeClass("placeholder")
			}
		}

	}(this, document, jQuery));
(function(a) {
	if ( typeof define === "function" && define.amd) {
		define(["jquery"], a)
	} else {
		a(jQuery)
	}
})(function(a) {
	a.fn.tweet = function(y) {
		function k(l, f) {
			if ( typeof l === "string") {
				var o = l;
				for (var h in f) {
					var c = f[h];
					o = o.replace(new RegExp("{" + h + "}", "g"), c === null ? "" : c)
				}
				return o
			} else {
				return l(f)
			}
		}

		function z(c, f) {
			return function() {
				var h = [];
				this.each(function() {
					h.push(this.replace(c, f))
				});
				return a(h)
			}
		}

		function e(c) {
			return c.replace(/</g, "<").replace(/>/g, "^>")
		}

		function x(f, c) {
			return f.replace(b, function(p) {
				var t = /^[a-z]+:/i.test(p) ? p : "http://" + p;
				var o = p;
				for (var h = 0; h < c.length; ++h) {
					var l = c[h];
					if (l.url == t && l.expanded_url) {
						t = l.expanded_url;
						o = l.display_url;
						break
					}
				}
				return '<a href="' + e(t) + '">' + e(o) + "</a>"
			})
		}

		function w(c) {
			return Date.parse(c.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, "$1,$2$4$3"))
		}

		function q(h) {
			var c = arguments.length > 1 ? arguments[1] : new Date;
			var i = parseInt((c.getTime() - h) / 1000, 10);
			var f = "";
			if (i < 1) {
				f = "just now"
			} else {
				if (i < 60) {
					f = i + " seconds ago"
				} else {
					if (i < 120) {
						f = "about a minute ago"
					} else {
						if (i < 45 * 60) {
							f = "about " + parseInt(i / 60, 10).toString() + " minutes ago"
						} else {
							if (i < 2 * 60 * 60) {
								f = "about an hour ago"
							} else {
								if (i < 24 * 60 * 60) {
									f = "about " + parseInt(i / 3600, 10).toString() + " hours ago"
								} else {
									if (i < 48 * 60 * 60) {
										f = "about a day ago"
									} else {
										f = "about " + parseInt(i / 86400, 10).toString() + " days ago"
									}
								}
							}
						}
					}
				}
			}
			return f
		}

		function j(c) {
			if (c.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
				return g.auto_join_text_reply
			} else {
				if (c.match(b)) {
					return g.auto_join_text_url
				} else {
					if (c.match(/^((\w+ed)|just) .*/im)) {
						return g.auto_join_text_ed
					} else {
						if (c.match(/^(\w*ing) .*/i)) {
							return g.auto_join_text_ing
						} else {
							return g.auto_join_text_default
						}
					}
				}
			}
		}

		function v() {
			var f = g.modpath, l = g.fetch === null ? g.count : g.fetch, c = {
				include_entities : 1
			};
			if (g.list) {
				return {
					host : g.twitter_api_url,
					url : "/1.1/lists/statuses.json",
					parameters : a.extend({}, c, {
						list_id : g.list_id,
						slug : g.list,
						owner_screen_name : g.username,
						page : g.page,
						count : l,
						include_rts : g.retweets ? 1 : 0
					})
				}
			} else {
				if (g.favorites) {
					return {
						host : g.twitter_api_url,
						url : "/1.1/favorites/list.json",
						parameters : a.extend({}, c, {
							list_id : g.list_id,
							screen_name : g.username,
							page : g.page,
							count : l
						})
					}
				} else {
					if (g.query === null && g.username.length === 1) {
						return {
							host : g.twitter_api_url,
							url : "/1.1/statuses/user_timeline.json",
							parameters : a.extend({}, c, {
								screen_name : g.username,
								page : g.page,
								count : l,
								include_rts : g.retweets ? 1 : 0
							})
						}
					} else {
						var h = g.query || "from:" + g.username.join(" OR from:");
						return {
							host : g.twitter_search_url,
							url : "/search.json",
							parameters : a.extend({}, c, {
								page : g.page,
								q : h,
								rpp : l
							})
						}
					}
				}
			}
		}

		function m(f, c) {
			if (c) {
				return "user" in f ? f.user.profile_image_url_https : m(f, false).replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//, "https://s3.amazonaws.com/twitter_production/")
			} else {
				return f.profile_image_url || f.user.profile_image_url
			}
		}

		function d(c) {
			var f = {};
			f.item = c;
			f.source = c.source;
			f.name = c.from_user_name || c.user.name;
			f.screen_name = c.from_user || c.user.screen_name;
			f.avatar_size = g.avatar_size;
			f.avatar_url = m(c, document.location.protocol === "https:");
			f.retweet = typeof c.retweeted_status != "undefined";
			f.tweet_time = w(c.created_at);
			f.join_text = g.join_text == "auto" ? j(c.text) : g.join_text;
			f.tweet_id = c.id_str;
			f.twitter_base = "http://" + g.twitter_url + "/";
			f.user_url = f.twitter_base + f.screen_name;
			f.tweet_url = f.user_url + "/status/" + f.tweet_id;
			f.reply_url = f.twitter_base + "intent/tweet?in_reply_to=" + f.tweet_id;
			f.retweet_url = f.twitter_base + "intent/retweet?tweet_id=" + f.tweet_id;
			f.favorite_url = f.twitter_base + "intent/favorite?tweet_id=" + f.tweet_id;
			f.retweeted_screen_name = f.retweet && c.retweeted_status.user.screen_name;
			f.tweet_relative_time = q(f.tweet_time);
			f.entities = c.entities ? (c.entities.urls || []).concat(c.entities.media || []) : [];
			f.tweet_raw_text = f.retweet ? "RT @" + f.retweeted_screen_name + " " + c.retweeted_status.text : c.text;
			f.tweet_text = a([x(f.tweet_raw_text, f.entities)])
			.linkUser()
			.linkHash()[0];
			f.tweet_text_fancy = a([f.tweet_text])
			.makeHeart()[0];
			f.user = k('<a class="tweet_user" href="{user_url}">{screen_name}</a>', f);
			f.join = g.join_text ? k(' <span class="tweet_join">{join_text}</span> ', f) : " ";
			f.avatar = f.avatar_size ? k('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>', f) : "";
			f.time = k('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>', f);
			f.text = k('<span class="tweet_text">{tweet_text_fancy}</span>', f);
			f.reply_action = k('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', f);
			f.retweet_action = k('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', f);
			f.favorite_action = k('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', f);
			return f
		}

		var g = a.extend({
			modpath : "/twitter/",
			username : null,
			list_id : null,
			list : null,
			favorites : false,
			query : null,
			avatar_size : null,
			count : 3,
			fetch : null,
			page : 1,
			retweets : true,
			intro_text : null,
			outro_text : null,
			join_text : null,
			auto_join_text_default : "i said,",
			auto_join_text_ed : "i",
			auto_join_text_ing : "i am",
			auto_join_text_reply : "i replied to",
			auto_join_text_url : "i was looking at",
			loading_text : null,
			refresh_interval : null,
			twitter_url : "twitter.com",
			twitter_api_url : "api.twitter.com",
			twitter_search_url : "search.twitter.com",
			template : "{avatar}{time}{join}{text}",
			comparator : function(f, c) {
				return c.tweet_time - f.tweet_time
			},
			filter : function(c) {
				return true
			}
		}, y);
		var b = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
		a.extend({
			tweet : {
				t : k
			}
		});
		a.fn.extend({
			linkUser : z(/(^|[\W])@(\w+)/gi, '$1<span class="at">@</span><a href="http://' + g.twitter_url + '/$2">$2</a>'),
			linkHash : z(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi, ' <a href="http://' + g.twitter_search_url + "/search?q=&tag=$1&lang=all" + (g.username && g.username.length == 1 && !g.list ? "&from=" + g.username.join("%2BOR%2B") : "") + '" class="tweet_hashtag">#$1</a>'),
			makeHeart : z(/(<)+[3]/gi, "<tt class='heart'>&#x2665;</tt>")
		});
		return this.each(function(h, l) {
			var i = a('<ul class="tweet_list">');
			var n = '<p class="tweet_intro">' + g.intro_text + "</p>";
			var f = '<p class="tweet_outro">' + g.outro_text + "</p>";
			var c = a('<p class="loading">' + g.loading_text + "</p>");
			if (g.username && typeof g.username == "string") {
				g.username = [g.username]
			}
			a(l).unbind("tweet:load").bind("tweet:load", function() {
				if (g.loading_text) {
					a(l).empty().append(c)
				}
				a.ajax({
					dataType : "json",
					type : "post",
					async : false,
					url : g.modpath || "/twitter/",
					data : {
						request : v()
					},
					success : function(r, p) {
						if (r.message) {
							console.log(r.message)
						}
						var s = r.response;
						a(l).empty().append(i);
						if (g.intro_text) {
							i.before(n)
						}
						i.empty();
						if (s.statuses !== undefined) {
							resp = s.statuses
						} else {
							if (s.results !== undefined) {
								resp = s.results
							} else {
								resp = s
							}
						}
						var o = a.map(resp, d);
						o = a.grep(o, g.filter).sort(g.comparator).slice(0, g.count);
						i.append(a.map(o, function(t) {
							return "<li>" + k(g.template, t) + "</li>"
						}).join("")).children("li:first").addClass("tweet_first").end().children("li:odd").addClass("tweet_even").end().children("li:even").addClass("tweet_odd");
						if (g.outro_text) {
							i.after(f)
						}
						a(l).trigger("loaded").trigger( o ? "empty" : "full");
						if (g.refresh_interval) {
							window.setTimeout(function() {
								a(l).trigger("tweet:load")
							}, 1000 * g.refresh_interval)
						}
					}
				})
			}).trigger("tweet:load")
		})
	}
});
(function(a) {
	a(document).ready(function() {
		var e = a(window);
		var n = a("#top-bar");
		var b = a(".menu");
		var l = 40;
		var i = b.width();
		var m = b.height();
		var k = 25;
		var f = true;
		b.width(i);
		var g = function() {
			var q = false;
			if (e.scrollTop() < l) {
				q = true
			}
			if (q === false && f && n.hasClass("closed") === false) {
				n.addClass("closed");
				b.delay(1000).stop().animate({
					width : "0px"
				}, 300)
			} else {
				if (q || f === false && n.hasClass("closed")) {
					n.removeClass("closed");
					b.stop().animate({
						width : i + "px"
					}, 300)
				}
			}
		};
		var c = function(r) {
			var q = r.clientY;
			if (q < m + k) {
				f = false;
				g()
			} else {
				f = true;
				g()
			}
		};
		if (jQuery.browser.mobile) {
			a("body").addClass("mobile")
		} else {
			e.scroll(g);
			e.mousemove(c)
		}
		a("#menu-trigger").click(function(q) {
			q.preventDefault();
			b.toggleClass("open")
		});
		n.scrollspy();
		a(".menu a").click(function(s) {
			s.preventDefault();
			var q = a(this).attr("href").indexOf("#");
			var r = a(this).attr("href").substring(q);
			a.scrollTo(a(r), 500);
			b.removeClass("open")
		});
		var p = a("#portfolio-list");
		p.isotope({
			resizable : false
		});
		a(window).smartresize(function() {
			p.isotope({
				masonry : {
					columnWidth : p.width() / 3
				}
			})
		});
		a("#filters a").click(function() {
			var q = a(this).attr("data-filter");
			p.isotope({
				filter : q
			});
			a("#filters a").removeClass("active");
			a(this).toggleClass("active");
			return false
		});
		a("#portfolio-list").magnificPopup({
			delegate : "a",
			type : "image",
			tLoading : "Loading image...",
			mainClass : "mfp-fade",
			removalDelay : 300,
			gallery : {
				enabled : true,
				navigateByImgClick : true,
				preload : [0, 1]
			},
			image : {
				tError : '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc : function(q) {
					return q.el.attr("title")
				}
			}
		});
		a("input, textarea").placeholder();
		var o = a("#contact-form");
		o.submit(d);
		a("#sender-email, #message, #sender-company-url").bind("click", function() {
			if (a(this).hasClass("error")) {
				a(this).val("");
				a(this).removeClass("error")
			}
		});

		function j(q) {
			var r = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return r.test(q)
		}

		function is_valid_url(url) {
			return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
		}

		function d() {
			var q = false;
			if (!j(a("#sender-email").val())) {
				a("#sender-email").val("This is not a valid email.").removeClass().addClass("error");
				q = true;
			}
			if (!a("#message").val()) {
				a("#message").val("Please complete this field.").removeClass().addClass("error");
				q = true;
			}
			if (!is_valid_url(a("#sender-company-url").val())) {
				a("#sender-company-url").val("This is not a valid URL.").removeClass().addClass("error");
				q = true;
			}
			if (!q) {
				a.ajax({
					url : o.attr("action") + "?ajax=true",
					type : o.attr("method"),
					data : o.serialize(),
					success : h
				})
			}
			return false
		}

		function h(q) {
			q = a.trim(q);
			a("#response").hide();
			if (q == "success") {
				a(":input", "#contactForm").not(":button, :submit, :reset, :hidden").val("");
				a("#response").removeClass().addClass("alert-success").html("<i class='icon-ok'></i> Thank you for your registration!").fadeIn("slow").delay(5000).fadeOut("slow")
			} else {
				var n = q.split("||", 2);
				if (n[0] == "faliure") {
					a("#response").removeClass().addClass("alert-error").html("<i class='icon-remove'></i>" + n[1]).fadeIn("slow").delay(5000).fadeOut("slow")
				} else {
					a("#response").removeClass().addClass("alert-error").html("<i class='icon-remove'></i> There was an error in registration.").fadeIn("slow").delay(5000).fadeOut("slow")
				}
			}
		}

	});
	a(window).load(function() {
		a(".flexslider").flexslider({
			directionNav : false
		});
		a(".carousel").carousel();
		if (jQuery.browser.mobile === false) {
			a(".parallax").each(function() {
				a(this).parallax("50%", 0.25)
			})
		}
		a("#preloader").fadeOut("slow")
	})
})(jQuery); 