import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateUser from "./pages/UpdateUser";
import UploadPhoto from "./pages/UploadPhoto";
import AddCard from "./pages/AddCard";
import UpdateCard from "./pages/UpdateCard";
import AddSubscription from "./pages/AddSubscription";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


// Páginas de administrador
import NewAdmin from "./pages/NewAdmin";
import AdminAddVideo from "./pages/AdminAddVideo";
import AdminAllVideos from "./pages/AdminAllVideos";
import AdminVideosByYear from "./pages/AdminVideosByYear";
import AdminVideosByTitle from "./pages/AdminVideosByTitle";
import AdminMenu from "./pages/AdminMenu";
import CancelSubscription from "./pages/CancelSubscription";
import WatchHistory from "./pages/WatchHistory";
import WatchPlayer from "./pages/WatchPlayer";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Rutas de usuario */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/upload-photo" element={<UploadPhoto />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/update-card" element={<UpdateCard />} />
        <Route path="/add-subscription" element={<AddSubscription />} />
        <Route path="/home" element={<Home />} />

        {/* Rutas de administrador */}
        <Route path="/new-admin" element={<NewAdmin />} />
        <Route path="/admin/add-video" element={<AdminAddVideo />} />
        <Route path="/admin/all" element={<AdminAllVideos />} />
        <Route path="/admin/by-year" element={<AdminVideosByYear />} />
        <Route path="/admin/by-title" element={<AdminVideosByTitle />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/cancel-subscription" element={<CancelSubscription />} />
        <Route path="/watch-history" element={<WatchHistory />} />
        <Route path="/watch-player" element={<WatchPlayer />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />

        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
