import gulp from 'gulp'
import uglify from 'gulp-uglify'
import scss from 'gulp-ruby-sass'
import gutil from 'gulp-util'

// default Code
gulp.task('default', () => {
  gutil.log('Gulp is Running~')
})

// script uglify Code
gulp.task('jsUglify', () => {
  gulp.src('src/js/*.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('build/js'))
})

// scss Compile Code
gulp.task('scssCompile', () => {
  scss('src/scss/*.scss')
    .on('error', (err) => {
      gutil.error('Errorrrr!', err.message)
    })
    .pipe(gulp.dest('build/css'))
})

// Watch Code ( 실시간 변경 )
gulp.task('watch', () => {
  gulp.watch('src/scss/*.scss', ['scssCompile'])
  gulp.watch('src/js/*.js', ['jsUglify'])
})
