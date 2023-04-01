const { default: SiteHeader } = require("../components/SiteHeader");
import PostLayout from "@/layouts/PostLayout";
import BasicLayout from "@/layouts/BasicLayout";

const SiteLayout = ({ pageProps, children }) => {
  const PageLayout = {
    'post': PostLayout,
  }[pageProps?.markdoc?.frontmatter?.layout] || BasicLayout;

  return (
    <PageLayout pageProps={pageProps}>
      <main>{children}</main>
    </PageLayout>
  );
};

export default SiteLayout;
