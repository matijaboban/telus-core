// Include required libraries
const   gulp = require('gulp'),
        gutil = require('gulp-util'),
        gplugs = require("gulp-load-plugins")({
            pattern: ['gulp-*', 'gulp.*'],
            replaceString: /\bgulp[\-.]/
        }),
        del = require('del'),
        fs = require('fs'),
        webpackStream = require('webpack-stream'),
        webpack = require('webpack');

// Define working paths
const   pathDist = 'public/dist/',
        pathBuild = 'src/.build/';

// Define error levels
const   ERROR_LEVELS = [
            'error',
            'warning'
        ];

///////////////////////
// command line options //
///////////////////////

// Command line option:
// --env=[*dev*|stg|prod]
// --fatal=[warning|*error*|off]
var yargs = require('yargs');
var argv = yargs["default"]({
    env: 'dev',
    fatal: 'error'
}).argv;

// Set enviroemnt in nodeJS process
process.env.processignEnv = argv.env;

gutil.log(
    gutil.colors.gray("\n#############\nGulp processing started\nEnvironment is '" + argv.env + "'; set with --env=dev|stg|prod\n#############")
);




///////////////////////
// utility functions //
///////////////////////

var isDev = function () {
    return argv.env === 'dev';
};

var isFatal = function (level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(argv.fatal || 'error');
};

var handleError = function (level, error) {
    gutil.log(gutil.colors.red(level +": ") + error.message);

    if (isFatal(level)) {
        process.exit(1);
    }
};

var onError = function (error) {
    handleError.call(this, 'error', error);
};

var onWarning = function (error) {
    handleError.call(this, 'warning', error);
};

var swallowError = function (error) {
    console.log(error.toString());
    return this.emit('end');
};


// create a handlebars helper to look up
// fingerprinted asset by non-fingerprinted name
var handlebarOpts = {
    helpers: {
        assetPath: function (path, context) {
            return ['/dist', context.data.root[path]].join('/');
        }
    }
};






// Clean the public folder of previously generated files
gulp.task('cleanPublic', function () {
  return del([
    pathDist+ '*',
    '!' + pathBuild + '/api'
  ]);
});


// Clean the build folder of previously generated files
gulp.task('cleanBuild', function () {
  return del([
    pathBuild + '*',
    '!' + pathBuild + '.gitkeep'
  ]);
});


 // Fonts -> Public folder
gulp.task('fonts', function () {
    return gulp.src('node_modules/materialize-css/fonts/*/*')
        .pipe(gulp.dest(pathDist + '/fonts/'));
});

 // Assets -> Public folder
gulp.task('assets', function () {
    return gulp.src('src/assets/*')
        .pipe(gulp.dest(pathDist + 'assets/'));
});


// JS vendor libraries
gulp.task('libs', function () {
    var concat = require('gulp-concat');
    var gulpif = require('gulp-if');
    var uglify = require('gulp-uglify');
    var src = [];

    return gulp.src([].concat([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/materialize-css/dist/js/materialize.js'
        ]))
        .pipe(gplugs.concat('libs.js'))
        .pipe(gplugs.if(!isDev(), gplugs.uglify()))
        .pipe(gulp.dest(pathBuild + 'js/'))
        .pipe(gplugs.filesize())
        .on('error', gutil.log);
});



// css
gulp.task('scss', function () {

    return gulp.src('src/scss/style.scss')
        .pipe(gplugs.sass().on('error', gplugs.sass.logError))
        .pipe(gplugs.autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
                'ie >= 9'
            ],
            cascade: false
        }))
        .pipe(gplugs.combineMq())
        .pipe(gplugs.filesize())
        .pipe(gplugs.if(!isDev(), gplugs.cleanCss()))
        .pipe(gulp.dest(pathBuild + 'css/'))
        .pipe(gplugs.filesize())
        .on('error', gutil.log);

});


gulp.task('vueApp', function() {
    return gulp.src('./src/main.js')
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest(pathBuild + 'js/'))
        // .pipe(gplugs.filesize())
        .on('error', gutil.log);
});




// process build
gulp.task('processBuild', function () {
    var src = [];
    return gulp.src([
            pathBuild + '*/*',
            '!' + pathBuild + '.gitkeep'
        ])
        .pipe(gplugs.rev())
        .pipe(gulp.dest(pathDist))  // write rev'd assets to build dir
        .pipe(gplugs.rev.manifest())
        .pipe(gulp.dest(pathBuild));  // write manifest to build dir
});



gulp.task('html', function () {
    // set expected asset manifest path
    var manifestPath = pathBuild + 'rev-manifest.json';

    // check if asset manifest is present and process it
    fs.open(manifestPath, 'r', (err, fd) => {
      if (err) {

        onError({message: "Manifest not found at "+manifestPath});

      } else {

        var manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        // read in our handlebars template, compile it using
        // our manifest, and output it to index.html
        return gulp.src('src/templates/index.hbs')
            .pipe(gplugs.compileHandlebars(manifest, handlebarOpts))
            .pipe(gplugs.rename('index.html'))
            .pipe(gulp.dest('public'));
      }
    });
});



// Default Task
gulp.task('default', function (callback) {
    var runSequence = require('run-sequence');

    runSequence.use(gulp)([
        'cleanPublic',
        'cleanBuild'
    ],[
        'assets',
        'fonts',
        'libs',
        'vueApp',
        'scss'
    ], [
        'processBuild'
    ], [
        'html'
    ], [
        'cleanBuild'
    ], callback);
});
