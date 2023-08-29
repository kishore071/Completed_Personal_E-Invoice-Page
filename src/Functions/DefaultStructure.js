import {ref} from "vue";

export const createDefaultItem=(sl)=> {
    return ref({
      SlNo: sl,
      IsServc: "",
      PrdDesc: "",
      HsnCd: "",
      Barcde: "",
      BchDtls: {
        Nm: "",
        Expdt: "",
        wrDt: ""
      },
      Qty: null,
      FreeQty: null,
      Unit: "",
      UnitPrice: null,
      TotAmt: null,
      Discount: null,
      PreTaxVal: null,
      AssAmt: null,
      GstRt: null,
      SgstAmt: null,
      IgstAmt: null,
      CgstAmt: null,
      CesRt: null,
      CesAmt: null,
      CesNonAdvlAmt: null,
      StateCesRt: null,
      StateCesAmt: null,
      StateCesNonAdvlAmt: null,
      OthChrg: null,
      TotItemVal: null,
      OrdLineRef: "",
      OrgCntry: "",
      PrdSlNo: "",
      AttribDtls: [
        {
          Nm: "",
          Val: ""
        }
      ]
    });
}
  