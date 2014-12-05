app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/superTypes', {
      templateUrl: '/views/templates/superTypes.html',
      controller: 'superTypes'
    }).
    when('/layoutTypes', {
      templateUrl: '/views/templates/layoutTypes.html',
      controller: 'layoutTypes'
    }).
    when('/patterns', {
      templateUrl: '/views/templates/patterns.html',
      controller: 'patterns'
    }).
    when('/components', {
      templateUrl: '/views/templates/components.html',
      controller: 'components'
    }).
    otherwise({
      redirectTo: '/superTypes'
    });
  }
]);