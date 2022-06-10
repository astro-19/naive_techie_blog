import type { NextPage } from 'next'

import Head from 'next/head'

const posts = [
  { title: 'React', excerpt: 'Learn React.' },
  { title: 'React Learn', excerpt: 'Learn React testing tools.' }
]


const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Naive Techie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => (
            <div>
              {post.title}
              {post.excerpt}
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">

            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
