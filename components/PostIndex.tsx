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
    <ul className={`${className}`}>
      {posts.map((post) => (
        <li key={post.slug} className="">
          <Link className='hover:bg-stone-200 dark:hover:bg-stone-800' href={post.slug}>
            <div className='p-4 flex rounded-lg bg-transparent'>
              <div className='flex-grow-0 flex-shrink-0 basis-[8rem]'>
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
              <div className='flex-shrink flex-grow ml-4 overflow-hidden'>
                <div className='text-sm text-stone-400 dark:text-stone-500'>
                  {dayjs(post.date).utc().format('MMMM, YYYY')}
                </div>
                <h2 className='m-0 md:mb-2 md:mt-2'>{post.title}</h2>
                <div className='text-stone-600 line-clamp-3 dark:text-stone-400'>
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
