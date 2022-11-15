import styles from '../../styles/Blog.module.css'
import Head from 'next/head'
import prisma from '../../lib/prisma';
import Image from 'next/image'
import Link from "next/link"

export default function Blog({ minified_blogs }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Stock Tracker</title>
                <meta name="description" content="Stock Tracker" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Blog of the Stock Tracker</h1>
                <div className={styles.grid}>
                    {minified_blogs.map((blog) => (
                        <Link key={blog.id} href={"./blog/" + blog.id} legacyBehavior>
                            <div className={styles.card}>
                                <Image
                                    className={styles.image}
                                    src={"/blog-" + blog.id + ".svg"}
                                    alt="blog picture"
                                    width={200}
                                    height={200}
                                />
                                <h2>{blog.title}</h2>
                                <p>{blog.text}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps() {
    const blogs = await prisma.blog.findMany();
    const minified_blogs = blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        picture: blog.picture,
        text: (blog.text.length < 500 ? blog.text : blog.text.substring(0,500) + " . . . ")
    }))
    return { props: { minified_blogs } }
}