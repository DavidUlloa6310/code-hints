import React, { type ReactNode, useContext, useState } from "react";

interface SubmitResponse {
  solution?: Array<{
    testCase: string;
    expected: string;
    output: string;
  }>;
  error?: string;
}

interface UserDataValues {
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  codeOutput: null | SubmitResponse;
  setCodeOutput: React.Dispatch<React.SetStateAction<SubmitResponse | null>>;
}

const UserDataContext = React.createContext<UserDataValues>({
  userCode: "",
  setUserCode: () => {
    return;
  },
  codeOutput: null,
  setCodeOutput: () => {
    return;
  },
});

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userCode, setUserCode] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<SubmitResponse | null>(null);
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
