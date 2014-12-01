(function() {

  var name = 'exK';
  var child = 'ex-h';

  function append($rootScope, uuid, exName, elem, caller, $compile, $scope) {
    console.group('append element');
    elem.append('<' + child + ' ex-name="' + name + '.name + \'0\'">{{' + name + '.name}}-0</' + child + '>');
    if ($scope) {
      $compile(angular.element(child))($scope);
    }
    console.groupEnd('append element');
  }

  /* ========================================================================================= */

  function Ctrl($rootScope, $scope, $parse, $compile, $element, $attrs) {
    this.$rootScope = $rootScope;
    this.uuid = uuid();
    this.name = $scope.name;
    this.create = $scope.create;
    this.$rootScope.log(this.uuid, name, this.name, 'controller');

    if (this.create === "controller") {
      append(this.$rootScope, this.uuid, this.name, $element, 'controller', $compile, $scope);
    }
    if (this.create === "compile+controller") {
      console.group('compile inside controller');
      $compile(angular.element(child))($scope);
      console.groupEnd('compile inside controller');
    }
  }

  Ctrl.$inject = [
    '$rootScope',
    '$scope',
    '$parse',
    '$compile',
    '$element',
    '$attrs'
  ];

  /* ========================================================================================= */
  function Dir($rootScope, $parse, $compile) {
    this.$rootScope = $rootScope;
    this.$parse = $parse;
    this.$compile = $compile;
    this.uuid = uuid();
  }

  Dir.prototype.compile = function(elem, attrs) {
    console.log(attrs.exCreate);
    this.$rootScope.log(this.uuid, name, attrs.exName, 'compile');
    if (/compile/.test(attrs.exCreate)) {
      append(this.$rootScope, this.uuid, attrs.exName, elem, 'compile', this.$compile);
    }
    return {
      pre: this.pre.bind(this),
      post: this.post.bind(this),
    };
  }

  Dir.prototype.pre = function($scope, elem, attrs) {
    var exName = $scope.name;
    this.$rootScope.log(this.uuid, name, exName, 'pre');
    if ($scope.create === "pre") {
      append(this.$rootScope, this.uuid, exName, elem, 'pre', this.$compile, $scope);
    }
    if ($scope.create === "compile+pre") {
      console.group('compile inside pre');
      this.$compile(angular.element(child))($scope);
      console.groupEnd('compile inside pre');
    }
  }

  Dir.prototype.post = function($scope, elem, attrs) {
    var exName = $scope.name;
    this.$rootScope.log(this.uuid, name, exName, 'post');
    if ($scope.create === "post") {
      append(this.$rootScope, this.uuid, exName, elem, 'post', this.$compile, $scope);
    }
    if ($scope.create === "compile+post") {
      console.group('compile inside post');
      this.$compile(angular.element(child))($scope);
      console.groupEnd('compile inside post');
    }
  }

  /* ========================================================================================= */
  function definition($rootScope, $parse, $compile) {
    var self = new Dir($rootScope, $parse, $compile);
    return {
      compile: self.compile.bind(self),
      controller: Ctrl,
      controllerAs: name,
      scope: {
        name: '=exName',
        create: '=exCreate'
      }
    };
  }

  definition.$inject = ['$rootScope', '$parse', '$compile'];

  /* ========================================================================================= */
  angular.module(appName).directive(name, definition);
})();
