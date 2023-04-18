import { createCategory } from "./components/createCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCategories } from "./service/apiService.js";

const init = async () => {
  const headerParent = document.querySelector('.header');
  const app = document.querySelector('#app');

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);

  /* функция с логикой для заполнения основного контента */
  const renderIndex = async (e) => {
    e?.preventDefault();

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
    categoryObj.unmount();
    headerObj.updateHeaderTitle('Новая категория');
  });
}

init();