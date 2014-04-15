var Crawler = require('crawler').Crawler;
var fs = require('fs');
var resolveUrl = require('url').resolve;

if (!process.argv[2]) {
  console.error('Error: URL must be specified');
  process.exit(1);
}


var url = process.argv[2];
var buildPath = './build/';


var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + '/' + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

var getDomain = function(url){
  return url.split('/')[2];
};


var c = new Crawler({
  maxConnections: 10,
  skipDuplicates: true,
  onDrain: function () {
    if (fs.existsSync(buildPath + 'js/')) {
      fs.createReadStream('./.jshintrc').pipe(fs.createWriteStream(buildPath + 'js/.jshintrc'));
    }
    console.log('Finished');
  },
  callback: function (err, result, $) {

    if (!result) return;

    var contentType = result.headers['content-type'];
    var outputPath = '';
    var fileName = result.request.path.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    var content = result.body;

    if (contentType.indexOf('text/html') > -1) {
      contentType = 'html';
      outputPath = buildPath;
    } else if (contentType.indexOf('text/css') > -1) {
      contentType = 'css';
      outputPath = buildPath + 'css/'
    } else if (contentType.indexOf('javascript') > -1) {
      contentType = 'js';
      outputPath = buildPath + 'js/'
    } else {
      return;
    }

    fileName = fileName || 'index';
    fileName += '.' + contentType;

    fs.exists(outputPath, function (exists) {
      if (exists) {
        fs.writeFile(outputPath + fileName, content);
      } else {
        fs.mkdir(outputPath, function () {
          fs.writeFile(outputPath + fileName, content);
        });
      }
    });

    console.log('Crawled: ', result.request.uri.href);

    if (contentType !== 'html') return;
    if (!result || !result.window) return;

    var base = result.window.location.href;

    $('script[src]').each(function(index, script){
      var href = resolveUrl(base, script.src);
      c.queue(href);
    });

    $('link[rel="stylesheet"]').each(function(index, link){
      var href = resolveUrl(base, link.href);
      c.queue(href);
    });

    $('a[href]').each(function(index,a) {
      var href = resolveUrl(base, a.href);
      href = href.split('#')[0]; // crawl just url without hash!

      var domain = getDomain(href);

      if (domain && domain.indexOf(getDomain(url)) === -1) return;

      c.queue(href);
    });

  }
});


console.log('Cleaning build directory');
deleteFolderRecursive(buildPath);


fs.mkdir(buildPath, function () {
  console.log('Starting crawler');
  c.queue(url);
});
