// import React, { useState } from "react";
// import { MdEdit } from "react-icons/md";
// import AdminEditProduct from "./AdminEditProduct";
// import displayINRCurrency from "../helpers/displayCurrency";

// const AdminProductCard = ({ data, fetchAllProducts }) => {
//   const [editProduct, setEditProduct] = useState(false);

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 transition-all hover:shadow-xl hover:scale-105">
//       <div className="w-40">
//         <img src={data?.productImages[0]} width={120} height={120} className="w-fit mx-auto" alt="" />
//         <h1 className="">{data.productName}</h1>

//         <div>
//           <p>{displayINRCurrency(data?.sellingPrice)}</p>

//           <button
//             className="w-fit bg-green-200 p-2 right-0 rounded-full cursor-pointer hover:bg-green-400 hover:text-white"
//             onClick={() => setEditProduct(true)}
//           >
//             <MdEdit />
//           </button>
//         </div>

//       </div>

//       {editProduct && (
//         <AdminEditProduct
//           fetchAllProducts={fetchAllProducts}
//           data={data}
//           onClose={() => setEditProduct(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminProductCard;

import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchAllProducts }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-1/6">
      {/* Product Image */}
      <div className="w-full flex justify-center items-center hover:scale-105">
        <img
          src={data?.productImages[0]}
          alt={data?.productName}
          className="w-fit h-40 object-cover rounded-t-md transition-transform hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <h1 className="text-lg font-semibold text-gray-700 mb-2 truncate">
          {data.productName}
        </h1>

        <p className="text-sm text-gray-500 mb-2">Brand: {data.brandName}</p>

        {/* Price */}
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-green-600">
            {displayINRCurrency(data?.sellingPrice)}
          </p>

          {/* Edit Button */}
          <button
            className="bg-green-500 text-white p-2 rounded-full transition-transform hover:scale-110"
            onClick={() => setEditProduct(true)}
          >
            <MdEdit size={20} />
          </button>
        </div>
      </div>

      {/* Modal for editing product */}
      {editProduct && (
        <AdminEditProduct
          fetchAllProducts={fetchAllProducts}
          data={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
