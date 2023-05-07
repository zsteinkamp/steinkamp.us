import yaml from 'js-yaml';
import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export async function getStaticProps() {
  const data = yaml.load(fs.readFileSync('data/music-tools.yaml', 'utf8'));

  return {
    props: {
      data,
    },
  };
}

interface MusicToolsProps {
  data: Array<any>
}

const MusicToolsPage:React.FC<MusicToolsProps>  = ({ data }) => {
  const titleList = data.map((app) => {
    return (
      <li key={app.link}><Link href={`#${app.title}`}>{app.title}</Link></li>
    );
  });

  const appList = data.map((app) => {
    return (
      <div className="pt-8" key={app.link}>
        <div className="flex justify-between">
          <h2><Link href={app.link} title={app.title}>{app.title}</Link></h2>
          <div className="self-end">
            <Link href={app.link}>More Info / Download</Link>
          </div>
        </div>
        <div>
          <Link href={app.link} title={app.title}><Image alt={app.title} src={app.image} /></Link>
        </div>
        <ReactMarkdown>
          { app.description }
        </ReactMarkdown>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Music Tools</title>
        <meta name="description" content="Tools that I have created for other musicians, mostly in Max for Live." />
      </Head>
      <h1>Music Tools / Plugins</h1>
      <p>
        I have made a handful of tools for electronic musicians who use Ableton Live Suite, which includes Max For Live.
      </p>

      <p>
        Max For Live is a visual signal processing environment that integrates seamlessly with Ableton Live. This allows people like me to make my own utilities, effects, sound generators, and automation within my digital audio workstation (DAW). This is an incredibly powerful capability of Ableton Live that sets it apart from other DAWs. We are no longer limited to the tools that come with the DAW or installable VSTs. We can make our own devices to explore their own creativity to an amazing level, and share those tools as our own art that helps other artists make their art. I really enjoy that part.
      </p>

      <p>
        This page serves as a jumping off point to more detailed information about the devices.
      </p>

      { titleList }

      { appList }
    </>
  );
}
