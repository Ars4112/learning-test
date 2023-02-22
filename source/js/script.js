let viewport = document.documentElement.clientWidth;
const header = document.querySelector('.header');
const headerNav = document.querySelector('.header__nav');
const buttonOpenMenu = document.querySelector('.nav__button');
const form = document.querySelector('form');
const body = document.querySelector('body');
const headerButton = document.querySelector('.header__button');
const navList = document.querySelector('.nav__list');

if (header) {
  headerNav.classList.remove('nav__menu-mobile');
  header.style.position = 'absolute';
  buttonOpenMenu.classList.remove('nav__button--hidden');
  navList.classList.add('nav__list--overflow');

  buttonOpenMenu.addEventListener('click', () => {
    headerNav.classList.toggle('nav__menu-mobile');
    headerNav.classList.toggle('nav__menu-mobile--position');
    headerButton.classList.toggle('button__close');
    headerButton.classList.toggle('visually-hidden');
    body.classList.toggle('menu-open');
  });

  headerButton.addEventListener('click', ()=> {
    headerNav.classList.toggle('nav__menu-mobile');
    headerNav.classList.toggle('nav__menu-mobile--position');
    headerButton.classList.toggle('button__close');
    headerButton.classList.toggle('visually-hidden');
    body.classList.toggle('menu-open');
  });

}

const addMask = () => {

  let eventCalllback = function (e) {
    let el = e.target;
    let clearVal = el.dataset.phoneClear;
    let pattern = el.dataset.phonePattern;
    let matrixDef = '+7(___) ___-__-__';
    let matrix = pattern ? pattern : matrixDef;
    let i = 0;
    let def = matrix.replace(/\D/g, '');
    let val = e.target.value.replace(/\D/g, '');
    if (clearVal !== 'false' && e.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        return;
      }
    }
    if (def.length >= val.length) {
      val = def;
    }
    e.target.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      } else {
        return a;
      }
    });
  };
  if (form) {
    let phoneInputs = form.querySelectorAll('input[name="tel"]');
    for (let elem of phoneInputs) {
      for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
      }
    }
  }

};

const addValid = () => {
  if (form) {
    const input = form.querySelectorAll('form input');
    const checkbox = form.querySelector('form input[name="agreement"]');
    const regExpEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    let isValidateEmail;
    let isValidateName;
    let isValidateTel;
    let valid;

    const validateElement = (element) => {
      if (element.name === 'name') {
        if (element.value === '') {
          element.nextElementSibling.textContent = 'Заполните поле';
          isValidateName = false;
        } else if (/^([А-Я][а-яё-]|[A-Z][a-z-])$/gm.test(element.value)) {
          element.nextElementSibling.textContent = 'Не валидное имя';
          isValidateName = false;
        } else if (element.value.length > 20) {
          element.nextElementSibling.textContent = 'Не валидное имя';
          isValidateName = false;
        } else if (/[_\d]/.test(element.value)) {
          element.nextElementSibling.textContent = 'Не валидное имя';
          isValidateName = false;
        } else {
          element.nextElementSibling.textContent = '';
          isValidateName = true;
        }
      }
      if (element.name === 'email') {
        if (element.value === '') {
          element.nextElementSibling.textContent = 'Заполните поле';
          isValidateEmail = false;
        } else if (!regExpEmail.test(element.value)) {
          element.nextElementSibling.textContent = 'Не валидный email';
          isValidateEmail = false;
        } else {
          element.nextElementSibling.textContent = '';
          isValidateEmail = true;
        }
      }
      if (element.name === 'tel') {
        if (element.value === '') {
          element.nextElementSibling.textContent = 'Заполните поле';
          isValidateTel = false;
        } else if (element.value.replaceAll(/\D/g, '').length < 11) {
          element.nextElementSibling.textContent = 'Введите полный номер';
          isValidateTel = false;
        } else {
          element.nextElementSibling.textContent = '';
          isValidateTel = true;
        }
      }
      if (element.name === 'agreement') {
        if (element.checked) {
          form.querySelector('.form__error-checkbox').textContent = '';
        } else {
          form.querySelector('.form__error-checkbox').textContent =
              'Согласитесь с условиями';
        }
      }
    };

    input.forEach((element) => {
      ['blur', 'input', 'focus'].forEach((elem)=> {
        element.addEventListener(elem, () => {
          validateElement(element);
        });
      });
    });

    form.addEventListener('submit', (evt) => {

      input.forEach((element)=> {

        if (element !== checkbox) {
          if (element.value === '') {
            element.nextElementSibling.textContent = 'Заполните поле';
            valid = false;
          } else {
            element.nextElementSibling.textContent = '';
            valid = true;
          }
        }
      });

      if (!checkbox.checked) {
        evt.preventDefault();
      } else if (valid && isValidateName && isValidateEmail && isValidateTel) {
        form.submit();
        form.querySelector('.form__message').textContent =
              'Форма отправлена успешно';
      } else {
        evt.preventDefault();
        input.forEach((element) => {
          validateElement(element);
        });
      }
    });
  }

};
const addScroll = ()=> {
  const button = document.querySelectorAll('nav a');

  button.forEach((element)=> {
    element.addEventListener('click', (evt)=> {
      evt.preventDefault();
      const id = element.getAttribute('href');
      const hash = id.replace('#', '');
      const buttonId = document.getElementById(hash);

      if (element.hash === id) {
        if (viewport <= 768) {
          headerNav.classList.remove('nav__menu-mobile');
          headerNav.classList.remove('nav__menu-mobile--position');
          headerButton.classList.remove('button__close');
          headerButton.classList.add('visually-hidden');
          body.classList.remove('menu-open');
        }
        buttonId.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    });
  });
};

window.addEventListener('DOMContentLoaded', ()=> {
  addScroll();
  addValid();
  addMask();
});
