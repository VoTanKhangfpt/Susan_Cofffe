import React from "react";
const FormBinhLuanSP = ( props ) => {
    let hotenRef = React.createRef();
    let noidungRef = React.createRef();
    let idspRef = React.createRef();
    const submitDuLieu = () => { //gửi thông tin bình luận lên server
        if (hotenRef.current.value === "" || 
            noidungRef.current.value === "" || 
            idspRef.current.value === ""
        ) { 
            alert("Nhập thông tin bạn ơi "); return;  
        }
    
        let url = "http://localhost:3000/luu_binh_luan";
        let tt = {
            ho_ten: hotenRef.current.value,   
            noi_dung: noidungRef.current.value,  
            id_sp: idspRef.current.value ,
            id_user: -1
        }
        let opt = { method:"post",  body:JSON.stringify(tt), 
                    headers:{ 'Content-Type':'application/json'} }
        fetch(url,opt).then( res =>res.json()).then( data => {
            alert(data.thongbao);
            hotenRef.current.value="";
            noidungRef.current.value="";
        });
    } //submitDuLieu    
    return (
        <form id="frmlogin" className="m-auto mt-3 border border-warning">
        <h2 className="bg-warning h5 p-2 ">Bình luận sản phẩm</h2>
        <div className="m-3">
        <input className="form-control border-primary shadow-none fs-5" 
        name="ho_ten" placeholder="Mời nhập họ tên" ref={hotenRef} />
        </div>
        <div className="m-3">
        <textarea className="form-control border-primary shadow-none fs-5" 
        name="noi_dung" rows="4" placeholder="Mời nhập bình luận" ref={noidungRef} />
        </div>
        <div className="m-3">
            <input type="hidden" name="id_sp" defaultValue={props.id} ref={idspRef}  />
            <button type="button" onClick={()=>submitDuLieu()} 
            className="btn btn-primary px-3">Gửi Bình luận</button>
        </div>
        </form>
)}
export default FormBinhLuanSP;
