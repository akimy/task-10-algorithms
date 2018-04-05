/**
 * @class StreetFinder - класс отвечающий за поиск улиц с помощью двух разных алгоритмов
 * O(n^2) - проход по массиву и поиск подстроки
 * амортизированное O(1) или O(log(n)) - взятие значения из хеш-таблицы
*/
class StreetFinder {
  /**
   * Записывает дом-элементы в локальную область видимости класса
   * @param {DOMElement} streetsContainer
   * @param {DOMElement} inputElement
   * @param {DOMElement} hashSwitcher
   * @param {DOMHighResTimeStamp} performance
  */
  constructor(streetsContainer, inputElement, hashSwitcher, performance) {
    this.streetsContainer = streetsContainer;
    this.inputElement = inputElement;
    this.hashSwitcher = hashSwitcher;
    this.performance = performance;
    this.suggestWithHash = this.suggestWithHash.bind(this);
    this.suggestWithoutHash = this.suggestWithoutHash.bind(this);
  }

  /**
   * Навешиваем обработчики событий на элементы
  */
  init() {
    this.hashSwitcher.addEventListener('change', (e) => {
      this.hashEnabled = e.target.checked;
    });

    this.inputElement.addEventListener('input', (e) => {
      const { target: { value } } = e;
      const streets = this.suggest(value);
      this.render(streets);
    });

    document.querySelector('.container').addEventListener('keydown', (e) => {
      this.inputElement.focus();
      e.stopPropagation();
    });
  }

  /**
   * Публичный метод для установки данных о именах улицах в класс
   * @param {Array} streets
  */
  setStreets(streets) {
    this.data = streets;
  }

  /**
   * Публичный метод для установки хеш-таблицы в класс
   * @param {Object} hash
  */
  setHash(hash) {
    this.hash = hash;
  }

  /**
   * Возвращает первую букву в upperCase и подкрашивает подстроку input
   * @param {String} string
   * @param {String} input
  */
  restoreAndColoring(string, input) {
    const restored = this.restoreUpperCase(string);
    const regexp = new RegExp(input, 'i');
    if (string.indexOf(input) === 0) {
      return restored.replace(
        regexp,
        `<span class="list__item_coloring">${this.restoreUpperCase(input)}</span>`,
      );
    }
    return restored.replace(regexp, `<span class="list__item_coloring">${input}</span>`);
  }

  /**
   * Возвращает первую буквы строки в upperCase
   * @param {String} string
   * @returns string
  */
  restoreUpperCase(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }

  /**
   * Обрабатывает входящую строку из инпут-элемента
   * @param {String} input
   * @return {String}
  */
  processInput(input) {
    return input.toLowerCase().replace('ё', 'е');
  }

  /**
   * Максимально быстро очищает список улиц
  */
  clearContainer() {
    const { streetsContainer } = this;
    while (streetsContainer.lastChild) {
      streetsContainer.removeChild(streetsContainer.lastChild);
    }
  }

  /**
   * Изменяет DOM - рендерит названия улиц на странице
   * @param {Array} streets
  */
  render(streets) {
    const { streetsContainer } = this;
    this.clearContainer();

    streets.forEach((street) => {
      const el = document.createElement('span');
      el.innerHTML = street;
      el.classList.add('list__item');
      streetsContainer.appendChild(el);
    });
  }

  /**
   * Адаптер для выбора одного из двух методов саджеста
   * @param {String} input
   * @return {Array} - предложенный список олиц
  */
  suggest(input) {
    if (this.hashEnabled) {
      return this.suggestWithHash(input);
    }
    return this.suggestWithoutHash(input);
  }

  /**
   * Алгоритм для саджеста использующий заранее подготовленный хеш для выбора улиц
   * @param {String} input - строка для поиска дострок
   * @return {Array} - предложенный список олиц
  */
  suggestWithHash(input) {
    const start = this.performance.run.now();
    if (input === '') {
      return [];
    }

    input = this.processInput(input);
    let list = this.hash.get(input);
    if (typeof list !== 'undefined') {
      list = list.map(el => this.restoreAndColoring(el, input));
    }

    const end = this.performance.run.now();
    this.performance.el.innerHTML = `${String(end - start).slice(0, 6)} ms`;
    return typeof list === 'undefined' ? ['Улица не найдена'] : list;
  }

  /**
   * Алгоритм для саджеста использующий перебор массива и проверку наличия подстроки
   * @param {String} input - строка для поиска дострок
   * @return {Array} - предложенный список олиц
  */
  suggestWithoutHash(input) {
    const start = this.performance.run.now();
    const [{ data }, list] = [this, []];
    if (input === '') {
      return [];
    }

    input = this.processInput(input);

    let [count, i] = [data.length, 0];
    while (count--) {
      if (list.length === 10) {
        break;
      }

      if (data[i].includes(input)) {
        list.push(this.restoreAndColoring(data[i], input));
      }
      i += 1;
    }

    const end = this.performance.run.now();
    this.performance.el.innerHTML = `${String(end - start).slice(0, 6)} ms`;
    return list.length === 0 ? ['Улица не найдена'] : list;
  }
}

export default StreetFinder;

