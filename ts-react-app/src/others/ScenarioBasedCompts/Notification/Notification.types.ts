export type NotificationData =
  | {
      variant: "success";
      message: string;
    }
  | {
      variant: "error";
      message: string;
      retry?: () => void;
    }
  | {
      variant: "warning";
      message: string;
      expiresIn?: number;
    };
 export type NotificationProps=NotificationData&{
  onClose?:()=>void
 }
