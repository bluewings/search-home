/*jslint browser: true, regexp: true, unparam: true, indent: 4 */
/*global jQuery: true */
(function () {

    'use strict';

    var app;

    app = angular.module('searchHome-content-infant', ['ui.bootstrap']);

    app.controller('searchHome.content.infant', function ($scope, $http, CONSTANT) {

    	$scope.conditions = {
    		search: '',
    		range: 0,
    		ranges: []
    	};

    	$scope.func = {
    		submit: function() {

    			var cond = $scope.conditions;

    			$http.get('/infant/data/' + cond.range + '?search=' + encodeURIComponent(cond.search)).success(function(data) {

		    		if (data.code === CONSTANT.SUCCESS) {
		    			$scope.result = data.result;
		    		}
    			});
    		}
    	};

    	$http.get('/infant/ranges').success(function(data) {

    		if (data.code === CONSTANT.SUCCESS) {
    			$scope.conditions.ranges = data.result.ranges;
    		}
    	});
    });

}());