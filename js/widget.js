define([
		'jquery',
	    'underscore',
	    'backbone',
	    'marionette',
	    'hbs!templates/day',
	    'utilities'
    ],

	function($, _, Backbone, Marionette, dayTmpl, util) {
        'use strict';

        var widget = util.namespace('org.billf.weather'),
        	views = util.namespace('org.billf.weather.views'),
        	entities = util.namespace('org.billf.weather.entities');

        // typically these classes would be broken out into separate files,
        // but given their simplicity, i kept them all in one place.
		entities.Day = Backbone.Model.extend({});

		entities.Forecast = Backbone.Collection.extend({
			url: 'http://api.wunderground.com/api/5a04155edeffd64c/forecast10day/q/NY/New_York.json?callback=?',
			model: entities.Day,
			initialize: function(models, options) {
				_.extend(this, _.pick(options, 'days'));
			},
			parse: function(response, options) {
				return response.forecast.simpleforecast.forecastday.slice(0, this.days);
			}
		});		

		views.DayView = Marionette.ItemView.extend({
			tagName: 'li',
			template: dayTmpl,
			className: 'day'
		});

		views.ForecastView = Marionette.CollectionView.extend({
			tagName: 'ul',
			className: 'widget forecast',
			childView: views.DayView
		});

		// TODO: write a wrapper ForecastWidget that returns ForecastView's $el
		// once it's rendered based on a promise.

		widget.ForecastView = views.ForecastView;

        return widget;
	}
);