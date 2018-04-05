/**
 * @class HashCreator - отвечает за создание хеш-таблицы для списка улиц
*/
class HashCreator {
  /**
   * @param {Array} data - обработанный список улиц
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Публичный метод для получения данных
   * @returns {Map} - возвращает хеш-таблицу
  */
  getHash() {
    return this.makeHash(this.data);
  }

  /**
   * Создает хеш-таблицу
   * @param {Array} streets - список улиц
   * @returns {Map} - хеш таблица
   */
  makeHash(streets) {
    const hash = new Map();
    let [count, i] = [streets.length, 0];
    while (count--) {
      this.getAllSubstrings(streets[i]).forEach((substring) => {
        const hashValues = hash.get(substring);
        if (!hashValues) {
          hash.set(substring, [streets[i]]);
        } else if (hashValues.length < 10) {
          const streetList = hashValues.concat([streets[i]]);
          hash.set(substring, streetList);
        }
      });
      i += 1;
    }
    return hash;
  }

  /**
   * Разбивает строку на все возможные подстроки
   * @param {String} str - строка
   * @returns {Array} - массив подстрок
   */
  getAllSubstrings(str) {
    const result = [];
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j < str.length + 1; j++) {
        result.push(str.slice(i, j));
      }
    }
    return result;
  }
}

onmessage = (evt) => {
  const { data } = evt;
  const hashCreator = new HashCreator(data);
  const hash = hashCreator.getHash();
  postMessage(hash);
};

