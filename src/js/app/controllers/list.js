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

			view._class = Backbone.View.extend(
			{
				el: $this,

				list_item_template: _.template($this.find('script.story-item-template').html()),

				events:
				{
					'click div.list-item':'show_story'
				},
				format_date:function(date)
				{
					//custom date formatting
					var f_date = new Date(Date.parse(date));

					var ap = "a.m";

					var hour   = f_date.getHours();
					var minute = f_date.getMinutes();

					if (hour   > 11) { ap = "p.m";        }
					if (hour   > 12) { hour = hour - 12; }
					if (hour   == 0) { hour = 12;        }
					if (minute < 10) { minute = "0" + minute; }

					return "{0}:{1} {2} ".format(hour,minute, ap)+f_date.toLocaleDateString()

				},
				initialize:function()
				{
					
					var _this = this;

					$.getJSON('js/uidevtest-data.js',function(list_data)
					{
						data.objects = list_data;


						$.each(list_data.objects,function(i,item)
						{
							item.category_str = item.categories_name.join(' / ');
							
							//dates dont work properly in iOS
							item.pub_date_str = _this.format_date(item.pub_date);
							
							item.updated_date_str = _this.format_date(item.updated);

							$this.append(_this.list_item_template(item));
						});	
					});
				},
				render:function(){

				},
				'show_story':function()
				{
					$this.hide('slide',{'direction':'left'});
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