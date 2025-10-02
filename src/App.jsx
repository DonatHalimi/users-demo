import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>

      <ToastContainer position="bottom-right" stacked closeOnClick />
    </Container>
  );
}

export default App
