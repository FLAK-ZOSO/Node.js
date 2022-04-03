var HttpDispatcher = function() {
    this.listeners = { get: [ ], post: [ ] };
    this.errorListener = function() { }
    this.staticFolderPrefix = '/static';
  }
  HttpDispatcher.prototype.setStatic = function(folder) {
    this.staticFolderPrefix = folder
  }
  HttpDispatcher.prototype.staticListener = function(req, res) {
    var url = require('url').parse(req.url, true);
    var filename = require('path').join(".", url.pathname);
    var errorListener = this.errorListener;
    require('fs').readFile(filename, function(err, file) {
      if(err) {
        errorListener(req, res);
        return;
      }
      res.writeHeader(200,
                      { "Content-Type": require('mime').lookup(filename) });
      res.write(file, 'binary');
      res.end();
    });
  }
  HttpDispatcher.prototype.dispatch = function(req, res) {
    var parsedUrl = require('url').parse(req.url, true);
    if(parsedUrl.pathname.indexOf(this.staticFolderPrefix) == 0) {
      this.staticListener(req, res);
      return;
    }
    var method = req.method.toLowerCase();
    if(this.listener[method][parsedUrl.pathname])
      this.listener[method][parsedUrl.pathname](req, res)
    else
      this.errorListener(req, res);
  }