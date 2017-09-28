<template>
	<div class="mainView">
		<div class="input-group">
	      <input v-model="securityCode" type="text" class="form-control" placeholder="Search for..." aria-label="Search for...">
	      <span class="input-group-btn">
	        <button v-on:click="search()" class="btn btn-secondary" type="button">Search</button>
	      </span>
      </div>

      <table class="table">
	  <thead class="thead-inverse">
	    <tr>
	      <th>#</th>
	      <th></th>
	      <th>Bid</th>
	      <th>Ask</th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <th scope="row">11</th>
	      <td></td>
	      <td></td>
	      <td></td>
	    </tr>
	    <tr>
	      <th scope="row">2</th>
	      <td></td>
	      <td></td>
	      <td></td>
	    </tr>
	    <tr>
	      <th scope="row">3</th>
	      <td></td>
	      <td></td>
	      <td></td>
	    </tr>
	  </tbody>
	</table>
    </div>
</template>
<script type="text/javascript">
	import router from '@/router/Router';
	import * as socketManager from '@/service/socketManager';

	export default {
		name:'mainView',
		beforeCreate(){
			// console.log(this)
         	// router.push('/login');
		},
		data(){
			return {
				securityCode:''
			}
		},
		methods: {
			search: function() {
				let securityCode = this.securityCode;
				socketManager.init();
			}
		}
	}
</script>