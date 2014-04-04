'use strict';

exports.facebook = function(req, res) {
    res.write('Facebook');
    res.end();
};

exports.google = function(req, res) {
    res.write('Google');
    res.end();
};