define(['jquery'],function($)
{
	(function( $ )
	{
		//mustache style templating
		_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

		var methods = {};
		var data = {};
		var view = {instance:null,_class:null};
		
		methods.init = function(options)
		{
			var $this = $(this);

			data.model = Backbone.Model.extend(
			{

			    // Default attributes for the todo item.
			    defaults: function() 
			    {
			      return {
			        title: "",
			        order: data.story_list.nextOrder(),
			        done: false
			      };
			    }
			 });

			data.list =  Backbone.Collection.extend(
			{
			 	model: data.model
			});	

			view._class = Backbone.View.extend(
			{
				el: $this,

				list_item_template: _.template($this.find('script.story-item-template').html()),

				events:
				{
					'click div.list-item':'show_story'
				},
				initialize:function()
				{
					
					var _this = this;

					$.getJSON('js/uidevtest-data.js',function(list_data)
					{
						data.objects = list_data;

						console.log(data.objects);	

						$.each(list_data.objects,function(i,item)
						{
							$this.append(_this.list_item_template(item));
						});	
					});
				},
				render:function(){

				},
				'show_story':function()
				{

				}
			});

			methods._setup();
		}

		methods._setup=function()
		{
				view.instance = new view._class();
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
		      $.error( 'Method ' +  method + ' does not exist on jQuery.app_list' );
		    } 
		}

	})(jQuery);
});