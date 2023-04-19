import { createElement } from "../helper/createElement.js";

const TITLE = 'Введите название категории';
//создание таблицы с парами
export const createEditCategory = (app) => {

  const editCategory = createElement('section', {
    className: 'edit section-offset',
  });

  const container = createElement('div', {
    className: 'container edit__container',
  });

  const title = createElement('h2', {
    className: 'edit__title',
    contentEditable: true,
    title: 'Можно редактировать',
  });

  const table = createElement('table', {
    className: 'edit__table table',
  });

  const thead = createElement('thead');
  const trThead = createElement('tr');

  const tableHeadCellOne = createElement('th', {
    className: 'table__cell',
    textContent: 'main',
  });

  const tableHeadCellTwo = createElement('th', {
    className: 'table__cell',
    textContent: 'second',
  });

  const tableHeadCellThree = createElement('th', {
    className: 'table__cell',
  });

  const tbody = createElement('tbody');

  const wrapperBtn = createElement('div', {
    className: 'edit__btn-wrapper',
  });

  const addRowBtn = createElement('button', {
    className: 'edit__btn edit__add-row',
    textContent: 'Добавить пару',
  });

  const saveBtn = createElement('button', {
    className: 'edit__btn edit__save',
    textContent: 'Сохранить',
  });

  const cancelBtn = createElement('button', {
    className: 'edit__btn edit__cancel',
    textContent: 'Отмена',
  });

  editCategory.append(container);
  table.append(thead, tbody);
  thead.append(trThead);
  trThead.append(tableHeadCellOne, tableHeadCellTwo, tableHeadCellThree)
  wrapperBtn.append(addRowBtn, saveBtn, cancelBtn);
  container.append(title, table, wrapperBtn);

  const createTRCell = (dataArr) => {
    const tr = createElement('tr');

    const tableCellOne = createElement('th', {
      className: 'table__cell table__cell_one',
      textContent: dataArr[0],
      contentEditable: true,
    });

    const tableCellTwo = createElement('th', {
      className: 'table__cell table__cell_two',
      textContent: dataArr[1],
      contentEditable: true,
    });

    const tableCellThree = createElement('th', {
      className: 'table__cell',
    });

    const delRow = createElement('button', {
      className: 'table__del',
      textContent: 'x',
    });

    delRow.addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите удалить строку?')) {
        tr.remove();
      }
    });

    tableCellThree.append(delRow);

    tr.append(tableCellOne, tableCellTwo, tableCellThree);

    return tr;
  }

  const clearTitle = () => {
    if (title.textContent === TITLE) {
      title.textContent = '';
    }
  }

  const checkTitle = () => {
    if (title.textContent === '') {
      title.textContent = TITLE;
    }
  }

  title.addEventListener('focus', clearTitle);
  title.addEventListener('blur', checkTitle);

  addRowBtn.addEventListener('click', () => {
    const emptyRow = createTRCell(['', '']);

    tbody.append(emptyRow);
  });


  //в моунте открисовываем название категории и заполняем таблицу парами,
  // которые подгружаются, когда мы вызываем это в script
  const mount = (data = { title: TITLE, pairs: [] }) => {
    tbody.textContent = '';
    title.textContent = data.title;

    if (title.textContent === TITLE) {
      title.classList.add('edit__title_change');
    } else {
      title.classList.remove('edit__title_change');
    }

    const rows = data.pairs.map(createTRCell);
    const emptyRow = createTRCell(['', '']);

    tbody.append(...rows, emptyRow);

    app.append(editCategory);
  }

  const unmount = () => {
    editCategory.remove();
  }

  return { mount, unmount };
}