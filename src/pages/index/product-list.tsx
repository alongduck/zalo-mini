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
    { id: "1", name: "Biệt Thự" },
    { id: "2", name: "Mặt Tiền" },
    { id: "3", name: "Tòa Nhà" },
    { id: "4", name: "Đất" },
    { id: "5", name: "COMPOUND" },
    { id: "6", name: "VILLA" },
  ];

  // Hàm lọc sản phẩm theo danh mục
  const filterProductsByCategory = (categoryName: string) => {
    return products.filter((product) =>
      Array.isArray(product.categoryId) // Kiểm tra nếu categoryId là mảng
        ? product.categoryId.includes(categoryName) // Nếu là mảng, kiểm tra bằng includes
        : product.categoryId === categoryName // Nếu là chuỗi, so sánh trực tiếp
    );
  };

  // Hàm điều hướng đến danh mục
  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId); // Lưu ID danh mục đã chọn
    navigate("/category"); // Chuyển hướng đến trang danh mục
  };

  return (
    <>
      <Box p={4} className="bg-white">
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
            <Box>
              {/* Container vuốt qua lại */}
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
            </Box>
            <Divider size={2} />
          </Section>
        ))}
      </Box>
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
