(function() {
  var name = 'exB';

  function Dir($rootScope) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
  }

  Dir.prototype.link = function() {
    this.$rootScope.log(this.uuid, name, 'link');
  };

  /* ========================================================================================= */
  function definition($rootScope) {
    var self = new Dir($rootScope);
    return {
      link: self.link.bind(self)
    };
  }

  definition.$inject = ['$rootScope'];

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
