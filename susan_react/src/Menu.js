// Menu.js
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
const Menu = () => {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  const [listloai, ganListLoai] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/loai`)
      .then(res => res.json()).then(data => ganListLoai(data));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-transparent position-absolute bottom-0 end-0 p-0" data-bs-theme="dark" >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ "fontSize": "12px" }}>
            <li className="nav-item">
              <Link className="nav-link active" href="/#" to="/">Trang chủ</Link>
            </li>
            {listloai.map((loai, index) => {
              return (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={"/loai/" + loai.id} >
                    {loai.ten_loai}
                  </Link>
                </li>
              )
            })//map
            }
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown">{user === null || user === undefined ? "Tài khoản" : "Chào " + user.ho_ten} </a>
              {user === null || user === undefined ?
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/dangnhap">Đăng nhập</a></li>
                  <li><a className="dropdown-item" href="/dangky">Đăng ký</a></li>
                  <li><a className="dropdown-item" href="/quenpass">Quên pass</a></li>
                </ul>
                :
                <ul className="dropdown-menu">
                  {user.role === 1 ? <li><a className="dropdown-item" href="/admin">Quản trị</a></li> : ""}
                  <li><a className="dropdown-item" href="/doipass">Đổi pass</a></li>
                  <li><a className="dropdown-item" href="/profile">Thông tin tài khoản</a></li>
                  <li><Link className="dropdown-item" to={`/thoat`}>Thoát</Link></li>
                </ul>
              }
            </li>
            <li className="nav-item"> <a className="nav-link" href="/#">Bài viết</a> </li>
            <li className="nav-item">
              <Link className="nav-link" to="/showcart" > Giỏ hàng </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  )
}//Menu
export default Menu;
