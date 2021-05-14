const { series, src, dest, watch} = require('gulp');
const sass = require('gulp-sass');

// Funcion que compila SASS

function css () {
    return src('src/scss/app.scss')
    .pipe( sass())
    .pipe( dest('./build/css'))
}

function minificarcss () {
    return src('src/scss/app.scss')
    .pipe( sass({
        outputStyle: 'compressed'
    }))
    .pipe( dest('./build/css'))
}

function watchArchivos() {
    watch( 'src/scss/**/*.scss', css ); // * = la carpeta actual - ** = Todos los archivos con esa extension
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos;