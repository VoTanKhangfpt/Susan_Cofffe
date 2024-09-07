import './Admin.css';
import { Link, Outlet } from "react-router-dom";
function Admin() {
  return (
  <div className="container">
    <header className="positon-relative d-flex" style={{ }}>
      <div id="logo">SUSAN CÀ PHÊ ADMIN</div>      
    </header>
    <nav className="bg-warning">  
    <nav className="navbar navbar-expand-lg bg-success fw-bolder" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Website </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to ="/admin" > Trang chủ </Link> 
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown">
            Quản trị loại
          </a>
          <ul className="dropdown-menu">
            <li> <Link className="dropdown-item" to ="/admin/loai_them">Thêm loại </Link> </li>
            <li> <Link className="dropdown-item" to ="/admin/loai_ds">Danh sách loại </Link> </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown">
            Quản trị sản phẩm
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/admin/sp_them" >Thêm sản phẩm </Link> </li>
            <li><Link className="dropdown-item" to="/admin/sp_ds" >Danh sách sản phẩm </Link> </li>
          </ul>
        </li>
        <li className="nav-item"> <Link className="nav-link" to ="/thoat" > Thoát </Link> </li>
      </ul>
    </div>
  </div>
</nav>

    </nav>
    <main className="bg-light" style={{ minHeight:'300px'}}> 
        <Outlet/>
    </main>
  </div>
  );
}
export default Admin;
