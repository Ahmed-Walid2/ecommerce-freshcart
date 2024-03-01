// import logo from "./logo.svg";
import { Offline } from "react-detect-offline";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Layout from "./Components/Layout/Layout";
import Categories from "./Components/Categories/Categories";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyPassword from "./Components/VerifyPassword/VerifyPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import AuthContextProvider from "./context/AuthContext.js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LoginProtectedRoute from "./Components/LoginProtectedRoute/LoginProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartProvider from "./context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Components/Checkout/Checkout";
import MyOrders from "./Components/MyOrders/MyOrders";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand";
import Wishlist from "./Components/Wishlist/Wishlist";

function App() {
  const query = new QueryClient();
  const routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: "true",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands/:id",
          element: (
            <ProtectedRoute>
              <SpecificBrand />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <LoginProtectedRoute>
              <Login />
            </LoginProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <LoginProtectedRoute>
              <Register />
            </LoginProtectedRoute>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <LoginProtectedRoute>
              <ForgotPassword />
            </LoginProtectedRoute>
          ),
        },
        {
          path: "verify-password",
          element: (
            <LoginProtectedRoute>
              <VerifyPassword />
            </LoginProtectedRoute>
          ),
        },
        {
          path: "reset-password",
          element: (
            <LoginProtectedRoute>
              <ResetPassword />
            </LoginProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <AuthContextProvider>
      <Offline>
        <div className="alert alert-danger position-fixed bottom-0 start-0 z-3 mb-0">
          You are currently offline !
        </div>
      </Offline>
      <CartProvider>
        <QueryClientProvider client={query}>
          <RouterProvider router={routes} />
          <ToastContainer />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
