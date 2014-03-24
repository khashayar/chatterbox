var fs = require('fs');

exports.list = function(req, res) {
	var parent = req.query.parent || '/';

	fs.readdir(parent, function(err, files) {
		if (err) {
			console.error("Invalid target!");
			return;
		}

		res.send(files);
	});
};