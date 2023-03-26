// ./components/SiteHeader.jsx
const { default: Link } = require("next/link");
const SiteHeader = () => {
  return (
    <header className="flex items-center mb-12 pl-8 pr-8 pb-4 pt-4 w-screen border-b-2 border-slate-300 bg-slate-200">
      <Link href={"/"}>
        <figure title="steinkamp.us">
          <h1 className="font-condensed font-bold text-4xl">steinkamp.us</h1>
        </figure>
      </Link>
      <nav className="grow flex gap-8 justify-end">
        <div>
          <Link href={"/"}>Posts</Link>
        </div>
        <div>
          <Link href={"/music"}>Music</Link>
        </div>
        <div>
          <Link href={"/music-tools"}>Music Tools / Plugins</Link>
        </div>
        <div>
          <Link href={"https://photos.steinkamp.us/"}>Photos</Link>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
