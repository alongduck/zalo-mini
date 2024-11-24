import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Swiper, Button, Icon, Center, ImageViewer } from "zmp-ui";
import { ProductListContent } from "components/same-product-list";

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const { product } = location.state || {};

  // Chuẩn hóa danh sách URL ảnh từ API
  const images = product?.images?.map((img, index) => ({
    src: img.src || "/fallback-image-url",
    alt: `product-image-${index}`,
    key: index.toString(),
  })) || [];

  // State để quản lý hiển thị ImageViewer
  const [visible, setVisible] = useState(false); // Kiểm soát trạng thái hiển thị
  const [activeIndex, setActiveIndex] = useState(0); // Ảnh đang được chọn

  // Hàm mở ImageViewer
  const openImageViewer = (index: number) => {
    setActiveIndex(index); // Đặt ảnh đang được chọn
    setVisible(true); // Hiển thị ImageViewer
  };

  return (
    <Box p={4} className="bg-white">
      {product ? (
        <>
          <Box className="space-y-4">
            {/* Hình ảnh sản phẩm */}
            <Box>
              {images.length > 0 ? (
                <Swiper>
                  {images.map((image, index) => (
                    <Swiper.Slide key={image.key}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover object-center rounded-lg cursor-pointer"
                        style={{
                          width: "100%",
                          height: "30dvh",
                        }}
                        onClick={() => openImageViewer(index)} // Mở ImageViewer khi click
                        onError={(e) =>
                          (e.currentTarget.src = "/fallback-image-url") // Fallback URL
                        }
                      />
                    </Swiper.Slide>
                  ))}
                </Swiper>
              ) : (
                <Text>Không có ảnh sản phẩm</Text>
              )}
            </Box>

            {/* Hiển thị ImageViewer */}
            <ImageViewer
              images={images} // Danh sách URL ảnh
              visible={visible} // Hiển thị khi trạng thái visible là true
              activeIndex={activeIndex} // Ảnh hiện tại
              onClose={() => setVisible(false)} // Đóng ImageViewer
            />

            {/* Thông tin sản phẩm */}
            <Text.Title>{product.name || "Sản phẩm không có tên"}</Text.Title>
            
           <Text>{product.name || "Sản phẩm không có tên"}</Text>



            {/* Giá sản phẩm */}
            <Box className="d-flex flex justify-between align-center">
              <Text size="xLarge" bold style={{ color: "#F50000" }}>
                {product.price ? `${product.price} VNĐ` : "Giá liên hệ"}
              </Text>
            </Box>

            {/* Mô tả sản phẩm */}
            <Text>
              {product.description || "Không có mô tả cho sản phẩm này."}
            </Text>
          </Box>

          {/* Sản phẩm tương tự */}
          <ProductListContent />

          {/* Nút hành động */}
          <Box className="fixed bottom-0 w-full flex bg-white py-4 shadow-md gap-3.5" >
            <Button size="medium" variant="primary"  prefixIcon={<Icon icon="zi-call" />}>
              Gọi ngay
            </Button>
            <Button
              prefixIcon={<Icon icon="zi-chat" />}
              size="medium"
              variant="primary"
            >
              Nhắn tin
            </Button>
            <Button
              
              icon={<Icon icon="zi-heart" />}
              variant="secondary"
              type="danger"
            >
              
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
