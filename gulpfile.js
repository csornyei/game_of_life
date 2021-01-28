const gulp = require("gulp");
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer')
const fancy_log = require('fancy-log');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const cache = require('gulp-cache');

gulp.task("sass", function () {
    return gulp.src("src/scss/main.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            "cascade": false,
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('css', function () {
    return gulp.src("src/css/main.css")
        .pipe(autoprefixer({
            "cascade": false
        }))
        .pipe(gulp.dest('dist'))

});

gulp.task("imagemin", function () {
    return gulp.src("src/images/**/*. + (png | jpg | gif | svg)")
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: true
                    },
                ]
            })
        ])))
        .pipe(gulp.dest('dist/image'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('copy-html', function () {
    return gulp.src('src/pages/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('ts', function () {
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/ts/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .on('error', fancy_log)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', async function () {
    return await del.sync('dist/');
})

gulp.task("watch", gulp.series(["copy-html", "fonts", "ts", "sass", "imagemin",
    gulp.parallel([
        "browserSync",
        function () {
            gulp.watch("src/scss/**/*.scss", gulp.series(['sass']));
        },
        function () {
            gulp.watch("src/ts/*.ts", gulp.series(['ts']));
        },
        function () {
            gulp.watch("src/images/*", gulp.series(["imagemin"]));
        },
        function () {
            gulp.watch("src/pages/*.html", gulp.series("copy-html"));
        }
    ])
]))

gulp.task("build", gulp.series(["clean", "copy-html", "fonts", "ts", "sass", "imagemin"]))