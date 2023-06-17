import 'bulma/css/bulma.css'
import Navbar from "./navbar";
import CreateTeam from "./CreateTeam";
import Footer from "./Footer";
import Accepted from "./accepted";
import Pending from "./pending";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Teams from "./teams";
import EditTeam from "./editteam";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTeam />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/Accepted" element={<Accepted />} />
        <Route path="/Pending" element={<Pending />} />
        <Route path="/edit/:id" element={<EditTeam />} />
      </Routes>
      <Footer />
    </div >
  );
}

export default App;
