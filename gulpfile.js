const gulp = require('gulp');
/* 加载读取package.json下的gulp开头的插件 */
const loadPlugins = require('gulp-load-plugins')({
    debug:true
});

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const RunSequence = require('run-sequence');
const pump = require('pump');

gulp.task('minImage',function (){
    return gulp.src('app/images/*/*.{png,jpg,gif,ico}')
        .pipe(loadPlugins.imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true       //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('javascript',function (){
return gulp.src('app/js/*.js')
.pipe(gulp.dest('dist/js'))
});

gulp.task('less',function (){
return gulp.src('app/css/*.less')
.pipe(loadPlugins.less())
.pipe(loadPlugins.autoprefixer({
browsers:['>5%'],
cascade:false,
remove:false
}))
.pipe(gulp.dest('dist/css'));
});

gulp.task('userefHtml',function (){
return gulp.src('app/*.html')
.pipe(loadPlugins.useref())
.pipe(gulp.dest('dist'));
});

gulp.task('server',function (){
browserSync.init({
files:['**'],
server:'./dist',
injectChanges:true,
port:8080
})

gulp.watch('app/images/*.{png,jpg,gif,ico}',['minImage'])
    .on('change',reload)

gulp.watch('app/css/*.less',['less'])
.on('change',reload)

gulp.watch('app/js/*.js',['javascript'])
.on('change',reload)

gulp.watch('app/*.html',['userefHtml'])
.on('change',reload)

});

gulp.task('build',function (){
RunSequence(['minImage','less','userefHtml','javascript','server']);
});
