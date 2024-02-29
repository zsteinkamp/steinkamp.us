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
    <ul className={`posts ${className}`}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link className='post-item' href={post.slug}>
            <div>
              {post.thumbnail && (
                <Image
                  className='max-w-36 aspect-square w-36 rounded-lg object-cover'
                  src={post.thumbnail}
                  width={300}
                  height={300}
                  alt={post.title}
                />
              )}
            </div>
            <div className='col-span-3'>
              <div className='text-sm text-stone-400 dark:text-stone-500'>
                {dayjs(post.date).utc().format('MMMM, YYYY')}
              </div>
              <h2 className='font-header mb-2 mt-2 text-2xl'>{post.title}</h2>
              <div className='text-stone-600 line-clamp-3 dark:text-stone-400'>
                {post.excerpt}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default PostIndex
