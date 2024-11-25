import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Swiper, Button, Icon, Center, ImageViewer, Avatar } from "zmp-ui";
import { ProductListContent } from "components/same-product-list";
import { useRecoilValueLoadable } from "recoil";
import { Divider } from "components/divider";
import logo from "static/logo.png";
import {
  CurrencyDollarIcon,
  DocumentIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  BuildingOfficeIcon,
  HomeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import PropertyFeatures from "./PropertyFeatures";
import MapView from "components/display/MapView";
import SaleCard from "./SaleCard";

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const { product } = location.state || {};

  // Chuẩn hóa danh sách URL ảnh từ API
  const images =
    product?.images?.map((img, index) => ({
      src: img.src || "/fallback-image-url",
      alt: `product-image-${index}`,
      key: index.toString(),
    })) || [];

  // State để quản lý hiển thị ImageViewer
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Hàm mở ImageViewer
  const openImageViewer = (index: number) => {
    setActiveIndex(index);
    setVisible(true);
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
                        onClick={() => openImageViewer(index)}
                        onError={(e) => (e.currentTarget.src = "/fallback-image-url")}
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
<<<<<<< HEAD
              images={images}
              visible={visible}
              activeIndex={activeIndex}
              onClose={() => setVisible(false)}
              maskStyle={{ backgroundColor: "#00000000cc" }}
=======
              images={images} // Danh sách URL ảnh
              visible={visible} // Hiển thị khi trạng thái visible là true
              activeIndex={activeIndex} // Ảnh hiện tại
              onClose={() => setVisible(false)} // Đóng ImageViewer
              maskStyle={{backgroundColor:"#000000cc"}}
>>>>>>> 99d15b97f21b4aa5d4cd6ec947ced9424369e0ba
            />

            {/* Thông tin sản phẩm */}
            <Text.Header style={{ fontWeight: 700 }}>{product.name || "Sản phẩm không có tên"}</Text.Header>

            <Text size="small" className="mb-3 ml-1">{product.descriptionheader || "Đất thổ cư"}</Text>

            {/* Giá sản phẩm */}
            <Box className="d-flex flex justify-start align-center mb-3 p-4 rounded-md" style={{ backgroundColor: "#F1F4F8" }}>
              <Text size="large" bold style={{ color: "#F50000", fontWeight: 700 }}>
<<<<<<< HEAD
                {product.price ? `${product.price} Tỷ` : "Giá liên hệ"}
=======
                {product.price ? `${product.price} Tỷ` : "liên hệ "}
>>>>>>> 99d15b97f21b4aa5d4cd6ec947ced9424369e0ba
              </Text>
              <Text className="pl-2 pr-2">-</Text>
              <Text size="large" style={{ fontWeight: 700 }}>
                {product.pricedetail || "52,50 triệu/m"}
              </Text>
<<<<<<< HEAD
              <Text className="pl-2 pr-2">-</Text>
              <Text size="large" style={{ fontWeight: 700 }}>
                {product.dientich || "999/m2"}
=======
              <Text className="pl-2 pr-2">
                -
              </Text>

              {/*số m vuông */}
              <Text size="large" style={{ fontWeight: 700 }}>
                {product.pricedetail || "176m"}
>>>>>>> 99d15b97f21b4aa5d4cd6ec947ced9424369e0ba
              </Text>
            </Box>

            {/* Địa chỉ và thời gian cập nhật */}
            <Box className="mb-5 space-y-2">
              {/* Địa chỉ */}
              <Box className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-500 mr-3" />
                <Text>{product.address || "999,lương định của, bình tân, quận 11, thành phố Hồ Chí Minh"}</Text>
              </Box>
              {/* Thời gian cập nhật */}
              <Box className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-3" />
                <Text>{product.updatedAt || "Cập nhật 3 tháng trước"}</Text>
              </Box>
            </Box>
            <PropertyFeatures
              landPrice={product.landPrice}
              legalDocuments={product.legalDocuments}
              landType={product.landType}
              landWidth={product.landWidth}
              landLength={product.landLength}
              landFeatures={product.landFeatures}
            />
            {/* Mô tả chi tiết */}
            <Box className="mb-5">
              <Text.Header style={{ fontWeight: 700, marginBottom: "16px" }}>Mô tả chi tiết</Text.Header>

<<<<<<< HEAD
              {/* Hiển thị mô tả chi tiết */}
=======

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
>>>>>>> 99d15b97f21b4aa5d4cd6ec947ced9424369e0ba
              <Box>
                <Text className="whitespace-pre-wrap leading-loose">
                  {product.description || "Không có mô tả chi tiết cho sản phẩm này."}
                </Text>
              </Box>
            </Box>

              <Box className="mb-10">
              <MapView
              latitude={product.latitude}
              longitude={product.longitude}
              address={product.address}
              zoom={15} // Tùy chọn zoom nếu cần
            
            />
              </Box>
           
             {/*sale card */}
             <SaleCard name={"Phát Huy"} avatarUrl={""} role={"môi giới"} lastActive={"3 tháng trước"} responseRate={"1"} postCount={10} yearsActive={10} />
            
            {/*List sản phẩm khác + tin tức */}
            <ProductListContent/>
            
          </Box>
          {/* Nút hành động */}

          <Box className="absolute bottom-0 w-full flex bg-white py-4 shadow-md justify-around left-0">
            <Button className="animate-bounce" size="medium" variant="secondary" type="danger" prefixIcon={<Icon icon="zi-call" />}>
              Gọi ngay
            </Button>
            <Button className="animate-bounce" prefixIcon={<Icon icon="zi-chat" />} size="medium" variant="secondary" type="highlight">
              Nhắn tin
            </Button>
            <Button icon={<Icon icon="zi-bookmark" />} size="medium" variant="secondary" type="neutral">
            </Button>

          </Box>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <img className="w-full h-15 rounded-lg mb-10" src={logo} />
    </Box>
  );
};

export default ProductDetail;
