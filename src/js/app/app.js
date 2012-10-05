requirejs.config({baseUrl: 'js/lib'});

require([
			'jquery',
			'underscore',
			'backbone',
			'bootstrap',
			'js/app/controllers/page.js'],
function($,_)
{
	$(document.body).app_page();
});