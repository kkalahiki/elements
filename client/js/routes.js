app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/categories', {
      templateUrl: '/views/templates/superTypes.html',
      controller: 'superTypes'
    }).
    when('/types', {
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
    when('/uielements', {
      templateUrl: '/views/templates/uiElements.html',
      controller: 'uielements'
    }).
    otherwise({
      redirectTo: '/categories'
    });
  }
]);