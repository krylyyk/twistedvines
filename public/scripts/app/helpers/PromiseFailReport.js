define([
    "jquery",
    "underscore",
    "parse",
], function( $, _, Parse ) {

    var process_single = function (error) {
        if (_.has(error, "message")) {
            console.info("Error in promise %s", error);
            trackJs.console.error("Error in promise", error);
            if (Parse.Error.INVALID_LINKED_SESSION == error.code) {
                Parse.User.logOut();
            }
        } else {
            console.info("Error in promise %s", error);
            trackJs.console.error("Error in promise", error);
        }
    };

    var func = function (error) {
        if (_.isArray(error)) {
            console.log("Error in a multi-promise follows {");
            _.each(error, function (e, i) {
                if (_.has(e, "success")) {
                    console.log("" + i + " succeeded at " + e.updatedAt);
                } else {
                    process_single(e);
                }
            });
            console.log("}");
        } else {
            process_single(error);
        }
    };

    var fakefunc = function(error) {
        var closebtn = '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>',
            header = '<div data-role="header"><h2>Error</h2></div>',
            popup = '<div data-role="popup" id="popup-global-error" data-short="global-error" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"></div>';
        $( header )
            .appendTo( $( popup )
                .appendTo( $.mobile.activePage )
                .popup() )
            .toolbar()
            .before( closebtn )
            .after( img );
    }

    return func;
} );
