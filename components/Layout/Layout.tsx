import Link from "next/link";
import { Fragment } from "react";
import styles from "./Layout.module.less";

export const Layout = (props: any) => {
  return (
    <Fragment>
      <div className={styles["home-header-container"]}>
        <div className={styles["my-blog"]}>
          <Link href="/">我的博客</Link>
        </div>
        <div className={styles["post-container"]}>
          <div>
            <Link href="/posts">所有文章</Link>
          </div>
          <div>
            <Link href="/leetcode">力扣刷题</Link>
          </div>
          <div>
            <Link href="/about">关于我</Link>
          </div>
        </div>
      </div>
      {props.children}
    </Fragment>
  );
};
