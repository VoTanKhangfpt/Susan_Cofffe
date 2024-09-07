import { useState, useEffect } from "react";
const HienBinhLuan = ( props ) => {
    const [listBL, ganListBL] = useState( [] );
    useEffect ( () => {
        fetch(`http://localhost:3000/lay_binh_luan/${props.id}`)
        .then(res=>res.json()).then( data => ganListBL(data) );
    } , [props.id]);
    return (
        <div id="list_binh_luan">
            <h2 className="bg-warning p-2 fs-5">Các bình luận về sản phẩm</h2>
            <div id="data">
            { listBL.map( (bl, index)=>{ return (
              <div key={index} class="border border-success my-2 p-2">
                <p class="d-flex justify-content-between">
                    <b>{bl.ho_ten}</b> 
                    <span> { new Date(bl.updated_at).toLocaleDateString('vi') } &nbsp;  
                        { new Date(bl.updated_at).toLocaleTimeString('vi') }
                    </span>
                </p>
                <p>{bl.noi_dung}</p>
            </div>
            )})//map
            }
            </div>
        </div>       
)}
export default HienBinhLuan;
