https://github.com/mzabriskie/axios
- cnpm install axios --save

https://bootstrap-vue.js.org/docs/
- -cnpm install jquery --save
- -cnpm install popper.js --dev--save
- cnpm i bootstrap-vue --save

https://github.com/socketio/socket.io-client
- cnpm install socket.io --save

##### language plugin:
> https://github.com/panter/vue-i18next
1) step1: cnpm install i18next --save
2) step2: cnpm install @panter/vue-i18next --save
3) step3: cnpm install i18next-browser-languagedetector --save


cnpm install node-sass --save-dev
cnpm install sass-loader --save-dev

cnpm install --save vuex


<!-- npm install --save-dev babel-polyfill -->
npm install es6-promise --save-dev

#### Karam:
npm install sinon -dev



#### bug
1.  Error: [vuex] vuex requires a Promise polyfill in this browser.
  at webpack:///node_modules/._vuex@3.0.0@vuex/dist/vuex.esm.js:97:0 <- index.js:21591 https://github.com/vuejs-templates/webpack/issues/474

在karma.conf.js 更改, 
```
files: ['../../node_modules/es6-promise/dist/es6-promise.auto.js', './index.js'],
```
