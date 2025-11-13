import { useState } from "react";
import type { NotificationData } from "./Notification.types";
import Notification from "./Notification";

const NotificationDemo = () => {
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );
  const setSuccessNotification = () => {
    setNotification({
      variant: "success",
      message: "Notification sent successfully",
    });
  };
  const setErrorNotification = () => {
    setNotification({
      variant: "error",
      message: "Error in sending Notification",
      retry: () => console.log("Error log"),
    });
  };
  const setWarningNotification = () => {
    setNotification({
      variant: "warning",
      message: "Warning Notification",
      expiresIn: 10,
    });
  };
  const handleClose=()=>{
    setNotification(null);
  }
  return (
    <div>
      <div>
        {" "}
        <button onClick={setSuccessNotification}>Success</button>
        <button onClick={setErrorNotification}>Error</button>
        <button onClick={setWarningNotification}>Warning</button>
      </div>
      
{notification && <Notification {...notification} onClose={() => handleClose()} />}
      
    </div>
  );
};

export default NotificationDemo;
