import { createApp } from 'vue';
import App from './App.vue';
import 'reset-css';
// 通用字体
import 'vfonts/Lato.css';
import './styles/global.scss';
import 'remixicon/fonts/remixicon.css';

const app = createApp(App);
app.mount('#app');

// 百度统计
// eslint-disable-next-line no-var
var _hmt: any = _hmt || [];
window._hmt = _hmt;

const hm = document.createElement('script');
hm.src = 'https://hm.baidu.com/hm.js?9c784bea1a68c1542aea5820b2b9f40f';
const s = document.getElementsByTagName('script')[0];
s.parentNode?.insertBefore(hm, s);
