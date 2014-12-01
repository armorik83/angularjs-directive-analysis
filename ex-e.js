(function() {

  var name = 'exE';

  function Ctrl($rootScope) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
    this.$rootScope.log(this.uuid, name, 'controller');
  }

  Ctrl.$inject = ['$rootScope'];

  /* ========================================================================================= */
  function Dir($rootScope) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
  }

  Dir.prototype.compile = function() {
    this.$rootScope.log(this.uuid, name, 'compile');
    return this.link.bind(this);
  }

  Dir.prototype.link = function() {
    this.$rootScope.log(this.uuid, name, 'link');
  }

  /* ========================================================================================= */
  function definition($rootScope) {
    var self = new Dir($rootScope);
    return {
      compile: self.compile.bind(self),
      controller: Ctrl,
      controllerAs: name
    };
  }

  definition.$inject = ['$rootScope'];

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
