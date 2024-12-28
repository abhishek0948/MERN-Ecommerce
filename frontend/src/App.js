import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Context from './context';
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/userSlice";

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(reducer, composeWithDevTools(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));

function App() {
  const [cartProductCount,setCartProductCount] = useState(0);

  const dispatch = useDispatch();

  const fetchUserDetails = async() => {
    const dataResponse = await axios.get("http://localhost:8080/api/user-details", {
      withCredentials: true,
    });

    // console.log(dataResponse.data.data);
    if(dataResponse?.data?.success){
      dispatch(setUserDetails(dataResponse.data.data));
    }
  };

  const fetchUserAddToCartCount = async () => {
    const dataResponse = await axios.get("http://localhost:8080/api/countAddToCartProducts", {
      withCredentials: true,
    });

    if(dataResponse?.data?.success) {
      setCartProductCount(dataResponse.data.data.count);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCartCount();
  },[]);

  return (
    <div className="App">
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCartCount
      }}>

        <ToastContainer
          position="bottom-right" 
        />
        <Header />
          <main className="min-h-[calc(100vh-120px)] pt-16">
            <Outlet />
          </main>
        <Footer />

      </Context.Provider>
    </div>
  );
}

export default App;
