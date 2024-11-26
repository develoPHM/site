import 'v3-easyui/dist/themes/default/easyui.css';
import 'v3-easyui/dist/themes/icon.css';
import 'v3-easyui/dist/themes/vue.css';
import { createApp } from 'vue';
import App from './App.vue';
import EasyUI from 'v3-easyui';
import store from './store';
import router from './router/index'; // 라우터 가져오기

const app = createApp(App);
app.use(router);
app.use(store);
app.use(EasyUI);
app.mount('#app');
