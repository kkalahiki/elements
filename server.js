var express 				= require('express'),
	app 					= express(),
	port 					= 3000,
	mongoose 				= require('mongoose'),
	bodyParser				= require('body-parser'),
	jsonParser				= bodyParser.json(),
/*	layoutTypesController 	= require('./server/controllers/layoutTypes.js'),
	superTypesController 	= require('./server/controllers/superTypes.js'),
	patternsController 		= require('./server/controllers/patterns.js'),
	componentsController 	= require('./server/controllers/components.js'),*/
	elementsController		= require('./server/controllers/elements.js');

mongoose.connect('mongodb://localhost:27017/elements');

app.get('/', function (req, res) {res.sendFile(__dirname + '/client/views/index.html')});
app.get('/superTypes', function (req, res) {res.sendFile(__dirname + '/client/views/superTypes.html')});
app.get('/layoutTypes', function (req, res) {res.sendFile(__dirname + '/client/views/layoutTypes.html')});
app.get('/patterns', function (req, res) {res.sendFile(__dirname + '/client/views/patterns.html')});
app.get('/components', function (req, res) {res.sendFile(__dirname + '/client/views/components.html')});
app.get('/uielements', function (req, res) {res.sendFile(__dirname + '/client/views/components.html')});

// Elements API
app.get('/api/elements', jsonParser, function (req, res) { elementsController.read(req, res, 'all') });
app.put('/api/elements/*', jsonParser, elementsController.update);
app.delete('/api/elements/*', jsonParser, elementsController.delete);

// Super Type element
app.post('/api/supertypes', jsonParser, function (req, res) { elementsController.create(req, res, 'supertypes') });
app.get('/api/supertypes', jsonParser, function (req, res) { elementsController.read(req, res, 'supertypes') });

// Layout Type element
app.post('/api/types', jsonParser, function (req, res) { elementsController.create(req, res, 'layouttypes') });
app.get('/api/types', jsonParser, function (req, res) { elementsController.read(req, res, 'layouttypes') });

// Component element
app.post('/api/components', jsonParser, function (req, res) { elementsController.create(req, res, 'components') });
app.get('/api/components', jsonParser, function (req, res) { elementsController.read(req, res, 'components') });

// Pattern element
app.post('/api/patterns', jsonParser, function (req, res) { elementsController.create(req, res, 'patterns') });
app.get('/api/patterns', jsonParser, function (req, res) { elementsController.read(req, res, 'patterns') });

// UI element
app.post('/api/uielements', jsonParser, function (req, res) { elementsController.create(req, res, 'uielements') });
app.get('/api/uielements', jsonParser, function (req, res) { elementsController.read(req, res, 'uielements') });

/*
app.get('/api/types', jsonParser, layoutTypesController.read);
app.post('/api/types', jsonParser, layoutTypesController.create);
app.put('/api/types/*', jsonParser, layoutTypesController.update);
app.delete('/api/types/*', jsonParser, layoutTypesController.delete);

app.get('/api/supertypes', jsonParser, superTypesController.read);
app.post('/api/supertypes', jsonParser, superTypesController.create);
app.put('/api/supertypes/*', jsonParser, superTypesController.update);
app.delete('/api/supertypes/*', jsonParser, superTypesController.delete);

app.get('/api/patterns', jsonParser, patternsController.read);
app.post('/api/patterns', jsonParser, patternsController.create);
app.put('/api/patterns/*', jsonParser, patternsController.update);
app.delete('/api/patterns/*', jsonParser, patternsController.delete);

app.get('/api/components', jsonParser, componentsController.read);
app.post('/api/components', jsonParser, componentsController.create);
app.put('/api/components/*', jsonParser, componentsController.update);
app.delete('/api/components/*', jsonParser, componentsController.delete);
*/

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/views', express.static(__dirname + '/client/views'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/thirdparty', express.static(__dirname + '/client/thirdparty'));
app.use('/bower_components', express.static(__dirname + '/client/bower_components'));

app.listen(port, function () {
	console.log('listening')
})