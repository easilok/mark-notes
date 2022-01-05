import React, { createContext, useMemo } from 'react';

const apiUrl = process.env.REACT_APP_API_URL || '';

interface IUserContextProps {
  access: string;
}

interface IUserContext {
  apiUrl: string;
  accessToken: string;
}

export const UserContext = createContext<IUserContext>({
  accessToken: '',
  apiUrl: '',
});

const UserContextProvider: React.FC<IUserContextProps> = ({
  access,
  children,
}) => {
  const contextValue = useMemo(
    () => ({ apiUrl, accessToken: access }),
    [apiUrl, access]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
