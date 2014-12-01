(function() {
  var name = 'exD';

  function Ctrl($rootScope) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
    this.$rootScope.log(this.uuid, name, 'controller');
  }

  Ctrl.$inject = ['$rootScope'];

  /* ========================================================================================= */
  function definition() {
    return {
      controller: Ctrl,
      controllerAs: name
    };
  }

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
