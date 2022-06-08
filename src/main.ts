import { createApp } from 'vue';
import App from './App.vue';
import 'reset-css';
// 通用字体
import 'vfonts/Lato.css';
import './styles/global.scss';
import 'remixicon/fonts/remixicon.css';

const app = createApp(App);
app.mount('#app');
