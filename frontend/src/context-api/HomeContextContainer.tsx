import { ReactNode } from "react";
import { UserContextProvider } from "./UserContext";

const HomeContextContainer = ({ children }: { children: ReactNode }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

export default HomeContextContainer;
