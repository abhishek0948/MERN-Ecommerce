import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>
      },
      {
        path: "sign-up",
        element: <SignUp/>
      },
      {
        path: "category-product",
        element: <CategoryProduct/>
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "search",
        element: <SearchProduct />
      },
      {
        path: "success",
        element: <PaymentSuccess />
      },
      {
        path: "cancel",
        element: <PaymentCancel />
      },
      {
        path: "order/:userId",
        element: <OrderPage />
      },
      {
        path: "admin-panel",
        element: <AdminPanel/>,
        children: [
          {
            path: "all-users",
            element: <AllUsers/>
          },
          {
            path: "all-products",
            element: <AllProducts/>
          },
          {
            path: "all-orders/:userId",
            element: <AllOrder />
          }
        ]
      }
    ],
  },
]);

export default router;
