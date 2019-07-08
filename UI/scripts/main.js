"use strict";

let locationPortions = location.href.split('/');
let currentPage = locationPortions[locationPortions.length - 1]
.substr(0, locationPortions[locationPortions.length - 1].indexOf('.'));

const $$ = (element, all = false) => {
	return all 
	? document.querySelectorAll(element) 
	: document.querySelector(element);
}
const initialize = () => {
	animateLinks();
}
const animateLinks = () => {
	let links = $$('header li', true);
	links.forEach((link, index) => {
		currentPage = currentPage !== '' ? currentPage : 'index';
		if(currentPage === link.getAttribute('data-page'))
			link.classList.add('active');
	});
}

initialize();

