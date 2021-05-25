const { series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

// Funcion que compila SASS
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}

function css () {
    return src(paths.scss)
        .pipe( sourcemaps.init() )    
        .pipe( sass())
        .pipe( postcss([ autoprefixer(), cssnano() ]))
        .pipe( sourcemaps.write('.') )
        .pipe( dest('./build/css') )
}

function javascript() {
    return src(paths.js)
        .pipe( sourcemaps.init())
        .pipe( concat('bundle.js'))
        .pipe( terser() )
        .pipe(sourcemaps.write('.') )
        .pipe( rename({ suffix: '.min'}))
        .pipe( dest('./build/js'))

}

function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img' ))
        .pipe( notify({message: 'Imagen Minificada'}));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('./build/img'))
        .pipe( notify({message: 'Versiíon webP lista'}));
}

function watchArchivos() {
    watch( paths.scss, css ); // * = la carpeta actual - ** = Todos los archivos con esa extension
    watch(paths.js, javascript);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

//esto ejecuta todo al mismo tiempo en vez de estar escribiendo uno por uno
exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );