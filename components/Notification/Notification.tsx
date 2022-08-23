import React from "react";
import ReactDOM from "react-dom";
import styles from "./Notification.module.less";

interface IProps {
  message: string;
  status: string;
}

export const Notification: React.FC<IProps> = ({ message, status }: IProps) => {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{message}</h2>
    </div>,
    document.getElementById("notifications")!
  );
};
