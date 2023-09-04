<template>
    <div class="itemlist center-container">
      <div class="input-group">
      <form @submit.prevent="addList">
        <label class="info">ItemList</label>
            <label class="input-label">
              <span class="star">SL_No*:</span>
              <input type="text" readonly required name="SlNo"
                    v-model="itemsdata.SlNo" placeholder="Sl No (e.g:'1')"/>
            </label>
            <label class="input-label">
                <span>Product_Description:</span>
                <input type="text" name="PrdDesc"
                      v-model="itemsdata.PrdDesc" placeholder="Product Description (e.g:'Rice')" />
            </label>
            <label class="input-label">
                <span class="star">Is_Service*:</span>
                <select name="ISServc" required v-model="itemsdata.IsServc">
                    <option value="Y" selected>Yes</option>
                    <option value="N">No</option>
                </select>
            </label>
            <label class="input-label">
                <span class="star">HSN_Code*:</span>
                <input type="text" required name="HsnCd"
                      v-model="itemsdata.HsnCd" placeholder="HSN Code (e.g:'1001')" />
            </label>
            <label class="info">Batch Details</label>
            <label class="input-label">
                <span class="star">Batch_Name*:</span>
                <input type="text" required name="Nm"
                      v-model="itemsdata.BchDtls.Nm" placeholder="Batch Name (e.g:'123456')" />
            </label>
            <label class="input-label">
                <span>Batch_ExpiryDate:</span>
                <input type="date" name="ExpDt"
                      v-model="itemsdata.BchDtls.Expdt" placeholder="Expiry Date (e.g:'01/08/2020')" />
            </label>
            <label class="input-label">
                <span>Batch_WarrantyDate:</span>
                <input type="date" name="wrDt"
                      v-model="itemsdata.BchDtls.wrDt" placeholder="Warranty Date (e.g:'01/09/2020')" />
            </label>
            <label for="" class="info">Brief Item</label>
            <label class="input-label" v-for="(render, key) in itemsList" :key="render">
                <span :class="render[2] ? 'star':''">{{key}}<span class="star" v-if="render[2]">*</span>:</span>
                <input :type="render[1]" :required="render[2]"
                       v-model="itemsdata[render[3]]"
                       :name="render[3]" :placeholder="(key)=(render[0])"/>
            </label>
            <label for="" class="info">Attribute details</label>
            <label class="input-label">
                <span>Attribute_Name:</span>
                <input type="text" required name="AttrNm"
                       v-model="itemsdata.AttribDtls[0].Nm" placeholder="Attribute Name(e.g:'Rice')" />
            </label>
            <label class="input-label">
                <span>Attribute_Value:</span>
                <input type="text" required name="AttrVal"
                       v-model="itemsdata.AttribDtls[0].Val" placeholder="Attribute Value(e.g:'10000')" />
            </label>
        <button type="submit">Submit</button>
      </form>
        <button @click.self="senddata" v-if="buttonvalidator">Emit Data</button>
      </div>
    </div>
</template>

<script>
import itemlist from '@/JsonContainer/itemlist.json';
import {onMounted, ref,} from 'vue';
import { createDefaultItem } from '@/Functions/DefaultStructure';

export default {
  props: ['itemsSlNo'],
  setup(props, { emit }) {
    const itemsList = ref();
    const buttonvalidator = ref(true);
    const SlNo = ref(props.itemsSlNo);
    const itemsdata = createDefaultItem(props.itemsSlNo);
    const loader = async () => {
      await props.itemsSlNo;
    };
    onMounted(async () => {
      await loader();
      itemsList.value = await itemlist.ItemList;
      SlNo.value = props.itemsSlNo;
      console.log(SlNo.value);
    });
    const addList = async () => {
      itemsdata.value.UnitPrice=await parseFloat(itemsdata.value.UnitPrice).toFixed(3);
      itemsdata.value.TotAmt=await parseFloat(itemsdata.value.TotAmt).toFixed(2);
      itemsdata.value.AssAmt=await parseFloat(itemsdata.value.AssAmt).toFixed(2);
      itemsdata.value.GstRt=await parseFloat(itemsdata.value.GstRt).toFixed(3);
      itemsdata.value.TotItemVal=await parseFloat(itemsdata.value.TotItemVal).toFixed(2);
      //itemsdata.value.SlNo =await SlNo.value; // Update the SlNo here
      // itemsdata.value.Qty=await parseFloat(itemsdata.value.Qty).toFixed(3);
      // itemsdata.value.FreeQty=await Number(itemsdata.value.FreeQty).toFixed(3);
      // itemsdata.value.Discount=await parseFloat(itemsdata.value.Discount).toFixed(2);
      // itemsdata.value.PreTaxVal=await parseFloat(itemsdata.value.PreTaxVal).toFixed(2);
      // itemsdata.value.IgstAmt=await parseFloat(itemsdata.value.IgstAmt).toFixed(2);
      buttonvalidator.value = true;
    };

    const senddata = () => {
      emit('listupdate', itemsdata.value);
      buttonvalidator.value = false; // Set it to false here after emitting the data
    };

    return {
      itemsList,
      senddata,
      itemsdata,
      addList,
      buttonvalidator,
    };
  },
};
</script>


<style>
.star{
    color: red;
}
</style>