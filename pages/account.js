import styles from '../styles/Home.module.css'
import Head from 'next/head'

export default function Account() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Stock Tracker</title>
                <meta name="description" content="Stock Tracker" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    <p>Account</p>
                </div>
            </main>
        </div>
    )
}