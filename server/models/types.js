var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var childSchema = new Schema({ id: String });

module.exports.layoutTypes = mongoose.model('layoutTypes', {
	name: String,
	description: String,
	examples: String,
	children: [childSchema]
});

module.exports.layoutSuperTypes = mongoose.model('layoutSuperTypes', {
	name: String,
	description: String,
	children: [childSchema]
});

module.exports.patterns = mongoose.model('patterns', {
	name: String,
	description: String,
	children: [childSchema]
});

module.exports.components = mongoose.model('components', {
	name: String,
	description: String
});

module.exports.standards = mongoose.model('standards', {
	name: String,
	description: String
});
