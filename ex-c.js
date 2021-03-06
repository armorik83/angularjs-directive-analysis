(function() {
  var name = 'exC';

  function Dir($rootScope) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
  }

  Dir.prototype.compile = function() {
    this.$rootScope.log(this.uuid, name, 'compile');
    return this.link.bind(this);
  };

  Dir.prototype.link = function() {
    this.$rootScope.log(this.uuid, name, 'link');
  };

  /* ========================================================================================= */
  function definition($rootScope) {
    var self = new Dir($rootScope);
    return {
      compile: self.compile.bind(self)
    };
  }

  definition.$inject = ['$rootScope'];

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
