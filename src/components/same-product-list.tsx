import React, { FC, Suspense, useEffect } from "react";
import { Section } from "components/section";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsWebSocketState, productsState } from "state";
import { Box, Button, Icon } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { Divider } from "components/divider";

export const ProductListContent: FC = () => {
  const [products, setProducts] = useRecoilState(productsState); // Lấy và cập nhật danh sách sản phẩm
  const productsFromSelector = useRecoilValue(productsWebSocketState); // Lấy danh sách từ selector
  
  // Cập nhật atom với dữ liệu từ selector khi dữ liệu thay đổi
  useEffect(() => {
    setProducts(productsFromSelector);
  }, [productsFromSelector, setProducts]);

  // Mảng các danh mục hoặc tiêu đề mà bạn muốn lặp qua
  const categories = ["Các tin đăng khác", "Tin đăng tương tự", "Tin tức"];

  return (
    <>
{categories.map((category, index) => (
  <Section
    key={index}
    title={category}
    actionButton={
      <Button  size="large"
      variant="tertiary"
      suffixIcon={<Icon icon="zi-chevron-right" />}
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
          </Box>
        ))}
      </Box>
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
