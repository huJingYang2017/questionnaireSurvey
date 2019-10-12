import { post, get } from './request'
import base from './baseUrl'

import surveyTitle from '../mock/Index/surveyTitle.json'
import surveyDetail from '../mock/Detail/surveyDetail.json'

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
     * 获取用户姓名
     * @desc测试
     */
  getUserInfo(token) {
    const api = `${baseUrl}/?token=${token}`;
    if (mockData) {
      const userInfo = {
        "id": "a45w4dasd",
        "username": "北极星",
      }
      return new Promise((resolve, reject) => { resolve(userInfo) });
    }
    return get(api);
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
   * 获取问卷调查列表数据
   *
   */
  getSurveyTitle(userId) {
    const api = `${baseUrl}/?id=${userId}`;
    if (mockData) {
      return new Promise((resolve, reject) => { resolve(surveyTitle) });
    }
    return get(api);
  },
  /**
   * 获取问卷调查详情数据
   *
   */
  getSurveyDetail(id) {
    const api = `${baseUrl}/?id=${id}`;
    if (mockData) {
      return new Promise((resolve, reject) => {
        resolve(surveyDetail.filter((item) => { return item.id === id; })[0])
      });
    }
    return get(api);
  },
}
