import React, { FC } from "react";
import { Box, Header, Input, Text, useNavigate } from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";

export const Welcome: FC = () => {
  const user = useRecoilValueLoadable(userState);
  const navigate = useNavigate();
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      style={{ paddingTop: "32px" }}
      title={
        (
          <Box flex alignItems="center" className="">
           
            <Box>
            <Input.Search
            style={{height:35 , width:240}}
            onFocus={() => navigate("/search")}
              placeholder="Tìm kiếm ..."
            />
           
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
