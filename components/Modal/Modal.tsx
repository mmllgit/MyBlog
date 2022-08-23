import React from "react";
import styles from "./Modal.module.less";

interface IProps {
  cancelFC?: Function;
  confirmFC?: Function;
  children?: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<IProps> = ({
  cancelFC,
  confirmFC,
  children,
  title,
}: IProps) => {
  return (
    <div className={styles["total-container"]}>
      <div className={styles["modal-background"]}></div>
      <div className={styles["modal-container"]}>
        <h2>{title}</h2>
        <div>{children}</div>
        <div className={styles["modal-footer"]}>
          <button onClick={() => cancelFC!()}>取消</button>
          <button onClick={() => confirmFC!()}>确定</button>
        </div>
      </div>
    </div>
  );
};
