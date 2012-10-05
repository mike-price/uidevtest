requirejs.config({baseUrl: 'js/lib'});

require([
			'jquery',
			'underscore',
			'backbone',
			'bootstrap',
			'js/app/controllers/page.js'],
function($)
{
	$(document.body).app_page();
});