

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

		

		_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

		$(document.body).app_page();
	});
	
});