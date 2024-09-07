import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter,Routes, Route } from "react-router-dom";

import App from './App';
import Home from './Home';
import ChiTietSP from './ChiTietSP';
import SPTrongLoai from './SPTrongLoai';
import NotFound from './NotFound';
// import CamOn from './CamOn';

import Admin from './QuanTri/Admin';
import ThongKe from './QuanTri/ThongKe';
import ThemSP from './QuanTri/SP_Them';
import SuaSP from './QuanTri/SP_Sua';
import DanhSachSP from './QuanTri/SP_Ds';
import ThemLoai from './QuanTri/Loai_Them';
import SuaLoai from './QuanTri/Loai_Sua';
import DanhSachLoai from './QuanTri/Loai_Ds';
import DangNhap from './DangNhap';
import UserInfo from './UserInfo';
import ProtectedRoute from './ProtectedRoute';
import ShowCart from './ShowCart';
import Thoat from './Thoat';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route  path="/" element= {<> <UserInfo/> <App /> </>} >
          <Route path="/" element={<Home/>} />
          <Route path="/sp/:id" element={<ChiTietSP/>} />
          <Route path="/loai/:id_loai" element={<SPTrongLoai/>} />
          <Route path="/dangnhap" element={<DangNhap/>} />
          <Route path="/showcart" element={<ShowCart/>} />
          <Route path="/thoat" element={<Thoat/>} />
          <Route element={<NotFound/>}/>
      </Route>
      <Route  path="/admin" element= {<> <UserInfo/> <ProtectedRoute/> <Admin /> </> }>
          <Route path="/admin" element={<ThongKe/>}  />
          <Route path="sp_ds" element={<DanhSachSP/>} />
          <Route path="sp_them" element={<ThemSP/>} />
          <Route path="sp_sua/:id" element={<SuaSP/>} />
          <Route path="loai_ds/" element={<DanhSachLoai/>} />
          <Route path="loai_them" element={<ThemLoai/>} />
          <Route path="loai_sua/:id" element={<SuaLoai/>} />    
      </Route>
    </Routes>
   
  </BrowserRouter>
</Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
