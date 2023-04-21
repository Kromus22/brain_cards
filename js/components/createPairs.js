import { createElement } from "../helper/createElement.js"
import { shuffle } from "../helper/shuffle.js";
import { showAlert } from "./showAlert.js";

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

  let dataCards = [];

  //логика переворота карточки
  const flipCard = () => {
    cardBtn.classList.add('card__item_flipped');
    cardBtn.removeEventListener('click', flipCard); //убираем обработчик, чтобы исключить случайные 
    //клики по новым карточкам. позже снова навешиваем.

    setTimeout(() => {
      cardBtn.classList.remove('card__item_flipped');
      setTimeout(() => {
        cardBtn.index++;

        if (cardBtn.index === dataCards.length) {
          front.textContent = 'The end';
          showAlert('Вернёмся к категориям!');

          setTimeout(() => {
            returnBtn.click();
          }, 2000);
          return;
        }

        front.textContent = dataCards[cardBtn.index][0];
        back.textContent = dataCards[cardBtn.index][1];

        setTimeout(() => {
          cardBtn.addEventListener('click', flipCard);
        }, 300); //небольшая задержка, чтобы не протыкали карточку сразу случайно.

      }, 100); // во вложенном сетТаймауте установили время - 
      //половину от анимации переворота карточки (CSS). 
      //чтобы не было видно сменяющегося слова на карточке
    }, 1500);
  }

  //логика смены карточки
  const cardController = data => {
    dataCards = [...data];
    cardBtn.index = 0;

    front.textContent = data[cardBtn.index][0];
    back.textContent = data[cardBtn.index][1];

    cardBtn.addEventListener('click', flipCard);
  }

  const mount = data => {
    app.append(pairs);
    cardController(shuffle(data.pairs));
  }

  const unmount = () => {
    pairs.remove();
    cardBtn.removeEventListener('click', flipCard);
  }

  return { returnBtn, mount, unmount };
}
