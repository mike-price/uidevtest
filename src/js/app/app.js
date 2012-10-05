

requirejs.config({baseUrl: 'js/lib'});

require([
			'jquery',
			'jquery.ui',
			'underscore',
			'backbone',
			'bootstrap',
			'js/app/controllers/page.js'],
function($,_)
{
	String.prototype.format = function() {
    var formatted = this;
    for(arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

	$(document.body).app_page();
});