'use strict';

/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('layout', { title: 'Express' });
};

exports.profile = function(req, res) {
    res.render('layout', { title: 'Express' });
};
