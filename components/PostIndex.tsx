import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { PostType } from '@/util/getPosts'
dayjs.extend(utc)

interface PostIndexProps {
  posts: PostType[]
  className?: string
}

const PostIndex: React.FC<PostIndexProps> = ({ posts, className = '' }) => {
  if (posts.length === 0) {
    return <div className="mt-20 text-center"><em>No matching posts.</em></div>
  }
  return (
    <ul className={className}>
      {posts.map((post) => (
        <li
          key={post.slug}
          className='rounded-xl hover:bg-shadebg hover:shadow-md hover:shadow-shadeshadow md:mb-4'
        >
          <Link className='' href={post.slug}>
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
                <h2 className='m-0 text-link-base'>{post.title}</h2>
                <div className='mb-[0.25rem] text-sm text-date'>
                  {dayjs(post.date).utc().format('MMMM, YYYY')}
                  {post.tags && post.tags.length && (
                    <span className='ml-1 text-date-lite'>
                      {' '}
                      in {post.tags.join(', ')}
                    </span>
                  )}
                </div>
                <div className='text-text line-clamp-3'>{post.excerpt}</div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default PostIndex
