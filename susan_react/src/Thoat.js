import { useDispatch } from "react-redux";
import { thoat } from "./authSlice";
import { useNavigate } from "react-router-dom";
function Thoat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const thuchien = () => { dispatch(thoat()); navigate('/'); }
    return (
        <div class="alert alert-danger col-md-8 p-5 m-auto mt-5 text-center border border-danger border-2 shadow-lg">
            <h4 className="fw-bolder mb-4">Thoát sao? Chào bạn nhé ! Chúc an lành &#128516; </h4>
            <button onClick={thuchien} className="btn btn-warning fw-bolder m-auto px-5 py-3 shadow-lg">
                Thoát
            </button>
        </div>
    )
}
export default Thoat;