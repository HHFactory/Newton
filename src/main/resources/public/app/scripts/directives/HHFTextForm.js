/**
 * 必須チェック&文字数チェック機能を持ったtextフィールド
 * @return {[type]} [description]
 */
(function(){
'use strict';

	var HHFTextForm = function(){
		return{
			restrict: 'E',
			require: '^form',
			replace: true,
			scope: {
				name: '@',
				placeholder: '@',
				ngModel: '=',
				required: '=',
				ngMaxlength: '='
			},
			templateUrl: 'app/views/template/hhfTextForm.html',
			link: function(scope,element,attrs,ctrl) {
				var target  = ctrl[attrs.name];
				console.log(attrs.ngMaxlength);
				scope.length = attrs.ngMaxlength;

				//エラー表示タイミング(フォーカスしたが値が変更されなかったとき)
				scope.isError = function() {
					return target.$touched && target.$pristine;
				};

				//必須チェック
				scope.isRequiredError = function() {
					return target.$error.required;
				};

				//文字数チェック
				scope.isLengthError = function() {
					console.log(target.$error);
					return target.$error.maxlength;
				};
			}
		}
	}


	angular.module(indexModule).directive('hhfTextForm',[HHFTextForm]);
})();