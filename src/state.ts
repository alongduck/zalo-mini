import { atom, selector, selectorFamily } from "recoil";
import {
  authorize,
  getLocation,
  getPhoneNumber,
  getSetting,
  getUserInfo,
} from "zmp-sdk/apis";
import logo from "static/logo.png";
import { Category } from "types/category";
import { Product, Variant } from "types/product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice } from "utils/product";
import { wait } from "utils/async";
import categories from "../mock/categories.json";
import * as signalR from "@microsoft/signalr";

export const authorizedState = selector({
  key: "authorized",
  get: async () => {
    const { authSetting } = await getSetting({});
    if (!authSetting["scope.userInfo"]) {
      await authorize({ scopes: ["scope.userInfo"] });
    }
  },
});

// Selector để lấy thông tin người dùng
export const userState = selector({
  key: "user",
  get: async ({ get }) => {
    get(authorizedState); // Correct use of get
    try {
      const userInfo = await getUserInfo({ avatarType: "normal"});
      return userInfo;
    } catch (error) {
      console.error('Không thể lấy thông tin người dùng:', error);
      throw error;
    }
  },
});


export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});


let socket: WebSocket | null = null; // Biến toàn cục để lưu trữ WebSocket

// Atom lưu danh sách sản phẩm
export const productsState = atom<Product[]>({
  key: "products",
  default: [], // Danh sách mặc định rỗng
});

// Selector để lấy dữ liệu từ API và xử lý
export const productsWebSocketState = selector<Product[]>({
  key: "productsWebSocket",
  get: async () => {
    let products: Product[] = [];
    try {
      const productsResponse = await fetch("https://backdoor.tokyo/api/Product");
      if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
      }
      products = await productsResponse.json();
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }

    // Lấy variants từ file cục bộ
    const variants = (await import("../mock/variants.json")).default as Variant[];

    // Ghép variants vào sản phẩm
    return products.map((product) => ({
      ...product,
      variants: (product.variants || []).map((variant) => {
        return variants.find((v) => v.id === variant.id) || variant;
      }),
    }));
  },
});


export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId),
      );
    },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product, item.options),
      0,
    );
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng Sky Eagle",
    }
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase()),
    );
  },
});




export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token,
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app",
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token,
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app",
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "1111111111";
    }
    return false;
  },
}); 