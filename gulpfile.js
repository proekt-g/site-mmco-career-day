// vars
let gulp = require("gulp"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    groupCssMedia = require("gulp-group-css-media-queries"),
    cleanCss = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin")
// /vars

// live mode
gulp.task("scss", function () {
    return gulp
        .src("src/assets/scss/**/*.scss")
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 8 versions"],
            })
        )
        .pipe(cleanCss())
        .pipe(groupCssMedia())
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.reload({ stream: true }))
})
gulp.task("js-libs", function () {
    return gulp
        .src(["node_modules/overlayscrollbars/js/OverlayScrollbars.min.js"])
        .pipe(concat("_libs.js"))
        .pipe(gulp.dest("src/assets/js"));
});
gulp.task("js-optimization", function () {
    return gulp
        .src("src/assets/js/main.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({ prefix: "_" }))
        .pipe(gulp.dest("src/assets/js"))
})
gulp.task("js", function () {
    return gulp
        .src(["src/assets/js/_libs.js", "src/assets/js/_main.js", "node_modules/swiper/swiper-bundle.min.js"])
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest("src/assets/js"))
        .pipe(browserSync.reload({ stream: true }))
})
gulp.task("html", function () {
    return gulp
        .src("src/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(browserSync.reload({ stream: true }))
})
// /live mode

// production
gulp.task("clear", async function () {
    del.sync("dist")
})
gulp.task("export", async function () {
    gulp.src(["src/**/*.html", "!src/**/_*.html"]).pipe(gulp.dest("dist"))
    gulp.src("src/assets/css/**/*.css").pipe(gulp.dest("dist/assets/css"))
    gulp.src("src/assets/js/main.min.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/assets/js"))
    gulp.src(["src/assets/images/**/*.*", "!src/assets/images/origin/**/*.*"])
        .pipe(imagemin([imagemin.svgo()]))
        .pipe(gulp.dest("dist/assets/images"))
    gulp.src("src/assets/fonts/**/*.*").pipe(gulp.dest("dist/assets/fonts"))
})
gulp.task("build", gulp.series("clear", "export"))
// /production

// browser-server
gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: "src/",
        },
    })
})
// /browser-server

// watch
gulp.task("watch", function () {
    gulp.watch("src/assets/scss/**/*.scss", gulp.parallel("scss"))
    gulp.watch("src/assets/js/main.js", gulp.parallel("js-optimization"))
    gulp.watch("src/assets/js/_main.js", gulp.parallel("js"))
    gulp.watch("src/**/*.html", gulp.parallel("html"))
})
// /watch

gulp.task(
    "default",
    gulp.parallel(
        "browser-sync",
        "html",
        "scss",
        "js-libs",
        "js-optimization",
        "js",
        "watch"
    )
)
