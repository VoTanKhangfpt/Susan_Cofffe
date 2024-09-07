// SPMoiTrongLoai.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

const SPMoiTrongLoai = (props) => {
  const [listsp, ganListSP] = useState( [] );
  const [loai, ganLoai] = useState( [] );
  const dispatch = useDispatch();
  useEffect ( () => {
    fetch(`http://localhost:3000/san_pham_moi_trong_loai/${props.id_loai}?limit=4`)
    .then(res=>res.json()).then(data => ganListSP(data));
    fetch(`http://localhost:3000/loai/${props.id_loai}`)
    .then(res=>res.json()).then(data => ganLoai(data));
  } ,  [props.id_loai ]);
  return(
    <div id="sptrongloai">
        <h2>{loai.ten_loai} </h2>
        <div id="data">
        { listsp.map( (sp, index)=>{ return (
            <div className="sp" key={index}>
            <h4> <Link to = { "/sp/" + sp.id } > {sp.ten_sp} </Link> </h4>
            <img src= {sp.hinh} alt= {sp.ten_sp} />
            <p> Giá: {sp.gia.toLocaleString('vi')}VNĐ</p>
            <button className="btn btn-primary px-2" onClick={ ()=> dispatch(themSP(sp))}>Thêm vào giỏ</button>
            </div>
            )})//map
        }
        </div>
    </div>
  )}
export default SPMoiTrongLoai;
