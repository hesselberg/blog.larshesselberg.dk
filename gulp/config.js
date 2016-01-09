var notifier = require('node-notifier');
var argv = require('yargs').argv;

module.exports = (function () {
    var projectName = "larshesselberg-ghost-theme-helper";

    var projectPath = "./";
    var bowerPath = projectPath + "vendor/bower";
    var srcPath = projectPath + "src/";
    var assetsPath = projectPath + "assets/";

    var cleanPaths = [assetsPath];

    var debug = true;

    return {
        debug: (argv.debug !== undefined ? argv.debug.toLowerCase() == "true" : debug),

        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    "title": taskName,
                    "message": "An error occured in the " + e.plugin + " plugin."
                });
                console.log(e.message);
                this.emit("end");
            };
        },

        assetsPath: assetsPath,
        bowerPath: bowerPath,
        cleanPaths: cleanPaths,

        loadTasks: [
            "styles",
            "scripts",
            "images",
            "icons",
            "copy",
            "watch",
            "build"
        ],
        buildTasks: [
            "styles",
            "scripts",
            "images",
            "icons",
            "copy"
        ],

        // ------------- Scripts -------------
        scriptsDist: assetsPath + "scripts",

        // ------------- Icons ---------------
        iconsDist: assetsPath,
        spriteConfig: {
            shape : {
                // Set maximum dimensions
                dimension       : {
                    maxWidth    : 32,
                    maxHeight   : 32
                }
            },
            mode : {
                view : {
                    bust : false,
                    render : {
                        less : true
                    },
                    dest : 'icons',
                    sprite : 'icons-css.svg'
                },
                symbol : {
                    dest : 'icons',
                    sprite : 'icons.svg'
                }
            }
        },

        // ------------- Fonts -------------
        fontsDist: assetsPath + "fonts",

        // ------------- Styles -------------
        stylesDist: assetsPath + "css",

        // ------------- Images -------------
        imagesDist: assetsPath + "images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // ------------- Watch -------------
        watchImages: [ srcPath + "images/**/*.{jpg,png,gif,svg}" ],
        watchIcons: [ srcPath + "icons/**/*.svg" ],
        watchScripts: [ srcPath + "scripts/**/*.js" ],
        watchStyles: [ srcPath + "less/**/*.less" ],

        // ------------- Copy on build -------------
        buildCopy: [
        {
            from: srcPath + "fonts/**/*",
            to: assetsPath  + "fonts"
        },
        {
            from: srcPath + "favicon.ico",
            to: assetsPath
        }],

        // ------------- Bundles -------------
        bundles: [{
            name: "master",
            ignorePlugins: ["jscs"],
            scripts: [
                srcPath + "scripts/libs/zepto.min.js",
                srcPath + "scripts/libs/svg4everybody.min.js",
                srcPath + "scripts/master.js"
            ],
            styles: [ srcPath + "less/master.less" ],
            images: [ srcPath + "images/**/*.{jpg,png,gif,svg}" ],
            icons: [ srcPath + "icons/**/*.svg" ]
        }]
    };
})();
