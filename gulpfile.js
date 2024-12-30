const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const { deleteAsync } = require('del');
const browserSync = require('browser-sync').create();

const paths = {
  scss: './assets/scss/**/*.scss',
  css: './assets/css-min',
  js: './assets/js/**/*.js',
  jsMin: './assets/js-min',
  php: ['./header.php', './index.php', './footer.php'],
  output: './',
};

const clean = () => deleteAsync([paths.css, paths.jsMin, 'index.html']);

const styles = () =>
  gulp
    .src(paths.scss)
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());

const scripts = () =>
  gulp
    .src(paths.js)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsMin))
    .pipe(browserSync.stream());

const buildHTML = () =>
  gulp
    .src(paths.php)
    .pipe(concat('index.html'))
    .pipe(
      htmlReplace({
        css: 'assets/css-min/styles.css',
        js: 'assets/js-min/scripts.min.js',
      })
    )
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());

const serve = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    open: false,
  });

  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts);
  gulp.watch(paths.php, buildHTML).on('change', browserSync.reload);
};

const watch = gulp.series(
  clean,
  gulp.parallel(styles, scripts, buildHTML),
  serve
);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.buildHTML = buildHTML;
exports.serve = serve;
exports.watch = watch;
exports.default = watch;
