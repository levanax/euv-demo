<template>
  <b-container fluid>
    <div id="app">
      <toast :dismissCountDown="toastDismissCountDown" :variant="toastVariant" :message="toastMessage"/>
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
import toast from '@/components/Toast.vue';
import * as Const from '@/commons/Const';

export default {
  name: 'app',
  data(){
    return {
      toastDismissCountDown: 0,
      toastVariant: '',
      toastMessage: ''
    }
  },
  components:{
    toast
  },
  created(){
    this.$on(Const.EMIT_EVENT.TOAST, (type, message) => {
      this.toastVariant = type;
      this.toastMessage = message;
      this.toastDismissCountDown = 3;
    });
  }
}
</script>

<style>
app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
