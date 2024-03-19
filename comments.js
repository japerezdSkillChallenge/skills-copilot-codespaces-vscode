// Create web server
// Path: server.js

// Define the required modules
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

// Create the web server
http.createServer(function(req, res) {
    // Parse the request URL
    var requestUrl = url.parse(req.url);

    // Get the path of the file to be served
    var filePath = '.' + requestUrl.pathname;

    // Serve the index page if the file path is '/'
    if (filePath == './') {
        filePath = './index.html';
    }

    // Read the file to be served
    fs.readFile(filePath, function(err, data) {
        if (err) {
            // Serve the 404 page
            fs.readFile('./404.html', function(err, data) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data);
            });
        } else {
            // Serve the file
            var contentType = 'text/html';
            switch (path.extname(filePath)) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
            }
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
}).listen(3000, 'localhost');

// Log the server details
console.log('Server running at http://localhost:3000/');