define(['jquery'],function($)
{
	(function( $ )
	{
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
				getUrlVars: function()
				{
				    var vars = [], hash;
				    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				    for(var i = 0; i < hashes.length; i++)
				    {
				      hash = hashes[i].split('=');
				      vars.push(hash[0]);
				      vars[hash[0]] = hash[1];
				    }
				    return vars;
				},
				getUrlVar: function(name)
				{
				    return this.getUrlVars()[name];
				},
				string_format:function(formatted)
				{
					var args = Array.prototype.slice.call( arguments, 1 );

					for(arg in args) 
					{
				        formatted = formatted.replace("{" + arg + "}", args[arg]);
				    }

				    return formatted;
				},
				//page navigation
				navigate:function(pid)
				{
					//get last two digits in param
					pid = parseInt(pid.substr(pid.length-2));

					if(pid > 0)
					{
						pid = pid - 1;

						if(data.objects[pid])
						{
							$this.hide('slide',{'direction':'left'},function()
							{
								$this.trigger('item.selected',{data:data.objects[pid]});	
							});	
						}else
						{
							this.load_ui();
						}
						
					}else
					{
						this.load_ui();
					}
					
				},
				//custom date formatting
				format_date:function(date)
				{					
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
				load_ui:function()
				{
					var _this = this;

					$.each(data.objects,function(i,item)
					{
						item.category_str = item.categories_name.join(' / ');
						
						//dates dont work properly in iOS
						item.pub_date_str = _this.format_date(item.pub_date);
						
						item.updated_date_str = _this.format_date(item.updated);

						$this.find('div.story-list-container').append(_this.list_item_template(item));

						console.log(i+1 + " :: " +data.objects.length)

						if(i+1 == data.objects.length)
						{
							$this.fadeIn();
						}
							

					});	
					
				},
				initialize:function()
				{
					
					var _this = this;

					var params = this.getUrlVars();

					//check to see if url parameters are passed
					//if so, navigate to that page
					$.getJSON('js/uidevtest-data.js',function(list_data)
					{
						data.objects = list_data.objects;

						if(params['story'])
						{
							_this.navigate(params['story']);
							return;
						}
						
						_this.load_ui();
					});
						
					
				},
				render:function(){

				},
				'show_story':function(ev)
				{
					//console.log(data.objects[$(ev.currentTarget).index()]);

					$this.hide('slide',{'direction':'left'},function()
					{
						var pid = parseInt($(ev.currentTarget).index()+1);
						window.location = 'html/index.html?story=sto0'+pid;

						//$this.trigger('item.selected',{data:data.objects[$(ev.currentTarget).index()]});	
					});
					
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