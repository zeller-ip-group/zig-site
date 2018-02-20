// components/ContactForm.js

import axios from 'axios';
import _forEach from 'lodash.foreach';

export default () => {
  const contactForm = document.querySelector('.ContactForm');
  const submitButton = document.querySelector('[type="submit"]');
  const formInputStyles = [
    'formInput-disabled',
    'formInput-good',
    'formInput-caution',
    'formInput-warning',
  ];

  function getFormInputs() {
    const contactFormInputs = {};
    contactFormInputs.name = document.getElementById('contactFormName');
    contactFormInputs.email = document.getElementById('contactFormEmail');
    contactFormInputs.message = document.getElementById('contactFormMessage');
    return contactFormInputs;
  }

  function getFormMessageFields() {
    const formMessageFields = {};
    formMessageFields.text = document
      .querySelector('.ContactForm__message__text');
    formMessageFields.button = document
      .querySelector('.ContactForm__message__button');
    return formMessageFields;
  }

  function clearFormInputs(contactFormInputs) {
    _forEach(contactFormInputs, (val, key) => {
      val.value = '';
    });
  }

  function toggleContactFormMessageVisibility() {
    const contactFormMessage = document.querySelector('.ContactForm__message');
    contactFormMessage.classList.toggle('ContactForm__message--open');
  }

  function handleFormClick(e) {
    e.preventDefault();
    const messageButton = document.querySelector('.ContactForm__message__button');
    if (event.target === submitButton) {
      handleFormSubmit(e);
    }
    if (event.target === messageButton) {
      clearFormMessage();
      toggleContactFormMessageVisibility();
    }
  }

  function renderSuccessFormMessage() {
    const formMessageFields = getFormMessageFields();

    formMessageFields
      .text
      .textContent = 'Thank you.  Your message was submitted succesfully';
    formMessageFields.button.textContent = 'Close';
  }

  function renderFailureFormMessage() {
    const formMessageFields = getFormMessageFields();

    formMessageFields
      .text
      .textContent = 'Your message was not submitted succesfully';
    formMessageFields.button.textContent = 'Try Again';
  }

  function clearFormMessage() {
    const formMessageFields = getFormMessageFields();

    formMessageFields
      .text
      .textContent = '';
    formMessageFields.button.textContent = '';
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const contactFormInputs = getFormInputs();
    const formInputsAreValid = validateFormInputs(contactFormInputs);

    if (formInputsAreValid) {
      axios.post('/contact', {
          from: `${contactFormInputs.name.value} <${contactFormInputs.email.value}>`,
          messageBody: `Name: ${contactFormInputs.name.value}
          \nE-mail: ${contactFormInputs.email.value}
          \n\nMessage:
          \n${contactFormInputs.message.value}`,
        })
        .then(function (response) {
          clearFormInputs(contactFormInputs);
          toggleContactFormMessageVisibility();
          renderSuccessFormMessage();
          setTimeout(() => toggleContactFormMessageVisibility(), 5000);
        })
        .catch(function (error) {
          toggleContactFormMessageVisibility();
          renderFailureFormMessage();
          setTimeout(() => toggleContactFormMessageVisibility(), 5000);
        });
      return false;
    }
  }

  function validateFormInputs(inputObjectToValidate) {
    const inputObject = inputObjectToValidate;
    const validNamePattern = /^[A-Za-z ]{3,20}$/;
    const validEmailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    let formIsValid = true;

    _forEach(inputObject, (inputItem, key) => {
      if (inputItem.value.length < 1) {
        inputItem.classList.add('formInput-warning');
        formIsValid = false;
      }
    });

    if (!validNamePattern.test(inputObject.name.value)) {
      inputObject.name.classList.add('formInput-warning');
      formIsValid = false;
    }

    if (!validEmailPattern.test(inputObject.email.value)) {
      inputObject.email.classList.add('formInput-warning');
      formIsValid = false;
    }

    return formIsValid;


  }

  function addListenersToFormInputs(eventType, eventHandler) {
    const formInputs = getFormInputs();

    _forEach(formInputs, (formInput, key) => {
      formInput.addEventListener(eventType, eventHandler);
    });
  }

  function removeFormInputValidationStyles() {
    _forEach(formInputStyles, (style, key) => {
      this.classList.remove(style);
    });
  }

  addListenersToFormInputs('focus', removeFormInputValidationStyles);
  contactForm.addEventListener('click', e => handleFormClick(e));
};
