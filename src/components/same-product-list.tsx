import React, { FC, Suspense, useEffect } from "react";
import { Section } from "components/section";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { productsWebSocketState, productsState, selectedCategoryIdState } from "state";
import { Box, Button, Icon } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { Divider } from "components/divider";
import { useNavigate } from "react-router";

export const ProductListContent: FC = () => {
  const [products, setProducts] = useRecoilState(productsState); // Lấy và cập nhật danh sách sản phẩm
  const productsFromSelector = useRecoilValue(productsWebSocketState); // Lấy danh sách từ selector
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState); // Đặt danh mục đã chọn
  const navigate = useNavigate();

  // Cập nhật atom với dữ liệu từ selector khi dữ liệu thay đổi
  useEffect(() => {
    setProducts(productsFromSelector);
  }, [productsFromSelector, setProducts]);

  // Mảng các danh mục hoặc tiêu đề mà bạn muốn lặp qua
  const categories = [
    { id: "7", name: "Tin đăng khác" },
    { id: "8", name: "Tin tức" },
  ];

  // Hàm lọc sản phẩm theo danh mục
  const filterProductsByCategory = (categoryId: string) => {
    return products.filter((product) =>
      Array.isArray(product.categoryId) // Kiểm tra nếu categoryId là mảng
        ? product.categoryId.includes(categoryId) // Nếu là mảng, kiểm tra bằng includes
        : product.categoryId === categoryId // Nếu là chuỗi, so sánh trực tiếp
    );
  };

  // Hàm điều hướng đến danh mục
  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId); // Lưu ID danh mục đã chọn
    navigate("/category"); // Chuyển hướng đến trang danh mục
  };

  return (
    <>
<<<<<<< HEAD
      {categories.map((category, index) => (
        <Section
          key={index}
          title={category.name}
          actionButton={
            <Button
              size="large"
              variant="tertiary"
              suffixIcon={<Icon icon="zi-chevron-right" />}
              className="left-6 p-0 animate-pulse"
              onClick={() => gotoCategory(category.id)} // Điều hướng khi nhấn nút
            >
              Xem thêm
            </Button>
          }
        >
          {/* Danh sách sản phẩm */}
          <Box className="alignItems-center">
            <Box
              className="flex flex-nowrap overflow-auto"
              style={{ paddingBottom: "10px" }}
            >
              {filterProductsByCategory(category.id).slice(0, 5).map((product) => (
                <Box
                  key={product.id}
                  className="flex-shrink-0"
                  style={{
                    width: "150px",
                    marginRight: "15px",
                  }}
                >
                  <ProductItem product={product} />
                </Box>
              ))}
            </Box>
=======
{categories.map((category, index) => (
  <Section
    key={index}
    title={category}
    actionButton={
      <Button  size="large"
      variant="tertiary"
      suffixIcon={<Icon icon="zi-chevron-right" />}
      className="p-0 left-7"
      >
        Xem thêm  
      </Button>
    }
  >
    {/* Danh sách sản phẩm */}
    <Box className="alignItems-center">
      <Box
        className="flex flex-nowrap overflow-auto"
        style={{ paddingBottom: "10px" }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            className="flex-shrink-0"
            style={{
              width: "150px",
              marginRight: "15px",
            }}
          >
            <ProductItem product={product} />
>>>>>>> 99d15b97f21b4aa5d4cd6ec947ced9424369e0ba
          </Box>

          <Divider size={2} />
        </Section>
      ))}
    </>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
