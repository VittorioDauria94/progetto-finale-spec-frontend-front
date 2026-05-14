export function debounce(callback, delay) {
  let timer;

  return function (value) {
    clearTimeout(timer);

    timer = setTimeout(function () {
      callback(value);
    }, delay);
  };
}
