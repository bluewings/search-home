/*jslint browser: true, regexp: true, unparam: true, indent: 4 */
/*global jQuery: true */
(function () {

    'use strict';

    var app;

    app = angular.module('searchHome-header', ['ui.bootstrap']);

    app.directive('header', function ($http) {

        return {
            restrict: 'C',
            replace: false,
            templateUrl: '/templates/header',
            scope: true,
            controller: 'searchHome.header'
        };
    });

    app.controller('searchHome.header', function ($scope, $modal, $location, CONFIG) {

        $scope.CONFIG = CONFIG;

        $scope.menus = [{
            label: 'Infant Care',
            href: '/infant'
        }, {
            label: 'Car',
            href: '/car'
        }];

        $scope.path = function() {

            return $location.$$path;
        };
        $scope.modal = {
            about: function () {

                var modalInstance;

                modalInstance = $modal.open({
                    templateUrl: '/templates/modal-about',
                    size: 'sm',
                    controller: function ($scope, CONFIG) {

                        $scope.CONFIG = CONFIG;
                        $scope.func = {
                            close: function () {
                                modalInstance.dismiss();
                            }
                        };
                    }
                });
            }
        };
    });

}());