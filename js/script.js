import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/apiService.js";

const init = async () => {
  const headerParent = document.querySelector('.header');
  const app = document.querySelector('#app');

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);
  const pairsObj = createPairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
  }

  const postHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchCreateCategory(data);

    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Новая категория ${data.title} была добавлена.`);
    allSectionUnmount();

    headerObj.updateHeaderTitle('Категория');
    categoryObj.mount(dataCategories);
  }

  const patchHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(editCategoryObj.saveBtn.dataset.id, data);

    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Категория ${data.title} обновлена.`);
    allSectionUnmount();

    headerObj.updateHeaderTitle('Категория');
    categoryObj.mount(dataCategories);
  }


  /* функция с логикой для заполнения основного контента */
  const renderIndex = async (e) => {
    e?.preventDefault();
    allSectionUnmount();

    headerObj.updateHeaderTitle('Категории');

    /* получаем список категорий, если всё хорошо, то отрисовываем их
    если нет, то выводим сообщение. */
    const categories = await fetchCategories();
    if (categories.error) {
      app.append(createElement('p', {
        className: 'server-error',
        textContent: 'Ошибка сервера, попробуйте зайти позже',
      }));
      return;
    }

    categoryObj.mount(categories);
  }

  renderIndex();

  headerObj.headerLogoLink.addEventListener('click', renderIndex);

  headerObj.headerBtn.addEventListener('click', () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle('Новая категория');
    editCategoryObj.mount();
    editCategoryObj.saveBtn.addEventListener('click', postHandler);
    editCategoryObj.saveBtn.removeEventListener('click', patchHandler);
  });

  categoryObj.categoryList.addEventListener('click', async ({ target }) => {
    const categoryItem = target.closest('.category__item');

    if (target.closest('.category__edit')) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle('Редактирование');
      editCategoryObj.mount(dataCards);
      editCategoryObj.saveBtn.addEventListener('click', patchHandler);
      editCategoryObj.saveBtn.removeEventListener('click', postHandler);
      return;
    }

    if (target.closest('.category__del')) {
      if (confirm('Вы уверены, что хотите удалить категорию?')) {
        const result = fetchDeleteCategory(categoryItem.dataset.id);

        if (result.error) {
          showAlert(result.error.message);
          return;
        }

        showAlert('Категория удалена!');
        categoryItem.remove();
      }

      return;
    }

    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle(dataCards.title);
      pairsObj.mount(dataCards);
    }
  });

  pairsObj.returnBtn.addEventListener('click', renderIndex);

  editCategoryObj.cancelBtn.addEventListener('click', () => {
    if (confirm('Вернуться на главную без изменений?')) {
      renderIndex();
    }
  });
}

init();