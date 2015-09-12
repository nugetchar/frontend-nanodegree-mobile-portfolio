var gulp = require('gulp');
var imageop = require('gulp-image-optimization');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('images', function(cb) {
    gulp.src(['./**/*.png','./**/*.jpg','./**/*.gif','./**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('gulpimg/images')).on('end', cb).on('error', cb);
});



gulp.task('imgmin', function () {
    return gulp.src(['./**/*.png','./**/*.jpg','./**/*.gif','./**/*.jpeg'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('gulpimg/imgmin'));
});


gulp.task('default', ['images', 'imgmin']);
