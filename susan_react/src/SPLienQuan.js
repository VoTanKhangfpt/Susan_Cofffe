import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
const SPLienQuan = ( props) => {
    //các biến
    const [ listsp, ganListSP ] = useState( [] );
    const dispatch = useDispatch();
    useEffect( () => {
        fetch(`http://localhost:3000/san_pham_lien_quan/${props.id}/${props.sosp}`)
        .then(res=>res.json()).then( data => ganListSP(data) );
    }, [props.id])    
    return (
        <div id="splienquan">
            <h2>Sản phẩm liên quan </h2>
            <div id="data">
            { listsp.map( (sp, index) => { return (
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
export default SPLienQuan;
