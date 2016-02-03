// load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    reactify = require('reactify'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    historyApiFallback = require('connect-history-api-fallback'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    cache = require('gulp-cache'),
    size = require('gulp-size'),
    useref = require('gulp-useref');

// project paths
var PATH = {
    app: 'src/main/app',
    html: 'src/main/app/index.html',
    appStyles: 'src/main/app/styles/**/*.scss',
    appScripts: 'src/main/app/scripts/**/*.js',
    appMain: 'src/main/app/scripts/app.js',
    output: 'dist',
    outputStyles: 'dist/styles',
    outputScripts: 'dist/scripts',
    outputMain: 'app.js',
    outputImages: 'dist/images',
    testDir: 'src/test'
};

// bundler for react compiling
var bundler = watchify(browserify({
    entries: [PATH.appMain],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

bundler.transform('babelify', {
    presets: ['es2015', 'react']
});

//bundler.on('update', rebundle);
bundler.on('log', gutil.log);

function rebundle() {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(PATH.outputMain))
        .pipe(gulp.dest(PATH.outputScripts))
        .pipe(size())
        .on('end', function () {
            reload();
        });
}

// default task
gulp.task('default', function () {
});

// clean cache files and output folder
gulp.task('clean', function () {
    cache.clearAll();
    del.sync([PATH.outputStyles, PATH.outputScripts]);
});

// localhost development server, including html, css and js code compiling
gulp.task('serve', ['bundle'], function () {
    browserSync({
        server: {
            baseDir: PATH.output,
            middleware: [
                historyApiFallback()
            ]
        }
    });

    gulp.watch([PATH.html], ['html', reload]);
    gulp.watch([PATH.appStyles], ['styles', reload]);
    gulp.watch([PATH.appScripts], ['scripts']);
});

// convert index.html to output folder
gulp.task('html', function () {
    return gulp.src(PATH.html)
        .pipe(useref())
        .pipe(gulp.dest(PATH.output))
        .pipe(size());
});

// compile SASS and convert to output folder
gulp.task('styles', function () {
    return sass(PATH.appStyles, {
        style: 'expanded'
    })
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest(PATH.outputStyles))
        .pipe(size());
});

// compile React JS and convert to output folder
gulp.task('scripts', rebundle);

// bundle
gulp.task('bundle', ['html', 'styles', 'scripts']);

// compress js files
gulp.task('compress', function () {
    return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(size());
});
