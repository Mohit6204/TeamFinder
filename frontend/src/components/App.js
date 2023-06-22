import 'bulma/css/bulma.css'
import Navbar from "./navbar/navbar";
import CreateTeam from "./CreateTeam";
import Footer from "./Footer";
import Accepted from "./accepted";
import Pending from "./pending";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Teams from "./teams";
import EditTeam from "./editteam";
import Home from './home';
import Login from './login';
import Register from './register';
import store from '../store/store';
import { Provider } from 'react-redux';

function App() {
  
  return (
    <div className="h-full w-full object-cover bg-slate-200">
    <Provider store={store}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTeam />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/Accepted" element={<Accepted />} />
        <Route path="/Pending" element={<Pending />} />
        <Route path="/edit/:id" element={<EditTeam />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </Provider>
    </div >
  );
}

export default App;
