//  引入gulp模块
const gulp = require('gulp');
//  引入del模块
const del = require('del');
//  引入gulp-less模块
const less = require('gulp-less');
//  引入gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
//  引入gulp-sourcemaps
const sourcemaps = require('gulp-sourcemaps');
//  引入gulp-babel
const babel = require('gulp-babel');
//  引入gulp-file-include
const fileInclude = require('gulp-file-include');
//  引入browser-sync
const browserSync = require('browser-sync');
//  引入gulp-rev
const rev = require('gulp-rev');
//  引入gulp-rev-collector
const revCollector = require('gulp-rev-collector');

//   编辑任务
/**
 *  1.监听文件变化
 *  2.删除指定文件
 *  3.编译less文件
 *  4.css样式添加前缀
 *  5.生成映射文件map---js也有映射文件
 *  6.将es6语法编译成es5语法
 */
gulp.task('del', () => {
   return del(["dist"])
})

gulp.task('css', () => {
   return (
      gulp.src("./src/css/*.less")
      // 在生成css之前记录less文件的样子
      .pipe(sourcemaps.init())
      // 编译成css文件
      .pipe(less())
      // 添加css样式前缀---只做2个版本的兼容
      .pipe(autoprefixer({
         browsers: ["last 2 versions"]
      }))
      // 在同级目录下添加一个css映射文件---map
      .pipe(sourcemaps.write("."))
      //添加到指定目录下
      .pipe(gulp.dest("./dist/css/"))
   )
})

gulp.task('js', () => {
   return gulp.src("./src/js/*.js")
      // 在转换之前记录代码
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./dist/js/"))
})


gulp.task("lib", () => {
   return gulp.src("./src/lib/**")
      .pipe(gulp.dest("./dist/lib/"));
})


gulp.task("html", () => {
   return gulp
      .src("src/*.html")
      .pipe(
         fileInclude({
            prefix: "@@",
            basepath: "src/components/",
         })
      )
      .pipe(gulp.dest("dist/"));
});


gulp.task("autopage", () => {
    browserSync({
      server: {
         baseDir: './dist/'
      },
      port: 8888
   })
   // 监听html文件的改变 从而重新执行 html 任务   刷新浏览器
   gulp.watch(["src/*.html", "src/components/*.html"], gulp.series(["html", "reload"]));
   // 监听 less文件， 重新执行 css 任务  刷新浏览器
   gulp.watch(["src/css/*.less"], gulp.series(["css", "reload"]));
   // 监听 js文件， 重新执行 js 任务  刷新浏览器
   gulp.watch(["src/js/*.js"], gulp.series(["js", "reload"]));
});

gulp.task('reload', (done) => {

   browserSync.reload();
   done();
})


//   default: 默认执行的任务
//   series: 按顺序执行任务
gulp.task(
   'default',
   gulp.series(["del", "css", "js", "html","lib","autopage"])
);