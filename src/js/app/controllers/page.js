//include dependencies for other widgets list.js and story.js
define(['jquery','underscore','./list.js','./story.js'],function( $, _ )
{
	(function( $ )
	{
		var methods = {};
		
		methods.init = function(options)
		{
			var $this = $(this);

			//initialize app_list widget, this controls the index page and also handles the routing based on the url passed
			$this.find('div.story-list').app_list();

			//initialize the app_story widget, this controls the story page
			$this.find('div.story-page').app_story({list:$this.find('div.story-list')});
		}

		$.fn.app_page=function(method)
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