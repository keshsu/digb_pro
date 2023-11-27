import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

const HomeContextContainer = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default HomeContextContainer;
