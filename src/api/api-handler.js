import { post, get } from './request'
import base from './baseUrl'

import SaleTeamListJson from '../mock/home/saleTeamList/list.json'

const baseUrl = base.url;
const mockData = base.mockData;

export default {
  /**
   * get方法，对应post请求
   * @desc注册请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  getCertificationDetail(data) {
    const api = baseUrl + '/';
    if (mockData) {
      return new Promise((resolve, reject) => { resolve({ "a": "aa" }) });
    }

    return post(api, data);
  },

  /**
   * get方法，对应get请求
   * @desc测试
   */
  getTest(data) {
    const api = `${baseUrl}/?year=${data.year}&month=${data.month}`;
    if (mockData) {
      return new Promise((resolve, reject) => { resolve({ "a": "aa" }) });
    }
    return get(api);
  },

  /**
   * 获取承销方列表数据
   *
   */
  getSaleTeamList() {
    const api = `${baseUrl}/?year=&month=`;
    if (mockData) {
      return new Promise((resolve, reject) => { resolve(SaleTeamListJson) });
    }
    return get(api);
  },
}
