User
<template>
  <div class="Forms" v-for="links in data" :key="links.id">
      <TransactionVue v-if="links.id===render"/>
      <Dispatch_dtlsVue v-else-if="render===links.id"/>
      <Seller_Buyer uniqueid="data"/>
  </div>
</template>
<script>
import { ref } from 'vue';
import Dispatch_dtlsVue from './Forms/Dispatch_dtls.vue';
import TransactionVue from "./Forms/Transaction.vue";
import Seller_Buyer from "./Forms/Seller_Buyer.vue";
export default{
    components:{TransactionVue,Dispatch_dtlsVue,Seller_Buyer},
    setup(){
        const render=ref(2);
        const data=ref([{id:1},{id:2},{id:3},{id:4}]);
        return{data,render};
    },

}
</script>
<style>
</style>