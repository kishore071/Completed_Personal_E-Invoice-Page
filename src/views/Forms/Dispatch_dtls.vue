<template>
    <div class="center-container">
        <div class="input-group">
          <form @submit.prevent="validater">
            <label class="info">Dispatch Details</label>
            <label class="input-label">
              <span>Dispatcher Name:</span>
              <input type="text" required name="Nm" placeholder="Dispatcher Name (e.g:'ABC company pvt ltd')" v-model="DispDtls.Nm"/>
            </label>
            <div class="address">
            <label class="input-label">
              <span>Dispatch Address_1:</span>
              <input type="text" required name="Addr1" placeholder="Addr1:(e.g:'7th block, kuvempu layout')" v-model="DispDtls.Addr1"/>
            </label>
            <label class="input-label">
              <span>Dispatch Address_2:</span>
              <input type="text" name="Addr2" placeholder="Addr2:(e.g:'kuvempu layout')" v-model="DispDtls.Addr2"/>
            </label>
              <label class="input-label">
                <span>Dispatch Location</span>
                <input type="text" required name="Loc" placeholder="Dispatch Location(e.g:- Bangalore)" v-model="DispDtls.Loc"/>
              </label>
              <label class="input-label">
                <span>Dispatch Pin:</span>
                <input type="number" required name="Pin" placeholder="Dispatch Pin (e.g:- 560001)" v-model="DispDtls.Pin"/>
              </label>
              <label class="input-label">
                <span>Dispatch State Code:</span>
                <input type="text" required name="State_code" placeholder="Dispatch State Code (e.g:- 29)" v-model="DispDtls.Stcd"/>
              </label>
            </div>
            <div class="ShipDtls">
                <label class="info">Shipment Details</label>
                <label class="input-label">
                    <span>GSTIN:</span>
                    <input type="text" name="Gstin" placeholder="GSTIN (e.g:'29AWGPV7107B1Z1')" v-model="ShipDtls.Gstin"/>
                  </label>
                  <label class="input-label">
                    <span>Legal_Name:</span>
                    <input type="text" required name="LglNm" placeholder="Legal Name:(e.g:'CBE company pvt ltd')"  v-model="ShipDtls.LglNm"/>
                  </label>
                  <label class="input-label">
                    <span>Trade_Name:</span>
                    <input type="text" name="TrdNm" placeholder="TrdNm:(e.g:'kuvempu layout')"  v-model="ShipDtls.TrdNm"/>
                  </label>
                  <label class="input-label">
                    <span>Shipment Address_1:</span>
                    <input type="text" required name="Addr1" placeholder="Addr1:(e.g:'7th block, kuvempu layout')"  v-model="ShipDtls.Addr1"/>
                  </label>
                  <label class="input-label">
                    <span>Shipment Address_2:</span>
                    <input type="text" name="Addr2" placeholder="Addr2:(e.g:'kuvempu layout')"  v-model="ShipDtls.Addr2"/>
                  </label>
                    <label class="input-label">
                      <span>Shipment Location</span>
                      <input type="text" required name="Loc" placeholder="Shipment Location(e.g:- Bangalore)" v-model="ShipDtls.Loc"/>
                    </label>
                    <label class="input-label">
                      <span>Shipment Code:</span>
                      <input type="number" required name="Pin" placeholder="Shipment Pin (e.g:- 560001)"  v-model="ShipDtls.Pin"/>
                    </label>
                    <label class="input-label">
                      <span>Shipment State Code:</span>
                      <input type="text" required name="StateCode" placeholder="Shipment State Code (e.g:- 29)"  v-model="ShipDtls.Stcd"/>
                    </label>
            </div>
            <button type="submit">Submit</button>
          </form>
          <button @click.self="emittion(itemlists)">Next page</button>
        </div>
      </div>
</template>

<script>
import {onMounted, ref} from "vue";
import items from '@/JsonContainer/itemlist.json';
    export default {
        props:['page_load','itemlist'],
        setup(props){
          //console.log(page);
          const DispDtls=ref(items.empty.DispDtls);
          const ShipDtls=ref(items.empty.ShipDtls);
          const itemlists=ref();
          /* const emittion=()=>{
            emit("change",props.page_load);
          } */
          const mount=async ()=>{
            await props.itemlist;
          };
          onMounted(async ()=>{
            await mount();
            itemlists.value=await props.itemlist;
            console.log(itemlists.value);
          });
          const validater=async ()=>{
            //const{}
            // itemlists.value.DispDtls.Nm=DispDtls.value.Nm;
            // itemlists.value.DispDtls.Stcd=DispDtls.value.Stcd;
            itemlists.value.DispDtls.Pin=await Number(DispDtls.value.Pin);
            // itemlists.value.DispDtls.Addr1=DispDtls.value.Addr1;
            // itemlists.value.DispDtls.Addr2=DispDtls.value.Addr2;
            // itemlists.value.DispDtls.Loc=DispDtls.value.Loc;
            itemlists.value.DispDtls={...DispDtls.value}
            // itemlists.value.ShipDtls.Gstin=ShipDtls.value.Gstin;
            // itemlists.value.ShipDtls.LglNm=ShipDtls.value.LglNm;
            // itemlists.value.ShipDtls.TrdNm=ShipDtls.value.TrdNm;
            // itemlists.value.ShipDtls.Addr1=ShipDtls.value.Addr1;
            // itemlists.value.ShipDtls.Addr2=ShipDtls.value.Addr2;
            // itemlists.value.ShipDtls.Loc=ShipDtls.value.Loc;
            itemlists.value.ShipDtls.Pin=await Number(ShipDtls.value.Pin);
            itemlists.value.ShipDtls={...ShipDtls.value}
            // itemlists.value.ShipDtls.Stcd=ShipDtls.value.Stcd;
          };
          return{itemlists,validater,DispDtls,ShipDtls};
        },
        methods:{
          emittion(itemlists){
            this.$emit("forward",itemlists);
          }
        },
    }
</script>


<style>
.info{
  margin-top: auto;
  font-weight: bolder;
  font-size: larger;
}
</style>