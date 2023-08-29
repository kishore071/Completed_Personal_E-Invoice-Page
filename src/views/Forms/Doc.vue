<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="Docdtls">
        <div class="center-container">
            <div class="input-group">
              <form @submit.prevent="validater">
                <label for="" class="info">Reference Details</label>
                <label class="input-label">
                  <span>Invoice Remarks:</span>
                  <input type="text" required
                         v-model="RefDtls.InvRm"
                         name="InvRm" placeholder="Invoice Remarks:(e.g:'TEST')" />
                </label>
                <label class="info"> Document Period Details</label>
                <label class="input-label">
                    <span>Invoice Start Date:</span>
                    <input type="date" required
                           v-model="RefDtls.DocPerdDtls.InvStDt"
                           name="InvStDt" placeholder="" />
                </label>
                <label class="input-label">
                    <span>Invoice End Date:</span>
                    <input type="date" required
                           v-model="RefDtls.DocPerdDtls.InvEndDt"
                           name="InvEndDt" placeholder="" />
                </label>
                <div class="PreDocDtls" v-for="products in PreDocDtls" :key="products.InvNo">
                  <label class="info">Generated Preceding Document Details for {{products.InvNo}}</label>
                  <label class="input-label">
                    <span>Preceding Invoice Number:</span>
                    <input type="text" required readonly
                           v-model="products.InvNo" name="InvNo" placeholder="" />
                </label>
                <label class="input-label">
                  <span>Preceding Invoice Date:</span>
                  <input type="date" required
                         v-model="products.InvDt"
                         name="InvNo" placeholder="" />
                </label>
                <label class="input-label">
                  <span>Other Reference:</span>
                  <input type="date"
                         v-model="products.OthRefNo"
                         name="OthRefNo" placeholder="" />
                </label>
                  <button @click="existingdeleter(products.InvNo)">Delete Preceding Doc {{products.InvNo}}</button>
                </div>
                <button type="submit" v-if="!buttonvalidater">Submit Data</button>
              </form>
              <button @click="addlist">Add PreDocDtls</button>
            </div>
          <button @click="pushNext" v-if="buttonvalidater"> Next Page</button>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import itemlisterpart from '@/JsonContainer/itemlist.json';
import {v4 as uuidv4} from 'uuid';
    export default {
      props:{'itemlist':Object,'PreDocDtl':Object},
      setup: function (props, {emit}) {
        const items = ref();
        const PreDocDtls = ref([]);
        const RefDtls=ref(itemlisterpart.empty.RefDtls);
        //PreDocDtls.value[0].InvNo=SinoGenerator();
        const createNewItemdata = () => {
          return {
            InvNo: SinoGenerator(),
            InvDt: '',
            OthRefNo: ''
          };
        };
        const existingdeleter=(InvNo)=>{
          const index=PreDocDtls.value.findIndex((indexer)=>indexer.InvNo===InvNo)
          if(index!==null){
            PreDocDtls.value.splice(index,1);
          }
        }
        const addlist = () => {
          PreDocDtls.value.push(createNewItemdata());
        }
        const SinoGenerator = () => {
          return uuidv4().slice(0, 6);
        }
        const loader = async () => {
          await props.itemlist;
          await props.PreDocDtl;
        };
        onMounted(async () => {
          await loader();
          //total itemlist is added here
          items.value = await props.itemlist;
          PreDocDtls.value = await props.PreDocDtl;
          if (items.value.RefDtls.PrecDocDtls[0].InvNo === "") {
            const num = SinoGenerator();
            items.value.RefDtls.PrecDocDtls[0].InvNo = num;
            PreDocDtls.value.InvNo = num;
          }
          //pushing the itemlist PreDocDtls inside a temp list
        });
        const buttonvalidater = ref(false);
        const validater = () => {
          items.value.RefDtls={...RefDtls.value};
          items.value.PreDocDtls={...PreDocDtls.value};
          console.log(items.value);
          buttonvalidater.value=true;
        }
        const pushNext = () => {
          emit('forward', items.value);
        }
        return {items,RefDtls, existingdeleter,buttonvalidater, validater, pushNext, PreDocDtls,createNewItemdata,addlist}
      }

    }
</script>

<style >

</style>