import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Loai_Them = () => {
    const token = useSelector(state => state.auth.token);
    const [errors, setErrors] = useState({});
    const ten_loai = useRef(null);
    const thu_tu = useRef(null);
    const an_hien = useRef(null);
    const [loai, setLoai] = useState({})

    const checkForm = () => {
        const error = {};

        if (ten_loai.current.value.length < 6) {
            error.ten_loai = 'Tên loại ngắn quá nhập lại nhé';
            console.log(ten_loai.current);
        }

        if (thu_tu.current.value.length === 0) {
            error.thu_tu = 'Phải nhập thứ tự nhé';
        }

        if (an_hien.current.checked === false) {
            error.an_hien = 'Bạn phải chọn ẩn hoặc hiện nhé';
        }

        setErrors(error);
        return Object.keys(error).length === 0;
    };

    const submitDuLieu = (evt) => {
        evt.preventDefault();
        const kiemtra = checkForm();
        if (kiemtra) {
            
            let url = `http://localhost:3000/admin/loai`;
            let opt = {
                method: "post",
                body: JSON.stringify(loai),
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            };
            fetch(url, opt).then(res => res.json()).then(data => {
                console.log('Kết quả ', JSON.stringify(data));
            })
        }
    };

    const clearError = (name) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
        
    };
    console.log(loai)

    return (
        <div>
            <form className="col-md-8 border border-danger border-2 m-auto mt-2 shadow-lg rounded">
                <div className="m-3 p-1">Tên loại
                    <input 
                        type="text" 
                        ref={ten_loai} 
                        name="ten_loai" 
                        onClick={(e) => clearError(e.target.name)} 
                        onChange={(e) => setLoai(pre=>({...pre, [e.target.name] : e.target.value}))}
                        className="form-control shadow-none border-danger" 
                    />
                    {errors.ten_loai && <span className="text-danger">{errors.ten_loai}</span>}
                </div>

                <div className="m-3 p-1"> Thứ tự
                    <input 
                        type="number" 
                        ref={thu_tu} 
                        name="thu_tu" 
                        onClick={(e) => clearError(e.target.name)} 
                        onChange={(e) => setLoai(pre=>({...pre, thu_tu : e.target.value}))}
                        className="form-control shadow-none border-danger" 
                    />
                    {errors.thu_tu && <span className="text-danger">{errors.thu_tu}</span>}
                </div>

                <div className="m-3 p-1"> Ẩn hiện
                    <div className="form-control border-danger">
                        <input 
                            type="radio" 
                            ref={an_hien} 
                            name="an_hien" 
                            value="false" 
                            onClick={(e) => clearError(e.target.name)} 
                            onChange={(e) => loai.an_hien = e.target.value} 
                        /> Ẩn
                        <input 
                            type="radio" 
                            ref={an_hien} 
                            name="an_hien" 
                            value="true" 
                            onClick={(e) => clearError(e.target.name)} 
                            onChange={(e) => loai.an_hien = e.target.value} 
                        /> Hiện
                    </div>
                    {errors.an_hien && <span className="text-danger">{errors.an_hien}</span>}
                </div>

                <div className="m-3">
                    <button 
                        onClick={submitDuLieu} 
                        type="button" 
                        className="btn btn-warning fw-bolder"
                    >
                        Thêm loại
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Loai_Them;
