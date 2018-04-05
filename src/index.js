import StreetFinder from './classes/StreetFinder';
import data from './data';

// DOM-элементы
const input = document.querySelector('.search__field');
const streetsContainer = document.querySelector('.search__list');
const hashSwitcher = document.querySelector('.settings__hash-toggle');
const performanceContainer = document.querySelector('.search__perfomance');
const hashSwitcherDescription = document.querySelector('.settings__description');
const errorDialog = document.querySelector('.dialog');
const container = document.querySelector('.container');

// Проверка поддержки SW
if (typeof Worker === 'undefined') {
  errorDialog.classList.remove('dialog_hidden');
  container.classList.add('container_hidden');
}

// Создаем SW
const hashWorker = new Worker('worker.hash.js');
const sanitizeWorker = new Worker('worker.sanitize.js');
sanitizeWorker.postMessage(data);

// Создаем и инициализируем инстанс класса отвечающего за поиск
const finder = new StreetFinder(
  streetsContainer,
  input,
  hashSwitcher,
  { run: window.performance, el: performanceContainer },
);

finder.init();

/**
 * Возвращает валидный и обработанный список улиц запускает воркер отвечающий за создание хеша
 * Загружает в инстанс StreetFinder данные о улицах
 * @param {Object} evt - { data: []} - санитированые данные
 */
sanitizeWorker.onmessage = (evt) => {
  const { data: streets } = evt;
  input.removeAttribute('disabled');
  input.setAttribute('placeholder', 'Начните вводить название улицы');
  hashWorker.postMessage(streets);

  finder.setStreets(streets);
};

/**
 * Загружает в инстанс StreetFinder хеш-таблицу
 * @param {Object} evt - объект содержащий хеш-таблицу с данными
 */
hashWorker.onmessage = (evt) => {
  const { data: hash } = evt;
  hashSwitcher.removeAttribute('disabled');
  hashSwitcher.classList.remove('settings__hash-toggle_disabled');
  hashSwitcherDescription.innerHTML = 'Включить хешмап для поиска';

  finder.setHash(hash);
};
