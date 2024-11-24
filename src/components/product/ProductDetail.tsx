import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, ImageViewer, Button, Icon, Center } from "zmp-ui";
import { ProductListContent } from "components/same-product-list";

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Lấy thông tin sản phẩm từ state

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = product?.images?.length > 0 ? product.images : [product?.image];

  const toggleImageViewer = (index: number) => {
    if (visible && activeIndex === index) {
      setVisible(false); // Nếu ImageViewer đã mở và đang hiển thị ảnh này => Đóng lại
    } else {
      setActiveIndex(index); // Cập nhật ảnh đang hiển thị
      setVisible(true); // Hiển thị ImageViewer
    }
  };

  return (
    <Box p={4} className="bg-white">
      {product ? (
        <>
          <Box className="space-y-4 ">
            {/* Hình ảnh sản phẩm */}
            <Box >
              {images?.length > 0 ? (
                <Box flex flexDirection="row">
                  {images.map((image, index) => (
                    <Box
                      key={index}
                      mr={1}
                      mb={1}
                      style={{
                        width: "100%",
                        height: "30dvh",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={image}
                        alt={`product-image-${index}`}
                        className="object-cover object-center rounded-lg cursor-pointer"
                        style={{ width: "100%", height: "30dvh" }}
                        onError={(e) =>
                          (e.currentTarget.src = "/fallback-image-url")
                        }
                        onClick={() => toggleImageViewer(index)} // Toggle ImageViewer
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text>Không có ảnh sản phẩm</Text>
              )}
            </Box>

            {/* ImageViewer */}
            <ImageViewer
              images={images}
              activeIndex={activeIndex}
              visible={visible}
              onClose={() => setVisible(false)}
            />

            {/* Thông tin sản phẩm */}
            <Text.Title>{product.name || "Sản phẩm không có tên"}</Text.Title>

            {/* Giá sản phẩm */}
            <Box className="d-flex flex justify-between align-center">
              <Text size="xLarge" bold style={{ color: "#F50000" }}>
                {product.price ? `${product.price} Tỷ` : "Giá liên hệ"}
              </Text>
            </Box>

            {/* Mô tả sản phẩm */}
            <Text>
              {product.description || "Không có mô tả cho sản phẩm này."}
            </Text>

       
          </Box>

          {/* Sản phẩm tương tự */}
          <ProductListContent />
          <Box
              className="fixed bottom-0 w-full flex justify-around bg-white py-4 shadow-md"
              
            >
              <Button
              
                size="medium"
                variant="primary"
                
                style={{width:50}}
              > <Center>
                    Gọi ngay
              </Center>
                
              </Button>
              <Button
                prefixIcon={<Icon icon="zi-chat" />}
                size="medium"
                variant="primary"
              >
                Chat
              </Button>
              <Button
                size="medium"
                prefixIcon={<Icon icon="zi-heart" />}
                variant="secondary"
                type="danger"
              >
                Thích
              </Button>
            </Box>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default ProductDetail;
