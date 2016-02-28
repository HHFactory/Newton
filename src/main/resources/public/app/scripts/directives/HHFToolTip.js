/**
 * バリデーションエラー時を表示タイミングとするtooltip
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	var HHFTooltip = function($uibTooltip,$timeout){
		return {
			var tooltip = $uibTooltip();
			var originalCompile = aungular.copy(tooltip.compile);
			
		}
	}

	angular.module('indexModule').directive('hhfTooltip',['$uibTooltip','$timeout',HHFTooltip]);
})();