import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import Store from "./pages/Store";

export default function App() {
  return (
    <main>
      <Routes>
        <Route index element={<Main />} />
        <Route path='/store' element={<Store />} />
      </Routes>
    </main>
  );
}
