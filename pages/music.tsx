import yaml from 'js-yaml'
import fsp from 'fs/promises'
import Head from 'next/head'
import CaptionedImage from '@/components/CaptionedImage'
import ReactMarkdown from 'react-markdown'
import createHeadingSlug from '@/util/createHeadingSlug'
import TableOfContents from '@/components/TableOfContents'

export const getStaticProps = async () => {
  const data = yaml.load(await fsp.readFile('data/songs.yaml', 'utf8'))

  return {
    props: {
      data,
    },
  }
}

interface SongsProps {
  data: Array<Record<string, string>>
}

const Songs: React.FC<SongsProps> = ({ data }) => {
  data.forEach((song) => {
    song.slug = createHeadingSlug(song.title)
  })
  const headings = data.map((song) => {
    return {
      slug: song.slug,
      title: song.title,
      level: 2,
    }
  })

  const songs = data.map((song, i) => {
    return (
      <div key={i} className='grid grid-cols-4'>
        <h4 className='pr-8 pt-2 text-right text-date-light dark:text-date-dark'>
          {song.date}
        </h4>
        <div className='col-span-3 '>
          <h2 id={song.slug}>{song.title}</h2>
          {song.bandcampId && (
            <iframe
              className='h-24 w-full rounded-lg border-none'
              src={`https://bandcamp.com/EmbeddedPlayer/${song.type || 'track'
                }=${song.bandcampId
                }/size=large/bgcol=666666/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/`}
              seamless
            ></iframe>
          )}
          <ReactMarkdown>{song.description}</ReactMarkdown>
        </div>
      </div>
    )
  })

  return (
    <article>
      <Head>
        <title>{`Zack Steinkamp's Music `}</title>
        <meta
          name='description'
          content="Music that I've made over the years."
        />
      </Head>
      <TableOfContents headings={headings} className="mt-[0.6rem]" />
      <h1>Music I've Made</h1>
      <p>
        One of my hobbies is music-making. I like to record sounds and make
        instruments out of them, or design new sounds with synthesizers. I used
        to have a room full of equipment, but now I just use a laptop and some
        external MIDI controllers. If you use Spotify, you can{' '}
        <a href='https://open.spotify.com/playlist/5s96egT8OPl3O3bMlk04qp?si=idq446saSgiDHgX43wsONw'>
          add my playlist
        </a>
        , which I keep up to date with new music I release. I post new songs
        here, along with a short description of the origin and construction of
        the song.
      </p>
      <CaptionedImage
        src='/images/studio.jpg'
        caption='My setup, Oct 2023.'
        alt='My setup, Oct 2023.'
      />
      <p>
        My music is available for listening here, or on{' '}
        <a href='https://open.spotify.com/artist/4zlbGPYkjV7EpxXHyfZNAh?si=51oxTGABQIGwOdBS_YaYBw'>
          Spotify
        </a>
        ,{' '}
        <a href='https://music.apple.com/us/artist/zack-steinkamp/1217691470'>
          iTunes / Apple Music
        </a>
        ,{' '}
        <a href='https://www.amazon.com/s?k=Zack+Steinkamp&i=digital-music&search-type=ss'>
          Amazon Music
        </a>
        ,{' '}
        <a href='https://www.youtube.com/channel/UCVKBjFZJYJ-0-5TiOHWj-OQ'>
          YouTube
        </a>
        , or pretty much any other streaming service by searching for my name.
      </p>
      <div className='w-full pt-8'>{songs}</div>
    </article>
  )
}

export default Songs
