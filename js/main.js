jQuery(document).ready(function($) {

	var coverHolder = $('.cover_holder');
	var coverColours = [1,2,3,4,5,6,7,8];
	var sidebar = $('.sidebar');
	var menuBtn = $('.menu_btn');
	var mainView = $('.main_view');
	var header = $('header');
	var search = $('.search_box');
	var controlBar = $('.control_bar');
	var playlist = $('.playlist');
	var albumLink = $('.album_link');
	var overlay = $('.overlay');
	var overlayInside = $('.overlay_inside');

	// Generates a random number, matches to array to add coloured backgrounds //
	function rand(){
		return(
			Math.floor(Math.random() * 8));
	};

	coverHolder.each(function(){
		$(this).addClass('grad_bg-' + coverColours[rand()]);
	});

	//Just a load of click functions //
	menuBtn.on('touchend click', function(e){
		sidebar.toggleClass('open');
		mainView.toggleClass('pad-left');
	});

	playlist.on('touchend click', function(e){
		$(this).toggleClass('active');
	});

	//Temp to test on, only reacts to raven//
	$('.album_link:first-child').mouseup(function(){
		overlay.addClass('visible');
		$('.album_modal').addClass('visible');
	});

	// Search controls complicated modal //
	search.on('focus', function(){
		overlay.addClass('search_overlay');
		$(this).addClass('focused');
		$('.search_modal').addClass('open');
		overlay.addClass('visible');
		menuBtn.css("display", "none");
		setTimeout(function(){
			loadAlbums();
		},300);
	});

	var timeout;
	albumLink.on('mousedown', function(e){
		var self = $(this);
		timeout = setTimeout(function(){
			self.addClass('dragging');
			playlist.addClass('dragging active');
			overlay.addClass('visible');
		},500);
	});

	albumLink.on('mouseup', function(e){
		var self = $(this);
		setTimeout(function(){
			clearTimeout(timeout)
			self.removeClass('dragging');
			playlist.removeClass('dragging active');
		},100);
	});

	// Overlay removes all classes on close, and re-adds overlay //
	overlay.on('click touchend', function(){
		overlay.removeClass().addClass('overlay');
		$('.search_modal').removeClass('open');
		search.removeClass('focused');
		menuBtn.css("display", "block");
		$('.album_modal').removeClass('visible');
	})

	// This block manages animating new albums in on scroll. Also needs to work onload, seems to do so nicely //
	function onScreen(elem){
		var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();

	    return ((elemBottom <= docViewBottom + 200) && (elemTop >= docViewTop - 200));
	}

	function loadAlbums(){
		var delta = 50;
		var time = 0;

		albumLink.each(function(){
			var self = $(this);
			if (onScreen(self)) {
				setTimeout(function(){
					self.addClass('on-screen');
				}, time += delta);
				
			};
		})
	}
	
	$(document).on('scroll',function(){
		loadAlbums();
	});
	$(window).on('resize',function(){
		loadAlbums();
	});

	loadAlbums();


	function calcFlow(){
		var contWidth = $('.reccd').width();
		var contChildren = $('.reccd').children();

		var availWidth = contChildren[0];

		console.log(contChildren);
	}
	calcFlow();


	// Basic JS media controls. To be killed //
	var audioTrack = new Audio('The Watchmaker.mp3');
	var audioPlay = false;

	$('#play').on('click touchend', function(){

		if (!audioPlay) {
			audioTrack.play();
			audioPlay = true;
		} else if (audioPlay) {
			audioTrack.pause();
			audioPlay = false;
		}	
	});

	$("#seek").on("change", function() {
        audioTrack.currentTime = $(this).val();
        $("#seek").attr("max", audioTrack.duration);
    });

    audioTrack.addEventListener('timeupdate',function (){
    curtime = parseInt(audioTrack.currentTime, 10);
        $("#seek").attr("value", curtime);
    });

});