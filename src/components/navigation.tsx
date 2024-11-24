import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/category": {
    label: "Sản phẩm",
    icon: <Icon icon="zi-more-grid" />,
    activeIcon: <Icon icon="zi-more-grid-solid" />,
  },
  "/notification": {
    label: "Yêu thích",
    icon: <Icon icon="zi-heart" />,
    activeIcon: <Icon icon="zi-heart-solid" />,
  },
  "/cart": {
    label: "Liên Hệ",
    icon: <Icon icon="zi-chat" />,
    activeIcon: <Icon icon="zi-chat-solid" />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
    activeIcon: <Icon icon="zi-user-solid" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/result"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return (
      NO_BOTTOM_NAVIGATION_PAGES.some((page) => location.pathname.startsWith(page)) ||
      location.pathname.startsWith("/product-detail")
    );
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return null;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => navigate(path)}
        />
      ))}
    </BottomNavigation>
  );
};
