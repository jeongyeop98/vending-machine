var gulp = require('gulp')
var uglify = require('gulp-uglify')
var scss = require('gulp-ruby-sass')

// default Code
gulp.task('default', function() {
  console.log('hello')
})

// script uglify Code
gulp.task('jsUglify', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
})

// scss Compile Code
gulp.task('scssCompile', function() {
  scss('src/scss/*.scss')
    .on('error', function(err) {
      console.error('Errorrrr!', err.message)
    })
    .pipe(gulp.dest('build/css'))
})

// Watch Code ( 실시간 변경 )
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['scssCompile'])
  gulp.watch('src/js/*.js', ['jsUglify'])
})
