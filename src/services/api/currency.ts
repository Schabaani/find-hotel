const baseURL = 'https://api.exchangerate.host/';
type TBase = 'USD' | 'EUR';

const fetchCurrencyRate = (base: TBase) => {
  return fetch(`${baseURL}latest?base=${base}`);
};

export {fetchCurrencyRate};
