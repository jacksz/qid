!function e(t,n,o){function a(i,l){if(!n[i]){if(!t[i]){var r="function"==typeof require&&require;if(!l&&r)return r(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[i]={exports:{}};t[i][0].call(d.exports,function(e){var n=t[i][1][e];return a(n?n:e)},d,d.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)a(o[i]);return a}({1:[function(e,t,n){var o=e("./shims/jquery"),a=function(e){"undefined"!=typeof e?this.focusable=e:this.focusable=["a[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","*[tabindex]","*[contenteditable]"]};a.prototype.saveFocus=function(e){this.beforeOpenFocus=e},a.prototype.returnFocus=function(){this.beforeOpenFocus&&(this.beforeOpenFocus.focus(),this.beforeOpenFocus=null)},a.prototype.setInitialFocus=function(e){0!==e.length&&setTimeout(function(){e.focus()},1)},a.prototype.getFocusable=function(e){return e.find(this.focusable.join(",")).filter(":visible").filter(function(){var e=o(this).attr("tabindex");return"undefined"==typeof e?!0:o(this).attr("tabindex")>-1})},a.prototype.trapTab=function(e,t){t.preventDefault();var n,o=this.getFocusable(e),a=o.filter(":focus"),s=o.index(a);s>-1?(n=t.shiftKey?s-1:s+1,n>o.length-1?n=0:-1===n&&(n=o.length-1)):n=0,o.get(n).focus()},t.exports=a},{"./shims/jquery":2}],2:[function(e,t,n){(function(e){t.exports=e.jQuery}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(e,t,n){var o=function(e){this.env="production","undefined"!=typeof e&&(this.env=e)};o.prototype.setEnvironment=function(e){this.env=e},o.prototype.trackEvent=function(e){e.hitType="event","production"===this.env&&ga("send",e)},o.prototype.trackPageview=function(e){e.hitType="pageview","production"===this.env&&ga("send",e)},o.prototype.sendTo=function(e,t){var n=t.ctrlKey||t.metaKey?!0:!1;n?window.open(e):window.location.href=e},t.exports=o},{}],4:[function(e,t,n){var o=e("../../../shims/backbone"),a={ExploreResult:e("../../models/search/ExploreResult")};t.exports=o.Collection.extend({model:a.ExploreResult})},{"../../../shims/backbone":27,"../../models/search/ExploreResult":5}],5:[function(e,t,n){var o=e("../../../shims/backbone");t.exports=o.Model.extend({})},{"../../../shims/backbone":27}],6:[function(e,t,n){var o=e("../../shims/backbone"),a={teaser:e("../../templates/teasers/teaser.html")},s=e("analytics"),i=e("../../lib/getMedia");t.exports=o.View.extend({className:"supporting-content-item",template:a.result,context:"Sidebar",modalView:null,modalData:null,modal:null,imageThumbnail:"small_thumb",initialize:function(e){this.options=e||{},this.setContext(),this.analytics=new s,vent.on("modal:close",this.onModalClose,this),this.modalData||(this.modalData=this.model),this.teaserImageData||(this.teaserImageData=this.model),this.setImage(),this.setAccentColor()},setImage:function(){var e=this.teaserImageData.get("meta")||this.teaserImageData.get("_source");this.teaser_image=e.media?i(e.media,this.imageThumbnail,"medium_thumb"):null,this.model.set("teaser_image",this.teaser_image)},setAccentColor:function(){var e=this.teaserImageData.get("color");!e&&this.teaser_image&&(e=this.teaser_image.hex?{accent:this.teaser_image.hex,contrast:this.teaser_image.hex_contrast}:null,this.model.set("teaser_color",e))},setContext:function(){this.options.context&&(this.context=this.options.context)},hover:function(e){$(e.currentTarget).css("cursor","pointer")},openModal:function(e){e.preventDefault(),this.modalView&&(this.modal?this.modal.toTop():(this.modal=new this.modalView({model:this.modalData,focusBeforeOpen:$(":focus")}),this.modal.show(),this.trackModalOpen()))},onModalClose:function(e){this.modal&&e==this.modalData&&(this.modal=null)},trackModalOpen:function(){this.analytics.trackEvent({eventCategory:this.context,eventAction:"Open Modal",eventLabel:this.modalData.get("post_type")+" : "+this.modalData.get("post_title")})},render:function(){var e=(this.model.get("teaser_image"),this.model.get("post_type")||this.model.get("_type")),t=this.model.get("id")||this.model.get("_id");return this.$el.addClass("type-"+e),this.$el.addClass(e),this.$el.addClass("force"),this.$el.attr("data-id",t),this.$el.append(this.template(this.model.toJSON())),this}})},{"../../lib/getMedia":23,"../../shims/backbone":27,"../../templates/teasers/teaser.html":42,analytics:3}],7:[function(e,t,n){var o=e("../../shims/jquery"),a=e("../../shims/backbone"),s=e("../../lib/getMedia"),i=e("accessible-modal"),l={modalBackground:e("../../templates/modal-background.html"),defaultModalWindow:e("../../templates/modal-window-default.html")};t.exports=a.View.extend({className:"modal-background",template:l.defaultModalWindow,backgroundTemplate:l.modalBackground,imageThumbnail:"featured",events:{"click .close":"close"},initialize:function(e){var t="undefined"!=typeof this.model.get("ID")?this.model.get("ID"):this.model.get("_id");this.model.set("id",t),this.setImage(),this.setAccentColor(),o("body").on("keydown."+t,this.evaluateKeyDown.bind(this)),this.listenTo(vent,"modal:closeall",this.close.bind(this)),this.accessibleModal=new i,this.accessibleModal.saveFocus(e.focusBeforeOpen),this.render()},evaluateKeyDown:function(e){var t=jhumodals.isActive(this.$el);if(t){var n=e.charCode?e.charCode:e.keyCode;9===n&&this.accessibleModal.trapTab(this.$el,e)}},setImage:function(){var e=this.model.get("meta")||this.model.get("_source");e&&(this.image=s(e.media,this.imageThumbnail),this.model.set("image",this.image))},setAccentColor:function(){if(this.model){var e=this.model.get("color");!e&&this.image&&(e=this.image.hex?{accent:this.image.hex,contrast:this.image.hex_contrast}:null,this.model.set("color",e))}},render:function(){var e=this.model?this.model.toJSON():{};return this.backgroundTemplate&&this.$el.append(this.backgroundTemplate(e)),this.$el.append(this.template(e)),this},show:function(){jhumodals.add(this.$el),this.showModal(),o(".page-container, .main-nav, .skip-to-main").attr("aria-hidden","true"),o("body").addClass("modals-open")},showModal:function(){this.$el.appendTo("body").hide().show(0).addClass("modal-open").attr("role","dialog").attr("aria-labelledby","aria-label-"+this.model.get("id")).attr("aria-desribedby","aria-description-"+this.model.get("id")).attr("tabindex","-1").focus(),this.accessibleModal.setInitialFocus(this.$el.find(".close"))},close:function(e){this.stopListening(),this.undelegateEvents(),o("body").off("keydown."+this.model.get("id")),e&&(e.stopPropagation(),e.preventDefault()),jhumodals.remove(this.$el),0===jhumodals.count()&&(this.accessibleModal.returnFocus(),o("body").removeClass("modals-open"),o(".page-container, .main-nav, .skip-to-main").removeAttr("aria-hidden")),this.$el.removeClass("modal-open"),setTimeout(this.remove.bind(this),1e3),vent.trigger("modal:close",this.model)},toTop:function(){this.$el.remove().removeClass("modal-open"),this.showModal(),this.delegateEvents()}})},{"../../lib/getMedia":23,"../../shims/backbone":27,"../../shims/jquery":28,"../../templates/modal-background.html":33,"../../templates/modal-window-default.html":34,"accessible-modal":1}],8:[function(e,t,n){var o=(e("../../../shims/backbone"),{Modal:e("../ModalView")}),a={clubModal:e("../../../templates/clubs/club-modal.html")};t.exports=o.Modal.extend({template:a.clubModal})},{"../../../shims/backbone":27,"../../../templates/clubs/club-modal.html":30,"../ModalView":7}],9:[function(e,t,n){var o=(e("../../../shims/backbone"),{ClubModal:e("./ClubModalView"),ContentTeaser:e("../ContentTeaserView")}),a={clubResult:e("../../../templates/search/club-result.html")};t.exports=o.ContentTeaser.extend({template:a.clubResult,modalView:o.ClubModal,events:{click:"openModal",mouseover:"hover"}})},{"../../../shims/backbone":27,"../../../templates/search/club-result.html":37,"../ContentTeaserView":6,"./ClubModalView":8}],10:[function(e,t,n){var o=(e("../../../shims/backbone"),{Modal:e("../ModalView")}),a={fieldOfStudyModal:e("../../../templates/fields_of_study/field-of-study-modal.html")};t.exports=o.Modal.extend({template:a.fieldOfStudyModal})},{"../../../shims/backbone":27,"../../../templates/fields_of_study/field-of-study-modal.html":31,"../ModalView":7}],11:[function(e,t,n){var o=(e("../../../shims/backbone"),{FieldOfStudyModal:e("./FieldOfStudyModalView"),ContentTeaser:e("../ContentTeaserView")}),a=e("../../../lib/truncate"),s={fieldOfStudy:e("../../../templates/search/field-of-study-result.html")};t.exports=o.ContentTeaser.extend({template:s.fieldOfStudy,modalView:o.FieldOfStudyModal,events:{click:"openModal",mouseover:"hover"},initialize:function(e){var t=this.model.get("meta"),n=this.model.get("_source");t?(t.short_summary=a(t.summary,150),this.model.set("meta",t)):(n.short_summary=a(n.summary,150),this.model.set("_source",n)),o.ContentTeaser.prototype.initialize.call(this,e)}})},{"../../../lib/truncate":24,"../../../shims/backbone":27,"../../../templates/search/field-of-study-result.html":39,"../ContentTeaserView":6,"./FieldOfStudyModalView":10}],12:[function(e,t,n){var o=(e("../../../shims/backbone"),{Modal:e("../ModalView")}),a={profileModal:e("../../../templates/profiles/profile-modal.html")};t.exports=o.Modal.extend({template:a.profileModal})},{"../../../shims/backbone":27,"../../../templates/profiles/profile-modal.html":35,"../ModalView":7}],13:[function(e,t,n){var o=(e("../../../shims/backbone"),{ProfileModal:e("./ProfileModalView"),ContentTeaser:e("../ContentTeaserView")}),a={profileResult:e("../../../templates/search/profile-result.html")};t.exports=o.ContentTeaser.extend({template:a.profileResult,modalView:o.ProfileModal,events:{click:"openModal",mouseover:"hover"}})},{"../../../shims/backbone":27,"../../../templates/search/profile-result.html":41,"../ContentTeaserView":6,"./ProfileModalView":12}],14:[function(e,t,n){var o=e("../../../shims/jquery"),a=(e("../../../shims/underscore"),e("../../../shims/backbone")),s={ExploreResultModal:e("./ExploreResultModalView")};t.exports=a.View.extend({events:{"submit form":"search"},initialize:function(e){vent.on("modal:close",this.onModalClose,this),this.input=this.$el.find("input[name=q]"),this.focus=[e.focus],this.model=new a.Model({ID:"explore"})},search:function(e){e.preventDefault();var t=this.input.val(),n=new s.ExploreResultModal({focus:this.focus,model:this.model,focusBeforeOpen:o(":focus")});n.search(t,this.focus),this.input.val("")}})},{"../../../shims/backbone":27,"../../../shims/jquery":28,"../../../shims/underscore":29,"./ExploreResultModalView":15}],15:[function(e,t,n){var o=(e("../../../shims/backbone"),e("../../../lib/explore-search")),a=e("analytics"),s={ExploreResultSet:e("../../collections/search/ExploreResultSet")},i={Modal:e("../ModalView"),ExploreResultSet:e("./ExploreResultSetView"),NoResults:e("./NoResultsView")},l={loading:e("../../../templates/loading.html"),exploreModal:e("../../../templates/search/explore-modal.html")};window.env;t.exports=i.Modal.extend({template:l.exploreModal,initialize:function(e){this.analytics=new a,i.Modal.prototype.initialize.call(this,e),this.exploresearch=new o,this.show(),this.focus=e.focus,this.cannedResultsView=new i.ExploreResultSet,this.mainResultsView=new i.ExploreResultSet,this.relatedResultsView=new i.ExploreResultSet,this.events["submit form"]="handleSubmit"},handleSubmit:function(e){e.preventDefault(),this.search(this.$("input[name=q]").val(),this.focus)},search:function(e,t){this.$(".main-results").append(l.loading({style:"dark"})),this.relatedResultsView.reset(),this.cannedResultsView.reset(),this.mainResultsView.reset(),this.$(".messages").empty();var n=this.$("input[name=q]");return n.val(e),this.exploresearch.search({query:e,focus:this.focus,onMain:this.onMain.bind(this),onSecondary:this.onEachRelated.bind(this),onCanned:this.onCanned.bind(this)}),this.sendRequestToGoogle(e,t),!1},sendRequestToGoogle:function(e,t){var n=(window.location,programExplorerUrl+"?q="+e+"&c=explore_"+t);this.analytics.trackPageview({page:n,title:"Explore | Johns Hopkins University"})},onCanned:function(e){0!==e.length&&(this.cannedResultsView.collection=new s.ExploreResultSet(e),this.$(".canned-results").append(this.cannedResultsView.render().el))},onMain:function(e){if(this.$(".main-results").find(".loading").remove(),0===e.length){var t=new i.NoResults;return void this.$(".messages").append(t.render().el)}this.mainResultsView.collection=new s.ExploreResultSet(e),this.$(".main-results").append(this.mainResultsView.render().el)},onEachRelated:function(e){0!==e.length&&(this.relatedResultsView.collection=new s.ExploreResultSet(e),this.$(".results-secondary").append(this.relatedResultsView.render().el))}})},{"../../../lib/explore-search":22,"../../../shims/backbone":27,"../../../templates/loading.html":32,"../../../templates/search/explore-modal.html":38,"../../collections/search/ExploreResultSet":4,"../ModalView":7,"./ExploreResultSetView":16,"./NoResultsView":17,analytics:3}],16:[function(e,t,n){var o=e("../../../shims/backbone"),a=e("../../../lib/verify-images"),s={club:e("../club/ClubTeaserView"),field_of_study:e("../field_of_study/FieldOfStudyTeaserView"),person:e("../profile/ProfileTeaserView"),search_response:e("../search_response/SearchResponseView")};t.exports=o.View.extend({className:"explore-result-set force",makeView:function(e){var t=e.get("_type");if("person"!==t||a(e))return s[t]?new s[t]({model:e,context:"Elasticsearch Explorer"}):null},append:function(e){var t=this.makeView(e);t&&(e=t.render().$el,this.$el.append(e))},reset:function(){return this.$el.empty(),this},render:function(){return this.collection.each(this.append,this),this}})},{"../../../lib/verify-images":25,"../../../shims/backbone":27,"../club/ClubTeaserView":9,"../field_of_study/FieldOfStudyTeaserView":11,"../profile/ProfileTeaserView":13,"../search_response/SearchResponseView":18}],17:[function(e,t,n){var o=e("../../../shims/backbone"),a={noResults:e("../../../templates/search/no-results.html")};t.exports=o.View.extend({className:"search-no-results",template:a.noResults,render:function(){return this.$el.append(this.template({})),this}})},{"../../../shims/backbone":27,"../../../templates/search/no-results.html":40}],18:[function(e,t,n){var o=(e("../../../shims/backbone"),{ContentTeaser:e("../ContentTeaserView")}),a={cannedResponse:e("../../../templates/search/canned-response-result.html")};t.exports=o.ContentTeaser.extend({template:a.cannedResponse})},{"../../../shims/backbone":27,"../../../templates/search/canned-response-result.html":36,"../ContentTeaserView":6}],19:[function(e,t,n){var o=e("../shims/jquery"),a=window.env,s=function(){};s.prototype.getBase=function(){var e="";return e="production"===a?"www.":a+".","//"+e+"jhu.edu/api"},s.prototype.get=function(e,t){var n=this.getBase(),a=n.length;e=e.toString();var s=e;return e.substr(0,a)!==n&&("/"!==e.substr(0,1)&&(e="/"+e),s=n+e),t=o.extend({},t),o.ajax({url:s,data:t})},s.prototype.search=function(e,t){e=o.merge([],e).join(",");var n=this.getBase()+"/"+e+"/search/elasticsearch/";return this.get(n,t)},t.exports=new s},{"../shims/jquery":28}],20:[function(e,t,n){var o=function(){};o.prototype.stringToRGB=function(e){var t=/rgb\(/;if(t.test(e))return this.rgbStingToRGB(e);var n=/(#?([A-Fa-f0-9]){3}(([A-Fa-f0-9]){3})?)/;return n.test(e)?this.hexToRGB(e):null},o.prototype.hexToRGB=function(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,n,o){return t+t+n+n+o+o});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},o.prototype.rgbStingToRGB=function(e){var t=e.replace("rgb(","").replace(")","").replace(" ","").split(",");return{r:t[0],g:t[1],b:t[2]}},o.prototype.hex=function(e){return("0"+parseInt(e).toString(16)).slice(-2)},o.prototype.rgb2hex=function(e){if(/^#[0-9A-F]{6}$/i.test(e))return e.replace("#","");var t=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*[0-9\.]+)?\)$/);return this.hex(t[1])+this.hex(t[2])+this.hex(t[3])},o.prototype.getContrastingColor=function(e,t,n){if(!t&&!n){var o=this.stringToRGB(e);if(!o)return null;e=o.r,t=o.g,n=o.b}var a=Math.round((299*parseInt(e)+587*parseInt(t)+114*parseInt(n))/1e3);return a>125?"000":"fff"},t.exports=new o},{}],21:[function(e,t,n){function o(e,t){if(t=t||{},0===e.length)return e;if(t.percentage)var n=e[0]._score,o=n*t.percentage;var a=[];return _.each(e,function(e){t.percentage&&e._score<o||t.exclude&&_.indexOf(t.exclude,e._id)>-1||a.push(e)}),t.returnNum?a.slice(0,t.returnNum):a}function a(e,t){if(t=t||{},0!==e.length){if(t.percentage)var n=e.at(0).get("score"),o=n*t.percentage;var a=[];e.each(function(e,n){t.percentage&&e.get("_score")<o&&a.push(e),t.exclude&&_.indexOf(t.exclude,e.get("_id"))>-1&&a.push(e),t.returnNum&&n>t.returnNum-1&&a.push(e)}),e.remove(a)}}e("../shims/backbone");t.exports=function(e,t){return e.models?a(e,t):o(e,t)}},{"../shims/backbone":27}],22:[function(e,t,n){function o(e){return"success"!==e[1]?[]:e[0].data}function a(e){var t=[],n=[];return _.each(e,function(e){"club"===e._type?t.push(e._id):"field_of_study"===e._type&&n.push(e._id)}),{clubs:t.join(","),fields_of_study:n.join(",")}}var s=e("../shims/jquery"),i=e("./elasticsearch-process-results"),l=e("./api"),r=function(){};r.prototype.setOptions=function(e){var t={query:"",focus:["field_of_stud","club"],onMain:function(e){},onSecondary:function(e){},maxMain:null,maxRelated:5};this.options=s.extend({},t,e)},r.prototype.search=function(e){this.setOptions(e);var t=this.firstSearchPromises(),n=this;s.when.apply(null,t).done(function(e,t,a){var s=i(o(e),{percentage:.5});if(n.options.onMain(s),a){var l=i(o(a));n.options.onCanned(l)}s.length>0&&n.findPeople(s)})},r.prototype.firstSearchPromises=function(){var e=[];return e.push(l.search(this.options.focus,{q:this.options.query})),_.indexOf(this.options.focus,!1)&&e.push(l.search(["search_response"],{q:this.options.query})),e},r.prototype.findPeople=function(e){var t=this,n=a(e);l.search(["person"],n).done(function(e){var n=i(e.data,{returnNum:t.options.maxRelated});t.options.onSecondary(n)})},t.exports=r},{"../shims/jquery":28,"./api":19,"./elasticsearch-process-results":21}],23:[function(e,t,n){function o(e,t){if("string"==typeof e[0].file)return!1;var n=e[0].file;if(!n)return!1;var o=e[0].file.crops;return o[t]?o[t].url:!1}function a(e){return e[0].accent_color?e[0].accent_color.hex:null}function s(e){return e[0].file.alt_text}var i=e("../shims/jquery"),l=e("../lib/color"),r={small_thumb:["small_thumb","large_thumb","featured","gallery"],large_thumb:["large_thumb","small_thumb","featured","gallery"],featured:["featured","large_thumb","small_thumb","gallery"],gallery:["gallery","featured","large_thumb","small_thumb"]};t.exports=function(e,t,n){if(!e)return null;var u=null;return n=n||t,i.each(r[t],function(t,i){if(e[i]){var r=o(e[i],n);if(r){var d=a(e[i]),c=d?l.getContrastingColor(d):null;u={url:r,hex:d,hex_contrast:c,alt_text:s(e[i])}}return!1}}),u}},{"../lib/color":20,"../shims/jquery":28}],24:[function(e,t,n){function o(e){return e.split(/<\/p>(\s*)<p>/).shift().replace(/<\/p>|<p>/,"")}t.exports=function(e,t){if("string"!=typeof e)return e;e=o(e);for(var n=e.split(" "),a=[],s=0;t>s&&0!==n.length;){var i=n.shift();a.push(i),s+=i.length}return a=a.join(" ").replace(/\W{1}$/,""),0!==n.length&&(a+="..."),a}},{}],25:[function(e,t,n){t.exports=function(e){var t=e.get("meta")||e.get("_source"),n=t.media;return Object.keys(n).length>0?!0:!1}},{}],26:[function(e,t,n){var o=e("./shims/jquery"),a={ExploreForm:e("./app/views/search/ExploreFormView")};o(function(){o(".primary-content .search-box").each(function(e,t){t=o(t);var n=t.find("input[name=focus]");n&&"club"===n.val()&&new a.ExploreForm({el:t,focus:n.val()})})})},{"./app/views/search/ExploreFormView":14,"./shims/jquery":28}],27:[function(e,t,n){(function(e){t.exports=e.Backbone}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],28:[function(e,t,n){arguments[4][2][0].apply(n,arguments)},{dup:2}],29:[function(e,t,n){(function(e){t.exports=e._}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],30:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var title="undefined"!=typeof post_title?post_title:_source.post_title,metadata="undefined"!=typeof meta?meta:_source;__p+='\n\n<div class="club-modal modal-content force">\n\n  <div class="info all-alone column">\n\n    <h1 id="aria-label-'+(null==(__t=id)?"":__t)+'">'+(null==(__t=title)?"":__t)+"</h1>\n\n    "+(null==(__t=metadata.summary)?"":__t)+'\n\n    <ul class="contact-info">\n\n      ',__p+=metadata.website?'\n        <li class="website"><a href="'+(null==(__t=metadata.website)?"":__t)+'"><i class="fa fa-fw fa-globe" aria-hidden="true"></i> Website</a></li>\n      ':'\n          <li class="website"><a href="'+(null==(__t=metadata.source_url)?"":__t)+'"><i class="fa fa-fw fa-globe" aria-hidden="true"></i> Website</a></li>\n      ',__p+='\n\n    </ul>\n\n    <ul class="social-media">\n\n      ',metadata.social_media.facebook&&(__p+='\n        <li class="facebook"><a href="'+(null==(__t=metadata.social_media.facebook.link)?"":__t)+'"><i class="fa fa-fw fa-facebook-square" aria-hidden="true"></i> Facebook</a></li>\n      '),__p+="\n\n      ",metadata.social_media.twitter&&(__p+='\n        <li class="twitter"><a href="'+(null==(__t=metadata.social_media.twitter.link)?"":__t)+'"><i class="fa fa-fw fa-twitter-square" aria-hidden="true"></i> Twitter</a></li>\n      '),__p+="\n\n      ",metadata.social_media.linkedin&&(__p+='\n        <li class="linkedin"><a href="'+(null==(__t=metadata.social_media.linkedin.link)?"":__t)+'"><i class="fa fa-fw fa-linkedin-square" aria-hidden="true"></i> LinkedIn</a></li>\n      '),__p+="\n\n    </ul>\n\n  </div>\n\n</div>\n"}return __p}},{}],31:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var title="undefined"!=typeof post_title?post_title:_source.post_title,metadata="undefined"!=typeof meta?meta:_source,degrees="undefined"!=typeof degrees?degrees:_source.degrees,type="undefined"!=typeof type?type:_source.type,frequency="undefined"!=typeof frequency?frequency:_source.frequency;__p+='\n\n<div class="field-of-study-modal modal-content force">\n\n  <div class="info all-alone column">\n\n    <h3 id="aria-label-'+(null==(__t=id)?"":__t)+'">'+(null==(__t=title)?"":__t)+"</h3>\n\n    "+(null==(__t=_helper.displayDivisions(metadata))?"":__t)+"\n\n    ",degrees&&(__p+='\n      <ul class="degrees meta">\n        ',_.each(degrees,function(e){__p+='\n          <li class="'+(null==(__t=e.slug)?"":__t)+'"><i class="fa '+(null==(__t=e.icon)?"":__t)+'" aria-hidden="true"></i> '+(null==(__t=e.name)?"":__t)+"</li>\n        "}),__p+="\n      </ul>\n    "),__p+='\n\n    <div class="summary">\n      '+(null==(__t=metadata.summary)?"":__t)+'\n    </div>\n\n    <p class="website"><a href="'+(null==(__t=metadata.website)?"":__t)+'"><i class="fa fa-fw fa-globe" aria-hidden="true"></i> Visit website</a></p>\n\n  </div>\n\n</div>\n'}return __p}},{}],32:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){if(__p+="",!style)var style="dark";__p+='\n\n<div class="loading '+(null==(__t=style)?"":__t)+'">\n  <i class="fa fa-circle-o-notch fa-spin"aria-hidden="true"></i><span class="visuallyhidden">Loading</span>\n</div>\n'}return __p}},{}],33:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var style="undefined"!=typeof color&&color&&"000"===color.contrast?"dark":"light";__p+='\n\n<p id="aria-description-'+(null==(__t=id)?"":__t)+'" class="visuallyhidden">Press the escape key to close the dialog.</p>\n\n<button class="close close-box-x '+(null==(__t=style)?"":__t)+'" aria-label="Close dialog"><i class="fa fa-fw fa-times" aria-hidden="true"></i><span class="icon-fallback">Close</span></button>\n'}return __p}},{}],34:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+="<!-- some kind of modal window default maybe? -->\n";return __p}},{}],35:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="",color&&(__p+="\n  <style>\n    .modal-background .modal-content { border-top-color: #"+(null==(__t=color.accent)?"":__t)+"; }\n    .modal-background .close-box-x { background-color: #"+(null==(__t=color.accent)?"":__t)+"; }\n    .modal-background .image-container { background-color: #"+(null==(__t=color.accent)?"":__t)+"; }\n    .modal-background .profile-modal .quote strong { color: #"+(null==(__t=color.accent)?"":__t)+"; }\n    .modal-background a,\n    .modal-background button { color: #"+(null==(__t=color.accent)?"":__t)+"; }\n    .modal-background a:hover,\n    .modal-background button:hover { border-bottom-color: #"+(null==(__t=color.accent)?"":__t)+"; color: #000000; }\n    .modal-background .button { color: #000000; }\n    .modal-background .button:hover { border-color: #"+(null==(__t=color.accent)?"":__t)+"; color: #"+(null==(__t=color.accent)?"":__t)+"; }\n    .modal-background .search-box button:hover { background-color: #"+(null==(__t=color.accent)?"":__t)+"; }\n  </style>\n"),__p+="\n\n";var metadata="undefined"!=typeof meta?meta:_source;if(__p+='\n\n\n<div class="profile-modal modal-content force">\n\n  <h1 id="aria-label-'+(null==(__t=id)?"":__t)+'" class="visuallyhidden">Profile of '+(null==(__t=_helper.getName(metadata))?"":__t)+"</h1>\n\n  ",__p+=image?'\n\n    <div class="image-container column">\n      <img src="'+(null==(__t=image.url)?"":__t)+'" alt="'+(null==(__t=image.alt_text||_helper.getName(metadata))?"":__t)+'"/>\n    </div>\n\n    <div class="info column">\n\n  ':'\n\n    <div class="info all-alone column">\n\n  ',__p+="\n\n    ",metadata.featured_quote){__p+="\n\n      ";var featuredquote=metadata.featured_quote.meta?metadata.featured_quote.meta.quote:metadata.featured_quote.description;__p+='\n\n      <blockquote class="quote">\n        '+(null==(__t=featuredquote)?"":__t)+'\n      </blockquote>\n      <p class="dash" aria-hidden="true">&mdash;</p>\n    '}if(__p+="\n\n    "+(null==(__t=_helper.getBusinessCard(metadata,["by-line"]))?"":__t)+"\n\n\n    ","undergraduate"===metadata.type&&(__p+="\n\n      "+(null==(__t=_helper.displayMajorsMinors(metadata))?"":__t)+"\n      "+(null==(__t=_helper.displayClubs(metadata))?"":__t)+"\n\n    "),__p+="\n\n    ",metadata.long_quote){__p+="\n\n      ";var longquote=metadata.long_quote.meta?metadata.long_quote.meta.quote:metadata.long_quote.description;__p+='\n\n      <div class="long-quote">'+(null==(__t=longquote)?"":__t)+"</div>\n    "}__p+="\n\n    ",metadata.short_bio&&(__p+='<div class="bio">'+(null==(__t=metadata.short_bio)?"":__t)+"</div>"),__p+="\n\n  </div>\n\n</div>\n"}return __p}},{}],36:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var title="undefined"!=typeof post_title?post_title:_source.post_title,response="undefined"!=typeof meta?meta.response:_source.description;__p+="\n\n<h4>"+(null==(__t=title)?"":__t)+"</h4>\n"+(null==(__t=response)?"":__t)+"\n"}return __p}},{}],37:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var title="undefined"!=typeof post_title?post_title:_source.post_title,metadata="undefined"!=typeof meta?meta:_source;__p+='\n\n<h2><button class="button">'+(null==(__t=title)?"":__t)+'</button></h2>\n<div class="summary">'+(null==(__t=metadata.summary)?"":__t)+"</div>\n"}return __p}},{}],38:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<div class="explore-modal modal-content force">\n\n  <div class="program-explorer-module search-box column">\n\n    <h1 id="aria-label-'+(null==(__t=id)?"":__t)+'" class="visuallyhidden">Search results</h1>\n\n    <form class="column force">\n      <label for="search-explore" class="visuallyhidden">Explore</label>\n      <input id="search-explore" class="column" type="text" name="q" autocomplete="off"><button type="submit" class="column"><i class="fa fa-compass"></i> explore</button>\n    </form>\n\n  </div>\n\n  <div class="messages column"></div>\n\n  <div class="results-primary column">\n    <div class="canned-results"></div>\n    <div class="main-results"></div>\n  </div>\n\n</div>\n\n<div class="results-secondary column"></div>\n';return __p}},{}],39:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var title="undefined"!=typeof post_title?post_title:_source.post_title,metadata="undefined"!=typeof meta?meta:_source;__p+="\n\n<h4><button>"+(null==(__t=title)?"":__t)+"</button></h4>\n\n"+(null==(__t=_helper.displayDivisions(metadata))?"":__t)+'\n\n<div class="summary"><p>'+(null==(__t=metadata.short_summary)?"":__t)+"</p></div>\n"}return __p}},{}],40:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+="<p>Sorry, no results.</p>\n";return __p}},{}],41:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{}){__p+="";var styles="";teaser_color&&(styles="border-color: #"+teaser_color.accent+";");var metadata="undefined"!=typeof meta?meta:_source;__p+="\n\n",teaser_image&&(__p+='\n\n  <img src="'+(null==(__t=teaser_image.url)?"":__t)+'" alt="'+(null==(__t=teaser_image.alt_text||_helper.getName(metadata))?"":__t)+'" style="'+(null==(__t=styles)?"":__t)+'" />\n\n'),__p+="\n\n"+(null==(__t=_helper.getBusinessCard(metadata,["by-line"],!0))?"":__t)+"\n"}return __p}},{}],42:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+="",meta.image&&(__p+='\n  <div class="image">\n    <a href="'+(null==(__t=meta.link)?"":__t)+'" title="'+(null==(__t=post_title)?"":__t)+'"><img src="'+(null==(__t=meta.image.crops.small_thumb.url)?"":__t)+'" alt="'+(null==(__t=meta.image.alt_text)?"":__t)+'" /></a>\n  </div>\n'),__p+='\n\n<h3 class="headline"><a href="'+(null==(__t=meta.link)?"":__t)+'" title="'+(null==(__t=post_title)?"":__t)+'">'+(null==(__t=meta.headline)?"":__t)+'</a></h3>\n\n<div class="summary">'+(null==(__t=meta.summary)?"":__t)+"</div>\n";return __p}},{}]},{},[26]);