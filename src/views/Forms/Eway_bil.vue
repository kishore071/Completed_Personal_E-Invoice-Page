<template>
  <div class="center-container">
    <div class="input-group">
    <form @submit.prevent="submitForm">
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
        <input type="text" v-model="ewbDtls.TransMode" placeholder="TransMode" />
      </label>
      <button type="submit">Submit</button>
    </form>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import itemlisterpart from '@/JsonContainer/itemlist.json';
export default {
  props:{'itemlist':Object},
  setup(props){
    const ewbDtls=ref(itemlisterpart.empty.EwbDtls);
    const fulllist=ref();
    const loader=async ()=>{
      await props.itemlist;
    }
    onMounted(async ()=>{
      await loader();
      fulllist.value=await props.itemlist;
    })
    const submitForm=()=>{
      fulllist.value.EwbDtls={...ewbDtls.value};
    }
    return{ewbDtls,submitForm}
  }
};
</script>

<style scoped>
.input-label span {
  font-weight: bold;
  margin-right: 10px;
}
</style>
