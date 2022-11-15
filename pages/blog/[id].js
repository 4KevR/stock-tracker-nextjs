import styles from '../../styles/SingleBlog.module.css'
import Head from 'next/head'
import prisma from '../../lib/prisma';
import Image from 'next/image'
import Link from "next/link"

export default function Blog({ blog }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Stock Tracker</title>
                <meta name="description" content="Stock Tracker" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>{blog.title}</h1>
                <Image
                    src={"/blog-" + blog.id + ".svg"}
                    alt="blog picture"
                    width={200}
                    height={200}
                />
                <p className={styles.description}>{blog.text}</p>
                <div>
                    <Link href="/blog"><button className='btn btn-primary border-5'>Back to overview</button></Link>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const blog = await prisma.blog.findUnique({
        where: {
            id: parseInt(params.id),
        }
    });
    return { props: { blog } }
}

export async function getStaticPaths() {
    const blogs = await prisma.blog.findMany();

    const paths = blogs.map((blog) => ({
        params: { id: blog.id.toString() },
    }));

    return { paths, fallback: false }
}