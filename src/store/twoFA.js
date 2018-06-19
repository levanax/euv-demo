import Vue from 'vue';
import * as twoFAApi from '@/api/twoFA.js';
import {CONTACT_TYPE} from '@/commons/Const.js';

export default{
  namespaced: true,
  state: {
    otpContactArray: null,
    otp: null
  },
  actions: {
    'QUERY_OTP_CONTACT': async ({commit, state}, {loginID}) => {
			let response = await twoFAApi.queryAbleContact(loginID);
			let data = response.data;
      console.log(data)
			if(!data.error && !data.sysCode){
            commit('SET_OTP_CONTACT', {data: data.otpContactProfile});
		      	return data.otpContactProfile;
		    }else{
		    	throw new Error('QUERY_OTP_CONTACT ERROR');
		    }
    },
    'REQESUT_OTP_SERVER': async ({commit, state}, {loginID,module, otpType, channel, langCode}) => {
      let response = await twoFAApi.requestOTPService(loginID,module, otpType, channel, langCode);
			let data = response.data;
      console.log(data)
			if(!data.error && !data.sysCode){
            commit('SET_OTP', {data: data});
		      	return data;
		    }else{
		    	throw new Error('QUERY_OTP_CONTACT ERROR');
		    }
    }
  },
  mutations: {
    'SET_OTP_CONTACT': (state, {data}) => {
      console.log(data)
      state.otpContactArray = data;
    },
    'SET_OTP': (state, {data}) => {
      state.otp = data;
    }
  },
  getters: {
    'GET_OTP_CONTACT_MAP': (state) => 
      ()=> {
        let otpContactArray = state.otpContactArray;
        let result = [];
        let eList = otpContactArray.emailList;
        for(var i = 0; i< eList.length; i++){
          result.push({
            value: CONTACT_TYPE.EMAIL+ ','+eList[i].seqID,
            text: eList[i].email
          })
        }

        let pList = otpContactArray.phoneList;
        for(var i = 0; i< pList.length; i++){
          result.push({
            value: CONTACT_TYPE.SMS+ ','+ pList[i].seqID,
            text: pList[i].countryCode+ ' '+pList[i].areaCode+' '+ pList[i].phone
          })
        }

        return result;
      },
      'GET_OTP_CONTACT_BY_TYPE_SEQID': (state) => 
      (typeAndSeqID) => {
        let result = '';
        let temp = typeAndSeqID.split(',');
        let otpContactArray = state.otpContactArray;
        if(temp[0] === CONTACT_TYPE.EMAIL){
          let eList = otpContactArray.emailList;
          for(var i = 0; i< eList.length; i++){
            if(eList[i].seqID === temp[1]){
              result = eList[i].email;
              break;
            }
          }
          return result;
        }else{
          throw new Error('no support sms channel.');
        }
      }
  }
}