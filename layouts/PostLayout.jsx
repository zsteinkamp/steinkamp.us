import Head from "next/head";
import dayjs from 'dayjs';

import SiteHeader from "@/components/SiteHeader";

const PostLayout = ({ pageProps, children }) => {
  const { title, date, description } = pageProps.markdoc.frontmatter;
  const fmtDate = dayjs(date).format("YYYY-MM-DD dddd");
  return (
   <>
     <Head>
       <title>{title}</title>
       <meta name="description" content={description} />
     </Head>
     <SiteHeader />
     <article className="pl-4 pr-4 max-w-3xl m-auto">
       <div className="">
         <header className="">
           <div className="">
             <div className="mt-4 text-slate-400">{fmtDate}</div>
             <h1 className="mb-4 font-bold font-condensed text-4xl">{title}</h1>
           </div>
         </header>
         <div className="">
           {children}
         </div>
       </div>
     </article>
   </>
  );
};

export default PostLayout;
