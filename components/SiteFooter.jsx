// ./components/SiteHeader.jsx
const { default: Link } = require("next/link");
const SiteFooter = () => {
  return (
    <footer className="flex font-condensed justify-between items-center mt-12 pl-8 pr-8 pb-4 pt-4 border-t-2 border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 noprint">
      <div>
        Check this <Link
          href="https://github.com/zsteinkamp/steinkamp.us">
          code out on GitHub
        </Link>.
      </div>
      <div>
        by <Link href="/resume">Zack Steinkamp</Link>
      </div>
    </footer>
  );
};

export default SiteFooter;
