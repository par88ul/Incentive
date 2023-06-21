import { AddedUsers, AddUserStats, CreateUsers,LoginAdmin, UserLogin,Split} from "./Components";
import DashBoardContent from "./Components/UserSide/Dashboard";
import AdminUser from './Components/AdminUser'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Split />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/createuser" element={<CreateUsers />} />
        <Route path="/app/createuser" element={<AdminUser />} />
        <Route path="/admin/userlist" element={<AddedUsers />} />
        <Route path="/admin/addstats/:id" element={<AddUserStats />} />
        <Route path="/app/signin" element={<UserLogin />} />
        <Route path='/app/dashboard' element={<DashBoardContent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
