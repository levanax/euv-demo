<template>
	<div class="quoteComponent">

		<div class="input-group">
	      <input v-model="securityCode" @change="formatSecurityCode($event.target.value, $event)"  type="text" class="form-control" placeholder="" >
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
        			{{security.sctyName}}&nbsp;
        			<b-button size="sm" v-show="showBuyBtn" v-on:click="buy()" variant="success">Buy</b-button>
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
	</div>
</template>

<script type="text/javascript">
import * as socketManager from '@/service/socketManager';
import {isNotEmpty, formatSecurityCode} from '@/utils/util';

export default {
	name: 'quoteComponent',
	data(){
		return {
			securityCode:'',
			securityQuoteInfo: {},
			security:{}
		}
	},
	// props: ['showBuyBtn'],
	props:{
		showBuyBtn: {
			type: Boolean,
			default: false
		}
	},
	// serverCacheKey: props => props.showBuyBtn,
	watch: {
		securityCode(newVal, oldVal){
			// console.debug('in securityCode()...', arguments);
		}
	},
	created: function(){
		this.initCmp();
	},
	methods: {
		initCmp: function(){
			var authorization = this.$store.state.session.authorization;
			socketManager.install({
				authorization: authorization,
				brokerID: 'MR'
			});
			socketManager.addResponseListener( (data) => {
				this.securityQuoteInfo = data;
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
				let res = this.$store.getters['market/GET_SECURITY']('HK', securityCode);
				this.security = res;
			});
		},
		formatSecurityCode: function(value, event){
			let securityCode = value.trim().replace(/[^0-9 ]/g, '');
			if(isNotEmpty(securityCode) && parseInt(securityCode, 10) >0){
				this.securityCode = formatSecurityCode('HK', securityCode);
			}else{
				this.securityCode = '';
			}
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

<style lang='scss'>
	
</style>