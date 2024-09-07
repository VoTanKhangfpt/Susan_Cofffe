// SPTrongLoai.js
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

const SPTrongLoai = () => {
    let { id_loai, pagenum = 1 } = useParams(); 
    const [listsp, ganListSP] = useState( [] );
    const [loai, ganLoai] = useState( [] );
    const [page, setPage] = useState(1); 
    const [totalRows, gantotalRows] = useState(0); 
    const dispatch = useDispatch();
    useEffect ( () => {
        fetch(`http://localhost:3000/san_pham_trong_loai/${id_loai}?page=${page}`)
        .then(res=>res.json()).then(data => ganListSP(data));
        fetch(`http://localhost:3000/loai/${id_loai}`)
        .then(res=>res.json()).then(data => ganLoai(data)); 
     } , [id_loai , page]
    );  
    useEffect ( () => {
        fetch(`http://localhost:3000/san_pham_trong_loai/${id_loai}/dem`)
        .then(res=>res.json()).then( data => gantotalRows(data.total) );
    } , [id_loai]); //{total:31}
        
    return(
        <div id="sptrongloai">
        <h2>Sản phẩm trong loại {loai.ten_loai}</h2>
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
        <PaginationControl  page={page} between={2} total={totalRows} limit={6}
        changePage={(page) => setPage(page)}  ellipsis={1}/>

     </div>     
    )
};
export default SPTrongLoai;
