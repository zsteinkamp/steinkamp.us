import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

interface PostIndexProps {
  posts: Array<Record<string, string>>
  className?: string
}

const PostIndex: React.FC<PostIndexProps> = ({ posts, className = '' }) => {
  return (
    <ul className={className}>
      {posts.map((post) => (
        <li key={post.slug} className='hover:bg-shadebg-light dark:hover:bg-shadebg-dark rounded-xl'>
          <Link
            className=''
            href={post.slug}
          >
            <div className='flex rounded-lg bg-transparent p-4'>
              <div className='flex-shrink-0 flex-grow-0 basis-[5rem] md:basis-[8rem]'>
                {post.thumbnail && (
                  <Image
                    className='aspect-square rounded-lg object-cover'
                    src={post.thumbnail}
                    width={300}
                    height={300}
                    alt={post.title}
                  />
                )}
              </div>
              <div className='ml-4 flex-shrink flex-grow overflow-hidden md:ml-8'>
                <h2 className='m-0'>{post.title}</h2>
                <div className='mb-[0.25rem] text-sm text-date-light dark:text-date-dark'>
                  {dayjs(post.date).utc().format('MMMM, YYYY')}
                </div>
                <div className='text-text-light line-clamp-3 dark:text-text-dark'>
                  {post.excerpt}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default PostIndex
