import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/dgzwu3a6i/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","mern_product");

    const dataResponse = await axios.post(url,formData);
    console.log(dataResponse);
    return dataResponse.data;
}

export default uploadImage;
