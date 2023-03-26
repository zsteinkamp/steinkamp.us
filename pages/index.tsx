import fs from "fs";
import path from "path";
import glob from "glob-promise";
import matter from "gray-matter";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/layouts/SiteLayout";

export const getStaticProps = async () => {
  // Find all Markdown files in the /articles directory
  const ARTICLES_DIR = path.join(process.cwd(), "pages/posts");
  const articlesPaths = await glob("**/*.md", { cwd: ARTICLES_DIR });

  const articles = articlesPaths.map((articlePath) => {
    // get the slug from the markdown file name
    const slug = path.basename(articlePath, path.extname(articlePath));
    // read the markdown files
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/posts", articlePath),
      "utf8"
    );
    // use gray-matter to parse the article frontmatter section
    const { data } = matter(source);

    let cover = null;

    if (data && data.entry && data.entry.data && data.entry.data.thumb_url) {
      cover = data.entry.data.thumb_url;
    }
    if (data.entry.source === 'youtube') {
      cover = 'https://i.ytimg.com/vi/' + data.entry.data.id + '/default.jpg';
    }

    console.log('COVER', cover);

    return {
      title: data.title,
      description: data.description || "",
      cover,
      slug
    };
  });
  return {
    props: {
      articles,
    },
  };
};

const Articles = ({ articles }) => {
  return (
    <>
      <Head>
        <title>My articles</title>
        <meta name="description" content="View all my articles" />
      </Head>
      <section>
        <header className="articles-header">
          <div className="wrapper">
            <h1 className="font-extrabold text-5xl">
              Hey there, view all my articles
            </h1>
          </div>
        </header>
        <ul className="articles">
          {articles.map((article) => (
            <li key={article.slug} className="article">
              <Link href={`/posts/${article.slug}`}>
                <header className="article-item-header">
                  {article.cover &&
                    <Image
                      src={article.cover}
                      width={300}
                      height={200}
                      alt="cover"
                    />
                  }
                  <div className="details">
                    <h2 className="font-bold text-3xl">{article.title}</h2>
                    <p> {article.description} </p>
                  </div>
                </header>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default Articles;

// define layout for articles page
Articles.getLayout = (page) => {
  return <SiteLayout> {page} </SiteLayout>;
};
