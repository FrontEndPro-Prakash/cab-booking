(function(){
'use strict';

app.controller('HelpController', HelpController);
HelpController.$inject = ['$scope'];
function HelpController($scope){

	$scope.PopularArticles =[
		{"ArticleName":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"#/help-detail"
		},
		{"ArticleName":"Consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"http://google.com/"
		},
		{"ArticleName":"Dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"#/help-detail"
		},
		{"ArticleName":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"#/help-detail"
		},
		{"ArticleName":"Consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"#/help-detail"
		},
		{"ArticleName":"Dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"#/help-detail"
		},
		{"ArticleName":"Consectetur adipiscing elit. Aenean euismod",
		 "ArticleLink":"#/help-detail"
		}
	]

	$scope.ProbleFixing =[
		{"ProbleFixingName":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "ProbleFixingLink":"#/help-detail"
		},
		{"ProbleFixingName":"Consectetur adipiscing elit. Aenean euismod",
		 "ProbleFixingLink":"#/help-detail"
		},
		{"ProbleFixingName":"Dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "ProbleFixingLink":"#/help-detail"
		}
	]
	
	$scope.SuggestedArticles =[
		{"SuggestedArticleName":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "SuggestedArticleLink":"#/help-detail"
		},
		{"SuggestedArticleName":"Consectetur adipiscing elit. Aenean euismod",
		 "SuggestedArticleLink":"#/help-detail"
		},
		{"SuggestedArticleName":"Dolor sit amet, consectetur adipiscing elit. Aenean euismod",
		 "SuggestedArticleLink":"#/help-detail"
		}
	]
	
	$scope.PopularTopics =[
		{"PopularTopicsLink":"#/help-detail",
		 "PopularTopicsIcon":"",
		 "PopularTopicsTitle":"Heading Goes Here 1",
		 "PopularTopicsDescription":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		},
		{"PopularTopicsLink":"#/help-detail",
		 "PopularTopicsIcon":"",
		 "PopularTopicsTitle":"Heading Goes Here 2",
		 "PopularTopicsDescription":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		},
		{"PopularTopicsLink":"#/help-detail",
		 "PopularTopicsIcon":"",
		 "PopularTopicsTitle":"Heading Goes Here 3",
		 "PopularTopicsDescription":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		},
		{"PopularTopicsLink":"#/help-detail",
		 "PopularTopicsIcon":"",
		 "PopularTopicsTitle":"Heading Goes Here 4",
		 "PopularTopicsDescription":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		},
		{"PopularTopicsLink":"#/help-detail",
		 "PopularTopicsIcon":"",
		 "PopularTopicsTitle":"Heading Goes Here 5",
		 "PopularTopicsDescription":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		},
		{"PopularTopicsLink":"#/help-detail",
		 "PopularTopicsIcon":"",
		 "PopularTopicsTitle":"Heading Goes Here 6",
		 "PopularTopicsDescription":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		}			
	]
	
}	

})();