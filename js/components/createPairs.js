import { createElement } from "../helper/createElement.js"

export const createPairs = (app) => {
  const pairs = createElement('section', {
    className: 'card section-offset',
  });

  const container = createElement('div', {
    className: 'container card__container',
  });

  const returnBtn = createElement('button', {
    className: 'card__return',
    ariaLabel: 'Возврат к категориям',
  });

  const cardBtn = createElement('button', {
    className: 'card__item',
  });

  const front = createElement('span', {
    className: 'card__front',
    textContent: 'один',
  });

  const back = createElement('span', {
    className: 'card__back',
    textContent: 'one',
  });

  cardBtn.append(front, back);
  container.append(returnBtn, cardBtn);
  pairs.append(container);

  const mount = data => {
    app.append(pairs);
  }

  const unmount = () => {
    pairs.remove();
  }

  return { returnBtn, mount, unmount };
}
