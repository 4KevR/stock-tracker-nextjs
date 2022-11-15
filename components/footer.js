import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={"d-flex align-items-center"}>
                <span>© 2022 4KevR</span>
            </div>

        </footer>
    )
}