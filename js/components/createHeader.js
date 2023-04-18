import { createElement } from "../helper/createElement.js";

/* функция создания элементов шапки 
создаём каждый элемент отдельно, и вставляем
+ мини функция для изменения заголовка на странице*/
export const createHeader = (parent) => {
  const container = createElement('div', {
    className: 'container header__container',
  });

  parent.append(container);

  const headerLogoLink = createElement('a', {
    href: '#',
    className: 'header__logo-link',
  });

  const logo = createElement('img', {
    src: 'img/logo.svg',
    className: 'header__logo',
    alt: 'Логотип',
  });

  headerLogoLink.append(logo);

  const headerTitle = createElement('h2', {
    className: 'header__subtitle',
    textContent: 'Категории',
  });

  const headerBtn = createElement('button', {
    className: 'header__btn',
    textContent: 'Добавить категорию',
  });

  container.append(headerLogoLink, headerTitle, headerBtn);

  const updateHeaderTitle = (title) => {
    headerTitle.textContent = title;
  }

  return { headerLogoLink, headerBtn, updateHeaderTitle }
}