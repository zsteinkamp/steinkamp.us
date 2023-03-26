import ArticleLayout from "../layouts/ArticleLayout";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
   // configure default article layout
 const articleLayout = (page) => {
    // pass `markdoc` props to ArticleLayout
    return (
      page.props.markdoc && (
        <ArticleLayout markdoc={page.props.markdoc}> {page}</ArticleLayout>
      )
    );
  };
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || articleLayout;

  return getLayout(<Component {...pageProps} />);
}
