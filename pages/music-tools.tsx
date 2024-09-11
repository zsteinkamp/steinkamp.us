import yaml from 'js-yaml'
import fs from 'fs'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import createHeadingSlug from '@/util/createHeadingSlug'
import TableOfContents from '@/components/TableOfContents'
import { categoryZipPath } from '@/util/downloadUtils'

export async function getStaticProps() {
  const data = yaml.load(fs.readFileSync('data/music-tools.yaml', 'utf8'))

  return {
    props: {
      data,
    },
  }
}

interface MusicToolsProps {
  data: Array<Record<string, string>>
}

const MusicToolsPage: React.FC<MusicToolsProps> = ({ data }) => {
  // populate the `slug` attribute
  data.forEach((app) => {
    app.slug = createHeadingSlug(app.title)
    app.catSlug = createHeadingSlug(app.category)
  })

  let lastCategory: string | null = null

  const sortOrder = [
    "Control",
    "Modulators",
    "Note Effects",
    "Audio Effects",
    "Instruments",
    "Utilities"
  ]

  const headings = data.sort((a, b) => a.title < b.title ? -1 : 1).sort((a, b) => sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category) ? -1 : 1).map((app) => {
    const retVal = []
    if (app.category !== lastCategory) {
      retVal.push({
        slug: createHeadingSlug(app.category),
        title: app.category,
        level: 2,
      })
      lastCategory = app.category
    }

    retVal.push({
      slug: app.slug,
      title: app.title,
      level: 3,
    })

    return retVal
  })

  lastCategory = null
  const appList = data.map((app) => {
    let category = null
    if (lastCategory !== app.category) {
      category = <>
        <h2 id={app.catSlug} className="mb-[-2rem]">{app.category}</h2>
        <div className="text-right mt-2">
          <Link href={categoryZipPath(app.category)} className="text-pagebg hover:text-pagebg hover:bg-link-hover bg-link-base p-2 rounded">Download .zip</Link>
        </div>
      </>

      lastCategory = app.category
    }
    return (
      <>
        {category}
        <div className='pb-4' key={app.link}>
          <div className='flex justify-between items-end'>
            <h3 id={app.slug}>
              <Link href={app.link} title={app.title}>
                {app.title}
              </Link>
            </h3>
            <div>
              <Link href={app.link}>More Info</Link>
            </div>
          </div>
          <div>
            <Link href={app.link} title={app.title}>
              <img alt={app.title} src={app.image} />
            </Link>
          </div>
          <ReactMarkdown>{app.description}</ReactMarkdown>
        </div>
      </>
    )
  })

  return (
    <article>
      <Head>
        <title>Music Tools</title>
        <meta
          name='description'
          content='Tools that I have created for other musicians, mostly in Max for Live.'
        />
      </Head>
      <TableOfContents headings={headings.flat()} className='' />
      <h1>Music Tools / Plugins</h1>
      <p>
        I have made a handful of tools for electronic musicians who use Ableton
        Live.
      </p>

      <Image
        className='mb-8'
        width='1024'
        height='148'
        src='https://github.com/zsteinkamp/m4l-Modulation-Lerp/raw/main/images/device.gif'
        alt='Example Plugin - Modulation Lerp'
      />

      <p>
        Max For Live is a visual development environment that integrates
        seamlessly with Ableton Live. This allows people like me to make our own
        utilities, effects, sound generators, and automation within my digital
        audio workstation (DAW). This is an incredibly powerful capability of
        Ableton Live that sets it apart from other DAWs. We are no longer
        limited to the tools that come with the DAW or installable VSTs. We can
        make our own devices to explore their own creativity to an amazing
        level, and share those tools as our own art that helps other artists
        make their art. I really enjoy that part.
      </p>

      <p>
        Download .zip files of the latest versions of my devices below, or visit each project&apos;s GitHub page for more details.
      </p>

      {appList}
    </article>
  )
}

export default MusicToolsPage
