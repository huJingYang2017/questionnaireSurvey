import axios from './intercept'

/**
 * post方法，对应post请求
 * @desc注册请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(api, data) {
  return new Promise((resolve, reject) => {
    axios.post(api, data).then(function (response) {
      resolve(response.data);
    }).catch(function (err) { reject(err) });
  });
}

/**
 * get方法，对应get请求
 * @desc测试
 */
export function get(api) {
  return new Promise((resolve, reject) => {
    axios.get(api).then(function (response) {
      resolve(response.data);
    }).catch(function (err) { reject(err) });
  });
}
