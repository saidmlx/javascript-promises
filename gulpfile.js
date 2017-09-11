var gulp        = require('gulp');
var sass        = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var connect     = require('gulp-connect');
var browserify  = require('gulp-browserify');




gulp.task('default',['sass','html','js','watch','server']);

gulp.task('server', function() {
  connect.server({
    root: './public',
    livereload: true,
    port:6060
  })
});



var config = {
    bootstrapDir: './node_modules/bootstrap-sass',
    publicDir: './public',
};

gulp.task('html',function(){
  gulp.src('./dev/html/**/**.html')
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});

gulp.task('sass', function() {
    return gulp.src('./dev/sass/app.scss')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/css'))
     .pipe(connect.reload());;
});


gulp.task('js',function(){
  gulp.src('./dev/js/app**.js')
  .pipe(browserify())
  .pipe(gulp.dest('./public/js'))
  .pipe(connect.reload());
});

gulp.task('copy',function(){
  gulp.src('./dev/assets/jquery-1.8.0.min.js').pipe(gulp.dest('./public/js/'));
  gulp.src('./dev/assets/jquery.blockUI.1.33.js').pipe(gulp.dest('./public/js/'));
  
});

gulp.task('watch', function () {
  gulp.watch(['./dev/js/**/**.js'], ['js']);
  gulp.watch(['./dev/**/**.html'], ['html']);
  gulp.watch(['./dev/**/**.scss'], ['sass']);
});
