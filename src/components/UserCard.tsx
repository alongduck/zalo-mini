import React, { useEffect, useState, FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import { fetchPhoneNumberAutomatically } from "utils/requestPhoneNumber";
import { Box, Avatar, Text } from "zmp-ui";

export const UserCard: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    // Lấy số điện thoại từ localStorage nếu có
    return localStorage.getItem("phoneNumber") || "";
  });

  const user = useRecoilValueLoadable(userState);

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      if (phoneNumber) return; // Ngăn việc gọi API nếu đã có số điện thoại

      try {
        const phone = await fetchPhoneNumberAutomatically();
        setPhoneNumber(phone);
        localStorage.setItem("phoneNumber", phone); // Lưu vào localStorage để dùng sau
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    fetchPhoneNumber();
  }, [phoneNumber]);

  return (
    <Box flex alignItems="center" ml={3}>
      <Avatar size={50} src={user.contents.userInfo.avatar}>
        {user.contents.userInfo.avatar}
      </Avatar>
      <Box ml={4}>
        <Text.Title>{user.contents.userInfo.name}</Text.Title>
        <Text size="xxxSmall">Số điện thoại: {phoneNumber || "chưa có"}</Text>
        <Text size="xxxSmall">UID: {user.contents.userInfo.id}</Text>
      </Box>
      <Box>
        <div className="zalo-follow-button" data-oaid="1440475408506399998" data-cover="yes" data-article="" data-width="" data-height=""></div>
      </Box>
    </Box>
  );
};
