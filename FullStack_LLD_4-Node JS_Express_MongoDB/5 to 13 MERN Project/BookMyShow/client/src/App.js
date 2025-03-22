import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import '@ant-design/v5-patch-for-react-19';

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
