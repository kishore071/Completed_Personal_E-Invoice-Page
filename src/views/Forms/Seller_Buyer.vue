<template>
    <div class="center-container">
        <div class="input-group">
          <form @submit.prevent="validate">
            <label class="info">Seller Details</label>
            <label class="input-label">
              <span>Gst Number:</span>
              <input type="text" required name="Gstinsel" :class="error?'error':''" placeholder="Seller Gst" v-model="SellerDtls.Gstin"/>
            </label>
            <label class="input-label">
              <span>Supplier Legal Name:</span>
              <input type="text" required name="suppLglNm" placeholder="Seller Legal Name" v-model="SellerDtls.LglNm"/>
            </label>
            <label class="input-label">
              <span>Trader Name:</span>
              <input type="text" name="suppTrdNm" placeholder="Seller Trader Name" v-model="SellerDtls.TrdNm"/>
            </label>
            <div class="address">
              <label class="input-label">
                <span>Address 1:</span>
                <input type="text" required name="suppaddr1" placeholder="Seller Address 1" v-model="SellerDtls.Addr1"/>
              </label>
              <label class="input-label">
                <span>Address 2:</span>
                <input type="text" name="suppaddr2" placeholder="Seller Address 2" v-model="SellerDtls.Addr2"/>
              </label>
              <label class="input-label">
                <span>Supplier Place:</span>
                <input type="text" required name="suppLoc" placeholder="Seller Place or Location (e.g:- Bangalore)" v-model="SellerDtls.Loc"/>
              </label>
              <label class="input-label">
                <span>Supplier Code:</span>
                <input type="number" required name="suppin" placeholder="Seller Pin (e.g:- 560001)" v-model="SellerDtls.Pin"/>
              </label>
              <label class="input-label">
                <span>Supplier State Code:</span>
                <input type="text" required name="suppcode" placeholder="Seller State Code (e.g:- 29)" v-model="SellerDtls.Stcd"/>
              </label>
              <label class="input-label">
                <span>Supplier Phone:</span>
                <input type="text" name="supphn" placeholder="Seller Phone (e.g:-9000000000)" v-model="SellerDtls.Ph"/>
              </label>
              <label class="input-label">
                <span>Supplier Email:</span>
                <input type="text" name="suppem" placeholder="Seller Email (e.g:- abc@gmail.com)" v-model="SellerDtls.Em"/>
              </label>
            </div>
            <label class="info">Buyer Details</label>
            <label class="input-label">
              <span>Gst Number:</span>
              <input type="text" required name="Gstin" placeholder="Buyer Gst" v-model="BuyerDtls.Gstin"/>
            </label>
            <label class="input-label">
              <span>Supplier Legal Name:</span>
              <input type="text" required name="buyLglNm" placeholder="Buyer Legal Name" v-model="BuyerDtls.LglNm"/>
            </label>
            <label class="input-label">
              <span>Trader Name:</span>
              <input type="text" name="buyTrdNm" placeholder="Buyer Trader Name" v-model="BuyerDtls.TrdNm"/>
            </label>
            <label class="input-label">
              <span>Trader Pos:</span>
              <input type="text" name="buyTrdNm" placeholder="Buyer Pos " v-model="BuyerDtls.Pos"/>
            </label>
            <div class="address">
              <label class="input-label">
                <span>Address 1:</span>
                <input type="text" required name="buyaddr1" placeholder="Buyer Address 1" v-model="BuyerDtls.Addr1"/>
              </label>
              <label class="input-label">
                <span>Address 2:</span>
                <input type="text" name="buyaddr2" placeholder="Buyer Address 2" v-model="BuyerDtls.Addr2"/>
              </label>
              <label class="input-label">
                <span>Supplier Place:</span>
                <input type="text" required name="buyLoc" placeholder="Buyer Place or Location (e.g:- Bangalore)" v-model="BuyerDtls.Loc"/>
              </label>
              <label class="input-label">
                <span>Supplier Code:</span>
                <input type="number" name="buypin" placeholder="Buyer Pin (e.g:- 560001)" v-model="BuyerDtls.Pin"/>
              </label>
              <label class="input-label">
                <span>Supplier State Code:</span>
                <input type="text" required name="buycode" placeholder="Buyer State Code (e.g:- 29)" v-model="BuyerDtls.Stcd"/>
              </label>
              <label class="input-label">
                <span>Supplier Phone:</span>
                <input type="text" name="buyphn" placeholder="Buyer Phone (e.g:-9000000000)" v-model="BuyerDtls.Ph"/>
              </label>
              <label class="input-label">
                <span>Supplier Email:</span>
                <input type="text" name="buyem" placeholder="Buyer Email (e.g:- abc@gmail.com)" v-model="BuyerDtls.Em"/>
              </label>
            </div>
            <button type="submit" v-if="!butttonpresence">Submit</button>
          </form>
          <button @click.self="next(finallist)">Next</button>
        </div>
      </div>
</template>

<script>
import {onMounted, ref, watchEffect} from 'vue';
import items from '@/JsonContainer/itemlist.json';
    export default {
        props:{'itemlist':Object},
        setup(props,{emit}) {
          //console.log(props.uniqueid);
          const finallist = ref();
          const butttonpresence = ref(false);
          const SellerDtls=ref(items.empty.SellerDtls);
          const BuyerDtls=ref(items.empty.BuyerDtls);
          const error=ref(true);
          const nextPage = async () => {
            await emit('forward', finallist);
          }
          const recievelist = async () => {
            await props.itemlist;
          };
          watchEffect(()=>{
            if(SellerDtls.value.Gstin.length===15){
              error.value=false;
            }
            else {
              error.value=true;
            }
          })
          onMounted(async () => {
            await recievelist();
            await props.itemlist;
            finallist.value = await props.itemlist;
            console.log(finallist.value);
          });
          const validate = () => {
            // const {
            //   Gstinsel, suppLglNm, suppTrdNm, suppaddr1, suppaddr2, suppLoc, suppin, supphn, suppcode, suppem
            //   , Gstin, buyLglNm, buyTrdNm, buyaddr1, buyaddr2, buyLoc, buypin, buycode, buyphn, buyem
            // } = Object.fromEntries(new FormData(event.target));
            //Seller Details Updater
            finallist.value.SellerDtls.Gstin = SellerDtls.value.Gstin;
            finallist.value.SellerDtls.LglNm = SellerDtls.value.LglNm;
            finallist.value.SellerDtls.TrdNm = SellerDtls.value.TrdNm;
            finallist.value.SellerDtls.Addr1 = SellerDtls.value.Addr1;
            finallist.value.SellerDtls.Addr2 = SellerDtls.value.Addr2;
            finallist.value.SellerDtls.Loc = SellerDtls.value.Loc;
            finallist.value.SellerDtls.Pin = Number(SellerDtls.value.Pin);
            finallist.value.SellerDtls.Stcd = SellerDtls.value.Stcd;
            finallist.value.SellerDtls.Ph = SellerDtls.value.Ph;
            finallist.value.SellerDtls.Em = SellerDtls.value.Em;
            //Buyer Details Inputing Updater
            finallist.value.BuyerDtls.Gstin = BuyerDtls.value.Gstin;
            finallist.value.BuyerDtls.LglNm = BuyerDtls.value.LglNm;
            finallist.value.BuyerDtls.TrdNm = BuyerDtls.value.TrdNm;
            finallist.value.BuyerDtls.Addr1 = BuyerDtls.value.Addr1;
            finallist.value.BuyerDtls.Addr2 = BuyerDtls.value.Addr2;
            finallist.value.BuyerDtls.Loc = BuyerDtls.value.Loc;
            finallist.value.BuyerDtls.Pin = Number(BuyerDtls.value.Pin);
            finallist.value.BuyerDtls.Stcd = BuyerDtls.value.Stcd;
            finallist.value.BuyerDtls.Ph = BuyerDtls.value.Ph;
            finallist.value.BuyerDtls.Em = BuyerDtls.value.Em;
            console.log(finallist.value.SellerDtls);
            console.log(finallist.value.BuyerDtls);
            butttonpresence.value = !butttonpresence.value;
          };
          return {
            validate,
            nextPage,
            butttonpresence,
            SellerDtls,
            BuyerDtls,
            error,
            finallist
          };
        },
      methods:{
          next(finallist){
            this.$emit('forward',finallist);
          }
      }
    }
</script>

<style>
.error{
  //border-color: crimson;
  box-shadow: 0 0 0 1px crimson;
}
</style>