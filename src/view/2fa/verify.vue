<template>
  <div class="twofa-verify-view container">
    <div>
     发送渠道： <el-select size='small' v-model="channelSel" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.text"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button v-on:click="send()" size='mini'>发送验证码</el-button>
    </div>
    <div>
    OTP密码：<el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
import {Config} from '@/commons/config'
import axios from 'axios';

export default {
  name: 'verifyView',
  data() {
    return {
      channelSel: null,
      options: [],
      input:''
    }
  },
  created(){
    let me = this;
    console.log('verify vue created.',this.$store.state.session.loginID);
    let loginID = this.$store.state.session.loginID;
    
    this.$store.dispatch('twoFA/QUERY_OTP_CONTACT', {loginID: loginID}).then(() => {
          let contactMap = this.$store.getters['twoFA/GET_OTP_CONTACT_MAP']();
          me.options = contactMap;
      });
  },
  methods:{
    send: function(){
      if(this.channelSel){
        var me = this;
        let loginID = this.$store.state.session.loginID;
        let channel = this.$store.getters['twoFA/GET_OTP_CONTACT_BY_TYPE_SEQID'](this.channelSel);
        console.log(channel);
        this.$store.dispatch('twoFA/REQESUT_OTP_SERVER', {
          loginID: loginID,
          module: 'Login',
          otpType: this.channelSel.split(',')[0],
          channel: channel,
          langCode: 'EN'
          }).then(() => {
            console.log(this.$store.state.twoFA.otp)
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.twofa-verify-view {
  padding-top: 1rem;
}
</style>