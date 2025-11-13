import { useEffect } from "react";
import type { NotificationProps } from "./Notification.types";

const Notification = ({ onClose, ...props }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  switch (props.variant) {
    case "success":
      return (
        <div>
          <p>{props.message}</p>
        </div>
      );

    case "error":
      return (
        <div>
          <p>{props.message}</p>
          {props.retry && <button onClick={props.retry}>retry</button>}
        </div>
      );
    case "warning":
      return (
        <div>
          <p>{props.message}</p>
          <span>{props.expiresIn}</span>
        </div>
      );
    default:
      return null;
  }
};
export default Notification;
