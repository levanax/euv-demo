<template>
	<div class="orderView">
		<b-form @submit="onSubmit">

			<div class="l-form-row">
				<div class="l-label">市場</div>
				<div class="l-value">{{this.$route.params.market}}</div>
			</div>

			<div class="l-form-row">
				<div class="l-label">股票代碼</div>
				<div class="l-value">{{this.$route.params.sctyID}}</div>
			</div>


			<div class="l-form-row">
				<div class="l-label">股票名</div>
				<div class="l-value">{{security.sctyName}}&nbsp;</div>
			</div>

		<div>
	      <b-form-group  label="帐户列表:" label-for="accNum">

	        <b-form-select @input="doAccNumChanged" id="accNum"
	                      :options="accountList" value-field="accNum" text-field="desc" required
	                      v-model="form.accNum"
	        ></b-form-select>

	      </b-form-group>

	      <b-form-group label="价格:" label-for="price">
	        <b-form-input id='price' v-model="form.price" type="text" placeholder="Price"></b-form-input>
	      </b-form-group>


	      <b-form-group label="数量:" label-for="quantity">
	        <b-form-input id='quantity' v-model="form.quantity" type="text" placeholder="quantity"></b-form-input>
	      </b-form-group>


	      <b-button type="submit" variant="primary">Submit</b-button>
	      <b-button type="reset" variant="secondary">Reset</b-button>
	    </div>
	    </b-form>
	</div>
</template>
<script type="text/javascript">
	import {mapActions } from 'vuex';
	export default{
		name: 'orderView',
		data(){
	      return {
	      	selected:null,
	      	form: {
	      		accNum: '',
	      		price: ''
		    },
		    security: {}
	      }
	    },
	    computed:{
	    	accountList(){
	    		if(this.$store.state.account.accountList.length >0 ){
	    			this.form.accNum = this.$store.state.account.accountList[0].accNum;
	    		}
	    		return this.$store.state.account.accountList;
	    	}
	    },
	    components:[
	    	'bButton'
	    ],
	    watch: {
	    	form: function(val , a){
	    		console.log(val, a);
	    	}
	    },
	    created(){
	    	// console.debug(this.$route.params);
	        var loginID = this.$store.state.session.loginID;
	    	this.$store.dispatch('account/QUERY_ACCOUNT_LIST', {loginID: loginID}).then(() => {
	    		// console.debug('get account list done.');
		    	
	    	});
	    	// this.$store.dispatch('market/QUERY_MARKET_CURRENCY');
	    	this.loadMarketCurrency().then((data) => {
	    		// console.debug(data);
	    	});
	    	this.$store.dispatch('market/QUERY_SECURITY_STATIC_DATA', {
					marketCode: 'HK',
					securityCode: this.$route.params.sctyID
				}).then((data) => {
					this.security = data;
				});
			this.loadProductLines({langCode: 'en'}).then((data) => {
				// console.debug(data);
			})
	    },
		methods: {
			...mapActions({
				'loadMarketCurrency':'market/QUERY_MARKET_CURRENCY',
				'loadProductLines':'market/QUERY_MARKET_PRODUCT_LINES',
				'loadAccountProductLines':'account/QUERY_ACCOUNT_PRODUCT_LINES'
			}),
			onSubmit(evt) {
	          evt.preventDefault();
	          console.debug(JSON.stringify(this.form));
	        },
	        doAccNumChanged: function(value){
	        	this.loadAccountProductLines({accNum: value}).then((data) => {
					// console.debug(data);
				})
	        }
		}
	}
</script>
<style lang='scss'>
.l-form-row{
	display: -webkit-box;
	line-height: 2.2em;

	.l-label{
		-webkit-box-flex:1;
		overflow: hidden;
	}
	.l-value{
		-webkit-box-flex:1;
		overflow: hidden;
	}
}
</style>