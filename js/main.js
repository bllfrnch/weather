require.config({
    baseUrl: 'js',
    
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

    hbs: {
        i18n: false,
        templateExtension: 'hbs'
    }
});

require([
        'jquery',
        'underscore',
        'marionette',
        'handlebars',
        'widget',
        'utilities'
    ],

    function($, _, Marionette, Handlebars, widget, util) {
        'use strict';

        // change the templating mechanism:
        Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

        // create a namespace for object instances
        var weather = util.namespace('org.billf.weather'),
            // default is 5
            widgetElOne = new weather.ForecastWidget();

        $('#weather-widget').append(widgetElOne);
    }
);