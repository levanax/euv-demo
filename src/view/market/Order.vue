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
				<div class="l-value">{{security.sctyName}}</div>
			</div>

			<br/>

	      <b-form-group id="exampleInputGroup3"
	                    label="帐户列表:" label-for="exampleInput3">
	        <b-form-select @input="doAccNumChanged" id="exampleInput3"
	                      :options="accountList" value-field="accNum" text-field="desc" required
	                      v-model="form.accNum"
	        ></b-form-select>
	      </b-form-group>


	      <b-button type="submit" variant="primary">Submit</b-button>
	      <b-button type="reset" variant="secondary">Reset</b-button>
	    </b-form>
	</div>
</template>
<script type="text/javascript">
	import {mapActions } from 'vuex';
	export default{
		name: 'orderView',
		data(){
	      return {
	      	form: {
		    },
		    security: {

		    }
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
	    created(){
	    	// console.debug(this.$route.params);
	        var loginID = this.$store.state.session.loginID;
	    	this.$store.dispatch('account/QUERY_ACCOUNT_LIST', {loginID: loginID}).then(() => {
	    		console.debug('get account list done.');
	    	});
	    	// this.$store.dispatch('market/QUERY_MARKET_CURRENCY');
	    	this.loadMarketCurrency();
	    	this.$store.dispatch('market/QUERY_SECURITY_STATIC_DATA', {
					marketCode: 'HK',
					securityCode: this.$route.params.sctyID
				}).then((data) => {
					this.security = data;
				});
	    },
		methods: {
			...mapActions({
				'loadMarketCurrency':'market/QUERY_MARKET_CURRENCY'
			}),
			onSubmit(evt) {
	          evt.preventDefault();
	          console.debug(JSON.stringify(this.form));
	        },
	        doAccNumChanged: function(value){
	        }
		}
	}
</script>
<style lang='scss'>
.l-form-row{
	/*list-style: none;*/
	.l-label{
		float: left;
		width: 30%;
		overflow: hidden;
	}
	.l-value{
		float: left;
		overflow: hidden;
		width: 70%;
	}
}
</style>