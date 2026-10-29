import { Link, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthForm from "../components/Auth/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async ({ email, password }) => {
    await login(email, password);
    showToast("Welcome back!");
  };

  return (
    <>
      <Header />
      <AuthForm
        title="Welcome back"
        subtitle="Log in to manage your cart and orders"
        submitText="Log in"
        onSubmit={handleSubmit}
        footer={
          <>
            Don't have an account? <Link to="/register">Sign up</Link>
          </>
        }
      />
      <Footer />
    </>
  );
};

export default Login;