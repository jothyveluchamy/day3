var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('styles', function()
{
    console.log('starting styles task');
});

gulp.task('scripts', function()
{
    console.log('starting styles task');
    return gulp.src('public/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('images', function()
{
    console.log('starting images task');
});

gulp.task('default', function()
{
    console.log('starting default task');
});

gulp.task('watch', function()
{
    console.log('starting watch task');
});
