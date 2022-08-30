import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "lib/getleetcodeUtils";
import { ChangeEvent, useRef, useState } from "react";
import styles from "@/Posts.module.less";
import { Modal, Notification } from "components";
import React from "react";
import httpUtil from "utils/httpUtil";
import Head from "next/head";

interface notificationMessage {
  message: string;
  status: string;
}

const Posts: React.FC = ({ posts: allPosts }: any) => {
  const initNotification = {
    message: "你的请求正在发送中",
    status: "loading",
  };

  const passwordRef = useRef<any>();
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<notificationMessage>(initNotification);

  const handleAddConfirm = async () => {
    setIsNotification(true);
    if (!passwordRef.current.value || !file) {
      const notification = {
        message: "请填写完整的信息",
        status: "error",
      };
      setNotificationMessage(notification);
      setTimeout(() => {
        setIsNotification(false);
      }, 2000);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", passwordRef.current.value);
    try {
      const res = await httpUtil.uploadFile(formData);
      if (res.code === 200) {
        const notification = {
          message: "发送成功",
          status: "success",
        };
        setAddVisible(false);
        setNotificationMessage(notification);
        setTimeout(() => {
          setIsNotification(false);
        }, 2000);
      } else {
        const notification = {
          message: "发送失败",
          status: "error",
        };
        setAddVisible(false);
        setNotificationMessage(notification);
        setTimeout(() => {
          setIsNotification(false);
        }, 2000);
      }
    } catch (err) {
      const notification = {
        message: "发送失败",
        status: "error",
      };
      setAddVisible(false);
      setNotificationMessage(notification);
      setTimeout(() => {
        setIsNotification(false);
      }, 2000);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e?.target?.files![0]);
  };

  return (
    <div className={styles["feature-container"]}>
      {isNotification && <Notification {...notificationMessage}></Notification>}
      {addVisible && (
        <Modal
          cancelFC={() => setAddVisible(false)}
          confirmFC={() => handleAddConfirm()}
          title="新增文章"
        >
          <div>
            <button className={styles["upload-button"]}>+</button>
            <input
              type="file"
              name="file"
              className={styles["upload"]}
              onChange={(e) => handleFileChange(e)}
            />
            <div className={styles["file-name"]}>
              {file && (
                <div>
                  {file.name}
                  <span onClick={() => setFile(null)}>删除</span>
                </div>
              )}
            </div>
          </div>
          <div className={styles["form-item"]}>
            <input
              className={styles["username"]}
              ref={passwordRef}
              required
              type="password"
            />
            <span className={styles["bar"]}></span>
            <label htmlFor="username">输入密码</label>
          </div>
        </Modal>
      )}
      {/* <button
        className={styles["new-add-button"]}
        onClick={() => setAddVisible(true)}
      >
        新增
      </button> */}
      <Head>
        <title>leetcode刷题</title>
      </Head>
      <div className={styles["feature-title"]}>leetcode刷题:</div>
      <div className={styles["feature-item-container"]}>
        {allPosts.map((post: any, index: number) => {
          return (
            <Link href={`/leetcode/${post.slug}`} key={index}>
              <a className={styles["feature-item"]}>
                <div className={styles["feature-item-img"]}>
                  <Image
                    className={styles["image"]}
                    src={`/images/${post.image}`}
                    width={1000}
                    height={700}
                  ></Image>
                </div>
                <div className={styles["feature-item-content"]}>
                  <h3>{post.title}</h3>
                  <time>{post.date}</time>
                  <p>{post.excerpt}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const allPosts: any = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}

export default Posts;
