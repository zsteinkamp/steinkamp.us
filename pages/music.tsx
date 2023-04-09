import yaml from 'js-yaml';
import fsp from 'fs/promises';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export const getStaticProps = async () => {
  const data = yaml.load(await fsp.readFile('data/songs.yaml', 'utf8'));

  return {
    props: {
      data,
    },
  };
};

const Songs = ({ data }) => {
  const songs = data.map((song, i) => {
    return (
      <div key={i} className="pt-8">
        <h4 className="float-right">{song.date}</h4>
        <h2>{song.title}</h2>
        { song.bandcampId && (
          <iframe className="w-full border-none" src={`https://bandcamp.com/EmbeddedPlayer/${song.type || "track"}=${song.bandcampId}/size=large/bgcol=666666/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/`} seamless>
          </iframe>
        )}
        <ReactMarkdown>
          { song.description }
        </ReactMarkdown>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>{ `Zack Steinkamp's Music `}</title>
        <meta name="description" content="Music that I've made over the years." />
      </Head>
      <h1>{ `Music I've Made` }</h1>
      <p>
        One of my hobbies is music-making. I like to record sounds and make
        instruments out of them, or design new sounds with synthesizers. I used
        to have a room full of equipment, but now I just use a laptop and some
        external MIDI controllers. If you use Spotify, you can <a
        href="https://open.spotify.com/playlist/5s96egT8OPl3O3bMlk04qp?si=idq446saSgiDHgX43wsONw">add
        my playlist</a>, which I keep up to date with new music I release. I
        post new songs here, along with a short description of the origin and
        construction of the song.
      </p>
      <p>
        You can listen to my music here, or on <a 
        href="https://open.spotify.com/artist/4zlbGPYkjV7EpxXHyfZNAh?si=51oxTGABQIGwOdBS_YaYBw">Spotify
        </a>, <a href="https://music.apple.com/us/artist/zack-steinkamp/1217691470">iTunes / Apple Music
        </a>, <a href="https://www.amazon.com/s?k=Zack+Steinkamp&i=digital-music&search-type=ss">Amazon Music
        </a>, <a href="https://www.youtube.com/channel/UCVKBjFZJYJ-0-5TiOHWj-OQ">YouTube</a>, or
        pretty much any other streaming service by searching for my name.
      </p>
      { songs }
    </>
  );
};

export default Songs;
