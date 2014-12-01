(function() {
  var name = 'exH';

  function Ctrl($rootScope, $scope, $parse, $attrs) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
    this.name = $scope.name;
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
  }

  Dir.prototype.pre = function($scope, elem, attrs) {
    this.$rootScope.log(this.uuid, name, $scope.name, 'pre');
  }

  Dir.prototype.post = function($scope, elem, attrs) {
    this.$rootScope.log(this.uuid, name, $scope.name, 'post');
  }

  /* ========================================================================================= */
  function definition($rootScope, $parse) {
    var self = new Dir($rootScope, $parse);
    return {
      template: '',
      compile: self.compile.bind(self),
      controller: Ctrl,
      controllerAs: name,
      scope: {
        name: '=exName'
      }
    };
  }

  definition.$inject = ['$rootScope', '$parse'];

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
