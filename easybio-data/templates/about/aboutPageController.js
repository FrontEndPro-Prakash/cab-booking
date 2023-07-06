(function(){
'use strict';

angular.module('easybiodata').controller('AboutController', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
	var newWidth = 600 + slides.length + 1;
	slides.push({
	  review: [
		'When our first son got married few years ago, we used emails to exchange Biodatas. When we started the matrimonial search for our second son, we used easybiodata. And the process was so much easier! I continue to use easybiodata to manage all the Biodatas now that bhatijaa is going through the search process.',
		'When  I’m not very good at using computers so I spent more than 10 hours making a Biodata for our daughter in Word. Making it on easybiodata was so fast and so much easier.',
		'We learned about easybiodata when a candidate sent us a beautiful Biodata from easybiodata. We were embarrassed how our daughter’s Biodata looked. So we made our own Biodata on easybiodata.',
		'We got compliments from people about how good our children’s Biodata looked!',
		'The best part about easybiodata was that I was able to protect my family’s information by removing our Biodata after our son found a bride.',
		'Few months ago, bhatiiji and bhanji started their search. Helping both families was really easy with easybiodata because I can manage all Biodatas I receive in one place.']
		[slides.length % 6],
	  reviewer: [
		'Anand P. (62 years old)',
		'Narayan C. (64 years old)',
		'Vikram M. (53 years old)',
		'Payal S. (56 years old)',
		'Sandeep S. (59 years old)',
		'Sumit V. (49 years old)',]
		[slides.length % 6],
	  id: currIndex++
	});
  };
 for (var i = 0; i < 6; i++) {
	$scope.addSlide();
  }
});	

})();