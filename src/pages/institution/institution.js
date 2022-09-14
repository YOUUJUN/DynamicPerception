import Vue from 'vue'
import App from './Institution.vue'
import store from './store'
import Request from '@/utils/http.js'
//vue2.0 template 链运算符使用 
import {useChain} from "@/utils/index.js"
//扩展date
import '@/utils/global/dateExtend.js'

//添加 websocket
import SocketService from '@/api/socketService'
//触发对于服务器的socket连接
SocketService.Instance.connect();



// import {Container, Scrollbar, Avatar, Card, PageHeader} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// const components = [
//   Container,
//   Scrollbar,
//   Avatar,
//   Card,
//   PageHeader
// ];

// components.forEach((component) => {
//   Vue.use(component);
// })

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);



Vue.config.productionTip = false;

/*---init axios---*/
Vue.prototype.$request = Request;
Vue.prototype.$socket = SocketService.Instance;

Vue.prototype.$bus = new Vue();
Vue.prototype.$useChain = useChain;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
