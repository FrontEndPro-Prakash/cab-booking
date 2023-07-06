(function(){
'use strict';

app.controller('successStoryController', successStoryController);
successStoryController.$inject = ['$scope','homeGetBlogPosts','homeGetSingleBlogPost','getSingleBlogPostImage','biodataConfig'];
function successStoryController($scope,homeGetBlogPosts,homeGetSingleBlogPost,getSingleBlogPostImage,biodataConfig){
	$scope.quantity = 8;
	
	if(window.screen.width <= 991)
		$scope.quantity = 2;

	$scope.stories=[];
			
	/* this is init funciton for initilizing blog stories from homeSerice.js using homgGetBlogPosts service */
	var init = function () {
		homeGetBlogPosts.fetchAll({'filter[posts_per_page]':$scope.quantity},function (obj) {
	        angular.forEach(obj, function(val, key) {
				var postImageLink=biodataConfig.baseUrl+'/images/loader.gif';
				var mediaLink = val._links['wp:featuredmedia'][0];
				var mediaId = mediaLink.href.split("/").pop();
				$scope.singleStory={'readMore':val.link,'name':val.title.rendered,'description':val.excerpt.rendered,'img':postImageLink,'mediaId':mediaId};
				$scope.stories.push($scope.singleStory);
	        });
	        angular.forEach($scope.stories, function(storyVal,storyKey){
	        		getSingleBlogPostImage.fetch({ id: storyVal.mediaId }, function (obj) {
						storyVal.img=obj.source_url;
					});
	        });
	    });
    }
    init();
}
})();