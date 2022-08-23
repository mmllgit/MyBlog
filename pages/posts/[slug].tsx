import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import Head from "next/head";
import Image from "next/image";
import { getPostData, getPostsFile } from "lib/getPostUtils";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import styles from "@/PostDetail.module.less";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

interface IProps {
  post: any;
}

const PostDetail: React.FC<IProps> = ({
  post: { image, title, excerpt, slug, content },
}: IProps) => {
  const customRenderers = {
    img(image: any) {
      return (
        <Image
          className={styles["image"]}
          src={`${image.src}}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },

    code({ node, inline, className, children, ...props }: any) {
      const match: any = /language-(\w+)/.exec(className || "");
      return (
        <SyntaxHighlighter style={atomDark} language={match[1]}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <div className={styles["post-detail"]}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <div className={styles["article-container"]}>
        <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export function getStaticProps(context: any) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug + ".md");
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postFilenames = getPostsFile();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetail;
