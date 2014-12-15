var Type = require('../models/types.js');

module.exports.create = function (req, res, element) {
	var newType = req.body;
	newType.type = element;
	var type = new Type.elements(req.body);
	type.save(function (err, result) {
		res.json(result);
	});
}

module.exports.read = function (req, res, element) {
	if (element === 'all') {
		Type.elements.find(function (err, results) {
			res.json(results);
		});
	}
	else {
		Type.elements.find({'type': element}, function (err, results) {
			res.json(results);
		});
	}
}

module.exports.update = function (req, res) {
	var params = {
		'name': req.body.name,
		'description': req.body.description,
		'children': req.body.children
	};
	Type.elements.findOneAndUpdate({ _id : req.params[0] }, params, {}, function (err, result) {
		if (err) {console.log(err)}
		else {
			res.json(result);
		}
	});
}

module.exports.delete = function (req, res) {
	Type.elements.findOneAndRemove({ _id : req.params[0] }, function (err, result) {
		res.json(result);
	});
}