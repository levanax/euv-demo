import Vue from 'vue'
import UserLogin from '@/view/user/Login'
import  i18n from '@/plugins/i18next'

describe('UserLogin.vue', () => {
  it('should can login success', () => {
    const Constructor = Vue.extend(UserLogin);
    const userLoginView = new Constructor({i18n}).$mount();

    userLoginView.loginID = '2trade140';
    userLoginView.password = '12345678';
    const LoginBtn = userLoginView.$el.querySelector('h2');

    const clickEvent = new window.Event('click');
    LoginBtn.dispatchEvent(clickEvent);
    userLoginView._watcher.run();
  })
})
