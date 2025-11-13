import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children:React.ReactNode,
    roles:("user"|"admin")[];
}
const ProtectedRoute=({children, roles}:ProtectedRouteProps)=>{
    const {user, isAuthenticated}=useSelector((state:RootState)=>state.auth);

    if(!isAuthenticated) return <Navigate to={"/login"} replace/>;

    if(user&&!roles.includes(user.role)){
         return <Navigate to={user.role==="admin"?"/admin":"/dashboard"} replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;