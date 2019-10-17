// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)


//自定义主题
MuseUI.theme.add('my-theme-blue', {
  primary: '#5276B0',
  secondary: '#5886F6',
  success: '#26D0AA',
  warning: '#ff9300'
}, 'light').use('my-theme-blue')

Vue.use(MuseUI);

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
