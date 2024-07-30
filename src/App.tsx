import {Routes, Route, Navigate} from "react-router-dom"

import MainLayout from "./ui/layouts/MainLayout"
import DashboardLayout from "./ui/layouts/DashboardLayout"

import ShoppingList from "./pages/ShoppingList/ShoppingList"
import AddNewProduct from "./pages/AddNewProduct/AddNewProduct"
import AddNewItem from "./pages/AddNewItem/AddNewItem"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"

import Dashboard from "./adminPages/Dashboard/Dashboard"
import AddDefaultProduct from "./adminPages/AddDefaultProduct/AddDefaultProduct"
import EditDefaultProduct from "./adminPages/EditDefaultProduct/EditDefaultProduct"

import SecureComponent from "./auth/SecureComponent"
import OutsiderComponent from "./auth/OutsiderComponent"

function App() {
  return <Routes>

    <Route path="/" element={<MainLayout />}>
      
      <Route index element={<Navigate to="/home" replace />} />

      <Route element={<OutsiderComponent />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      
      <Route path="/home">
        <Route index element={<ShoppingList />}/>
        <Route path="add-product" element={<AddNewItem />} />
        <Route element={<SecureComponent />} >
          <Route path="new-product" element={<AddNewProduct />} />     
        </Route>
      </Route>

    </Route>

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="new" element={<AddDefaultProduct />} />
      <Route path="edit/:id" element={<EditDefaultProduct />} />
    </Route>

  </Routes>
}

export default App
