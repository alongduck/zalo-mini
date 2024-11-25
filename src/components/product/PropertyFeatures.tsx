import React from "react";
import {
  CurrencyDollarIcon,
  DocumentIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  BuildingOfficeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Box, Text } from "zmp-ui";

// Define the interface for the props
interface PropertyFeaturesProps {
  landPrice?: string;
  legalDocuments?: string;
  landType?: string;
  landWidth?: string;
  landLength?: string;
  landFeatures?: string;
  landarea?:string;
}

// Define the component
const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  landPrice = "1,09"+" triệu/m²",
  legalDocuments = "Đang chờ sổ",
  landType = "Đất thổ cư",
  landWidth = "6"+"M",
  landLength = "140"+"M",
  landFeatures = "Mặt tiền, Nở hậu, Hẻm xe hơi",
  landarea="800"+"M"
}) => {
  return (
    <Box className="mb-5">
      <Text.Header style={{ fontWeight: 700, marginBottom: "16px" }}>Đặc điểm bất động sản:</Text.Header>

      {/* Danh sách đặc điểm */}
      <Box className="space-y-6">
        {/* Giá/m² */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Giá/m²:</Text>
          </Box>
          <Text className="text-red-400">{landPrice}</Text>
        </Box>

        {/* Giấy tờ pháp lý */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <DocumentIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Giấy tờ pháp lý:</Text>
          </Box>
          <Text className="text-red-400">{legalDocuments}</Text>
        </Box>

        {/* Loại hình đất */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <BuildingOfficeIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Loại hình đất:</Text>
          </Box>
          <Text className="text-red-400">{landType}</Text>
        </Box>

        {/* Chiều ngang */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <ArrowsRightLeftIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Chiều ngang:</Text>
          </Box>
          <Text className="text-red-400">{landWidth}</Text>
        </Box>

        {/* Chiều dài */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <ArrowsUpDownIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Chiều dài:</Text>
          </Box>
          <Text className="text-red-400">{landLength}</Text>
        </Box>

        {/* Đặc điểm nhà/đất */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <HomeIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Đặc điểm:</Text>
          </Box>
          <Text className="text-red-400">{landFeatures}</Text>
        </Box>
         {/* Diện tích nhà/đất */}
         <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <HomeIcon className="h-5 w-5 mr-3 text-gray-500" />
            <Text bold>Diện tích:</Text>
          </Box>
          <Text className="text-red-400">{landarea}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyFeatures;
