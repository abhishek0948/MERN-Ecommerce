import axios from "axios";
import {toast} from "react-toastify";

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await axios.post('http://localhost:8080/api/category-products',{category});
        // console.log(response.data);
        return response;
    } catch (err) {
        console.log(err);
        toast.error("Error in Fetching Products");
    }
}

export default fetchCategoryWiseProduct;