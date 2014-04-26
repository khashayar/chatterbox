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
            url: 'https://google.com/m8/feeds/contacts/default/full',
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

                var id = u.gContact$website,
                    name = u.gd$name,
                    email = u.gd$email;

                if (id && id[0] && id[0].href) {
                    // To find out if the contact is a valid google user, need to check for
                    // their google profile. If there's any, grab the id from the url. The url
                    // would look like: "http://google.com/profile/xxxxxxxxxxxxxxxxxxxxx"
                    var matches = /google.com\/profiles\/(\d{21})$/.exec(id[0].href);
                    user.id = matches && matches[1];
                }

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

                return {
                    displayName: user.name || user.given_name || user.family_name || user.email,
                    connected: false,
                    google: user
                };
            }).filter(function (u) {
                // Try to import contacts who own google account with email address
                return !!(u.google.id && u.google.email);
            });

            // Save contacts as users in database
            users.insert(contacts, { w: 1, continueOnError: true }, function(err) {
                // If error happens because of duplicate entry for unique index, ignore it (code 11000)
                if (err && err.code !== 11000) {
                    throw err;
                }

                // In case of error for duplicate entry, the results from insert command
                // would be null. So instead of relying on the result object, it's safer
                // to fetch the results again

                var gIds = contacts.map(function(o) { return o.google.id; });

                users.find({ 'google.id': { $in: gIds } }, { '_id': 1 }).toArray(function(error, results) {
                    if (error) { throw error; }

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


    });
};