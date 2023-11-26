import { ReactNode } from "react";
import { UserContextProvider } from "./UserContext.tsx";

const HomeContextContainer = ({ children }: { children: ReactNode }) => (
  <HomeContext.Provider>
    <UserContextProvider>{children}</UserContextProvider>
  </HomeContext.Provider>
);

export default HomeContextContainer;
