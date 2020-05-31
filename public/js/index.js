/**
 * main3.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false,
		isAnimating = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isAnimating ) return false;
		isAnimating = true;
		if( isOpen ) {
			// classie.remove( bodyEl, 'show-menu' );
			bodyEl.classList.remove("show-menu");
			setTimeout( function() {
				isAnimating = false; 
			}, 500 );
		}
		else {
			// classie.add( bodyEl, 'show-menu' );
			bodyEl.classList.add("show-menu");
			// animate path
			// path.animate( { 'path' : pathOpen }, 400, mina.easeinout, function() { isAnimating = false; } );
			setTimeout( function() {
				isAnimating = false; 
			}, 500 );
		}
		isOpen = !isOpen;
	}

	init();

})();