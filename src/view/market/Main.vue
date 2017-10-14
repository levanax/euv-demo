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

        <Quote :showBuyBtn='true'></Quote>
    </div>
</template>
<script type="text/javascript">
	import * as socketManager from '@/service/socketManager';
	import * as Const from '@/commons/Const';

	import Quote from '@/components/market/Quote.vue';

	export default {
		name:'mainView',
		created(){
			this.initView();
		},
		computed:{
		},
		components:{ Quote },
		data(){
			return {
				indexs:[],
				securityQuoteInfo: {},
			}
		},
		methods: {
			initView: function(){
				var me = this;
				var authorization = this.$store.state.session.authorization;
				let socket = socketManager.install({
					authorization: authorization,
					brokerID: 'MR'
				});

				if(!socket.connected){
					this.$parent.$emit(Const.EMIT_EVENT.TOAST,Const.ALERT.INFO, '报价服务器正在连接...');
					socket.on('connect', () => {
						this.$parent.$emit(Const.EMIT_EVENT.TOAST, Const.ALERT.INFO, '报价服务器成功连接。');
					});
					socket.on('disconnect', () => {
						this.$parent.$emit(Const.EMIT_EVENT.TOAST, Const.ALERT.DANGER, '报价服务器断开连接!');
					});
					socket.connect();
				}

				socketManager.addIndexResponseListener(function(data){
					// console.log(data);
					me.indexs = data.Index;
				});
				socketManager.subscribeIndex();
			}
		}
	}
</script>

<style lang="scss">

.red{
	color:red;
}
.green{
	color:green;
}
</style>