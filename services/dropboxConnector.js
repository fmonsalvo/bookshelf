var Dropbox = require('dropbox');

var client = new Dropbox.Client({
    key: "8rcfjiwktek2srs", secret: "7x2uge9dfi5mtpi"
});

client.authDriver(new Dropbox.Drivers.NodeServer(8191));

var showError = function(error) {
  console.log(error);
};

exports.getBooks = function(callback) {
  client.authenticate(function(error, client) {
    if (error) {
      // Replace with a call to your own error-handling code.
      //
      // Don't forget to return from the callback, so you don't execute the code
      // that assumes everything went well.
      return showError(error);
    }

    // Replace with a call to your own application code.
    //
    // The user authorized your app, and everything went well.
    // client is a Dropbox.Client instance that you can use to make API calls.
    client.metadata("/books", {readDir: true}, function(error, entries) {
      if (error) {
        return showError(error);  // Something went wrong.
      }
      console.log(entries._json.contents[0]);
      var url = client.thumbnailUrl(entries._json.contents[0].path);
      console.log(url);
      //var url = client.thumbnailUrl("/books/" + entries[0]);
      //console.log(url);
      callback(url);
    });
  });
}

