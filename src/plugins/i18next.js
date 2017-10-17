import Vue from 'vue'
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';

import lang_en from '../locales/en.json';
import lang_zh_cn from '../locales/zh-CN.json';
import lang_zh_tw from '../locales/zh-TW.json';


Vue.use(VueI18Next);
i18next.init({
  lng: 'zh-TW',
  debug: true,
  resources: {
  	'en': {
      translation: lang_en
    },
    'zh-CN': {
      translation: lang_zh_cn
    },
    'zh-TW': {
      translation: lang_zh_tw
    }
  }
}, function(err, t) {
  // initialized and ready to go!
});
export default new VueI18Next(i18next);
