// src/QuanTri/SP_Sua.js
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const SP_Sua = () => {
    var token = useSelector(state => state.auth.token);
    //các biến
    const [listLoai, ganlistLoai] = useState([]);
    useEffect(() => {       
        let opt = {
            method: "get",
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        }
        fetch(`http://localhost:3000/admin/sp/laycacloai`, opt)
            .then(res => res.json()).then(data => ganlistLoai(data));
    }, [])
    var fileHinh;
    function ghinhanFile(event) {
        fileHinh = event.target.files[0];
    }

    const [sp, ganSP] = useState({});
    let { id } = useParams();
    useEffect(() => {     
        let opt = {
            method: "get",
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        }
        fetch(`http://localhost:3000/admin/sp/${id}`, opt)
            .then(res => res.json()).then(data => ganSP(data));
    }, [id]);

    const navigate = useNavigate();
    const submitDuLieu = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('fileHinh', fileHinh);
        formData.append('ten_sp', sp.ten_sp);
        formData.append('id_loai', sp.id_loai);
        formData.append('an_hien', sp.an_hien);
        formData.append('luot_xem', sp.luot_xem);
        formData.append('gia', sp.gia);
        formData.append('sku', sp.sku);
        formData.append('tags', sp.tags);

        let opt = {
            method: "put", body: JSON.stringify(sp),
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        }
        fetch(`http://localhost:3000/admin/sp/${id}`, opt)
            .then(res => res.json()).then(data => {
                console.log("Kết quả =", data)
                navigate("/admin/sp_ds");
            });
    }
    return (
        <form className="col-md-11 border border-danger border-2 m-auto mt-2">
            <div className="m-3 d-flex">
                <div className="col-6 p-1">Tên sản phẩm
                    <input type="text" defaultValue={sp.ten_sp} onChange={e => sp.ten_sp = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
                <div className="col-6 p-1"> Giá bán
                    <input type="number" defaultValue={sp.gia} onChange={e => sp.gia = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-6 p-1"> Hình sản phẩm
                    <input defaultValue={sp.hinh} type="file" onChange={e => ghinhanFile(e)}
                        className="form-control shadow-none border-danger" />
                </div>
                <div className="col-6 p-1"> Mã sản phẩm SKU
                    <input type="text" defaultValue={sp.sku} onChange={e => sp.sku = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-6 p-1"> Loại
                    <select value={sp.id_loai} onChange={e => sp.id_loai = e.target.value}
                        className="form-control shadow-none border-danger">
                        <option value="-1">Chọn loại</option>
                        {listLoai.map((loai, index) =>
                            <option value={loai.id} key={index}>{loai.ten_loai}</option>
                        )}

                    </select>
                </div>
                <div className="col-6 p-1"> Tags
                    <input type="text" defaultValue={sp.tags} onChange={e => sp.tags = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-6 p-1"> Ẩn hện
                    <span className="form-control border-danger">
                        <input name="an_hien" type="radio" value={false} checked={sp.an_hien === false}
                            onChange={e => sp.an_hien = e.target.value} /> Ẩn
                        <input name="an_hien" type="radio" value={true} checked={sp.an_hien === true}
                            onChange={e => sp.an_hien = e.target.value} /> Hiện
                    </span>
                </div>
                <div className="col-6 p-1"> Lượt xem
                    <input type="number" defaultValue={sp.luot_xem} onChange={e => sp.luot_xem = e.target.value}
                        className="form-control shadow-none border-danger" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <button onClick={(e) => submitDuLieu(e)} type="button" className="btn btn-warning fw-bolder">Cập nhật sản phẩm </button>
            </div>
        </form>

    )
}
export default SP_Sua;
