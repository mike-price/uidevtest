
//main entry point of the application

//set base url for core dependencies
requirejs.config({baseUrl: 'js/lib'});

require([
			'jquery',
			'jquery.ui',
			'underscore',
			'backbone',
			'bootstrap',
			'js/app/controllers/page.js'],
function($)
{
	$(function()
	{
		//set up mustache style templating
		_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

		//initialize the app_page widget
		$(document.body).app_page();
	});
	
});