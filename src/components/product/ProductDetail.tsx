import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Swiper, Button, Icon, Center, ImageViewer, Avatar } from "zmp-ui";
import { ProductListContent } from "components/same-product-list";
import { useRecoilValueLoadable } from "recoil";
import { UserCard } from "components/UserCard";
import { Divider } from "components/divider";
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
          <Box className="mb-5">
            {/* Hình ảnh sản phẩm */}
            <Box className="mb-2">
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
              maskStyle={{backgroundColor:"#000000cc"}}
            />

            {/* Thông tin sản phẩm */}
            <Text.Header style={{ fontWeight: 700 }}>{product.name || "Sản phẩm không có tên"}</Text.Header>

            <Text size="small" className="mb-3 ml-1">{product.descriptionheader || "Đất thổ cư"}</Text>



            {/* Giá sản phẩm */}
            <Box className="d-flex flex justify-start align-center mb-3 p-4 rounded-md" style={{ backgroundColor: "#F1F4F8" }}>
              <Text size="large" bold style={{ color: "#F50000", fontWeight: 700 }}>
                {product.price ? `${product.price} Tỷ` : "liên hệ "}
              </Text>
              <Text className="pl-2 pr-2">
                -
              </Text>

              {/* giá sản phẩm trên m vuông */}
              <Text size="large" style={{ fontWeight: 700 }}>
                {product.pricedetail || "52,50 triệu/m"}
              </Text>
              <Text className="pl-2 pr-2">
                -
              </Text>

              {/*số m vuông */}
              <Text size="large" style={{ fontWeight: 700 }}>
                {product.pricedetail || "176m"}
              </Text>
            </Box>

            <Box className="mb-5">
  {/* Đặc điểm sản phẩm */}
  <Box className="flex flex-wrap" justifyContent="space-between">
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Giá/m²:</Text>
      <Text>{product.landPrice || "52,19 triệu/m²"}</Text>
    </Box>
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Giấy tờ pháp lý:</Text>
      <Text>{product.legalDocuments || "Đã có sổ"}</Text>
    </Box>
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Loại hình đất:</Text>
      <Text>{product.landType || "Đất thổ cư"}</Text>
    </Box>
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Chiều ngang:</Text>
      <Text>{product.landWidth || "6.43 m"}</Text>
    </Box>
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Đặc điểm nhà/đất:</Text>
      <Text>{product.landFeatures || "Thổ cư toàn bộ"}</Text>
    </Box>
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Diện tích đất:</Text>
      <Text>{product.landArea || "84.3 m²"}</Text>
    </Box>
    <Box className="mb-4" style={{ flexBasis: "48%" }}>
      <Text className="font-bold">Đơn vị (m²/hecta):</Text>
      <Text>{product.unit || "m²"}</Text>
    </Box>
  </Box>
</Box>


            {/* Mô tả sản phẩm */}
            <Text className=" leading-relaxed whitespace-pre-line" >
              {product.description || "Không có mô tả cho sản phẩm này."}
            </Text>

          </Box>


          {/* user card*/}
          <Box className="rounded-md p-3 border border-gray-50">
            <Box flex alignItems="center" ml={3}>
              <Avatar size={50} src={"https://static.chotot.com/storage/marketplace/common/png/default_user.png"}>
              </Avatar>
              <Box ml={4}>
                <Text.Header>Phát Huy</Text.Header>
                <Text size="xxxSmall">Môi giới </Text>
              </Box>
              <Box>
                <div className="zalo-follow-button" data-oaid="1440475408506399998" data-cover="yes" data-article="" data-width="" data-height=""></div>
              </Box>
            </Box>
          </Box>

          {/* Sản phẩm tương tự */}
          <ProductListContent />

          {/* Nút hành động */}

          <Box className="absolute bottom-0 w-full flex bg-white py-4 shadow-md justify-around left-0">
            <Button size="medium" variant="secondary" type="danger" prefixIcon={<Icon icon="zi-call" />}>
              Gọi ngay
            </Button>
            <Button prefixIcon={<Icon icon="zi-chat" />} size="medium" variant="secondary" type="highlight">
              Nhắn tin
            </Button>
            <Button icon={<Icon icon="zi-bookmark" />} size="medium" variant="secondary" type="neutral">
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
