<template>
  <div class="center-container">
    <div class="input-group">
      <form @submit.prevent="checker">
        <label class="info">Transaction Details</label>
        <label class="input-label">
          <span>Tax Scheme:</span>
          <input type="text" required name="TaxSch" placeholder="TaxSch" v-model="TranDtls.TaxSch"/>
        </label>
        <label class="input-label">
          <span>Transaction Category:</span>
          <select name="Typ" required v-model="TranDtls.SupTyp">
            <option value="B2B" selected>Business to Business</option>
            <option value="B2C" selected>Business to Customer</option>
            <option value="SEZWP">To SEZ with Payment.</option>
            <option value="SEZWOP">To SEZ with Out Payment.</option>
            <option value="EXPWP">Export with Payment</option>
            <option value="EXPWOP">Export without Payment</option>
            <option value="WP">No</option>
            <option value="DEXP">Deemed Export</option>
          </select>
        </label>
        <label class="input-label">
          <span>Whether Reverse Charge:</span>
          <select name="Typ" v-model="TranDtls.RegRev">
            <option value="Y" selected>Yes</option>
            <option value="N">No</option>
          </select>
        </label>
        <label class="input-label">
          <span>GSTIN Of E-Invoice Operator:</span>
          <input type="text" name="EcmGstin" placeholder="EcmGstin" v-model="TranDtls.EcmGstin"/>
        </label>
        <label class="input-label">
          <span>Igst On Intra:</span>
          <select name="Typ" v-model="TranDtls.IgstOnIntra">
            <option value="Y" selected>Yes</option>
            <option value="N">No</option>
          </select>
        </label>
        <b class="info">Document Details</b>
        <label class="input-label">
          <span>Doc_Type:</span>
          <select name="Typ" required v-model="DoctDtls.Typ">
            <option value="INV" selected>Invoice</option>
            <option value="CRN">Credit Note</option>
            <option value="DBN">Debit Note</option>
          </select></label>
        <label class="input-label">
          <span>Document_No:</span>
          <input type="text" required name="No" placeholder="Document Number" v-model="DoctDtls.No">
        </label>
        <label class="input-label">
          <span>Document_Date:</span>
          <input type="date" required name="Dt"
                 placeholder="Document Date" v-model="DoctDtls.Dt">
        </label>
        <button type="submit" v-if="disabled">Next Page</button>
      </form>
      <button v-if="!disabled" @click="emittion(disabled,itemlists)" :disabled="disabled">SellerPage</button>
      <!--          <span @click="emittion(1)"> next </span>-->
    </div>
  </div>
</template>
<script>
import {onMounted, ref} from 'vue';
//import itemList from "@/views/Forms/ItemList.vue";
//import { useRouter } from 'vue-router';
import items from '@/JsonContainer/itemlist.json';
import {DateExchange} from "@/Functions/DefaultStructure";
export default{
  name:"TransactionVue",
  props:['page_load','itemlist'],
  setup(props){
    //console.log(props.page_load);
    //console.log(props.itemlist);
    //const routs=useRouter();
    const TranDtls=ref(items.empty.TranDtls);
    const DoctDtls=ref(items.empty.DocDtls);
    const disabled=ref(true);
    const itemlists=ref();
    //console.log(itemlists.value);
    const taxsch=ref("");
    const waitvalue=async ()=>{
      await props.itemlist;
    };
    onMounted(async()=>{
      await waitvalue();
      //await props.itemlist;
      itemlists.value=props.itemlist;
      console.log(itemlists.value);
      //console.log(itemlist.$schema[0])
      //console.log(TranDtls.value);
      //console.log(DocDtls.value);
    });
    const checker=()=>{
      //const {TaxSch,SupTyp,RegRev,IgstOnIntra,EcmGstin,Dt,No,Typ}=Object.fromEntries(new FormData(event.target));
      // itemlists.value.TranDtls.TaxSch=TranDtls.value.TaxSch;
      // itemlists.value.TranDtls.SupTyp=TranDtls.value.SupTyp;
      // itemlists.value.TranDtls.RegRev=TranDtls.value.RegRev;
      // itemlists.value.TranDtls.IgstOnIntra=TranDtls.value.IgstOnIntra;
      // itemlists.value.TranDtls.EcmGstin=TranDtls.value.EcmGstin;
      itemlists.value.TranDtls={...TranDtls.value};
      const date=DateExchange(new Date(DoctDtls.value.Dt));
      itemlists.value.DocDtls.Dt=date;
      //console.log(DoctDtls.value.Dt.year);
      //itemlists.value.DocDtls.Dt=DoctDtls.value.Dt;
      itemlists.value.DocDtls.No=DoctDtls.value.No;
      itemlists.value.DocDtls.Typ=DoctDtls.value.Typ;
      if(taxsch.value!=null){
        disabled.value=false;
      }
      console.log(itemlists.value);
    }
    return{checker,disabled,itemlists,TranDtls,DoctDtls};
  },
  methods:{
          emittion(disabled,itemlists){
            if(!disabled){
              console.log(disabled);
            }
            this.$emit("forward",itemlists);
          }
        },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  
  .input-group {
    padding: 30px 40px 30px 40px;
    border-radius: 15%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .input-label {
    display: flex;
    align-items: baseline; /* Aligns the baseline of label content */
  }
  
  .input-label span {
    font-weight: bold;
    text-decoration: underline;
    margin-right: 4vw;
  }
  
  input,
  select {
    display: block;
    padding: 10px 60px 9px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background-color:white;
    border-bottom: 1px solid #aaa;
    font-size:medium;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #555;
  }
</style>
  