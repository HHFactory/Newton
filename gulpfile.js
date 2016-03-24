var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var rimraf = require("rimraf");
var minimist = require("minimist");

// 環境変数設定
var knownOptions = {
	string: "env",
	default:{env:process.env.NODE_ENV || "local"}
}

var options = minimist(process.argv.slice(2),knownOptions);

// tmp.configファイル削除
gulp.task("clean",function(cb){
	rimraf("src/main/resources/public/app/scripts/config/tmp/*.js",cb)
});

// 環境別のconfigファイルを生成
gulp.task("ngconfig",["clean"],function(){
	return gulp.src(["src/main/resources/public/app/scripts/config/envconf/config_" + options.env + ".json"])
				.pipe($.ngConfig('URL_CONF'))
				.pipe(gulp.dest("src/main/resources/public/app/scripts/config/tmp/"));
});

// ファイル結合
gulp.task("concat",["ngconfig"],function(){
	return gulp.src(["src/main/resources/public/app/scripts/**/*.js"])
				.pipe($.ngAnnotate())
				.pipe($.concat("build.js"))
				.pipe(gulp.dest("src/main/resources/public/app/"));
});

// .js minify
gulp.task("uglify",["concat"],function(){
	return gulp.src("src/main/resources/public/app/build.js")
		.pipe($.uglify().on('error',$.util.log))
		.pipe($.rename("build.min.js"))
		.pipe(gulp.dest("src/main/resources/public/app/"));
});

// .css minify
gulp.task("cssmin",function(){
	return gulp.src("src/main/resources/public/app/styles/sass/app.css")
				.pipe($.cssmin())
				.pipe($.rename("app.min.css"))
				.pipe(gulp.dest("src/main/resources/public/app/styles/css/"));
});

// 起動タスク
gulp.task("js",["clean","ngconfig","concat","uglify","cssmin"]);


