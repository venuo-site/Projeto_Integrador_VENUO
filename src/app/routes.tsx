import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { EstablishmentDetailsPage } from "./pages/EstablishmentDetailsPage";
import { EstablishmentManagementPage } from "./pages/EstablishmentManagementPage";
import { ProfilePage } from "./pages/ProfilePage";
import { EstablishmentRegisterPage } from "./pages/EstablishmentRegisterPage";
import { UserRegisterPage } from "./pages/UserRegisterPage";
import { AboutProjectPage } from "./pages/AboutProjectPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "buscar", Component: SearchResultsPage },
      { path: "local/:id", Component: EstablishmentDetailsPage },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute requireCNPJ>
            <EstablishmentManagementPage />
          </ProtectedRoute>
        )
      },
      {
        path: "perfil",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: "cadastro-estabelecimento",
        element: (
          <ProtectedRoute requireCNPJ>
            <EstablishmentRegisterPage />
          </ProtectedRoute>
        )
      },
      { path: "cadastro-usuario", Component: UserRegisterPage },
      { path: "sobre-projeto", Component: AboutProjectPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
