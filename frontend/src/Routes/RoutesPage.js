import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpPage from "../Pages/SignUp/SignUpPage"
import HomePage from "../Pages/HomePage/HomePage"
import LoginPage from "../Pages/Login/LoginPage"
import CustomerOrderPage from "../Pages/CustomerOrderPage/CustomerOrderPage"

const RoutesPage = ({dataIngredients, isLoadingIngredients, errorIngredients, reload, setReload})=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/customers/signup" element={<SignUpPage/>}/>
                    <Route path="/home" element={<HomePage dataIngredients={dataIngredients} isLoadingIngredients={isLoadingIngredients} errorIngredients={errorIngredients}/>}/>
                    <Route path="/orders/:id" element={<CustomerOrderPage reload={reload} setReload={setReload}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutesPage