import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthForm from "../components/Auth/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async ({ email, password }) => {
    await register(email, password);
    showToast("Account created! You are logged in.");
  };

  return (
    <>
      <Header />
      <AuthForm
        title="Create account"
        subtitle="Join us to shop for your furry friends"
        submitText="Sign up"
        onSubmit={handleSubmit}
        withConfirm
        footer={
          <>
            Already have an account? <Link to="/login">Log in</Link>
          </>
        }
      />
      <Footer />
    </>
  );
};

export default Register;