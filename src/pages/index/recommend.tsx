import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductItem } from "components/product/item";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { productsState, recommendProductsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";

// Hàm chọn ngẫu nhiên sản phẩm
const getRandomProducts = (products: any[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count); // Lấy `count` sản phẩm đầu tiên
};

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(productsState);

  // Lấy 5 sản phẩm ngẫu nhiên
  const randomProducts = getRandomProducts(recommendProducts, 5);

  return (
    <Section title="Gợi ý cho bạn" >
      <Swiper slidesPerView={1.25}  style={{width:"170px"}}>
        {randomProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="Gợi ý cho bạn">
      <Swiper slidesPerView={1.25} style={{width:"170px"}}  className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
