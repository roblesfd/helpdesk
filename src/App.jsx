import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import DashMain from "./components/DashMain";
import TicketEdit from "./features/tickets/TicketEdit";
import ArticleList from "./features/articles/ArticleList";
import ArticleEdit from "./features/articles/ArticleEdit";
import ArticleCreate from "./features/articles/ArticleCreate";
import NotificationsPage from "./features/notifications/NotificationsPage";
import UserCreate from "./features/users/UserCreate";
import TicketCreate from "./features/tickets/TicketCreate";
import Signup from "./features/auth/Signup";
import PasswordRecovery from "./features/auth/PasswordRecovery";
import UserProfile from "./features/users/user-profile/UserProfile";
import TicketsPage from "./features/tickets/TicketsPage";
import UsersPage from "./features/users/UsersPage";
import UserEdit from "./features/users/UserEdit";
import NotFound from "./components/404";
import Home from "./features/website/Home";
import KnowledgeBasePage from "./features/website/knowledge-base/KnowledgeBasePage";
import KnowledgeBaseArticle from "./features/website/knowledge-base/KnowledgeBaseArticle";
import KnowledgeBaseLayout from "./features/website/knowledge-base/KnowledgeBaseLayout";
import ClientLogin from "./features/website/client/ClientLogin";
import ClientSignup from "./features/website/client/ClientSignup";
import ClientProfilePage from "./features/website/client/ClientProfilePage";
import PersistLogin from "./features/auth/PersistLogin";
import useAuth from "./hooks/useAuth";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ProtectedRouteClient from "./components/ProtectedRouteClient";
import PersistLoginAdmin from "./features/auth/PersistLoginAdmin";
import KnowledgeBaseSearch from "./features/website/knowledge-base/KnowledgeBaseSearch";
import CreatedAccount from "./features/auth/CreatedAccount";
import ConfirmAccount from "./features/auth/ConfirmAccount";
import ClientTicketCreate from "./features/website/ClientTicketCreate";

function App() {
  const { roles, username } = useAuth();

  return (
    <Routes>
      {/* Rutas website */}
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="recuperacion-de-contrasena"
            element={<PasswordRecovery />}
          />
          <Route path="ingresar" element={<ClientLogin />} />
          <Route path="registrarse" element={<ClientSignup />} />
          <Route path="cuenta-creada" element={<CreatedAccount />} />
          <Route path="confirmar/:token" element={<ConfirmAccount />} />

          <Route path="articulos" element={<KnowledgeBaseLayout />}>
            <Route index element={<KnowledgeBasePage />} />
            <Route path=":id" element={<KnowledgeBaseArticle />} />
            <Route path="search" element={<KnowledgeBaseSearch />} />
          </Route>
          <Route element={<ProtectedRouteClient user={username} />}>
            <Route path="usuarios" element={<ClientProfilePage />}>
              <Route path=":id" index element={<ClientProfilePage />} />
            </Route>
          </Route>
          <Route path="mesa-de-ayuda" element={<ClientTicketCreate />} />
        </Route>
      </Route>
      {/* Rutas admin panel */}
      <Route element={<ProtectedRouteAdmin roles={roles} />}>
        <Route path="panel">
          <Route path="iniciar-sesion" element={<Login />} />
          <Route path="registro" element={<Signup />} />
          <Route element={<PersistLoginAdmin />}>
            <Route element={<DashLayout />}>
              <Route index element={<DashMain />} />
              <Route path="usuarios">
                <Route index element={<UsersPage />} />
                <Route path=":id">
                  <Route index element={<UserProfile />} />
                  <Route path="editar" element={<UserEdit />} />
                </Route>
                <Route path="nuevo" element={<UserCreate />} />
              </Route>
              <Route path="tickets">
                <Route index element={<TicketsPage />} />
                <Route path=":id" element={<TicketEdit />} />
                <Route path="nuevo" element={<TicketCreate />} />
              </Route>
              <Route path="base-de-conocimiento">
                <Route index element={<ArticleList />} />
                <Route path=":id" element={<ArticleEdit />} />
                <Route path="nuevo" element={<ArticleCreate />} />
                <Route path="nuevo" element={<ArticleCreate />} />
              </Route>
              <Route path="notificaciones">
                <Route index element={<NotificationsPage />} />
              </Route>
            </Route>
            {/* </Route> */}
          </Route>
        </Route>
      </Route>
      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
