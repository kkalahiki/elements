var Type = require('../models/types.js');

module.exports.create = function (req, res) {
	var type = new Type.layoutSuperTypes(req.body);
	type.save(function (err, result) {
		res.json(result);
	});
}

module.exports.read = function (req, res) {
	Type.layoutSuperTypes.find({}, function (err, results) {
		res.json(results);
	});
}

module.exports.update = function (req, res) {
	var params = {
		'name': req.body.name,
		'description': req.body.description,
		'children': req.body.children
	};
	//Type.findOneAndUpdate({ _id : req.params[0] }, {'name': req.body.name}, {}, function (err, result) {
	Type.layoutSuperTypes.findOneAndUpdate({ _id : req.params[0] }, params, {}, function (err, result) {
		if (err) {console.log(err)}
		else {
			res.json(result);
		}
	});
}

module.exports.delete = function (req, res) {
	Type.layoutSuperTypes.findOneAndRemove({ _id : req.params[0] }, function (err, result) {
		res.json(result);
	});
}