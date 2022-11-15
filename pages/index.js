import Head from 'next/head'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import Link from "next/link"

export default function Home({ user, fetched_data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stock Tracker</title>
        <meta name="description" content="Stock Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Stock Tracker Dashboard
        </h1>

        <p className={styles.description}>
          Here are your favorites, {' '}
          <code className={styles.code}>{user.name}</code>
        </p>

        <div className={styles.grid}>
          {fetched_data.map((stock) => (
            <Link key={stock.symbol} href={"https://www.google.com/finance/quote/" + stock.symbol} legacyBehavior>
              <div className={styles.card}>
                <div className="container">
                  <div className="row">
                    <div className="col-sm"><h2 className={styles.leftCard}>{stock.symbol}</h2></div>
                    <div className="col-sm"><p className={styles.rightCard}>{stock.values.d}$</p></div>
                    <div class="w-100"></div>
                    <div className="col-sm"><p className={styles.leftCard}>{stock.values.c}$</p></div>
                    <div className="col-sm"><p className={styles.rightCard}>{stock.values.dp}%</p></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    }
  });

  const stocks = await prisma.stock.findMany({
    where: {
      users: {
        some: {
          user
        }
      }
    }
  })

  let fetched_data = []
  for (const stock of stocks) {
    const stockUrl = "https://finnhub.io/api/v1/quote?symbol=" + stock.symbol + "&token=" + process.env.FINNHUB_TOKEN
    const singleStockData = await fetch(stockUrl)
    const jsonData = await singleStockData.json()


    fetched_data.push({
      symbol: stock.symbol,
      values: jsonData,
    })
  }

  return { props: { user, fetched_data } }
}
