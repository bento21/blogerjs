window.bento = window.bento || {};
window.bentoConfig = window.bentoConfig || {};
(function( exports, $ ){
var api = {};
$.fn.that = this;
$.fn.doc = this.document;
$.fn.config = this.bentoConfig;
$.fn.blogApi = {
  urlapi : 'https://www.googleapis.com/blogger/v3/blogs/',
  urllabel : '/feeds/posts/default/-/'+ this.bentoConfig.postLabel +'?alt=json-in-script',
  blogId : '8648757595235957671/',
  postId : this.bentoConfig.postID,
  apikey : '?key=AIzaSyCi1o5lNM_qA1pwvTe9JEdslwNpbkdJCZA',
  type : {
    posts : 'posts/',
    pages : 'pages/',
    search : 'posts/search/',
    comments : 'posts/comments/',
  },
};
$.fn.result = {
  single : {},
  label : {},
  hamepage : {},
  relatedPost : {}, 
  response : function(e){
    switch (e.posttype) {
      case 'item' :
          $.ajax({
            type : 'GET',
            url : $.fn.doc.location.origin + $.fn.blogApi.urllabel,
            data : {'max-results' : 5},
            dataType : 'jsonp',
            jsonpCallback: "callback",
            success: function(data, status, xhr){
              if(xhr.statusText == 'OK'){
                $.fn.result.relatedPost = data
              }
            }            
          }) 

        break;
      case 'hamepage' :
        break;
      case 'label' :
        break;                 
      default:
        console.log('No Data Post Cong Powered By Vigih Sentosa')
        break;
    }
  },
};
$.fn.result.response(this.bentoConfig);

$.fn.html = {
   relatedPost : '<div class="box_relatedPost">' +
                  ' <div class="rp_boximg"><a href="" alt="">' +
                  ' <img src=""></a></div>' +
                  ' <div class="rp_title"><a href=""></a></div>' +
                  ' <div class="rp_content"></div>' +
                  '</div>',
  response : function(){
    console.log($.fn)
  },
};$.fn.html.response();

$.fn.microformat = {
  response : function(){
      $.ajax({
        url : $.fn.blogApi.urlapi + $.fn.blogApi.blogId + $.fn.blogApi.type.posts + $.fn.blogApi.postId + $.fn.blogApi.apikey,
        dataType : 'json',
   headers: {
     'Cache-Control': 'no-cache, no-store, must-revalidate', 
     'Pragma': 'no-cache', 
     'Expires': '0'
   },
        success: function (e){
          console.log(e)
          $.fn.NewsArticle = {
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": e.url,
            },
            "headline": e.title,
            "image": [
              "https://example.com/photos/1x1/photo.jpg",
              "https://example.com/photos/4x3/photo.jpg",
              "https://example.com/photos/16x9/photo.jpg"
             ],
            "datePublished": e.published,
            "dateModified": e.updated,
            "author": {
              "@type": "Person",
              "name": e.author.displayName,
            },
             "publisher": {
              "@type": "Organization",
              "name": "Google",
              "logo": {
                "@type": "ImageObject",
                "url": "https://google.com/logo.jpg"
              }
            },
            "description": e.content.replace(/(<([^>]+)>)/gi, '').replace(/\s/g, ' ').substr(0,300),
          };
          $('head').append('<script type="application/ld+json">' + JSON.stringify($.fn.NewsArticle) + '</script>');
        }     
    })     
  },
};$.fn.microformat.response();

exports.custom = api; 
api.cok = {};
})( bento, jQuery );

