import { selector } from "recoil";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis"; // Import the SDK function
// Function to automatically fetch the phone number
export const fetchPhoneNumberAutomatically = async (): Promise<string> => {
  try {
    // Step 1: Get the access token
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return "chưa có số điện thoại";
    }

    // Step 2: Get the phone token
    const phoneToken = await new Promise<string>((resolve, reject) => {
      getPhoneNumber({
        success: (data) => {
          if (!data.token) {
            reject(new Error("Phone token is missing"));
          } else {
            resolve(data.token);
          }
        },
        fail: (error) => {
          reject(new Error("Failed to fetch phone token: " + error));
        },
      });
    });

    // Step 3: Fetch the phone number using both accessToken and phoneToken
    const phoneNumber = await fetchPhoneNumberFromApi(accessToken, phoneToken);
    
    return phoneNumber;
  } catch (error) {
    console.error("Error in fetching phone number automatically:", error);
    throw error; // Re-throw to handle upstream if needed
  }
};

// Helper function to fetch the phone number from the API
export const fetchPhoneNumberFromApi = async (accessToken: string, phoneToken: string): Promise<string> => {
  if (!accessToken || !phoneToken) {
    throw new Error("Missing access token or phone token");
  }

  const url = new URL("https://graph.zalo.me/v2.0/me/info");
  url.searchParams.append("access_token", accessToken);
  url.searchParams.append("code", phoneToken);
  url.searchParams.append("secret_key", "5u8theCVdFXM41kw4i6C");  // Ensure the key is correct

  try {
    const response = await fetch(url.toString(), {  // Use .toString() for URL to ensure correct format
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Ensure proper content type
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.data && data.data.number) {
      return data.data.number;  // Return phone number from the response
    } else {
      throw new Error("Phone number not found in response");
    }
  } catch (e) {
    console.error("Error fetching phone number from API:", e);
    throw e;  // Re-throw error after logging
  }
};