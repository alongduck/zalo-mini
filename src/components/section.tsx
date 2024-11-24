import React, { FC } from "react";
import { Box } from "zmp-ui";

interface SectionProps {
  title: string;
  actionButton?: React.ReactNode; // Thêm nút tùy chọn
  children: React.ReactNode;
}

export const Section: FC<SectionProps> = ({ title, actionButton, children }) => {
  return (
    <Box style={{ padding: "16px 0" }}>
      {/* Tiêu đề và nút trong cùng một hàng */}
      <Box
        className="flex justify-between items-center mb-4"
     
      >
        <span className="text-lg font-bold">{title}</span>
        {actionButton}
      </Box>
      {/* Nội dung của Section */}
      {children}
    </Box>
  );
};
