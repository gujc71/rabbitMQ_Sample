var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
 

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  
  fs.readFile(path.join(".", urlObj.pathname), function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(80); 

var io = require('socket.io')
io = io.listen('1004');

var a = require('./step2/messageServer');
a(io);
