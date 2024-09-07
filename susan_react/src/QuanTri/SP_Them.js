// src/QuanTri/SP_Them.js
import { useNavigate } from "react-router-dom";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/vi.js';
import 'font-awesome/css/font-awesome.css';
import { useState , useEffect} from "react";
import { useSelector } from "react-redux";
const SP_Them = () => {
    //các biến
    const [listLoai, ganlistLoai] = useState([]);
    var token = useSelector(state => state.auth.token);
    useEffect ( () => {
        let opt = { method:"get", 
            headers:{ "Content-type":"application/json", 'Authorization': 'Bearer ' +token  } 
        }
        fetch(`http://localhost:3000/admin/sp/laycacloai`, opt)
        .then(res => res.json() ).then( data => ganlistLoai(data));
    }, [])   
    const nagivate = useNavigate();
    let sp = {};
    const submitDuLieu = (evt)=>{
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
        let url =`http://localhost:3000/admin/sp`;
        let opt = {
            method:"post", 
            body: formData,
            headers: {'Authorization': 'Bearer ' +token}
        };
        fetch(url, opt).then( res => res.json() ).then( data => {
          console.log('Kết quả ', JSON.stringify(data));
          alert("Đã thêm sp");
          nagivate("/admin/sp_ds")
        })
    } //submitDuLieu
    let configFroala = {
        heightMin: 250,
        placeholderText: 'Nhập mô tả sản phẩm',
        charCounterCount: true, 
        toolbarButtons: [
            ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'], 
            ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], 
            ['inlineClass', 'inlineStyle', 'clearFormatting'],
            ['insertImage']
        ]
    };    
    var fileHinh;
    function ghinhanFile(event) {
        fileHinh = event.target.files[0];
    } 
    return (
        <form className = "col-md-11 border border-danger border-2 m-auto mt-2">
        <div className="m-3 d-flex">
            <div className="col-6 p-1">Tên sản phẩm 
                <input type="text" onChange = { e => sp.ten_sp = e.target.value} 
                className="form-control shadow-none border-danger"/>
            </div>
            <div className="col-6 p-1"> Giá bán
                <input type="number" onChange = { e => sp.gia = e.target.value} 
                className="form-control shadow-none border-danger"/>
            </div>
        </div>
        <div className="m-3 d-flex">
            <div className="col-6 p-1"> Hình sản phẩm
                <input type="file" onChange = { e => ghinhanFile(e)} 
                className="form-control shadow-none border-danger"/>
            </div>
            <div className="col-6 p-1"> Mã sản phẩm SKU
                <input type="text" onChange = { e => sp.sku = e.target.value} 
                className="form-control shadow-none border-danger"/>
            </div>
        </div>
        <div className="m-3 d-flex">
            <div className="col-6 p-1"> Loại
                <select onChange = { e => sp.id_loai = e.target.value} 
                className="form-control shadow-none border-danger">
                    <option value="-1">Chọn loại</option>
                    {listLoai.map( (loai, index) =>
                        <option value={loai.id} key={index}>{loai.ten_loai}</option>
                    )}
                </select>
            </div>
            <div className="col-6 p-1"> Tags
                <input type="text" onChange = { e => sp.tags = e.target.value} 
                className="form-control shadow-none border-danger"/>
            </div>
        </div>
        <div className="m-3 d-flex">
            <div className="col-6 p-1"> Ẩn hện
              <span className="form-control border-danger">
                <input type="radio" value={false} name="an_hien"
                onChange = { e => sp.an_hien = e.target.value} /> Ẩn 
                <input type="radio" value={true} name="an_hien"
                onChange = { e => sp.an_hien = e.target.value}/> Hiện
               </span>
            </div>
            <div className="col-6 p-1"> Lượt xem
                <input type="number" onChange={ e => sp.luot_xem = e.target.value}
                className="form-control shadow-none border-danger"/>
            </div>
        </div>
        <div className="m-3">
            <FroalaEditorComponent tag='textarea' config={configFroala}/>
        </div>
        <div className="m-3 d-flex">
            <button onClick={ e => submitDuLieu(e) }   type="button" className="btn btn-warning fw-bolder"> Thêm sản phẩm</button>
        </div>
        </form>        
)} 
export default SP_Them;
