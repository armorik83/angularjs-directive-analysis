var appName = 'exApp';
angular.module(appName, ['ngRoute']);
function version() {
  console.log('AngularJS ' + angular.version.full);
}
version();

/* ========================================================================================= */
function uuid() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function uuidEnable() {
  return uuid();
}

function uuidDisable() {
  return '-';
}

/* ========================================================================================= */
(function() {

  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/a-01', {templateUrl: 'a-01.html'})
      .when('/a-02', {templateUrl: 'a-02.html'})
      .when('/a-03', {templateUrl: 'a-03.html'})
      //
      .when('/b-01', {templateUrl: 'b-01.html'})
      .when('/b-02', {templateUrl: 'b-02.html'})
      .when('/b-03', {templateUrl: 'b-03.html'})
      //
      .when('/c-01', {templateUrl: 'c-01.html'})
      .when('/c-02', {templateUrl: 'c-02.html'})
      .when('/c-03', {templateUrl: 'c-03.html'})
      //
      .when('/d-01', {templateUrl: 'd-01.html'})
      .when('/d-02', {templateUrl: 'd-02.html'})
      .when('/d-03', {templateUrl: 'd-03.html'})
      //
      .when('/e-01', {templateUrl: 'e-01.html'})
      .when('/e-02', {templateUrl: 'e-02.html'})
      .when('/e-03', {templateUrl: 'e-03.html'})
      //
      .when('/f-a01', {templateUrl: 'f-a01.html'})
      .when('/f-a02', {templateUrl: 'f-a02.html'})
      .when('/f-a03', {templateUrl: 'f-a03.html'})
      //
      .when('/f-b01', {templateUrl: 'f-b01.html'})
      .when('/f-b02', {templateUrl: 'f-b02.html'})
      .when('/f-b03', {templateUrl: 'f-b03.html'})
      //
      .when('/f-c01', {templateUrl: 'f-c01.html'})
      .when('/f-c02', {templateUrl: 'f-c02.html'})
      .when('/f-c03', {templateUrl: 'f-c03.html'})
      //
      .when('/f-d01', {templateUrl: 'f-d01.html'})
      .when('/f-d02', {templateUrl: 'f-d02.html'})
      .when('/f-d03', {templateUrl: 'f-d03.html'})
      //
      .when('/f-e01', {templateUrl: 'f-e01.html'})
      .when('/f-e02', {templateUrl: 'f-e02.html'})
      .when('/f-e03', {templateUrl: 'f-e03.html'})
      //
      .when('/j-01', {templateUrl: 'j-01.html'})
      .when('/j-02', {templateUrl: 'j-02.html'})
      .when('/j-03', {templateUrl: 'j-03.html'})
      //
      .when('/k-a01', {templateUrl: 'k-a01.html'})
      .when('/k-b01', {templateUrl: 'k-b01.html'})
      .when('/k-c01', {templateUrl: 'k-c01.html'})
      .when('/k-d01', {templateUrl: 'k-d01.html'})
      .when('/k-e01', {templateUrl: 'k-e01.html'})
      .when('/k-f01', {templateUrl: 'k-f01.html'})
      .when('/k-g01', {templateUrl: 'k-g01.html'})
      //
      .when('/mixed-fghi01', {templateUrl: 'mixed-fghi01.html'})
      .when('/mixed-fghi02', {templateUrl: 'mixed-fghi02.html'})
      .when('/mixed-ghi', {templateUrl: 'mixed-ghi.html'})
      //
      .when('/', {templateUrl: 'contents.html'})
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  angular.module(appName)
    .config(routeConfig);

  /* ========================================================================================= */
  function runMain($rootScope) {
    $rootScope.arr = [0, 1, 2];
    $rootScope.arr2 = ['A', 'B', 'C'];

    $rootScope.useUuid = function() {
      if (!!$rootScope.displayUuid) {
        $rootScope.uuid = uuidEnable;
        return;
      }
      $rootScope.uuid = uuidDisable;
    };

    $rootScope.log = function(uuid) {
      var uuid = (!!$rootScope.displayUuid) ? uuid: '';
      var args = [].slice.apply(arguments);

      if (args[0] === '') {
        if (args[3]) {
          return console.log(args[1], args[2], args[3]);
        }
        return console.log(args[1], args[2]);
      }
      if (args[3]) {
        return console.log(args[0], args[1], args[2], args[3]);
      }
      return console.log(args[0], args[1], args[2]);
    }

    var logBlank = _.debounce(function() {
      console.log('');
    }, 100);
    $rootScope.$on('$routeChangeStart', logBlank);
  }

  runMain.$inject = ['$rootScope'];

  angular.module(appName).run(runMain);
})();
