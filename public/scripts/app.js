// Sets the require.js configuration for your application.
requirejs.config( {
	baseUrl: "scripts/lib",
	//urlArgs: "bust=" + (new Date()).getTime(),
	urlArgs: "bust=" + 17,

	// 3rd party script alias names
	paths: {

		// Core Libraries
		jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery",
		jquerymobile: "jquery.mobile-1.4.5.min",
		jscookie: "js.cookie",
		underscore: "//cdn.jsdelivr.net/lodash/3.10.0/lodash",
		backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone",
		//parse: "//www.parsecdn.com/js/parse-1.5.0.min",
		parse: "parse-1.5.0.min",
		pretty: "prettyprint",
		moment: "moment",
		vis: "vis.min",
		backform: "backform",
		nprogress: "nprogress",

		app: "../app"
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		},

		"backform": {
			"deps": [ "backbone" ],
			"exports": "Backform",
		},

        "parse": {
            "deps": [ "underscore", "jquery" ],
            "exports": "Parse"
        },

	}

});

// Load the main app module to start the app
requirejs(["app/main"]);
requirejs(["app/loadall"]);
