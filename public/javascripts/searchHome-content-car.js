/*jslint browser: true, regexp: true, unparam: true, indent: 4 */
/*global jQuery: true */
(function () {

    'use strict';

    var app;

    app = angular.module('searchHome-content-car', ['ui.bootstrap', 'ngResource']);

    app.factory('User', ['$resource', function($resource) {

    	var userResource = $resource('/user/:id');

    	return userResource;

    }]);

    app.factory('UserNote', ['$resource', function($resource) {

    	var userResource = $resource('/user/:id/note/:_id');

    	return userResource;

    }]);    

    app.controller('searchHome.content.car', function ($scope, $modal, User, UserNote) {

    	$scope.data = {

    		users: []

    	};

    	

    	$scope.User = {

    		create: function() {
    			User.save({}, {}, function(data) {
    				console.log(data);
    				$scope.User.get();
    			}, function() {

    				console.log('err');

    			});
    		},
    		addNote: function(user) {
    			UserNote.save({id:user.id}, {}, function(data) {
    				console.log(data);
    				$scope.User.get();
    			}, function() {

    				console.log('err');

    			});
    		},   
    		editNote: function(user, note) {
    			UserNote.save({id: user.id, _id: note._id}, function(data) {
    				console.log(data);
    				$scope.User.get();
    			}, function() {

    				console.log('err');

    			});    			

    		}, 
    		removeNote: function(user, note) {
    			UserNote.remove({id: user.id, _id: note._id}, function(data) {
    				console.log(data);
    				$scope.User.get();
    			}, function() {

    				console.log('err');

    			});    			

    		},    				
    		get: function() {


    			User.get({}, function(data) {
    				//console.log(data);
    				$scope.data.users = data.result.data;
    			}, function() {

    				console.log('err');

    			});
    		},
    		remove: function(user) {
    			User.remove({id: user.id}, function(data) {
    				console.log(data);
    				$scope.User.get();
    			}, function() {

    				console.log('err');

    			});    			

    		}

    	};

    	$scope.User.get();



    });

}());