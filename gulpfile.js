const gulp           = require('gulp'),
    util             = require('gulp-util'),
    rename           = require('gulp-rename'),
    uglify           = require('gulp-uglify'),
    minifyCss        = require('gulp-minify-css'),
    autoprefixer     = require('gulp-autoprefixer'),
    stripCssComments = require('gulp-strip-css-comments'),
    sass             = require('gulp-sass'),
    browserify       = require('browserify'),
    browserSync      = require('browser-sync'),
    sourcemaps       = require('gulp-sourcemaps'),
    source           = require('vinyl-source-stream'),
    buffer           = require('vinyl-buffer'),
    concat           = require('gulp-concat'),
	edit             = require('gulp-edit'),
	merge            = require('merge-stream'),
	size 			 = require('gulp-size');

const cfg = {
    env: 'dev',
    proxy: 'pp.local',
    port:  8080,
    watch: [ './app/view/**/*.php' ],
    path: {
        app: {
			es6: './resources/assets/es6/app',
			scss: './resources/assets/scss/app',
			bundle: {
				css: './public/assets/css',
				js: './public/assets/js'
			}
        },
		admin: {
			es6: './resources/assets/es6/admin',
			scss: './resources/assets/scss/admin',
			bundle: {
				css: './public/assets_admin/css',
				js: './public/assets_admin/js'
			}
		},
		affiliate: {
			es6: './resources/assets/es6/affiliate',
			scss: './resources/assets/scss/affiliate',
			bundle: {
				css: './public/assets_affiliate/css',
				js: './public/assets_affiliate/js'
			}
		}
    }
};

let isProduction;

// ******************** APP

gulp.task('compile_es6', function ()
{
    return browserify(cfg.path.app.es6 + '/entry.es6', { debug: !isProduction, extensions: ['.js', '.es6'] })
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(isProduction ? util.noop() : sourcemaps.init({ loadMaps: true }))
        .pipe(isProduction ? util.noop() : sourcemaps.write())
        .pipe(isProduction ? uglify() : util.noop())
		.pipe(size())
        .pipe(gulp.dest(cfg.path.app.bundle.js))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compile_scss', function () {
	return gulp.src(cfg.path.app.scss + '/main.scss')
		.pipe(isProduction ? util.noop() : sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(isProduction ? util.noop() : sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(isProduction ? stripCssComments({ preserve: false }) : util.noop())
		.pipe(isProduction ? minifyCss() : util.noop())
		.pipe(rename({ basename: 'bundle' }))
		.pipe(gulp.dest(cfg.path.app.bundle.css))
		.pipe(browserSync.reload({ stream: true }));
});

// ******************** ADMIN

gulp.task('compile_admin_scss', function () {
	return gulp.src([
		'./node_modules/admin-lte/bower_components/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/admin-lte/bower_components/font-awesome/css/font-awesome.min.css',
		'./node_modules/admin-lte/bower_components/Ionicons/css/ionicons.min.css',
		'./node_modules/admin-lte/dist/css/AdminLTE.min.css',
		'./node_modules/admin-lte/dist/css/skins/skin-blue-light.css',
		'./node_modules/admin-lte/plugins/pace/pace.min.css',
		'./node_modules/select2/dist/css/select2.css',
		'./node_modules/admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.css',
		'./node_modules/admin-lte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
		'./node_modules/bootstrap-timepicker/css/bootstrap-timepicker.css',
	])
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(isProduction ? stripCssComments({ preserve: false }) : util.noop())
		.pipe(isProduction ? minifyCss() : util.noop())
		.pipe(concat('bundle_admin.css'))
		.pipe(gulp.dest(cfg.path.admin.bundle.css));
});

gulp.task('compile_admin_es6', function ()
{
	let vendorScripts = gulp.src([
		'./node_modules/admin-lte/bower_components/jquery/dist/jquery.min.js',
		'./node_modules/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/admin-lte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
		'./node_modules/admin-lte/bower_components/fastclick/lib/fastclick.js',
		'./node_modules/admin-lte/bower_components/moment/min/moment.min.js',
		// './node_modules/admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.js',
		// './node_modules/admin-lte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
		'./node_modules/admin-lte/dist/js/adminlte.min.js',
		// './node_modules/admin-lte/bower_components/ckeditor/ckeditor.js',
		'./node_modules/admin-lte/bower_components/PACE/pace.min.js',
		'./node_modules/select2/dist/js/select2.js',
		// './node_modules/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
	])
		.pipe(isProduction ? uglify() : util.noop());

	let es6Scripts
		= browserify(cfg.path.admin.es6 + '/entry.es6', { debug: !isProduction, extensions: ['.js', '.es6'] })
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(isProduction ? util.noop() : sourcemaps.init({ loadMaps: true }))
		.pipe(isProduction ? util.noop() : sourcemaps.write())
		.pipe(isProduction ? uglify() : util.noop())
		.pipe(size());

	return merge(vendorScripts, es6Scripts)
		.pipe(concat('bundle_admin.js'))
		.pipe(gulp.dest(cfg.path.admin.bundle.js))
		.pipe(browserSync.reload({ stream: true }));
});

// ******************** AFFILIATE

gulp.task('compile_affiliate_scss', function () {
	return gulp.src([
		'./node_modules/admin-lte/bower_components/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/admin-lte/bower_components/font-awesome/css/font-awesome.min.css',
		'./node_modules/admin-lte/bower_components/Ionicons/css/ionicons.min.css',
		'./node_modules/admin-lte/dist/css/AdminLTE.min.css',
		'./node_modules/admin-lte/dist/css/skins/skin-blue.css',
		'./node_modules/admin-lte/plugins/pace/pace.min.css',
		'./node_modules/select2/dist/css/select2.css',
		// './node_modules/admin-lte/plugins/iCheck/square/blue.css'
	])
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(isProduction ? stripCssComments({ preserve: false }) : util.noop())
		.pipe(isProduction ? minifyCss() : util.noop())
		.pipe(concat('bundle_affiliate.css'))
		.pipe(gulp.dest(cfg.path.affiliate.bundle.css));
});

gulp.task('compile_affiliate_es6', function ()
{
	let vendorScripts = gulp.src([
		'./node_modules/admin-lte/bower_components/jquery/dist/jquery.min.js',
		'./node_modules/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/admin-lte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
		'./node_modules/admin-lte/bower_components/fastclick/lib/fastclick.js',
		'./node_modules/admin-lte/dist/js/adminlte.min.js',
		// './node_modules/admin-lte/bower_components/ckeditor/ckeditor.js',
		'./node_modules/admin-lte/bower_components/PACE/pace.min.js',
		'./node_modules/select2/dist/js/select2.js',
		// './node_modules/admin-lte/plugins/iCheck/icheck.min.js'
	])
		.pipe(isProduction ? uglify() : util.noop());

	let es6Scripts
		= browserify(cfg.path.affiliate.es6 + '/entry.es6', { debug: !isProduction, extensions: ['.js', '.es6'] })
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(isProduction ? util.noop() : sourcemaps.init({ loadMaps: true }))
		.pipe(isProduction ? util.noop() : sourcemaps.write())
		.pipe(isProduction ? uglify() : util.noop())
		.pipe(size());

	return merge(vendorScripts, es6Scripts)
		.pipe(concat('bundle_affiliate.js'))
		.pipe(gulp.dest(cfg.path.affiliate.bundle.js))
		.pipe(browserSync.reload({ stream: true }));
});

// OTHER

gulp.task('set_env', function () {
    return gulp.src(cfg.path.app.es6 + '/config/env.es6')
        .pipe(edit(function (src, callback) {
            callback(null, "export const ENV = '" + ( cfg.env === "prod" ? "prod" : "dev" ) + "';");
        }))
        .pipe(gulp.dest(cfg.path.app.es6 + '/config/'));
});

gulp.task('serve', function () {
    browserSync.init({
        proxy: util.env.proxy || cfg.proxy,
        port:  util.env.port  || cfg.port
    });
});

gulp.task('watch', function (done) {
	gulp.watch(cfg.path.app.es6 + '/**/*.es6', gulp.parallel('compile_es6'));
	gulp.watch(cfg.path.app.scss + '/**/*.scss', gulp.parallel('compile_scss'));
	gulp.watch(cfg.path.admin.es6 + '/**/*.es6', gulp.parallel('compile_admin_es6'));
	gulp.watch(cfg.path.admin.scss + '/**/*.scss', gulp.parallel('compile_admin_scss'));
	gulp.watch(cfg.path.affiliate.es6 + '/**/*.es6', gulp.parallel('compile_affiliate_es6'));
    gulp.watch(cfg.watch, function () {
        gulp.src('./app').pipe(browserSync.reload({ stream: true }));
    });
    done();
});

gulp.task('default', gulp.series(
    'set_env',
	'compile_es6',
	'compile_scss',
	'compile_admin_es6',
	'compile_admin_scss',
	'compile_affiliate_es6',
	'compile_affiliate_scss',
    gulp.parallel('watch', 'serve')
));

gulp.task('set_production', function(done) {
	cfg.env = 'prod';
	isProduction = cfg.env !== 'dev';
	done();
});

gulp.task('build', gulp.series(
	'set_production',
	'set_env',
	'compile_es6',
	'compile_scss',
	'compile_admin_scss',
	'compile_admin_es6',
	'compile_affiliate_es6',
	'compile_affiliate_scss',
));

