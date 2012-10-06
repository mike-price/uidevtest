define(['jquery'],function( $ )
{
	(function( $ )
	{
		var methods = {};
		var _parent = null;
		var view = {instance:null,_class:null};

		methods.init = function(options)
		{
			var $this = $(this);
			_parent = $this;

			if(!options.list)
			{
				$.error('List item required');
				return;
			}


			
			view._class = Backbone.View.extend(
			{
				el: $this,

				list_item_template: _.template($this.find('script.story-page-template').html()),
				string_format:function(formatted)
				{
					var args = Array.prototype.slice.call( arguments, 1 );

					for(arg in args) 
					{
				        formatted = formatted.replace("{" + arg + "}", args[arg]);
				    }

				    return formatted;
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

					return this.string_format("{0}:{1} {2} ",hour,minute, ap)+f_date.toLocaleDateString()
				},
				initialize:function()
				{
					var _this = this;

					$this.bind('page.load',this.load_page);
				},
				load_page:function(e,data)
				{
					console.log(data);
					
					data.data.pub_date_str = view.instance.format_date(data.data.pub_date);
							
					data.data.updated_date_str = view.instance.format_date(data.data.updated);

					$this.find('div.story-page-container').html(view.instance.list_item_template(data.data));

					$this.show('slide',{'direction':'right'});
				}
			});

			options.list.bind('item.selected',methods.show);

			methods._setup();
		}

		methods._setup = function()
		{
			view.instance = new view._class();
		}

		methods.show = function(e,data)
		{
			_parent.trigger('page.load',data);
		}

		$.fn.app_story=function(method)
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