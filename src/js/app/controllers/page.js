define(['jquery','underscore','./list.js','./story.js'],function( $, _ )
{
	(function( $ )
	{
		var methods = {};
		
		methods.init = function(options)
		{
			$('div.story-list').app_list();
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