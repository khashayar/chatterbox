var routes = require('./routes/index');
var folder = require('./routes/folder');

module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/folder', folder.list);
}