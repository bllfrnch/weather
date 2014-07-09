define([
    'jquery', 
    'underscore'
    ],

    function($, _) {
        'use strict';

        var utilities = {
            /**
             * defines a namespace on the Window object and returns it.
             * if the second parameter obj is passed, it copies
             * the object's properties and values to the namespace
             * specified in the first parameter.
             */
            namespace: function(ns, obj) {
                var parts = ns.split('.'),
                    parent = window,
                    part;

                for (var i = 0; i < parts.length; i++) {
                    part = parts[i];
                    parent = parent[part] = parent[part] || {};
                }

                if (obj) {
                    _.each(_.keys(obj), function(key) {
                        parent[key] = obj[key];
                    });
                }

                return obj || parent;
            }
        };

        utilities.namespace('org.billf.utilities', utilities);

        return utilities;
    }
);  