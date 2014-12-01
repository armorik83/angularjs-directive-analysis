(function() {
  var name = 'exF';

  function Ctrl($rootScope, $scope, $parse, $attrs) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
    this.name = $parse($attrs.exName)($scope);
    this.$rootScope.log(this.uuid, name, this.name, 'controller');
  }

  Ctrl.$inject = ['$rootScope', '$scope', '$parse', '$attrs'];

  /* ========================================================================================= */
  function Dir($rootScope, $parse) {
    this.$rootScope = $rootScope;
    this.$parse = $parse;
    this.uuid = uuid();
  }

  Dir.prototype.compile = function(elem, attrs) {
    this.$rootScope.log(this.uuid, name, attrs.exName, 'compile');
    return {
      pre: this.pre.bind(this),
      post: this.post.bind(this)
    };
  };

  Dir.prototype.pre = function($scope, elem, attrs) {
    this.$rootScope.log(this.uuid, name, this.$parse(attrs.exName)($scope), 'pre');
  };

  Dir.prototype.post = function($scope, elem, attrs) {
    this.$rootScope.log(this.uuid, name, this.$parse(attrs.exName)($scope), 'post');
  };

  /* ========================================================================================= */
  function definition($rootScope, $parse) {
    var self = new Dir($rootScope, $parse);
    return {
      compile: self.compile.bind(self),
      controller: Ctrl,
      controllerAs: name
    };
  }

  definition.$inject = ['$rootScope', '$parse'];

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
