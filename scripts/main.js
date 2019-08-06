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

const formToJson = formElements => {
		let errors = [];
		const formDatas = [].reduce.call(formElements, (datas, element) => {
			if(element.name){
				datas[element.name] = element.value.trim();
				if(!element.value || element.value === "")
					errors.push({label : element.name.replace('_', ' ')});
			}
			return datas;
		},{});
		return { formDatas, errors : errors.length ? errors : false };
}

const Toast = ({text, duration = 2000}, type = 'success') => {
	let target = $$('.toaster');
	target.textContent = text;
	target.classList.remove('error', 'success');
	if(type === 'success')
		target.classList.add('success');
	else
		target.classList.add('error');

	target.classList.add('show');
	setTimeout(() =>  {
		target.classList.remove('show');
		target.classList.remove(type);
	}, duration);
}

document.addEventListener('DOMContentLoaded', () => {
	// event listeners
	window.addEventListener('scroll', () => {
		(window.pageYOffset * 2 > window.innerHeight)  ? $$('div.toggler').classList.add('show') : $$('div.toggler').classList.remove('show');
	});
	if($$('form.signup')){
		$$('form.signup').addEventListener('submit', e => {
			e.preventDefault();
			let datas = formToJson(e.target.elements);
			if(!datas.errors){
				if(datas.formDatas.password !== datas.formDatas.password_confirm){
					Toast({text : `password and confirm password  should match`}, 'error');
					return;
				}
				// makes request to the api and redirect the user
				Toast({text : `Welcome "${datas.formDatas.first_name}", You succefuly registered`});
				history.pushState('Landing', {}, './');
				location.reload();
			}
			else{
				Toast({text : `Sorry, "${datas.errors[0].label}" field is required`}, 'error');
			}
		});
	}
	if($$('form.signin')){
		$$('form.signin').addEventListener('submit', e => {
			e.preventDefault();
			let datas = formToJson(e.target.elements).formDatas;
			if(datas.email && datas.password){
				let url = datas.email.match('admin') ? './admin_trips.html' : './trips.html';
				Toast({text : `You are logged in as "${datas.email}"`});
				history.pushState('User Landing', {}, url);
				location.reload();
			}
			else{
				Toast({text : `All fields are required`}, 'error');
			}
		});
	}
	if($$('div.toggler')){
		$$('div.toggler').addEventListener('click', () => {
		// Smooth scroll to the top
		window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		});
	}
	if($$('.dropdown-toggle')){
		$$('.dropdown-toggle', true).forEach((current, index) => {
			current.addEventListener('click', e => {
			let target = e.target.parentNode.children[1];
			if (!target.classList.contains('show')) 
				target.classList.add('show');
			else 
				target.classList.remove('show');
			});
	
		});

	}
	if($$('.sidebar-toggle')){
		$$('.sidebar-toggle').addEventListener('click', e => {
			let target = $$('.sidebar');
			if (!$$('.sidebar').classList.contains('show')){
				target.classList.add('show');
				e.target.classList.remove('fa-align-justify')
				e.target.classList.add('fa-times');
			}
			else{
				target.classList.remove('show');
				e.target.classList.add('fa-align-justify')
				e.target.classList.remove('fa-times');
			}
		});
	}
	if($$('.modal-trigger')){
		$$('.modal-trigger', true).forEach((trigger, index) => {
			trigger.addEventListener('click', e => {
				let targetModal = e.target.nextSibling.nextSibling;
				if(!targetModal.classList.contains('show'))
					targetModal.classList.add('show');
			})
		});
	}
	if($$('.modal-backdrop')){
		$$('.modal-backdrop', true).forEach((modalbackDrop, index) => {
			modalbackDrop.addEventListener('click', e => {
				let targetModal = e.target.parentNode.parentNode.parentNode;
				targetModal.classList.remove('show');
			})
		});
	}
	if($$('form.create-trip')){
		$$('form.create-trip').addEventListener('submit', e => {
			e.preventDefault();
			let datas = formToJson(e.target.elements);
			const text = 'Yes, The trip is succefuly created!';
			// this will make a http request to the api later
			if(!datas.errors){
				Toast({text});
				history.pushState('Trips', {}, './admin_trips.html');
				location.reload();
			}
			else{
				Toast({text : `The "${datas.errors[0].label}" field is required`}, 'error');
			}
			
		})
	}
	if($$('.cancel-trip')){
		$$('.cancel-trip', true).forEach((cancelTripBtn, index) => {
			cancelTripBtn.addEventListener('click', e => {
				e.preventDefault();
				const text = `The trip "TR-${e.target.getAttribute('data-trip')}" was succefuly canceled`;
				e.target.parentNode.parentNode.classList.add('hide');
				Toast({text});
			})
		})
	}
	if($$('.book-seat')){
		$$('.book-seat', true).forEach((bookSeatBtn, index) => {
			bookSeatBtn.addEventListener('click', e => {
				let targetForm = e.target.parentNode.previousElementSibling.children[0];
				let datas = formToJson(targetForm.elements).formDatas;
				e.target.parentNode.parentNode.parentNode.classList.remove('show');
				Toast({text : `You succefuly booked a seat on trip "TR-${e.target.getAttribute('data-trip')}"`});
			});
		})
	}
	if($$('.delete-booking')){
		$$('.delete-booking', true).forEach((dropBookingBtn, index) => {
			dropBookingBtn.addEventListener('click', e => {
				const element = e.target.parentNode.parentNode;
				$$('.cards').removeChild(element);
				Toast({text : `You succefuly deleted the booking "BOOK-${e.target.getAttribute('data-book')}"`});
			})
		})
	}
	window.addEventListener('click', e => {
	// ensures that whenever the user clicks outside the dropdown menu => this one get closed
	// either way for modals
		if(!e.target.matches('.dropdown-toggle')){
			$$('.dropdown-menu', true).forEach((current, index) => {
				if (current.classList.contains('show'))
					current.classList.remove('show')	
			})
		}
		if(e.target.matches('.modal')){
			if(e.target.classList.contains('show'))
				e.target.classList.remove('show');
		}
		
	});
});


initialize();

