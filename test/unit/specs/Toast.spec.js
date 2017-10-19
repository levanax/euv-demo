import Vue from 'vue'
import Toast from '@/components/Toast'

describe('Toast.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Toast)
    let propsData = {
    	dismissCountDown: 3,
    	variant: 'info',
    	message: 'test msg.'
    };
    const vm = new Constructor({ propsData: propsData }).$mount()
  })
})
