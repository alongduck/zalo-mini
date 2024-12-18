import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";

import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductListContent  } from "./product-list";
import { Divider } from "components/divider";
import logo from "static/logo.png";
const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      
      <Box className="flex-1 overflow-auto">
      <img
        className="w-full h-15 rounded-lg "
        src={ logo}
      />
        <Banner />
        <Suspense>
          <Categories />
        </Suspense>
        <Divider />
        <Recommend />
        <Divider />
        <ProductListContent  />
        <Divider />
        
      </Box>
    </Page>
  );
};

export default HomePage;
