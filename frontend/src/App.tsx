import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/instagram-accounts" element={<Accounts />} />
      </Route>
    </Routes>
  );
}

export default App;
