const gulp =require('gulp')//引入gulp
const css =require('gulp-minify-css')
const html =require('gulp-minify-html')
const js =require('gulp-uglify')
const babel = require('gulp-babel');//主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');
const image = require('gulp-imagemin');
const watch = require('gulp-watch');

gulp.task('yscss',()=>{
    return gulp.src('src/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('yshtml',()=>{
    return gulp.src('src/html/*.html')
    .pipe(html())
    .pipe(gulp.dest('dist/html'))
})

gulp.task('ysjs',()=>{
    return gulp.src('src/js/*.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(js())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('ysimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(image())//执行压缩
        .pipe(gulp.dest('dist/img/'));
});
gulp.task('default', function () {
    watch(['src/html/*.html', 'src/css/*.css', 'src/js/*.js', 'src/img/*.{png,gif,jpg,ico}'], 
    gulp.parallel('yshtml', 'yscss', 'ysjs', 'ysimg'));
});