
export interface User {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
}
const storedUser= localStorage.getItem("user");
const storedUsers= localStorage.getItem("users");
const initialState: AuthState = {
  isAuthenticated: storedUser?true: false,
  user: storedUser?JSON.parse(storedUser):null,
  users: storedUsers?JSON.parse(storedUsers):[],
};
export const SIGNUP = "SIGNUP" as const ;
export const LOGIN = "LOGIN" as const;
export const LOGOUT = "LOGOUT" as const;

export const signup = (user: User) => ({ type: SIGNUP, payload: user });
export const login = (username: string, password: string) => ({
  type: LOGIN,
  payload: { username, password },
});
export const logout = () => ({ type: LOGOUT });

type AuthAction =
  | ReturnType<typeof signup>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>;

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case SIGNUP:
      const updatedUsers:User[]= [...state.users, action.payload] ;
      localStorage.setItem("users",JSON.stringify(updatedUsers));
      return { ...state, users: updatedUsers };
    case LOGIN:
      const foundUser = state.users.find(
        (user:User) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );
      
      if (foundUser) {
              localStorage.setItem("user",JSON.stringify(foundUser));

        return { ...state, isAuthenticated: true, user: foundUser };
      } else {
        alert("invalid")
        return state;
      }
      case LOGOUT:
        localStorage.removeItem("user");
        return{...state, isAuthenticated:false,user:null};
    default:
        return state;
  }
};
