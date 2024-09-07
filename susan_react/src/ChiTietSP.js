// ChiTietSP.js
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormBinhLuanSP from './FormBinhLuanSP';
import SPLienQuan from './SPLienQuan';
import HienBinhLuan from './HienBinhLuan';
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
const ChiTietSP = () => {
  let { id  } = useParams(); 
  const [sp, ganSP] = useState( [] );
  const dispatch = useDispatch();
  useEffect( () => {
      let url = `http://localhost:3000/san_pham/${id}`;
      fetch(url).then(res=>res.json()).then(data=> ganSP(data))
  } , [id] );

  return(
    <div id='chitietsp'>        
      <div id="row1" className="d-flex border border-black p-2">
          <div id="trai" className="col-md-3"> 
            <img src= {sp.hinh} className="w-100 border border-black" alt={sp.ten_sp} />   
          </div>
          <div id="phai" className="col-md-9 p-2 ps-4 fs-5"> 
              <h1 className="h4"> {sp.ten_sp}</h1>
              <div className="mb-2">
                <span>Giá bán </span>: {Number(sp.gia).toLocaleString("vi")} VNĐ
              </div>
              <div className="mb-2">
                <span>Mã sản phẩm </span>: {sp.sku}   
              </div>
              <div className="mb-2">
              <span>Cập nhật </span>: {new Date(sp['updated_at']).toLocaleDateString("vi")}
              </div>
              <div className="mb-2">
              <span>Mã giảm giá </span>: aa bb cc dd
              </div>
              <div className="mb-2">
              <span>Ưu đãi </span>: FREESHIP cho đơn hàng từ 200.0000 VNĐ
              </div>
              <div className = "d-flex mb-2"> 
                <div className="col-3 me-2">
                  <input type="number" min="1" id="so_luong" defaultValue={1} 
                  className="form-control shadow-none border-primary"/>
                </div>
                <div className="col-9">
                <button className="btn btn-primary px-3" onClick={ ()=> dispatch(themSP(sp))}>Thêm vào giỏ hàng</button>          
                </div>
              </div>
          </div>
      </div>
      <div id="row2"> 
        <HienBinhLuan id = {id} /> <hr/>
        <FormBinhLuanSP id={id} />
      </div>
      <div id="row3"> 
        <SPLienQuan id={id} sosp={4} />
      </div>
    </div>

  )  
}//ChiTietSP
export default ChiTietSP;
