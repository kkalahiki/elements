app.controller('visual', ['$scope', '$resource', '$modal', function($scope, $resource, $modal){

var stage = new createjs.Stage("demoCanvas");
stage.enableMouseOver(10);

var radiusMaker = function (childrenCount) {
  return childrenCount * 10;
}

var locaterAtor = function () {
  var coords = {};
  coords.x = Math.floor(Math.random() * 1000.25);
  coords.y = Math.floor(Math.random() * 1000.25);
  return coords;
}

var circleMaker = function (childrenCount, name, children) {
  var container = new createjs.Container();
  var circle = new createjs.Shape();
  var text = new createjs.Text();
  
  var stroke = 8;
  var radius = radiusMaker(childrenCount);
  var coords = locaterAtor();
  var w = stage.canvas.width;
  var h = stage.canvas.height;
  if ((coords.x + radius + stroke) > w) {coords.x = w-(radius + stroke)}
  if ((coords.x - radius + stroke) < 0) {coords.x = radius + stroke}
  if ((coords.y + radius + stroke) > h) {coords.y = h-(radius + stroke)}
  if ((coords.y - radius + stroke) < 0) {coords.y = radius + stroke}

  /*console.log(coords.x+', '+coords.y+', '+w+', '+h);*/
  container.x = coords.x;
  container.y = coords.y;
  container.setBounds(0, 0, radius, radius);

  circle.graphics.ss(stroke,"round").s("#999").f("#ccc").dc(0, 0, radius);
  
  text.set({
    text: name
  });

  container.addChild(circle);
  container.addChild(text);
  stage.addChild(container);
  stage.update();

  circle.addEventListener("mouseover", function (target) {
    target.target.graphics.s("#000").f("#999").dc(0, 0, radius);
    stage.update();
  });
  circle.addEventListener("mouseout", function (target) {
    target.target.graphics.s("#000").f("#ccc").dc(0, 0, radius);
    stage.update();
  });
}

var elements = $resource('/api/elements/');
elements.query(function (results) {
  angular.forEach(results, function(value, key) {
    if (value.type === 'supertypes') { circleMaker(value.children.length, value.name) }
  });
});


}]);