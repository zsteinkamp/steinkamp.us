// ./components/SiteHeader.jsx
const { default: Link } = require("next/link");
const SiteHeader = () => {
  return (
    <header className="flex items-center mb-12 pl-8 pr-8 pb-4 pt-4 border-b-2 border-slate-200 bg-slate-100 noprint">
      <Link href={"/"}>
        <figure title="steinkamp.us">
          <h1 className="font-condensed text-4xl">👋 steinkamp.us</h1>
        </figure>
      </Link>
      <nav className="grow flex gap-8 justify-end">
        <div>
          <Link href={"/"}>Posts</Link>
        </div>
        <div>
          <Link target="_blank" href={"https://photos.steinkamp.us/"}>Photos</Link>
        </div>
        <div>
          <Link href={"/music"}>Music</Link>
        </div>
        <div>
          <Link href={"/music-tools"}>Music Tools / Plugins</Link>
        </div>
        <div>
          <Link href={"/resume"}>Resume</Link>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
