import Head from "next/head";
import SiteHeader from "../components/SiteHeader";

const ArticleLayout = ({ markdoc, children }) => {
  const { title, date, description } = markdoc?.frontmatter;
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
             <h1 className="mt-4 font-bold font-condensed text-4xl">{title}</h1>
             <div className="mb-4">{date}</div>
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
