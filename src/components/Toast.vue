<template>
	<div class="toastCmp">
		<b-alert :variant="variant" :show="dismissCountDown" @dismissed="dismissCountdown=0">{{message}}</b-alert>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'toastCmp',
		data(){
			return {
			}
		},
		props:{
			dismissCountDown:{
				type: Number,
				default: 0
			},
			variant:{
				type: String,
				default: 'info'
			},
			message: {
				type: String,
				default: 'no message.'
			}
		}
	}
</script>
<style lang='scss'>
	
</style>