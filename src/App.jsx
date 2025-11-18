//react
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignUpOwner from "./pages/SignUpOwner";
import VehicleCreate from "./pages/VehicleCreate";
import VehicleEdit from "./pages/VehicleEdit";
import VehicleList from "./pages/VehicleList";

//components
import HomePage from "./components/Layout";

//context
import { UserProvider } from "./context/UserContext";
import { ParkingProvider } from "./context/ParkingContext";
import { BookingsProvider } from "./context/BookingsContext";
import { SideNavProvider } from "./context/SideNavContext";
import { VehicleProvider } from "./context/VehicleContext";

function App() {
  return (
    <>
      <UserProvider>
        <SideNavProvider>
          <ParkingProvider>
            <BookingsProvider>
              <VehicleProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signup-parkowner" element={<SignUpOwner />} />
                  <Route path="/home/*" element={<HomePage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/vehicle-create" element={<VehicleCreate/>} />
                  <Route path="/vehicle-edit/:id" element={<VehicleEdit/>} />
                  <Route path="/vehicle-list" element={<VehicleList/>} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                </Routes>
              </VehicleProvider>
            </BookingsProvider>
          </ParkingProvider>
        </SideNavProvider>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
