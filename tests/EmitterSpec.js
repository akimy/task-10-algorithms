import { expect } from 'chai';
import Emitter from '../emitter/Emitter';

class Mock {
  constructor(value) {
    this.value = value;
  }

  set(value) {
    this.value = value;
  }

  get() {
    return this.value;
  }
}

describe('Emitter - class', () => {
  let emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  describe('Метод on', () => {
    it('Создает запись о событии и массив хендлеров', () => {
      const expected = true;
      const someFunction = () => {};
      emitter.on('event', someFunction);
      const isRegisterEvent = emitter.events.has('event');
      const isRegisterHandler = emitter.events.get('event').has('someFunction');
      const isRegister = isRegisterEvent && isRegisterHandler;

      expect(isRegister).to.equal(expected);
    });
  });

  describe('Метод emit', () => {
    it('Запускает подписанное событие которое триггерит все хендлеры', () => {
      const expected = ['unchanged', 'changed'];
      const mock = new Mock('unchanged');
      const someFunction = () => mock.set('changed');

      emitter.on('event', someFunction);
      const before = mock.get();
      emitter.emit('event');
      const after = mock.get();

      expect([before, after]).to.deep.equal(expected);
    });
  });

  describe('Метод off', () => {
    it('Отписывает хендлеры от события', () => {
      // Подготовка
      const expected = false;
      const someFunction = () => {};

      // Подписываем хендлер
      emitter.on('event', someFunction);

      // Проверяем что someFunction подписан на событие и отписываем его если так
      const isRegisterEvent = emitter.events.has('event');
      let isRegisterHandler = emitter.events.get('event').has('someFunction');
      const isRegister = isRegisterEvent && isRegisterHandler;

      if (isRegister) {
        emitter.off('event', someFunction);
      }

      // Проверяем есть ли подписанные хендлеры на событие event теперь
      isRegisterHandler = emitter.events.get('event').has('someFunction');

      // false === false
      expect(isRegisterHandler).to.equal(expected);
    });
  });
});

