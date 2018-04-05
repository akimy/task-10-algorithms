onmessage = (evt) => {
  let { data } = evt;
  data = data.sort().map(el => el.toLowerCase().replace('ё', 'е'));
  data = data
    .concat(data.map(el => `${el} дубль`))
    .concat(data.map(el => `${el} трипл`));
  postMessage(data);
};
