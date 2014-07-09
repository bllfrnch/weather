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

        var weather = util.namespace('org.billf.weather'),
        	views = util.namespace('org.billf.weather.views'),
        	entities = util.namespace('org.billf.weather.entities');

        // typically these classes would be broken out into separate files,
        // but given their simplicity, i kept them all in one place.
		entities.Day = Backbone.Model.extend({});

		entities.Forecast = Backbone.Collection.extend({
			url: 'http://api.wunderground.com/api/5a04155edeffd64c/forecast10day/q/NY/New_York.json?callback=?',
			model: entities.Day,
			
			initialize: function(models, options) {
				var days = _.pick(options, 'days');
				
				// check if options.days is acceptable
				if (options.days < 1 || options.days > 10 || 
					!_.isNumber(options.days)) {
					days = { days: 5 }
				}

				_.extend(this, days);
				
				this.promise = this.fetch();
			},
			
			parse: function(response, options) {
				// return the number of days specified in this.days
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
			childView: views.DayView,
			
			initialize: function(options) {
				this.collection = options.collection;
				this.setCallbacks();
			},

			// set render to happen once model's fetch promise is fulfilled
			setCallbacks: function() {
				var promise = this.collection.promise;
				promise.done(_.bind(function() {
					this.render();
				}, this));
			}
		});

		weather.ForecastWidget = function(days) {
			var forecast = new weather.entities.Forecast([], { 
					days: days
				}),
            	forecastView = new weather.views.ForecastView({ 
            		collection: forecast 
            	}),
            	widgetEl = forecastView.$el;

            return widgetEl;
		}

        return weather;
	}
);