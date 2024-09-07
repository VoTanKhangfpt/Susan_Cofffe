// src/QuanTri/SP_Ds.js
import { useEffect, useState } from "react";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
var limit = 3;

const SP_Ds = () => {
  //các biến
  var token = useSelector(state => state.auth.token);
  const navigate = useNavigate()
  const [listSP, ganListSP] = useState([]);
  const [listLoai, ganlistLoai] = useState([]);
  const [page, ganPage] = useState(1);
  const [totalRows, gantotalRows] = useState(0);
  const [naplai, ganNapLai] = useState(0);
  const [id_loai, ganidloai] = useState(-1);
  useEffect(() => {

    let opt = {
      method: 'get',
      headers: { 'accept': 'application/json', 'Authorization': 'Bearer ' + token }
    }
    fetch(`http://localhost:3000/admin/sp/dem?id_loai=${id_loai}`, opt)
      .then(res => res.json()).then(data => gantotalRows(data.total));
    fetch(`http://localhost:3000/admin/sp/laycacloai`, opt)
      .then(res => res.json()).then(data => ganlistLoai(data));
  }, [naplai, id_loai]);
  useEffect(() => {
    let opt = {
      method: 'get',
      headers: { 'accept': 'application/json', 'Authorization': 'Bearer ' + token }
    }
    fetch(`http://localhost:3000/admin/sp?id_loai=${id_loai}&page=${page}&limit=${limit}`, opt)
      .then(res => {
        if (res.status === 401) {

          alert("Nạn cần đăng nhập lại");
          navigate('/');

        } else {
          return res.json()
        }

      }).then(data => ganListSP(data))
  }, [page, naplai, id_loai]);
  const laytenloai = (id_loai) => {
    if (listLoai.length === 0) return "Không có";
    let kq = listLoai.find(loai => loai.id === id_loai);
    if (kq != null) return kq.ten_loai;
    else return "Không có";
  }
  function xoaSP(id) {
    if (window.confirm("Xóa thật không vậy?") === false) return false;
    let opt = {
      method: 'detete',
      headers: { 'accept': 'application/json', 'Authorization': 'Bearer ' + token }
    }
    fetch(`http://localhost:3000/admin/sp/${id}`, opt)
      .then(res => res.json())
      .then(data => ganNapLai(naplai + 1))
  }
  function locSP(event) {
    let id_loai = event.target.value;
    ganidloai(id_loai)
  }
  return (
    <div id="adminspList">
      <h5 className='sp'>
        <b>Hình</b>
        <b>
          Tên SP / SKU
          <select onChange={e => locSP(e)}
            className="float-end shadow-none fs-6 p-1 my-0 me-2">
            <option value="0">Lọc theo loại</option>
            {Array.isArray(listLoai) &&
              listLoai.map((loai, index) => (
                <option key={index} value={loai.id}>
                  {loai.ten_loai}
                </option>
              ))
            }

          </select>
        </b>
        <b>Thông tin </b>
        <b><a href="/admin/sp_them">Thêm</a></b>
      </h5>
      {listSP.map((sp, index) => (
        <div className='sp' key={index}>
          <div> <img src={sp.hinh} alt="{sp.ten_sp}" className="w-100 hinh" /> </div>
          <div>
            <p>Tên SP: <b>{sp.ten_sp}</b> </p>
            <p>SKU: <b>{sp.sku}</b> </p>
            <p>Loại: {laytenloai(sp.id_loai)} </p>
            <p>Tags: {sp.tags} </p>
          </div>
          <div>
            <p> Giá : {sp.gia.toLocaleString("vi")} VNĐ </p>
            <p>Cập nhật: {new Date(sp.updated_at).toLocaleDateString("vi")}</p>
            <p>Trạng thái : {sp.an_hien === 1 ? "Đang ẩn" : "Đang hiện"}</p>
            <p>Lượt xem: {sp.luot_xem} </p>
          </div>
          <div>
            <a href="#/" onClick={() => xoaSP(sp.id)} className='btn btn-danger d-block m-2 mt-4'>Xóa</a>
            <Link to={"/admin/sp_sua/" + sp.id}
              className='btn btn-primary d-block m-2' >Sửa</Link>
          </div>
        </div>
      ))}
      <PaginationControl page={page} between={2} limit={limit} ellipsis={1}
        total={totalRows} changePage={(page) => ganPage(page)} />
    </div>

  )
}
export default SP_Ds;          
