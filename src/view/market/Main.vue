<template>
	<div class="mainView">

        <table class="table">
		  <thead class="thead-inverse">
		    <tr>
		      <th>Code</th>
		      <th>Value</th>
		      <th>change</th>
		      <th> </th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr v-for="index in indexs" v-show="index.Val !== 0">
		      <th>{{index.Code}}</th>
		      <td>{{index.Val}}</td>
		      <td v-bind:class='{red:index.Chg>0, green:index.Chg<0}'>{{index.Chg>0?'+'+index.Chg:index.Chg}}</td>
		      <td><!-- {{index.Chg/index.Val}} --></td>
		    </tr>
		  </tbody>
		</table>

		<div class="input-group">
	      <input v-model="securityCode" type="text" class="form-control" placeholder="" >
	      <span class="input-group-btn">
	        <button v-on:click="search()" class="btn btn-secondary" type="button">Search</button>
	      </span>
        </div>

        <table class="quoteTable">
        	<tr>
        		<th>code</th>
        		<td>{{securityQuoteInfo.SctyID}}</td>
        		<th>name</th>
        		<td colspan="5">
        			<b-button size="sm" v-on:click="buy()" variant="success">Buy</b-button>
        		</td>
        	</tr>
        	<tr>
        		<th>现价</th>
        		<td>{{securityQuoteInfo.Nom}}</td>
        		<th>涨/跌幅</th>
        		<td  v-bind:class='{red:securityQuoteInfo.Chg>0, green:securityQuoteInfo.Chg<0}'>{{securityQuoteInfo.Chg>0?'+'+securityQuoteInfo.Chg:securityQuoteInfo.Chg}}</td>
        		<th>最高价</th>
        		<td>{{securityQuoteInfo.Hi}}</td>
        		<th>最低价</th>
        		<td>{{securityQuoteInfo.Lo}}</td>
        	</tr>
        </table>
        {{security}}
    </div>
</template>
<script type="text/javascript">
	import * as socketManager from '@/service/socketManager';
	import { mapState, mapGetters } from 'vuex';

	export default {
		name:'mainView',
		props:{
			test: {
				type: Boolean,
				default: false
			}
		},
		created(){
			this.initView();
		},
		computed:{
			...mapState({
				security: state => {
					let result = '';
					console.debug('hi  see me',this.securityQuoteInfo);
					if(this.securityQuoteInfo){
						let key = this.securityQuoteInfo.mktCode + this.securityQuoteInfo.sctyID;
						console.log(key);
						if(state.market.securityMap.has(key)){
							result = state.market.securityMap.get(key);
						}
					}
					return result;
				}
			})
		},
		components:{
		},
		data(){
			return {
				securityCode:'',
				indexs:[],
				securityQuoteInfo: {}
			}
		},
		methods: {
			initView: function(){
				var me = this;
				var authorization = this.$store.state.session.authorization;
				socketManager.install({
					authorization: authorization,
					brokerID: 'MR'
				});
				socketManager.addIndexResponseListener(function(data){
					// console.log(data);
					me.indexs = data.Index;
				});
				socketManager.subscribeIndex();


				socketManager.addResponseListener(function(data){
					// console.log(data);
					me.securityQuoteInfo = data;
				});

			},
			search: function() {
				let securityCode = this.securityCode;
				// this.$parent.$emit('test','this is msg.');
				// let test1 = function(v){
				// 	return v;
				// }
				// let test2 = {...test1([1,2,3,4,5]), 0:'asdfasdf'};
				// console.log(test2);
				socketManager.subscribe({
					mktCode: 'HK',
					sctyID: securityCode
				});
				this.$store.dispatch('market/QUERY_SECURITY_STATIC_DATA', {
					marketCode: 'HK',
					securityCode: securityCode
				}).then((data) => {
					console.debug(data);
				});
			},
			buy: function(){
				let market = 'HK';
				let sctyID = this.securityQuoteInfo.SctyID;
				if(sctyID){
					let url = [
							'order',
							market,
							sctyID,
							'buy'
						].join('/');
	          		this.$router.push(url);
				}

			}
		}
	}
</script>

<style lang="scss">
.quoteTable {
	th {
		font-weight:normal;
		min-width: 4em;
	}
	td{
		min-width: 5em;
		text-align:left;
	}
}
.red{
	color:red;
}
.green{
	color:green;
}
</style>