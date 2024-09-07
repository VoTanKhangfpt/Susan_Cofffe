// App.js
import './App.css';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
function App() {
  return (
    <div className="container">
      <header className="positon-relative d-flex" style={{ }}>
        <div className="col-md-2 h-100 d-flex justify-content-center"> 
            <div id="logo">SUSAN CÀ PHÊ</div>
        </div>
        <div className="col-md-10 position-relative">  
          <Menu></Menu>
        </div>
      </header>
      <main className="bg-light" style={{ minHeight:'300px'}}>  
         <Outlet/>
      </main>
      <footer className="">
      </footer>
    </div>
  );
}
export default App;

