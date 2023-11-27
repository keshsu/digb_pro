import { useEffect, useState } from "react";
import { authService } from "services/authService";

interface AuthListenerResult {
  userToken: string | null; // Assuming userToken is a string, update the type accordingly
  setUserToken: (token: string | null) => void;
}

export default function useAuthListener(): AuthListenerResult {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (userToken) {
      authService.getUserToken(userToken).then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          setUserToken(null);
        } else {
          let token = localStorage.getItem("token");
          setUserToken(token);
        }
      });
    }
  }, [userToken]);

  return { userToken, setUserToken };
}
