(function () {

    angular.module('app.core').config(coreConfig);
    coreConfig.$inject = ['toastrConfig', 'cfpLoadingBarProvider'];

    function coreConfig(toastrConfig, cfpLoadingBarProvider) {

        angular.extend(toastrConfig, {
            closeButton: true,
            autoDismiss: false,
            tapToDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });

        //cfpLoadingBarProvider.includeSpinner = false;
        //cfpLoadingBarProvider.includeBar = false;
    }

})();
