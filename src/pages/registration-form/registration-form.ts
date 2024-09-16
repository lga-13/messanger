/* eslint-disable no-console */

import './registration-form.css';
import Form from '../../blocks/form/form.ts';
import { ErrorMessages, Validator } from '../../validators/field_validator.ts';
import render from '../../utils/render.ts';

const registrationForm = new Form(
  {

    className: 'registration-form',

    title: {
      className: 'registration-form-title',
      text: 'Регистрация',
      tag: 'h2',
      settings: { withInternalID: true },
    },

    button: {
      className: 'registration-form-button',
      typeName: 'button',
      text: 'Зарегистрироваться',
      settings: { withInternalID: true },
      events: {
        click: () => {
          if (registrationForm.validate()) {
            const data = registrationForm.get_data();
            console.log(data);
            registrationForm.clear();
          }
        },
      },
    },
    link: {
      className: 'registration-form-login',
      href: '/src/pages/login-form/l  ogin-form.html',
      text: 'Войти',
      settings: { withInternalID: true },
    },
    fields: [
      {
        label: {
          className: 'registration-form-label',
          text: 'Почта',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'email',
          placeholder: '',
          inputType: 'text',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: ErrorMessages.validateEmail,
          settings: { withInternalID: true },
        },
        validator: Validator.validateEmail,
      },
      {
        label: {
          className: 'registration-form-label',
          text: 'Логин',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'login',
          placeholder: '',
          inputType: 'text',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: ErrorMessages.validateLogin,
          settings: { withInternalID: true },
        },
        validator: Validator.validateLogin,

      },
      {
        label: {
          className: 'registration-form-label',
          text: 'Имя',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'first_name',
          placeholder: '',
          inputType: 'text',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: ErrorMessages.validateName,
          settings: { withInternalID: true },
        },
        validator: Validator.validateName,
      },
      {
        label: {
          className: 'registration-form-label',
          text: 'Фамилия',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'second_name',
          placeholder: '',
          inputType: 'text',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: ErrorMessages.validateName,
          settings: { withInternalID: true },
        },
        validator: Validator.validateName,
      },
      {
        label: {
          className: 'registration-form-label',
          text: 'Телефон',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'phone',
          placeholder: '',
          inputType: 'phone',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: ErrorMessages.validatePhone,
          settings: { withInternalID: true },
        },
        validator: Validator.validatePhone,
      },
      {
        label: {
          className: 'registration-form-label',
          text: 'Пароль',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'password',
          placeholder: '',
          inputType: 'password',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: ErrorMessages.validatePassword,
          settings: { withInternalID: true },
        },
        validator: Validator.validatePassword,
      },
      {
        label: {
          className: 'registration-form-label',
          text: 'Повторите пароль',
          settings: { withInternalID: true },
        },
        input: {
          className: 'registration-form-input',
          name: 'repeatPassword',
          placeholder: '',
          inputType: 'password',
          settings: { withInternalID: true },
        },
        errorMessage: {
          className: 'registration-form-error-message',
          text: 'пароли не совпадают',
          settings: { withInternalID: true },
        },
        validator: Validator.validatePassword,
      },
    ],
  },
);

export default registrationForm;

render('#app', registrationForm);
