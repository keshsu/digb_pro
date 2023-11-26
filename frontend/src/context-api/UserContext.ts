import { createContext, useEffect, useReducer, ReactNode, Reducer } from 'react';
import User from 'interface/user';
import reducer from 'reducers/reducer';

interface State {
  user: User | null;
  isFetching: boolean;
  error: boolean;
}

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const INITIAL_STATE: State = {
  user: getInitialUser(), // Assuming getInitialUser returns User | null
  isFetching: false,
  error: false,
};

interface Action {
  type: string;
  payload?: string;
}

interface UserContextProps {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  dispatch: React.Dispatch<Action>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
