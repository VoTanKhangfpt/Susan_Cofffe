import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { xoaSP } from "./cartSlice";
import { useNavigate } from "react-router-dom";
const ThanhToan = ()  => {
    //các biến
    const dispatch = useDispatch();
    const nagivate = useNavigate();
    let hotenRef =  React.createRef();
    let emailRef =  React.createRef();
    let diachiRef =  React.createRef();
    let dienthoaiRef =  React.createRef();
    const cart = useSelector(state => state.cart.listSP);
    const submitDuLieu = () => { 
        if (cart.length <= 0) {
            alert("Giỏ hàng đang trống! Mời bạn hãy chọn sản phẩm nhé "); return;
        }
        let hoten = hotenRef.current.value; 
        let email = emailRef.current.value;
        let diachi = diachiRef.current.value;
        let dienthoai = dienthoaiRef.current.value
        if ( hoten ==="" || email ==="" || diachi==="" || dienthoai==="") { 
            alert("Nhập dữ liệu chưa đủ bạn ơi"); return;
        } 
        let url = "http://localhost:3000/luu_don_hang";
        let dh =  { 
            id_user: -1, 
            ten_nguoi_nhan: hotenRef.current.value, 
            email: emailRef.current.value,
            dia_chi: diachiRef.current.value,
            dien_thoai: dienthoaiRef.current.value 
        }
        let opt = { method:"post",  
                    body:JSON.stringify(dh), 
                    headers:{ 'Content-Type':'application/json'} }
        fetch(url , opt).then( res => res.json() ).then( async data => {
            if (data.id < 0)  alert("Lỗi lưu đơn hàng: "  + data.thongbao)
            else {
              let id_dh = data.id;    
              for (const sp of cart) { //không dùng cart.ForEach được vì bên trong có await
                await luuchitietdonhang(id_dh, sp);
              } 
            } //else
        }) //fetch
        //alert("Đơn hàng đã lưu");
        hotenRef.current.value = ""; 
        emailRef.current.value = "";
        diachiRef.current.value = "";
        dienthoaiRef.current.value = "";
        nagivate("/camon");
    }
    const luuchitietdonhang = async (id_dh, sp) => {
        let url = "http://localhost:3000/luu_1sp_trong_gio_hang";
        let obj = { 
            id_dh: id_dh, 
            id_sp: sp.id, 
            ten_sp: sp.ten_sp, 
            gia_mua: sp.gia, 
            sku: sp.sku, 
            so_luong: sp.so_luong
        }
        let opt = { method:"post", body:JSON.stringify(obj), 
                    headers:{ 'Content-Type':'application/json'} }
        await fetch(url,opt).then( res => res.json() )
        .then( data => { 
            console.log("Kết quả lưu sp: ", data);
            dispatch( xoaSP(sp.id) ) 
            return data;
        })
        .catch( err => console.log('Lỗi lưu sp ', sp)); 
    }
    
        return (
    <form id="frmthanhtoan" className="col-10 m-auto my-3 border border-warning border-2 shadow-lg">
    <h2 className="bg-warning p-2 fs-5">Thanh toán đơn hàng</h2> 
    <div className="m-3">Họ tên
        <input ref = {hotenRef}  className="form-control shadow-none border-primary" type="text"/>
    </div>     
    <div className="m-3">Email
        <input ref = {emailRef}   className="form-control shadow-none border-primary" type="email"/>
    </div>
    <div className="m-3">Địa chỉ
        <input ref = {diachiRef}  className="form-control shadow-none border-primary" type="text"/>
    </div>
    <div className="m-3">Điện thoại
        <input ref = {dienthoaiRef}  className="form-control shadow-none border-primary" type="text"/>
    </div>
    <div className="m-3"> 
        <button onClick={()=>submitDuLieu()}  className="btn btn-primary" type="button">
        Lưu đơn hàng
        </button>    
    </div>
    </form>
    )}
    export default ThanhToan;
    