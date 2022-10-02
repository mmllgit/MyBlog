import Head from "next/head";
import Image from "next/image";
import { getResumeData } from "lib/getResume";
import ReactMarkdown from "react-markdown";
import styles from "@/Resume.module.less";
import gfm from "remark-gfm";

const About: React.FC = ({
  resumeData: { content, title, image, excerpt },
}: any) => {
  const imagePath = `/images/${image}`;
  return (
    <div className={styles["post-detail"]}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
        <base target="_blank" />
      </Head>
      <div className={styles["article-container"]}>
        <header className={styles["header"]}>
          <Image src={imagePath} alt={title} width={200} height={250} />
        </header>
        <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const resumeData = getResumeData();

  return {
    props: {
      resumeData,
    },
  };
}

export default About;
