var gulp = require('gulp'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    docco = require("gulp-docco");
 

gulp.task('html', function () {
    var assets = useref.assets();
 
    return gulp.src(['./**/*.html'])
        .pipe(assets)
        .pipe(gulpif('./**/*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('../dist'));
});


gulp.task('minify-css', function() {
  return gulp.src('./**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('../dist'));
});


gulp.task('compress', function() {
  return gulp.src('./**/*.js')
    .pipe(uglify())
    .on('error', function(){})
    .pipe(gulp.dest('../dist'));
});

gulp.task('put', function() {
   return gulp.src('./**/*.{jpg, jpeg, png}')
   .pipe(gulp.dest('../dist'));
});

gulp.task('docco', function(){
    return gulp.src("./**/*.js")
            .pipe(docco())
            .pipe(gulp.dest('./documentation'))
});


gulp.task('watch', function() {
    gulp.watch(['html', 'minify-css', 'compress', 'docco', 'put']);
});






gulp.task('default', ['html', 'minify-css', 'compress', 'docco', 'put', 'watch']);
