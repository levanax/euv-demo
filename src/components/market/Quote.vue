<template>
	<div class="quoteComponent">

		<div class="input-group">
	      <input maxlength="5" onfocus="javascript:this.select();" v-model="securityCode" @change="formatSecurityCode($event.target.value, $event)"  type="text" class="form-control" placeholder="" >
	      <span class="input-group-btn">
	        <button v-on:click="search()" class="btn btn-secondary" type="button">Search</button>
	      </span>
        </div>

		<table class="quoteTable">
        	<tr>
        		<th>代码</th>
        		<td>{{ security.sctyID }}</td>
        		<th>股票名称</th>
        		<td colspan="2">&nbsp;{{security.sctyName}}</td>
        		<td colspan="3">
        			<b-button size="sm" v-show="showBuyBtn && isNotEmpty(security.sctyID)" v-on:click="buy()" variant="success">Buy</b-button>
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
import * as Const from '@/commons/Const';

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
		isNotEmpty:isNotEmpty,
		initCmp: function(){
			var authorization = this.$store.state.session.authorization;
			let socket = socketManager.install({
				authorization: authorization,
				brokerID: 'MR'
			});
			if(!socket.connected){
				this.$parent.$emit(Const.EMIT_EVENT.TOAST,Const.ALERT.INFO, 'quote报价服务器正在连接...');
				socket.on('connect', () => {
					this.$parent.$emit(Const.EMIT_EVENT.TOAST, Const.ALERT.INFO, 'quote报价服务器成功连接。');
				});
				socket.on('disconnect', () => {
					this.$parent.$emit(Const.EMIT_EVENT.TOAST, Const.ALERT.DANGER, '报价服务器断开连接!');
				});
				socket.connect();
			}

			socketManager.addResponseListener( (data) => {

				if(parseInt(data.SctyID, 10) === parseInt(this.security.sctyID)){
					this.securityQuoteInfo = data;
				}
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

			this.$store.dispatch('market/QUERY_SECURITY_STATIC_DATA', {
				marketCode: 'HK',
				securityCode: securityCode
			}).then((data) => {
				let res = this.$store.getters['market/GET_SECURITY']('HK', securityCode);
				this.security = res;

				socketManager.subscribe({
					mktCode: 'HK',
					sctyID: securityCode
				});
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
			let sctyID = this.security.sctyID;
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
.quoteTable {
	line-height: 3em;
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