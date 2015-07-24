// Category View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
    "parse",
    "../models/SimpleTrait",
    "../collections/DescriptionCollection",
    "../models/Description"
], function( $, Backbone, Parse, SimpleTrait, DescriptionCollection, Description ) {

    // Extends Backbone.View
    var View = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            _.bindAll(this, "register", "update_collection_query_and_fetch");

        },

        register: function(character, category, freeValue) {
            var self = this;
            var changed = false;

            if (freeValue !== self.freeValue) {
                self.freeValue = freeValue;
                changed = true;
            }

            if (character !== self.character) {
                if (self.character)
                    self.stopListening(self.character);
                self.character = character;
                self.listenTo(self.character, "change:" + category, self.update_collection_query_and_fetch);
                changed = true;
            }

            if (category != self.category) {
                self.category = category;
                if (self.collection)
                    self.stopListening(self.collection);
                self.collection = new DescriptionCollection;
                self.listenTo(self.collection, "add", self.render);
                self.listenTo(self.collection, "reset", self.render);
                self.update_collection_query_and_fetch();
                changed = true;
            }

            if (changed) {
                return self.render();
            }
            return self;
        },

        update_collection_query_and_fetch: function () {
            var self = this;
            var q = new Parse.Query(Description);
            q.equalTo("category", self.category).addAscending(["order", "name"]);
            var traitNames = _(self.character.get(self.category)).pluck("attributes").pluck("name").value();
            q.notContainedIn("name", traitNames);
            self.collection.query = q;
            self.collection.fetch({reset: true});
        },

        // Renders all of the Category models on the UI
        render: function() {

            // Sets the view's template property
            this.template = _.template($("script#simpletraitcategoryDescriptionItems").html())({
                "collection": this.collection,
                "character": this.character,
                "category": this.category,
                "freeValue": this.freeValue
            });

            // Renders the view's template inside of the current listview element
            this.$el.find("div[role='main']").html(this.template);

            // Maintains chainability
            return this;
        },

        events: {
            "click": "clicked"
        },

        clicked: function(e) {
            var self = this;
            $.mobile.loading("show");
            self.character.update_trait($(e.target).attr("name"), 1, self.category, self.freeValue).done(function(b) {
                if (self.freeValue) {
                    window.location.hash = "#charactercreate/" + self.character.id;
                } else {
                    window.location.hash = "#simpletrait/" + self.category + "/" + self.character.id + "/" + b.id;
                }
            })

            return false;
        }

    } );

    // Returns the View class
    return View;

} );