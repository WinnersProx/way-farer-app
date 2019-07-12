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

const formToJson = formElements => [].reduce.call(formElements, (datas, element) => {
		if(element.name && element.value)
			datas[element.name] = element.value.trim();
		return datas;
	}, 
{});

const validateSignUp = (datas) => {
	let errors = [];
	const { email, first_name, last_name, address, password } = datas;
	// email validation
	if(!email || !email.trim()){
		errors.push({label : 'email', error : 'The email field is required'});
	}
	if(!email.match('^([a-zA-Z0-9]+)(@)([a-z]{5,15})(\.)([a-z]{2,3})$'))
		errors.push({label : 'email', error : 'The provided email is invalid'});
	// password validation
	if(!password || !password.trim()){
		errors.push({label : 'password', error : 'The password field is required'});
	}
	else if(password.length < 6){
		errors.push({label : 'password', error : 'The password should be at least 6 characters long'});
	}
	// first name validation
	if(!first_name || !first_name.trim()){
		errors.push({label : 'first_name', error : 'The first name field is required'});
	}
	else if(first_name.length < 6){
		errors.push({label : 'first_name', error : 'The first name should be at least 6 characters long'});
	}
	// lastname validation
	if(!last_name || !last_name.trim()){
		errors.push({label : 'last_name', error : 'The last name field is required'});
	}
	else if(last_name.length < 6){
		errors.push({label : 'last_name', error : 'The last name should be at least 6 characters long'});
	}
	
	// address validation
	if(!address || !address.trim()){
		errors.push({label : 'address', error : 'The address field is required'});
	}
	else if(address.length < 6){
		errors.push({label : 'address', error : 'The address must be at least 6 characters long'});
	}

	return { success : errors.length ? false : true, errors }
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
			let validation = validateSignUp(datas);

			$$(`.input-error`, true).forEach((input, index) => input.innerText = '');

			if(!validation.success){
				// send errors back to the form
				validation.errors.forEach((input, index) => {
					$$(`.input-error[data-label="${input.label}"]`).innerText = input.error;
				})
			}
			else{
				// makes request to the api and redirect the user
				history.pushState('Landing', {}, './');
				location.reload();
			}
		});
	}
	if($$('form.signin')){
		$$('form.signin').addEventListener('submit', e => {
			e.preventDefault();
			let datas = formToJson(e.target.elements);
			if(datas.email && datas.password){
				$$('div.form-header').innerText = '';
				history.pushState('Landing', {}, './');
				location.reload();
			}
			else{
				$$('div.form-header').classList.add('error');
				$$('div.form-header').innerText = 'All fields are required';
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
	window.addEventListener('click', e => {
	// ensures that whenever the user clicks outside the dropdown menu => this one get closed
		if(!e.target.matches('.dropdown-toggle')){
			$$('.dropdown-menu', true).forEach((current, index) => {
				if (current.classList.contains('show'))
					current.classList.remove('show')	
			})
		}
	});
});


initialize();

