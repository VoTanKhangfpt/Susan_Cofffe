import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: { listSP: [],  }, 
  reducers: {
    themSP: (state, param) => {    
      let sp = param.payload; //tham số là  sp = {'id':1,'ten_sp'=>'A'} 
      let index = state.listSP.findIndex( s => s.id ===sp.id);
      if (index===-1) { //sp chưa có trong giỏ hàng
        sp['so_luong']=1;
        state.listSP.push(sp);
      }
      else state.listSP[index]['so_luong']++;
      console.log("Đã thêm sp. Số SP=", state.listSP.length) 
    },
    suaSL: (state, param) =>{ //tham số là mảmg 2 phần tử id và sl. VD [5000, 3]
      let id = param.payload[0];
      let so_luong = param.payload[1];
      let index = state.listSP.findIndex( s =>  s.id === id);
      if (index !==-1) state.listSP[index].so_luong = Number(so_luong);
      console.log("Đã sửa sp ", param)
    },     
    xoaSP: (state, param) => {  //tham số là id_sp 
      let id = param.payload;
      const index = state.listSP.findIndex(s => s.id === id);
      if (index!==-1) state.listSP.splice(index , 1 );
    },
    xoaGH: state => { state.listSP = []; }
  },
});
export const { themSP, suaSL, xoaSP , xoaGH} = cartSlice.actions
export default cartSlice.reducer;
