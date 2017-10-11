<template>
	<div class="orderView">
		<b-form @submit="onSubmit">

	      <b-form-group id="exampleInputGroup3"
	                    label="订单类型:" label-for="exampleInput3">
	        <b-form-select id="exampleInput3"
	                      :options="foods" required
	                      v-model="form.food"
	        ></b-form-select>
	      </b-form-group>



	      <b-button type="submit" variant="primary">Submit</b-button>
	      <b-button type="reset" variant="secondary">Reset</b-button>
	    </b-form>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'orderView',
		data(){
	      return {
	      	form: {
		        name: '',
		        food: null
		      },
		      foods: [
		        { text:'Select One', value:null },
		        '1','2','3','4','test00000'
		      ]
	      }
	    },
	    created(){
	    	console.debug(this.$route.params)
	    },
		methods: {
			onSubmit(evt) {
	          evt.preventDefault();
	          // console.debug(JSON.stringify(this.form));
	          
	          var loginID = this.$store.state.loginID;
	          this.$store.dispatch('QUERY_ACCOUNT_LIST', {loginID: loginID}).then(()=>{
	          	
	          })
	        }
		}
	}
</script>
<style lang='scss'>
</style>