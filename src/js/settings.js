import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm';
export {message, KEY, PERPAGE}
 
const message = {
    success(message) {
        Notiflix.Notify.success(message);
    },
    error(message) {
        Notiflix.Notify.failure(message);
    },
    info(message) {
      Notiflix.Notify.info(message)
  }
}

const KEY = '40858568-c2cbea82fefa532e5a07e25a9'

let PERPAGE = 40;