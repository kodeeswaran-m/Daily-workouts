import { useEffect, useState } from "react";
import type { UseFetchState } from "./UseFetch.types";


export const useFetch = <T>(url: string) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data:null,
    loading:true,
    error:null
  });

  useEffect(() => {
    let isMounted: boolean = true;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Something unexpected happens");
        const jsonData = (await response.json()) as T;
        if (isMounted)
          setState({ data: jsonData, loading: false, error: null });
      } catch (error:any) {
        setState({data:null,loading:false,error:error.message})
      }
    };
    fetchData();
    return(()=> {isMounted=false})
  }, [url]);

  return state;
};

// import { useEffect, useState } from "react";
// import type { UseFetchState } from "./UseFetch.types";

// export interface UseFetchState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

// export const useFetch = <T>(url: string) => {
//   const [state, setState] = useState<UseFetchState<T>>({
//     data: null,
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Something went wrong");

//         const jsonData = (await response.json()) as T;
//         if (isMounted)
//           setState({
//             data: jsonData,
//             loading: false,
//             error: null,
//           });
//       } catch (error: any) {
//         if (isMounted)
//           setState({
//             data: null,
//             loading: false,
//             error: error.message,
//           });
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [url]);

//   return state;
// };
