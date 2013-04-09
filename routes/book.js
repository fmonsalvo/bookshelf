var dropbox = require('../services/dropboxConnector');

/*
 * GET users listing.
 */

exports.get = function(req, res){
  dropbox.getBooks(function(books) {
    res.render('index', {image : books});
  });
};
