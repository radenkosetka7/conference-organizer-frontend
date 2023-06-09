import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Accordion from "./pages/ConferenceList/Accordion";
import UserDetails from "./pages/UserDetails/UserDetails";
import EditConference from "./pages/EditConference/EditConference";
function App() {

  return (
      <div>
        <BrowserRouter>

          <Navbar/>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
              <Route path="/allConferences" element={<Accordion/>}/>
              <Route path="/myProfile" element={<UserDetails/>}/>
              <Route path="/editConference" element={<EditConference/>}/>
              <Route path="*" element={<NotFound/>}/>

          </Routes>

        </BrowserRouter>

      </div>
  )
}

export default App
