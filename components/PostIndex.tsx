import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

interface PostIndexProps {
  posts: Array<any>
  className?: string
}

const PostIndex: React.FC<PostIndexProps> = ({ posts, className = '' }) => {
  return (
    <ul className={`posts ${className}`}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            className="post-item"
            href={post.slug}
          >
            <div>
              {post.thumbnail && (
                <Image
                  className="object-cover w-36 aspect-square max-w-36 rounded-lg"
                  src={post.thumbnail}
                  width={300}
                  height={300}
                  alt={post.title}
                />
              )}
            </div>
            <div className="col-span-3">
              <div className="text-stone-400 dark:text-stone-500 text-sm">
                {dayjs(post.date).utc().format('MMMM, YYYY')}
              </div>
              <h2 className="font-header text-2xl mb-2 mt-2">
                {post.title}
              </h2>
              <div className="text-stone-600 dark:text-stone-400 line-clamp-3">
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
