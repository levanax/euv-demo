<template>
  <div class="loginView container">
        <h2 class="form-signin-heading">{{$t('loginView.desc.plzSignIn')}}</h2>
        <label for="inputEmail" class="sr-only">{{ $t('loginView.desc.loginID')}} : </label>
        <input v-model="loginID"  type="text" id="inputEmail" class="form-control" v-bind:placeholder="$t('loginView.desc.loginID')" required autofocus>
        <label for="inputPassword" class="sr-only">{{ $t('loginView.desc.password')}}</label>
        <input v-model="password"  type="password" id="inputPassword" class="form-control" v-bind:placeholder="$t('loginView.desc.password')" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> {{$t('loginView.desc.rememberMe')}}
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block"  v-on:click="login()" type="submit">{{ $t('loginView.button.signIn')}}</button>
    </div>
</template>

<script>
import {Config} from '@/commons/config'
import axios from 'axios';

export default {
  name: 'loginView',
  data() {
    return {
    loginID:'2trade141',
    password:'ZZZzzz222'
    }
  },
  created(){
  },
  methods:{
    login(){
      var me = this;
       var loginID = this.loginID;
       var password = this.password;
       var url = '/clients/'+loginID+'/session';
       axios.request({
        url: url,
        method:'post',
        baseURL: Config.server,
        headers:{
          'BrokerID':'MR',
          'Version':'1.0',
          'uuid':'uuid',
          'Appkey': Config.appkey,
          'AppPwd': Config.appPwd
        },
        data:{
          password:password,
          ordChnl:'W'
        }
       }).then( (response) => {
          let data = response.data;
           if('S' === data.status){
            var authorization = response.headers.authorization;

            this.$store.commit('session/SET_USER_CACHE', {loginID:loginID, authorization:authorization});

            axios.defaults.headers.common['authorization'] = authorization;
            axios.defaults.headers.common['BrokerID'] = 'MR';
            axios.defaults.headers.common['uuid'] = 'uuid';
            
            axios.defaults.headers.common['Appkey'] = Config.appkey;
            axios.defaults.headers.common['AppPwd'] = Config.appPwd;

            this.$router.push('main');
           }else{
             if(data.error && data.error.code === 'E0008'){
               var authorization = response.headers.authorization;
               this.$store.commit('session/SET_USER_CACHE', {loginID:loginID, authorization:authorization});

               axios.defaults.headers.common['BrokerID'] = 'MR';
               axios.defaults.headers.common['uuid'] = 'uuid';
               axios.defaults.headers.common['Appkey'] = Config.appkey;
               axios.defaults.headers.common['AppPwd'] = Config.appPwd;
               axios.defaults.headers.common['authorization'] = authorization;
                              
               this.$router.push('verify');
             }else{
              console.warn('user or password error.');
             }
           }
       });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>