<template>
  <div class="loginView container">

      <form class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Login ID: </label>
        <input v-model="loginID"  type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password"  type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block"  v-on:click="login()" type="submit">Sign in</button>
      </form>
    </div>

</template>

<script>
import {Config} from '@/commons/Config'
import axios from 'axios';
import router from '@/router/Router'

export default {
  name: 'loginView',
  data() {
    return {
    loginID:'2trade141',
    password:'12345678'
    }
  },
  created(){
    console.log('in created() ... ');
  },
  methods:{
    login(){
       var loginID = this.loginID;
       var password = this.password;
       console.log(loginID,password, 'you click btn ..');
       var url = '/clients/'+loginID+'/session';
       axios.request({
        url: url,
        method:'post',
        baseURL: Config.server,
        headers:{
          'BrokerID':'MR',
          'Version':'1.0',
          'uuid':'uuid',
          'Appkey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJHb1RyYWRlIiwidHlwZSI6IkludGVybmFsIiwiYXBwSWQiOiJHb01vYmlsZSIsImFsbG93U2VydmljZSI6WyJDRyIsIlBTRyJdLCJleHBpcmVzSW4iOiIyMDUwMTIzMSJ9.IJjUqqofGgjd7qNG0PCAnX8K7xBTwGoGAyxXbLcMDt8',
          'AppPwd':'abcd1234'
        },
        data:{
          password:password,
          ordChnl:'W'
        }
       }).then(function(response) {
         console.log(response.data);
         // router.push('main');
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