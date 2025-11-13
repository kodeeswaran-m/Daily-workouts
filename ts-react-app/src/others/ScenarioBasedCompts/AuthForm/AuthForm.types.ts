export type AuthFormProps<T extends "login" | "signup"> = T extends "login"
  ? {
      mode: "login";
      email: string;
      password: string;
      onSubmit: (data: { email: string; password: string }) => void;
    }
  : {
      mode: "signup";
      username: string;
      email: string;
      password: string;
      onSubmit: (data: {
        username: string;
        email: string;
        password: string;
      }) => void;
    };
