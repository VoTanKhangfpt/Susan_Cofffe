import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { suaSL, xoaSP } from "./cartSlice";
function ShowCart(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.listSP);
    return (<div id="giohang"> 
        <h2>Giỏ hàng của bạn</h2> 
        <div>
            <b>Ten SP</b>
            <b>Số lượng</b>
            <b>Giá</b>
            <b>Thành tiền</b>
            <b> Xóa </b>
        </div>
        {cart.map ((sp, index) => { return (
            <div key={index}>
            <span>{sp.ten_sp}</span>
            <input type="number" onClick={ e => dispatch( suaSL([sp.id, e.target.value] ) ) }    defaultValue={sp.so_luong}  />
            <span>{Number(sp.gia).toLocaleString("vi")} VNĐ</span>
            <span>{Number(sp.gia*sp.so_luong).toLocaleString("vi")} VNĐ</span>
            <span> <a href="#" onClick={ ()=>dispatch(xoaSP(sp.id)) }  >Xóa</a> </span>
            </div>
        )})}
        <div>
            <b> <Link className="text-decoration-none" to='/thanhtoan'>Thanh toán</Link> </b>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

    </div> );
  }
  export default ShowCart;
  