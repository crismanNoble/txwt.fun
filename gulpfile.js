var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var minify = require('gulp-minify');
var file = require('gulp-file');
const replace = require('gulp-replace');

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('./src/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});
 
gulp.task('sass:watch', gulp.series('sass', function (done) {
  gulp.watch('./src/**/*.scss', gulp.series('sass'));
  done();
}));

gulp.task('js:watch', gulp.series('js', function (done) {
  gulp.watch('./src/**/*.js', gulp.series('js'));
  done();
}));

gulp.task('watch',gulp.parallel('sass:watch', 'js:watch', function(done){
  done();
}));

gulp.task('exclude:node_modules',function(){
  return file('.donotbackup', '')
    .pipe(gulp.dest('node_modules'));
});

gulp.task('exclude:git_folder',function(){
  return file('.donotbackup', '')
    .pipe(gulp.dest('.git'));
});

gulp.task('exclude',gulp.parallel('exclude:node_modules', 'exclude:git_folder', function(done){
  done();
}));

gulp.task('default', gulp.series('watch', 'exclude', function(done) {    
  done();
}));

function replaceTemplate() {
  return src(['file.txt'])
    .pipe(replace('bar', 'foo'))
    .pipe(dest('build/'));
};
gulp.task('replace', function(){
  var image_list = JSON.stringify(require('./data/image_list.json'));
  var people_lookup = JSON.stringify(require('./data/people_lookup.json'));
  return gulp.src(['index.html'])
    .pipe(replace('{{image_list}}', image_list.toString()))
    .pipe(replace('{{people_lookup}}', people_lookup.toString()))
    .pipe(gulp.dest('docs/'));
});

gulp.task('image_crawl', function(){
  return gulp
    .src('./docs/images/**/*.*')
    .pipe(require('gulp-filelist')('image_list.json', { absolute: true }))
    .pipe(gulp.dest('data'))
});
