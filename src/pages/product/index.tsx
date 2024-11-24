import ProductDetail from "components/product/ProductDetail";
import React, { FC } from "react";
import { Header, Page } from "zmp-ui";


const ProductDetailPage: FC = () => {


  
  return (
    <Page className="flex flex-col">
      <Header title="Chi tiết sản phẩm" />
      <ProductDetail />
    </Page>
  );
};

export default ProductDetailPage;
