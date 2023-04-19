import { createElement } from "../helper/createElement.js"
import { declOfNum } from "../helper/declOfNum.js";

/* создание элементов списка категорий
по аналогии, как с шапкой сайта 
+ 2 мини функции для заполнения списка и для очистки*/
export const createCategory = (app) => {
  const category = createElement('section', {
    className: 'category section-offset',
  });

  const container = createElement('div', {
    className: 'container',
  });

  category.append(container);

  const categoryList = createElement('ul', {
    className: 'category__list',
  });

  const createCategoryCard = (data) => {
    const item = createElement('li', {
      className: 'category__item',
    });

    item.dataset.id = data.id;

    const cardBtn = createElement('button', {
      className: 'category__card',
    });

    const categoryTitle = createElement('span', {
      className: 'category__title',
      textContent: data.title,
    });

    const categoryPairs = createElement('span', {
      className: 'category__pairs',
      textContent: declOfNum(data.length, ['пара', 'пары', 'пар']),
    });

    cardBtn.append(categoryTitle, categoryPairs);

    const editBtn = createElement('button', {
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });

    const deleteBtn = createElement('button', {
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });

    item.append(cardBtn, editBtn, deleteBtn);

    return item;
  }

  container.append(categoryList);

  const mount = (data) => {
    categoryList.textContent = '';
    const cards = data.map(createCategoryCard);
    categoryList.append(...cards);
    app.append(category);
  }

  const unmount = () => {
    category.remove();
  }

  return { mount, unmount, categoryList }
}
