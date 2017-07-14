const gulp = require('gulp'); //importamos librerías, por eso es importante instalar local
const sass= require('gulp-sass');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const config = {    //todo lo que este en src será el orgigen y el destino será public
    source: './src/',
    dist: './public'
};
const paths = { //ruta para llegar al html
    html: "**/*.html",
    assets: "assets/",
    sass: "scss/**/*.scss",
    mainSass: "scss/main.scss"
};
const sources = {
    html: config.source + paths.html,
    assets: config.source + paths.assets,
    sass: paths.assets + paths.sass,
    rootSass: config.source + paths.assets + paths.mainSass
        //  './src/**/*.html' Es la misma ruta que nos da
};
gulp.task("mover_html", ()=> {
    gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task("sass", ()=>{
    console.log(sources.rootSass);
    console.log(config.dist + "assets/css");
    gulp.src(sources.rootSass)
        .pipe(sass({
        outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(gulp.dest(config.dist + "/assets/css"));
});

gulp.task("js", ()=>{
    gulp.src(".src/assets/js/*.js")
        .pipe(browserify())
        .pipe(rename("nisJavascripts.js"))
        .pipe(gulp.dest("./public/assets/js"));
});
gulp.task("sass-watch",["sass"],(done)=>{
    browserSync.reload();
    done();
});
gulp.task("serve", ()=>{
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    })
    gulp.watch("./src/assets/scss/main.scss", [sass-watch]);
});