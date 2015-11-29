//MainController
(function(){
	'use strict';
	
	function MainCtrl(){		
		var duration = 300,
		    menu = $('#sidebar'),
		    button = $('#slideButton'),
		    body = $(document.body),
		    question = $('#question'),
		    timeline = $('#timeline'),
		    menuWidth = menu.outerWidth();

		//メニューバーを開く
		//TODO:directiveで書き直す
		button.on('click',function(){
			console.log('succsss');							
			body.toggleClass('open');
			question.toggleClass('col-sm-6');
			question.toggleClass('close-side-bar');
			question.toggleClass('open-side-bar')			    
			if (body.hasClass('open')) {
			    body.animate({'left': menuWidth}, duration);
			    menu.animate({'left': 0}, duration);
			} else {
			    menu.animate({'left': -menuWidth}, duration);
			    body.animate({'left': 0}, duration);
			};
		});
	}	

	//angularへの登録
	angular.module('indexModule').controller('MainController',MainCtrl);
})();




