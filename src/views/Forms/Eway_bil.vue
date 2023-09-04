<template>
  <div class="center-container">
    <div class="input-group">
    <form @submit.prevent="submitForm">
      <label class="info">E-way Bill Details</label>
      <label class="input-label">
        <span>Distance:</span>
        <input type="number" v-model="ewbDtls.Distance" required placeholder="Distance" />
      </label>
      <label class="input-label">
        <span>Transid:</span>
        <input type="text" v-model="ewbDtls.Transid" placeholder="Transid" />
      </label>
      <label class="input-label">
        <span>Transname:</span>
        <input type="text" v-model="ewbDtls.Transname" placeholder="Transname" />
      </label>
      <label class="input-label">
        <span>Transdocno:</span>
        <input type="text" v-model="ewbDtls.Transdocno" placeholder="Transdocno" />
      </label>
      <label class="input-label">
        <span>TransdocDt:</span>
        <input type="date" v-model="ewbDtls.TransdocDt" />
      </label>
      <label class="input-label">
        <span>Vehno:</span>
        <input type="text" v-model="ewbDtls.Vehno" placeholder="Vehno" />
      </label>
      <label class="input-label">
        <span>Vehtype:</span>
        <input type="text" v-model="ewbDtls.Vehtype" placeholder="Vehtype" />
      </label>
      <label class="input-label">
        <span>TransMode:</span>
        <select >
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
      <button @click="pushfinale">Load Datas</button>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import itemlisterpart from '@/JsonContainer/itemlist.json';
import {DateExchange} from "@/Functions/DefaultStructure";
export default {
  props:{'itemlist':Object},
  setup(props,{emit}){
    const ewbDtls=ref(itemlisterpart.empty.EwbDtls);
    const fulllist=ref();
    const loader=async ()=>{
      await props.itemlist;
    }
    onMounted(async ()=>{
      await loader();
      fulllist.value=await props.itemlist;
    })
    const submitForm=async ()=>{
      ewbDtls.value.Distance=await Number(ewbDtls.value.Distance);
      if(ewbDtls.value.TransdocDt!==''){
        const value=DateExchange(new Date(ewbDtls.value.TransdocDt))
        ewbDtls.value.TransdocDt=value;
      }
      fulllist.value.EwbDtls={...ewbDtls.value};
    }
    const pushfinale=()=>{
      emit('forward',fulllist.value);
    }
    return{ewbDtls,submitForm,pushfinale}
  }
};
</script>

<style>
.input-label span {
  font-weight: bold;
  margin-right: 10px;
}
</style>
