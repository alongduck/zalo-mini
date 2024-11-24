import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { matchStatusBarColor } from "utils/device";
import { EventName, events, Payment } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";

export function useMatchStatusTextColor(visible?: boolean) {
  const changedRef = useRef(false);
  useEffect(() => {
    if (changedRef.current) {
      matchStatusBarColor(visible ?? false);
    } else {
      changedRef.current = true;
    }
  }, [visible]);
}

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const detectKeyboardOpen = () => {
      setVisible(window.innerHeight + 160 < originalScreenHeight);
    };
    window.addEventListener("resize", detectKeyboardOpen);
    return () => {
      window.removeEventListener("resize", detectKeyboardOpen);
    };
  }, []);

  return visible;
}

export const useHandlePayment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    events.on(EventName.OpenApp, (data) => {
      if (data?.path) {
        navigate(data?.path, {
          state: data,
        });
      }
    });

    events.on(EventName.OnDataCallback, (resp) => {
      const { appTransID, eventType } = resp;
      if (appTransID || eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate("/result", {
          state: resp,
        });
      }
    });

    events.on(EventName.PaymentClose, (data = {}) => {
      const { zmpOrderId } = data;
      navigate("/result", {
        state: { data: { zmpOrderId } },
      });
    });
  }, []);
};

export function useToBeImplemented() {
  const snackbar = useSnackbar();
  return () =>
    snackbar.openSnackbar({
      type: "success",
      text: "Chức năng dành cho các bên tích hợp phát triển...",
    });
}
export function useToBeImplementedUser() {
  const navigate = useNavigate();
  return () =>
    navigate("/userinfor")
}
// Hook sử dụng SSE (Server-Sent Events)
export function useSSE(url: string) {
  const [data, setData] = useState<any>(null);  // Lưu trữ dữ liệu nhận được
  const [loading, setLoading] = useState<boolean>(true);  // Trạng thái loading
  const [error, setError] = useState<string | null>(null);  // Lỗi nếu có

  useEffect(() => {
    // Tạo kết nối với server sử dụng SSE
    const eventSource = new EventSource(url);

    // Lắng nghe sự kiện 'message' để nhận dữ liệu
    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);  // Phân tích dữ liệu JSON nhận được
        setData(parsedData);
        setLoading(false);
      } catch (err) {
        setError("Lỗi phân tích dữ liệu.");
        setLoading(false);
      }
    };

    // Lắng nghe sự kiện lỗi
    eventSource.onerror = () => {
      setError("Lỗi kết nối SSE.");
      setLoading(false);
    };

    // Cleanup khi component unmount hoặc URL thay đổi
    return () => {
      eventSource.close();
    };
  }, [url]);  // Hook này sẽ chạy lại khi URL thay đổi

  return { data, loading, error };  // Trả về dữ liệu, trạng thái loading và lỗi
}