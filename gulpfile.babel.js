'use strict'

// load plugins
import gulp from 'gulp'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import reactify from 'reactify'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'
import historyApiFallback from 'connect-history-api-fallback'
import sass from 'gulp-ruby-sass'
import autoprefixer from 'gulp-autoprefixer'
import del from 'del'
import cache from 'gulp-cache'
import size from 'gulp-size'
import useref from 'gulp-useref'

const reload = browserSync.reload

// project paths
const PATH = {
    app: 'src/main/app',
    html: 'src/main/app/index.html',
    appStyles: 'src/main/app/styles/**/*.scss',
    appScripts: 'src/main/app/scripts/**/*.js',
    appImages: 'src/main/app/images/*',
    appMain: 'src/main/app/scripts/app.js',
    output: 'dist',
    outputHtml: 'dist/index.html',
    outputStyles: 'dist/styles',
    outputScripts: 'dist/scripts',
    outputImages: 'dist/images',
    outputMain: 'app.js',
    testDir: 'src/test'
}

// bundler for react compiling
const bundler = watchify(browserify({
    entries: [PATH.appMain],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}))

bundler.transform('babelify', {
    presets: ['es2015', 'react']
})

bundler.on('log', gutil.log)

function rebundle() {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(PATH.outputMain))
        .pipe(gulp.dest(PATH.outputScripts))
        .pipe(size())
        .on('end', () => {
            reload()
        })
}

// default task
gulp.task('default', () => {
})

// clean cache files and output folder
gulp.task('clean', () => {
    cache.clearAll()
    del.sync([PATH.output])
})

// localhost development server, including html, css and js code compiling
// babel-node --debug --presets es2015 server/index.js
gulp.task('serve', ['bundle'], () => {
    browserSync({
        server: {
            baseDir: PATH.output,
            middleware: [
                historyApiFallback()
            ]
        }
    })

    gulp.watch([PATH.html], ['html', reload])
    gulp.watch([PATH.appStyles], ['styles', reload])
    gulp.watch([PATH.appScripts], ['scripts'])
})

// convert index.html to output folder
gulp.task('html', () => {
    return gulp.src(PATH.html)
        .pipe(useref())
        .pipe(gulp.dest(PATH.output))
        .pipe(size())
})

// compile SASS and convert to output folder
gulp.task('styles', () => {
    return sass(PATH.appStyles, {
        style: 'expanded'
    })
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest(PATH.outputStyles))
        .pipe(size())
})

// compile React JS and convert to output folder
gulp.task('scripts', rebundle)

// copy images to dist folder
gulp.task('images', () => {
    return gulp.src(PATH.appImages)
        .pipe(gulp.dest(PATH.outputImages))
})

// bundle
gulp.task('bundle', ['html', 'styles', 'scripts', 'images'])

// compress js files
gulp.task('compress', () => {
    return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(size())
})
