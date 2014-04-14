'use strict';

var cbox = global.$cbox;

var request = require('request');

exports.google = function(req, res) {

    var member = req.user;
    var users = cbox.db.collection('users');

    // Check whether user has already imported contacts
    users.findOne({
        contacts: { $exists: true },
        'google.email': member.google.email
    }, function(err, item) {
        if (err) { throw err; }

        // Contact field for current member exists, no need to do anything here
        if (item) {
            return res.redirect('/chat');
        }



        var options = {
            url: 'https://google.com/m8/feeds/contacts/default/thin',
            qs: {
                alt: 'json',
                'max-results':  2000,
            },
            headers: {
                'Authorization': 'OAuth ' + member.google.token,
                'GData-Version': '3.0'
            }
        };

        request.get(options, function (err, result, body) {
            if (result.statusCode === 401) {
                return res.redirect('/');
            }

            var data = JSON.parse(body);

            var contacts = (data.feed.entry || []).map(function(u) {
                var user = {};

                var name = u.gd$name,
                    email = u.gd$email;

                if (name) {
                    if (name.gd$fullName) {
                        user.name = name.gd$fullName.$t;
                    }
                    if (name.gd$givenName) {
                        user.given_name = name.gd$givenName.$t;
                    }
                    if (name.gd$familyName) {
                        user.family_name = name.gd$familyName.$t;
                    }
                }

                if (email && email.length > 0) {
                    user.email = email[0].address;
                }

                return {google: user};
            }).filter(function (u) {
                return !!u.google.email;
            });


            // Save contacts as users in database
            users.insert(contacts, {w:1}, function(err, results) {
                if (err) { throw err; }

                var ids = results.map(function(o) { return o._id; });

                // Update the list of contacts for current member
                users.update({
                    '_id': member._id
                }, {
                    $addToSet: { contacts: { $each: ids } }
                }, { w: 0 });

                return res.redirect('/chat');
            });

        });


    });
};