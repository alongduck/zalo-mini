// ProfilePage.tsx or similar component file
import React, { FC, useState, useEffect } from "react";
import { Avatar, Box, Header, Text, Page } from "zmp-ui";
import { fetchPhoneNumberAutomatically } from "utils/requestPhoneNumber"; // Correct import path
import { userState } from "state";
import { useRecoilValueLoadable } from "recoil";
import { UserCard as UserCard_1 } from "components/UserCard";


// ProfilePage component
const ProfilePage: FC = () => {

  return (
    <Page>
      <Header showBackIcon={false} title="Tài Khoản" />
      <UserCard_1/> {/* Pass phone number to UserCard */}
    </Page>
  );
};

export default ProfilePage;
function useRecoilValue(userState: any): { userInfo: any; } {
  throw new Error("Function not implemented.");
}

