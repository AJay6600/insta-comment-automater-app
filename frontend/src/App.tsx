import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import { useAppData } from "./context/AppContext";
import { useGetAllAccounts } from "./hooks/useGetAllAccounts";
import { useEffect } from "react";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
  const { setInstagramAccounts } = useAppData();

  const { data, isPending, error } = useGetAllAccounts();

  useEffect(() => {
    if (data && Array.isArray(data.accounts)) {
      const accountData = data.accounts.map((account) => ({
        id: account.id,
        userName: account.userName,
        isActive: account.isActive,
      }));

      setInstagramAccounts(accountData);
    } else {
      setInstagramAccounts([]);
    }
  }, [data, setInstagramAccounts]);

  if (isPending) {
    return (
      <div className="h-[100vh] bg-secondary flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[100vh] bg-secondary flex justify-center items-center">
        <Error error={error} />
      </div>
    );
  }

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
