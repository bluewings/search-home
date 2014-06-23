/*jslint browser: true, regexp: true, unparam: true, indent: 4 */
/*global jQuery: true */
(function () {

    'use strict';

    var app;

    app = angular.module('searchHome-content-car', ['ui.bootstrap', 'ngResource']);

    app.factory('User', ['$resource',
        function ($resource) {

            var userResource = $resource('/user/:userId');

            return userResource;

        }
    ]);

    app.factory('UserNote', ['$resource',
        function ($resource) {

            var userResource = $resource('/user/:userId/note/:_id', null, {
                'update': {
                    method: 'PUT',
                    params: {
                        userId: '@id',
                        _id: '@_id'
                    }
                }

            });

            return userResource;

        }
    ]);

    app.controller('searchHome.content.car', function ($scope, $modal, User, UserNote) {

        $scope.data = {

            users: []

        };



        $scope.User = {

            create: function () {
                User.save({}, {}, function (data) {
                    console.log(data);
                    $scope.User.get();
                }, function () {

                    console.log('err');

                });
            },
            addNote: function (user) {
                UserNote.save({
                    userId: user.userId
                }, {}, function (data) {
                    console.log(data);
                    $scope.User.get();
                }, function () {

                    console.log('err');

                });
            },
            editNote: function (user, note) {
                var title = prompt('message?');
                UserNote.update({
                    userId: user.userId,
                    _id: note._id
                }, {
                    title: title
                }, function (data) {

                    console.log(data);
                    $scope.User.get();
                }, function () {

                    console.log('err');

                });

            },
            removeNote: function (user, note) {
                UserNote.remove({
                    userId: user.userId,
                    _id: note._id
                }, function (data) {
                    console.log(data);
                    $scope.User.get();
                }, function () {

                    console.log('err');

                });

            },
            get: function () {


                User.get({}, function (result) {
                    //console.log(data);
                    $scope.data.users = result.data;
                }, function () {

                    console.log('err');

                });
            },
            remove: function (user) {
                User.remove({
                    userId: user.userId
                }, function (data) {
                    console.log(data);
                    $scope.User.get();
                }, function () {

                    console.log('err');

                });

            }

        };

        $scope.User.get();



    });

}());