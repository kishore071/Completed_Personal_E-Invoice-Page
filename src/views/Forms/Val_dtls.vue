<template>
<div class="center-container">
    <div class="input-group">
     <form @submit.prevent="validater">
        <div class="ValPay">
          <label class="info">DOCUMENT TOTAL </label>
        <label class="input-label">
            <span>Assesable Value of all items:</span>
            <input type="text" required name="AssVal"
                   v-model="ValDtls.AssVal"
                   placeholder="Assessable Value:e.g:('9978.84')">
        </label>
        <label class="input-label">
            <span>CGST Value of all items:</span>
            <input type="text" name="CgstVal"
                   v-model="ValDtls.CgstVal"
                   placeholder="Cgst Value:e.g:('0')">
        </label>
        <label class="input-label">
            <span>SGST Value of all items:</span>
            <input type="text" name="SgstVal"
                   v-model="ValDtls.SgstVal"
                   placeholder="Sgst Value:e.g:('0')">
        </label>
        <label class="input-label">
            <span>IGST Value of all items:</span>
            <input type="text" name="IgstVal"
                   v-model="ValDtls.IgstVal"
                   placeholder="Igst Value:e.g:('1197.46')">
        </label>
        <label class="input-label">
            <span>Cess Value of all items:</span>
            <input type="text" name="CesVal"
                   v-model="ValDtls.CesVal"
                   placeholder="Ces Value:e.g:('508.9')">
        </label>
        <label class="input-label">
            <span>State Cess Value of all items:</span>
            <input type="text" name="StCesVal"
                   v-model="ValDtls.StCesVal"
                   placeholder="StCes Value:e.g:('1202.46')">
        </label>
        <label class="input-label">
            <span>Invoice Discount:</span>
            <input type="text" name="Discount"
                   v-model="ValDtls.Discount"
                   placeholder="Discount:e.g:('10')">
        </label>
        <label class="input-label">
            <span>Invoice Other Charges:</span>
            <input type="text" name="OthChrg"
                   v-model="ValDtls.OthChrg"
                   placeholder="OthCharges:e.g:('20')">
        </label>
        <label class="input-label">
            <span>Round-Off Amount:</span>
            <input type="text" name="RndOffAmt"
                   v-model="ValDtls.RndOffAmt"
                   placeholder="Round Off Amount:e.g:('20')">
        </label>
        <label class="input-label">
            <span>Total Invoice Value:</span>
            <input type="text" name="TotInvVal" required
                   v-model="ValDtls.TotInvVal"
                   placeholder="TotalInvVAl:e.g:('12908')">
        </label>
        <label class="input-label">
            <span>Invoice Value(Additional Currency):</span>
            <input type="text" name="TotInvValFc"
                   v-model="ValDtls.TotInvValFc"
                   placeholder="TotalInvVAl:e.g:('12908')">
        </label>
        </div>
        <div class="paydtls">
            <label class="info">PAYEE DETAILS</label>
            <label class="input-label">
                <span>Payee Name:</span>
                <input type="text" name="Nm"
                       v-model="PayDtls.Nm"
                       placeholder="Payee Name:e.g:('ABCDE')">
            </label>
            <label class="input-label">
                <span>Account Details:</span>
                <input type="text" name="AccDet"
                       v-model="PayDtls.AccDet"
                       placeholder="Account Details:e.g:('5697389713210')">
            </label>
            <label class="input-label">
                <span>Payment Mode:</span>
                <input type="text" name="Mode"
                       v-model="PayDtls.Mode"
                       placeholder="Payment Mode:e.g:('CASH')">
            </label>
            <label class="input-label">
                <span>Branch or IFSC Code:</span>
                <input type="text" name="Fininsbr"
                       v-model="PayDtls.Fininsbr"
                       placeholder="IFSC CODE:e.g:('SBIN11000')">
            </label>
            <label class="input-label">
                <span>Payment Term:</span>
                <input type="text" name="Payterm"
                       v-model="PayDtls.Payterm"
                       placeholder="Payterm:e.g:('100')">
            </label>
            <label class="input-label">
                <span>Payment Instruction:</span>
                <input type="text" name="Payinstr"
                       v-model="PayDtls.Payinstr"
                       placeholder="PayInstruction:e.g:('Gift')">
            </label>
            <label class="input-label">
                <span>Credit Transfer:</span>
                <input type="text" name="Crtrn"
                       v-model="PayDtls.Crtrn"
                       placeholder="Credit Transfer:e.g:('test')">
            </label>
            <label class="input-label">
                <span>Direct Debit:</span>
                <input type="text" name="Dirdr"
                       v-model="PayDtls.Dirdr"
                       placeholder="Direct Debit:e.g:('test')">
            </label>
            <label class="input-label">
                <span>Credit Days:</span>
                <input type="text" name="Crday"
                       v-model="PayDtls.Crday"
                       placeholder="Credit Days:e.g:('100')">
            </label>
            <label class="input-label">
                <span>Paid Amount:</span>
                <input type="text" name="Paidamt"
                       v-model="PayDtls.Paidamt"
                       placeholder="Paid Amount:e.g:('10000')">
            </label>
            <label class="input-label">
                <span>Payment Due:</span>
                <input type="text" name="Paymtdue"
                       v-model="PayDtls.Paymtdue"
                       placeholder="Payment due:e.g:('5000')">
            </label>
        </div>
        <button type="submit">Submit</button>
     </form>
      <button @click="nextpage" :disabled="buttonvalidator">Push Details</button>
    </div>
</div>
</template>

<script>
import {onMounted, ref} from "vue";
import itemref from '@/JsonContainer/itemlist.json'
    export default {
        props:{'itemlist':Object},
        // eslint-disable-next-line vue/multi-word-component-names
        name:"Payment",
      setup(props,{emit}){
          const ValDtls=ref(itemref.empty.ValDtls);
          const PayDtls=ref(itemref.empty.PayDtls);
          const fulllist=ref();
          const buttonvalidator=ref(true);
          const loader=async ()=>{
            await props.itemlist;
          }
        onMounted(async ()=>{
          await loader();
          fulllist.value=await props.itemlist;
        });
          const validater=()=>{
            fulllist.value.ValDtls={...ValDtls.value};
            fulllist.value.PayDtls={...PayDtls.value};
            buttonvalidator.value=false;
          }
        const nextpage=()=>{
            emit('forward',fulllist.value);
        }
        return{ValDtls,PayDtls,nextpage,buttonvalidator,validater}
      },
        methods:{
          emittion(page){
            this.$emit("change",page);
          }
        },
    }
</script>

<style>

</style>