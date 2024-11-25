import React, { FC } from "react";
import { useNavigate } from "react-router-dom"; // Hook điều hướng
import { Product } from "types/product";
import { Box, Text } from "zmp-ui";
import { FinalPrice } from "components/display/final-price";


export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate(); // Hook điều hướng

  // Hàm điều hướng tới trang chi tiết sản phẩm
  const handleNavigateToDetail = () => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  return (

        <div className=""  onClick={handleNavigateToDetail}> {/* Khi nhấn vào item sẽ điều hướng đến trang chi tiết */}
            <Box  className="aspect-square "
            style={{ width: "150px",maxWidth:"150px", height: "200px" }}
            >
              {/* Hình ảnh sản phẩm */}
              <img
                loading="lazy"
                src={product.images[0]?.src || "fallback-image-url.jpg"}
                style={{ width: "150px", height: "150px" }}
                className="left-0 right-0 top-0 bottom-0 object-cover object-center rounded-lg bg-skeleton"
                alt={product.name}
              />

              
                <Text className="inline-block w-full whitespace-nowrap overflow-hidden truncate">
                  {product.name}
                </Text>
             
              
              

              {/* Giá sản phẩm: cũng hiển thị 1 dòng */}
              <Text size="xxSmall" className="text-gray pb-2 text-truncate" style={{ maxWidth: "150px" }}>
                <FinalPrice>{product}</FinalPrice>
              </Text>
            </Box>

         
        </div>

  );
};
