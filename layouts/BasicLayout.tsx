import Head from "next/head";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const BasicLayout = ({ pageProps, children }) => {
  const { title, description } = pageProps?.markdoc?.frontmatter || { title: "steinkamp.us", description: "steinkamp.us" };

  const outerClass = pageProps?.markdoc?.frontmatter?.outerClass || '';

  return (
   <>
     <Head>
       <title>{ title || "steinkamp.us" }</title>
       <meta name="description" content={ description || "steinkamp.us" } />
     </Head>
     <SiteHeader />
     <div className={ `pl-4 pr-4 max-w-3xl min-h-screen m-auto ${outerClass}` }>
       {children}
     </div>
     <SiteFooter />
   </>
  );
};

export default BasicLayout;
