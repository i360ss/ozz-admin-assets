const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
// const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

const dist = `${__dirname}/admin/`;

function compileSass(src, dest, map) {
    return gulp.src(src, { allowEmpty: true })
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write('.', { sourceRoot: map }))
    .pipe(gulp.dest(dest));
}

function minifyCSS(src, dest, map) {
    return gulp.src(src, { allowEmpty: true })
    // .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat(dest))
    // .pipe(sourcemaps.write('.', { sourceRoot: map }))
    .pipe(gulp.dest(`${dist}`));
}

function compileJS(src, dest, fileName, map, webpackFile) {
    return gulp.src(src, { allowEmpty: true })
    // .pipe(sourcemaps.init())
    .pipe(webpack(require(webpackFile)))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(concat(fileName))
    .pipe(gulp.dest(dest))
    // .pipe(sourcemaps.write('.', { sourceRoot: map }))
    .pipe(gulp.dest(dest));
}

function minifyJS(src, dist, filename, map) {
    return gulp.src(src, { allowEmpty: true })
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
    }) // Handle errors gracefully
    .pipe(concat(filename))
    // .pipe(sourcemaps.write('.', { sourceRoot: map }))
    .pipe(gulp.dest(dist));
}

// Admin CMS Compilation
gulp.task('admin-sass', () => {
    return compileSass(__dirname+'/scss/admin.scss', `${dist}`, '/scss');
});
gulp.task('minify-admin-css', () => {
    return minifyCSS(`${dist}admin.css`, 'admin.min.css', '/scss');
});
gulp.task('admin-js', () => {
    return compileJS(__dirname+'/js/admin.js', `${dist}`, 'admin.js', '/js', './admin-webpack.config.js');
});
gulp.task('minify-admin-js', () => {
    return minifyJS(`${dist}admin.js`, `${dist}`, 'admin.min.js', '/js');
});

// Watch
function watchFiles() {
    gulp.watch(__dirname+'/scss/**/*.scss', gulp.series('admin-sass', 'minify-admin-css'));
    gulp.watch(__dirname+'/js/**/*.js', gulp.series('admin-js', 'minify-admin-js'));
}

gulp.task('watch', watchFiles);
gulp.task('default', gulp.series('admin-sass', 'minify-admin-css', 'admin-js', 'minify-admin-js', 'watch'));
