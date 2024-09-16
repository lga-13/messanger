/* eslint-disable no-console */

export const ErrorMessages = {

  validateName: '- Имя и фамилия должны начинаться с заглавной буквы\n'
                  + '- и могут содержать только буквы и дефисы',

  validateLogin: '- Логин должен начаться с алфавитного символа\n'
                   + '- Логин должен содержать от 2 до 19 символов\n'
                   + '- Логин может содержать только алфавитные символы,'
                   + 'цифры, подчеркивания и дефисы',

  validateEmail: '- Электронная почта должна быть формата text@text.text\n'
                   + '- Могут использоваться только алфавитные символы, цифры, подчеркивания'
                   + 'и дефисы в адресе электронной почты',

  validatePassword: '- Длина пароля должна быть от 8 до 40 символов\n'
                      + '- Пароль должен содержать хотя бы одну цифру\n'
                      + '- Пароль должен содержать хотя бы одну заглавную букву\n'
                      + '- Пароль может содержать только латинские буквы и цифры '
                      + '(никаких специальных символов или пробелов)',

  validatePhone: '- Номер телефона должен содержать от 10 до 15 цифр\n'
                   + "- Номер телефона может начинаться с ведущего '+', но это не обязательно",

  validateMessage: '- Сообщение не должно быть пустым или состоять только из пробелов',
};

export const Validator = {

  validateName(value: string): boolean {
    const re: RegExp = /^[А-ЯA-Z][А-Яа-яA-Za-z-]*$/;
    const result: boolean = re.test(value);
    if (!result) {
      console.log(ErrorMessages.validateName);
    }
    return result;
  },

  validateLogin(value: string): boolean {
    const re: RegExp = /^[a-zA-Z][a-zA-Z0-9_-]{2,18}$/;
    const result: boolean = re.test(value);
    if (!result) {
      console.log(ErrorMessages.validateLogin);
    }
    return result;
  },

  validateEmail(value: string): boolean {
    const re: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    const result: boolean = re.test(value);
    if (!result) {
      console.log(ErrorMessages.validateEmail);
    }
    return result;
  },

  validatePassword(value: string): boolean {
    const re: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    const result: boolean = re.test(value);
    if (!result) {
      console.log(ErrorMessages.validatePassword);
    }
    return result;
  },

  validatePhone(value: string): boolean {
    const re: RegExp = /^\+?\d{10,15}$/;
    const result: boolean = re.test(value);
    if (!result) {
      console.log(ErrorMessages.validatePhone);
    }
    return result;
  },

  validateMessage(value: string): boolean {
    const result: boolean = value.trim().length > 0;
    if (!result) {
      console.log(ErrorMessages.validateMessage);
    }
    return result;
  },

  validateSearch(search: string): boolean {
    return search.trim().length > 0;
  },
};
