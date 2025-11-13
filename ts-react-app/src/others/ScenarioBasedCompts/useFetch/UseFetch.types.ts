export interface User{
    id:number;
    username:string;
    email:string;
    password:string
}

export interface Product{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
}

export interface Cart{
    id:number;
    userId:number;
    products:Product[];
}

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

