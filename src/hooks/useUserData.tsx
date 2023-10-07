import React, { ReactNode, useContext, useState } from "react";

interface UserDataValues {
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  codeOutput: string;
  setCodeOutput: React.Dispatch<React.SetStateAction<string>>;
}

const UserDataContext = React.createContext<UserDataValues>({
  userCode: "",
  setUserCode: () => {
    return;
  },
  codeOutput: "",
  setCodeOutput: () => {
    return;
  },
});

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userCode, setUserCode] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<string>("");
  return (
    <UserDataContext.Provider
      value={{ userCode, setUserCode, codeOutput, setCodeOutput }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
