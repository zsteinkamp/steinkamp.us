import PostLayout from "../layouts/PostLayout";
import type { AppProps } from 'next/app'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
 // configure default article layout
 const postLayout = (page) => {
    // pass `markdoc` props to ArticleLayout
    return (
      page.props.markdoc && (
        <PostLayout markdoc={page.props.markdoc}>{page}</PostLayout>
      )
    );
  };
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || postLayout;

  return getLayout(<Component {...pageProps} />);
}
