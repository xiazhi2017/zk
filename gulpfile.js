import { watch } from '../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/graceful-fs';

const gulp = require('gulp');
const webServer = require('gulp-webserver');
const html = require('gulp-minhtml');
const clean = require('gulp-clean-css');
const concat = require('gulp-concat');
const fs = require('fs');
const path = require('path');

gulp.task('cleanCss', function() {
    gulp.src('content/css/style.css')
        .pipe(clean())
        .pipe();
});
gulp.task('concatfile', function() {
    gulp.src('content/css/style.css')
        .pipe(concat('content/css/common.css'))
        .pipe();
});
gulp.task('server', function() {
    gulp.src('.')
        .pipe(webServer({
            host: 'localhost',
            port: 8585,
            fallback: 'index.html',
            middleware: function(req, res, next) {
                res.setwriteHead(200, {
                    'content-type': 'text/json;charset=utf8'
                });
                gulp.watch();
                var pathname = req.url.split('/')[1];
                var fileName = path.join(__dirname, 'scripts', pathname + '.js');
                switch (req.url) {
                    case '/news':
                        getdata(res, fileName);
                        break;
                    case '/user':
                        getdata(res, fileName);
                        break;
                }
            }
        }))
});
const getdata = (res, address) => {
    fs.readFile(address, function(err, data) {
        res.end(data);
    });
}
gulp.task('default', ['cleanCss', 'server']);