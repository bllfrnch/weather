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
        var instances = util.namespace('org.billf.instances'),
            // you can specify a number of days between 1 and 10.
            forecast = instances.forecast = new widget.entities.Forecast([], {days: 5}),
            forecastView,
            widgetEl,
            successCallback = function() {
                forecastView = instances.forecastView = new widget.ForecastView({
                    collection: forecast
                });
                forecastView.render();
                widgetEl = forecastView.$el;
                $('#weather-widget').append(widgetEl);
            },
            errorCallback = function(error) {
                throw new Error('Error occurred: ', error);
            };

        forecast.fetch({
            success: successCallback,
            error: errorCallback
        });
	}
);