import axios from "axios";
import {toast} from "react-toastify";

const addToCart = async (e,id) => {
    e?.stopPropagation();
    e?.preventDefault();
    
    const response = await axios.post(
        "http://localhost:8080/api/addtocart",
        {
          productId:id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
    )

    const dataResponse = response.data;
    console.log(dataResponse);
    
    if(dataResponse.success) {
        toast.success(dataResponse.message);
    }

    if(dataResponse.error) {
        toast.error(dataResponse.message);
    }
}

export default addToCart;