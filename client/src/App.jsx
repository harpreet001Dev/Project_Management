import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Unauth from './pages/Unauth';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Task from './pages/Task';
import Navbar from './components/Navbar';

function PrivateRoutes({ allowedUsers }) {
  const user = useSelector((state) => state.auth.user);
  console.log(user,"user");
  
  const location = useLocation();

  

  // If there's no user, redirect to login
   // If user is not logged in (user is null), redirect to the login page
   if (user === null) {
    console.log("User is not logged in, redirecting to login.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (!allowedUsers.includes(user.role)) {  // Use user.role, not user.user.role
    console.log("User not authorized. Redirecting to /notauth.");
    return <Navigate to="/notauth" state={{ from: location }} replace />;
  }

  return (
    <div className="w-full flex min-h-screen bg-[#161717]">
    <div className="w-1/5 bg-[#202020] min-h-screen">
      <Sidebar />
    </div>
    <div className="w-4/5">
    <Navbar/> 
      <Outlet />
    </div>
  </div>
  );
  
    
}

function NotAuthRedirect() {
  const user = useSelector((state) => state.auth);

 
    if (user) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Unauth />;
 
}

function LoginRoute({ children }) {
  const user = useSelector((state) => state.auth.user);


  // If user is logged in, redirect them to the dashboard
  if (user !== null) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <main>
        <Routes>
          {/* Private Routes for authenticated users */}
          <Route element={<PrivateRoutes allowedUsers={["user", "admin"]} />}>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path='/tasks' element={<Task />} />
          </Route>

          <Route element={<PrivateRoutes allowedUsers={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Login route */}
          <Route path="/login" element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          } />

          {/* Redirect to /notauth or dashboard based on user */}
          <Route path="/notauth" element={<NotAuthRedirect />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
