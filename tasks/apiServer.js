import _apiServer from '../src/mock/apiServer';

export function apiServer(callback) {
  _apiServer(() => {
    callback();
  });
}
