jQuery(document).ready(function($) {

	var coverHolder = $('.cover_holder');
	var coverColours = [1,2,3,4,5,6,7,8];

	function rand(){
		return(
			Math.floor(Math.random() * 8));
	};

	coverHolder.each(function(){
		$(this).addClass('grad_bg-' + coverColours[rand()]);
	});


	var sidebar = $('.sidebar');
	var menuBtn = $('.menu_btn');
	var mainView = $('.main_view');
	var header = $('header');
	var controlBar = $('.control_bar');


	menuBtn.on('touchend click', function(e){
		sidebar.toggleClass('open');
		mainView.toggleClass('pad-left');
		header.toggleClass('pad-left');
		controlBar.toggleClass('pad-left');
	});

	var playlist = $('.playlist');

	playlist.on('touchend click', function(e){
		$(this).toggleClass('active');
	});

	var albumLink = $('.album_link');

	albumLink.mouseup(function(){
		$(this).append($('.album_modal'));
	});

});