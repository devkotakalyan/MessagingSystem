import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ style: { background: "#1e293b", color: "#fff" } }} />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
