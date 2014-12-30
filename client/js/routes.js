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
    when('/visual', {
      templateUrl: '/views/templates/visual.html',
      controller: 'visual'
    }).
    otherwise({
      redirectTo: '/categories'
    });
  }
]);