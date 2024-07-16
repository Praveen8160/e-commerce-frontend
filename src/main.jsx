import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import MyOrder from "./Pages/MyOrder.jsx";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Product from "./Pages/Product.jsx";
import ProductView from "./Pages/ProductView.jsx";
import Cart from "./Pages/Cart.jsx";

const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="" element={<Home></Home>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/myOrder" element={<MyOrder></MyOrder>}></Route>
      <Route path="/SignIn" element={<SignIn></SignIn>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route path="/products/:id" element={<Product></Product>}></Route>
      <Route path="/products" element={<Product></Product>}></Route>
      <Route path="/product/:id" element={<ProductView></ProductView>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rout} />
  </React.StrictMode>
);
