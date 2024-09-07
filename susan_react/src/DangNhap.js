import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dalogin } from "./authSlice";
export default function DangNhap() {
    let emailRef = React.createRef();
    let pwRef = React.createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitDuLieu = () => { //gửi thông tin đăng nhập lên server
        if (emailRef.current.value === "" || pwRef.current.value === "") {
            alert("Nhập đủ thông tin nhe bạn ơi "); return;
        }
        let url = "http://localhost:3000/login";
        let tt = { email: emailRef.current.value, pass: pwRef.current.value }
        let opt = {
            method: "post", body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url, opt).then(res => res.json()).then(data => {
            console.log(data); // lưu vào state
            dispatch(dalogin(data));
            navigate('/');
        });
    }
    return (
        <form id="frmlogin" className="col-7 m-auto mt-3 border border-danger">
            <h2 className="bg-danger-subtle h5 p-2 ">Thành viên đăng nhập</h2>
            <div className="m-3">Email
                <input className="form-control shadow-none border-danger-subtle" type="email" ref={emailRef} />
            </div>
            <div className="m-3">Mật khẩu
                <input className="form-control shadow-none border-danger-subtle" type="password" ref={pwRef} />
            </div>
            <div className="m-3">
                <button onClick={() => submitDuLieu()} type="button" className="btn btn-danger px-3">
                    Đăng nhập</button>
            </div>
        </form>
    );//return
}