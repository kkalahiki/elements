app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/categories', {
      templateUrl: '/views/templates/elements.html',
      controller: 'superTypes'
    }).
    when('/types', {
      templateUrl: '/views/templates/elements.html',
      controller: 'layoutTypes'
    }).
    when('/patterns', {
      templateUrl: '/views/templates/elements.html',
      controller: 'patterns'
    }).
    when('/components', {
      templateUrl: '/views/templates/elements.html',
      controller: 'components'
    }).
    when('/uielements', {
      templateUrl: '/views/templates/elements.html',
      controller: 'uielements'
    }).
    otherwise({
      redirectTo: '/categories'
    });
  }
]);