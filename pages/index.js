import prisma from '../lib/prisma';

import styles from '../styles/Home.module.css'

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from "next-auth/react"

import Head from 'next/head'
import Link from "next/link"

export default function Home({ user, fetched_data }) {
    const router = useRouter();
    const [text, setText] = useState('')
    const { data: session } = useSession()

    async function submitNewStock() {
        const response = await fetch("/api/user/stock", {
            method: 'POST',
            body: JSON.stringify({ symbol: text }),
            credentials: 'include',
        });

        router.replace(router.asPath);
    }
    if (session) {
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
                                <div className={`${styles.card} ${styles.stock}`}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm"><h2 className={styles.leftCard}>{stock.symbol}</h2></div>
                                            <div className="col-sm"><p className={styles.rightCard}>{stock.values.d}$</p></div>
                                            <div className="w-100"></div>
                                            <div className="col-sm"><p className={styles.leftCard}>{stock.values.c}$</p></div>
                                            <div className="col-sm"><p className={styles.rightCard}>{stock.values.dp}%</p></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <div className={styles.card}>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#stockModal">
                                    Add new stock
                                </button>

                                <div className="modal fade" id="stockModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    New stock
                                                </h5>
                                            </div>
                                            <div className="modal-body">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Symbol</span>
                                                    </div>
                                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={event => setText(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitNewStock}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
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
                    Please sign in to see your stock data
                </p>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session) {
        const user = await prisma.user.findUnique({
            where: {
                name: session.user.name,
            }
        })

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
    return { props: {} }
}
