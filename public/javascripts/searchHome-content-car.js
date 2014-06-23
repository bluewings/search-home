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

            users: [],
            selectedUser: null

        };

        $scope.func = {
            selectUser: function(user) {
                $scope.data.selectedUser = user;
                console.log(user);
            }
        };

        $scope.modal = {
            note: function(user, note) {

                var modalInstance;




                modalInstance = $modal.open({
                    templateUrl: '/templates/modal-note',
                    size: 'sm',
                    resolve: {
                        data: function() {
                            var data;
                            data = {
                                userId: user.userId
                            };
                            data = $.extend(data, note || {});
                            return data;
                        }
                    },
                    controller: function ($scope, data) {

                        console.log(data);
                        $scope.data = data;

                        $scope.func = {
                            submit: function() {



                        

                                //$scope.func = Object.create($scope.$parent.$root.func);

                            UserNote.save($scope.data, {}, function (data) {
                                console.log(data);
                modalInstance.close();                
                            }, function () {

                
                    //method: 'update',
                    //data: $scope.note
                //});                                                        

                                console.log('err');

                            });

                            },
                            close: function () {
                                modalInstance.dismiss();
                            }
                        };
                    }
                });


                    modalInstance.result.then(function (result) {

                        $scope.User.get();
                        
                        

                        //$rootScope.note.add(result.data);
                    });

            },
            showJSON: function(jsonData) {

                var modalInstance;



                modalInstance = $modal.open({
                    templateUrl: '/templates/modal-json',
                    size: 'sm',
                    controller: function ($scope) {

                        $scope.json = jsonData;

                        $scope.func = {
                            close: function () {
                                modalInstance.dismiss();
                            }
                        };
                    }
                });                
                //$scope.data.selectedUser = user;
                //console.log(user);
            }
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
                    var found = false;
                    console.log('aaaabb');
                    //console.log(data);
                    $scope.data.users = result.data;
                    if ($scope.data.selectedUser) {
                        console.log(result.data);
                        angular.forEach(result.data, function(item) {

                            console.log('>>>');

                            console.log(item);

                            if ($scope.data.selectedUser.userId === item.userId) {
                                $scope.data.selectedUser = item;
                                found = true;
                                return false;
                            }
                        });    
                    }
                    if (found === false) {
                        $scope.data.selectedUser = null;

                    }
                    
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