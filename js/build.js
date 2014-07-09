({
    baseUrl: './',
    paths: {
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore',
        jquery: 'bower_components/jquery/dist/jquery',
        handlebars: 'bower_components/handlebars/handlebars.min',
        hbs: 'bower_components/require-handlebars-plugin/hbs',
        marionette: 'bower_components/marionette/lib/backbone.marionette',
        widget: 'widget'
    },

    shim: {
        jquery: {
            exports: '$'
        },

        underscore: {
            exports: '_'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
    },

    name: 'main',

    // hbs: {
    //     i18n: false,
    //     templateExtension: 'hbs'
    // },

    out: 'built.js'
})  