import Head from "next/head";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const { default: Link } = require("next/link");

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PostLayout = ({ pageProps, children }) => {
  const file = pageProps.markdoc.file.path;
  const { title, date, description } = pageProps.markdoc.frontmatter;
  const fmtDate = dayjs(date).utc().format("MMMM D, YYYY");
  const isPop = file.startsWith('/pop/');
  const backLink = isPop && (<h4 className="text-right"><Link href='/pop'>&lt;&lt;&lt; Back to Pop&apos;s Pages</Link></h4>);
  return (
   <>
     <Head>
       <title>{title}</title>
       <meta name="description" content={description} />
     </Head>
     <SiteHeader />
     <article className={`pl-4 pr-4 max-w-3xl min-h-screen m-auto ${isPop && 'pop'}`}>
       <div className="">
         { backLink }
         <header className="">
           <div className="">
             <div className="mt-4 text-stone-400">{fmtDate}</div>
             <h1 className="mb-4 font-bold font-condensed text-4xl">{title}</h1>
           </div>
         </header>
         <div className="">
           {children}
         </div>
         { backLink }
       </div>
     </article>
     <SiteFooter />
   </>
  );
};

export default PostLayout;
