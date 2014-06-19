/*jslint browser: true, regexp: true, unparam: true, indent: 4 */
/*global jQuery: true */
(function () {

    'use strict';

    var $ = jQuery;

    var app;

    app = angular.module('searchHome', [
        'ngRoute',
        'ngSanitize',
        //'ngUpload',
        'ui.bootstrap',
        'searchHome-header',
        'searchHome-content'
    ]);

    app.config(function ($provide, $routeProvider, $locationProvider, $compileProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/infant', {
                templateUrl: '/templates/content-infant',
                controller: 'searchHome.content.infant'
            })
            .when('/car', {
                templateUrl: '/templates/content-car',
                controller: 'searchHome.content.car'
            })
            .otherwise({
                redirectTo: '/infant'
            });
    });

    app.constant('CONFIG', {
        NAME: 'Search Home',
        VERSION: '1.0.0',
        UPDATED: '2014. 6. 19',
        AUTHORS: [{
            NAME: '김윤중',
            EMAIL: 'yunjung.kim@navercorp.com'
        }, {
            NAME: '이호석',
            EMAIL: 'hoseok.lee@navercorp.com'
        }]
    });

    app.constant('CONSTANT', {
        SUCCESS: 200,
        ERROR: 500
    });

}());