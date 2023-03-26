import Head from "next/head";
import SiteHeader from "../components/SiteHeader";

const ArticleLayout = ({ markdoc, children }) => {
  const { title, description } = markdoc?.frontmatter;
  return (
   <>
    <Head>
     <title>{title}</title>
     <meta name="description" content={description} />
    </Head>
    <SiteHeader />
    <article className="site-article">
     <div className="wrapper">
      <header className="article-header">
       <div className="wrapper">
        <h1 className="font-extrabold text-6xl">{title}</h1>
        <p className="text-2xl">{description}</p>
       </div>
      </header>
      <div className="article-content prose">{children}</div>
     </div>
    </article>
   </>
  );
};

export default ArticleLayout;
