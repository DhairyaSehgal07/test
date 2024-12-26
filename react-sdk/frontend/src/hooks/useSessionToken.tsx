import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../utils/const";

export const useSessionToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * @route   POST https://api.gocobalt.io/api/v2/public/session-token
   * @desc    This API generates a session token to authenticate a linked account.
   * @docs    https://docs.gocobalt.io/api-reference/session-token/generate-token-for-linked-account
   */

  const fetchSessionToken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/session-token`, {
        method: "GET",
      });
      const data = await res.json();
      setToken(data.token);
      Cookies.set("sessionToken", data.token, { expires: 1 });
    } catch (err) {
      console.error("Error fetching session token:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch token only if not already present in cookies
    const existingToken = Cookies.get("sessionToken");
    if (existingToken) {
      setToken(existingToken);
      setIsLoading(false);
    } else {
      fetchSessionToken();
    }
  }, []);

  return { token, isLoading };
};