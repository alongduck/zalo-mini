import React, { FC } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "zmp-ui";
import 'swiper/css';
import 'swiper/css/pagination';

export const Banner: FC = () => {
  // API hoặc CDN cung cấp URL ảnh
  const banners = [
   
    "https://cloud.muaban.net/banners/2024/09/24/494/30e0cd07abb64afca969f8af7e233d89.jpeg", 
    "https://cloud.muaban.net/banners/2024/06/06/477/97a23571397b4a49923682f2b8589697.jpg", 
    "https://cloud.muaban.net/banners/2024/06/06/477/97a23571397b4a49923682f2b8589697.jpg", 
    "https://cloud.muaban.net/banners/2024/06/06/477/97a23571397b4a49923682f2b8589697.jpg"
  ];

  return (
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        cssMode={true}
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} className="px-4">
            <Box
              className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
              style={{ backgroundImage: `url(${banner})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
