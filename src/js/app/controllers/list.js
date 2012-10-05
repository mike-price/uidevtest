define(['jquery','underscore'],function( $, _ )
{
	(function( $ )
	{
		var methods = {};
		var data = {};

		methods.init = function(options)
		{
			data.model = var Todo = Backbone.Model.extend(
			{

			    // Default attributes for the todo item.
			    defaults: function() {
			      return {
			        title: "empty todo...",
			        order: data.story_list.nextOrder(),
			        done: false
			      };
			    }
			 });

			data.list =  Backbone.Collection.extend(
			{
			 	model: data.model,
			 	localStorage: new Backbone.LocalStorage("uidevtest-storylist")
			});	
		}

		$.fn.app_list=function(method)
		{
			if ( methods[method] ) 
			{
		      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) 
		    {
		      return methods.init.apply( this, arguments );
		    } else 
		    {
		      $.error( 'Method ' +  method + ' does not exist on jQuery.app_page' );
		    } 
		}

	})(jQuery);
});