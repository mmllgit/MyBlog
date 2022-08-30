import Link from "next/link";
import Image from "next/image";
import styles from "@/Home.module.less";
import { getFeaturePosts } from "lib/getPostUtils";
import { getFeaturePosts as getLeetcodeFeatures } from "lib/getleetcodeUtils";
import Head from "next/head";

const Home: React.FC = ({ posts }: any) => {
  return (
    <div className={styles["home-container"]}>
      <Head>我的博客</Head>
      <div className={styles["introduce-container"]}>
        <div>
          <Image
            className={styles["img"]}
            src="/images/blogHead.jpg"
            width={300}
            height={300}
          ></Image>
        </div>
        <div>
          <h1>你好，这是我的博客</h1>
          <h1>这个博客包括我的一些文章</h1>
        </div>
      </div>
      <div className={styles["feature-container"]}>
        <div className={styles["feature-title"]}>一些精选的文章:</div>
        <div className={styles["feature-item-container"]}>
          {posts.map((post: any, index: number) => {
            return (
              <Link href={`/posts/${post.slug}`} key={index}>
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
    </div>
  );
};

export async function getStaticProps() {

  return {
    props: {
      posts: [...getFeaturePosts(), ...getLeetcodeFeatures()],
    },
  };
}

export default Home;
