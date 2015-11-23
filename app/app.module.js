(function () {

    "use strict";

    angular.module('app', [
        'app.core',
        'app.common',
        'app.login',
        'app.main',
        'app.discovery',
        'app.notification',
        'app.accounting',
        'app.admin'
    ]).run(appRun);

    appRun.$inject = ['$rootScope', '$location', '$cookies', '$http']

    function appRun($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, current, previous) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/reset']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            $rootScope.UserName =  $rootScope.globals.currentUser ? $rootScope.globals.currentUser.username : '';
            //$rootScope.LoginLinkText = $rootScope.UserName ?  $rootScope.UserName + ': Log Off' : 'Not Logged In';
            $rootScope.LoginLinkText = $rootScope.UserName ?  'Log Off' : 'Not Logged In';

            $rootScope.title = current.$$route.title;
        });
    }


}());