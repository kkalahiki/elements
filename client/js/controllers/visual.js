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
  
  var radius = radiusMaker(childrenCount);
  var coords = locaterAtor();
  var w = stage.canvas.width;
  var h = stage.canvas.height;
  if ((coords.x + radius*2) > w) {coords.x = w-(radius*2)}
  if ((coords.x - radius) < 0) {coords.x = radius}
  if ((coords.y + radius*2) > h) {coords.y = h-(radius*2)}
  if ((coords.y - radius) < 0) {coords.y = radius}

  console.log(coords.x+', '+coords.y+', '+w+', '+h);
  container.x = coords.x;
  container.y = coords.y;
  container.setBounds(0, 0, radius, radius);

  circle.graphics.s("#000").f("#ccc").dc(0, 0, radius);
  /*circle.x = 100;
  circle.y = 100;*/

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

circleMaker(20, 'Whatevs');
circleMaker(2, 'Howzit');

}]);