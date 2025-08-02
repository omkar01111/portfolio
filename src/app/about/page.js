"use client";
import styles from "./page.module.scss";
import Header from "../../components/Header/index.jsx";
import { AnimatePresence } from "framer-motion";
import Preloader from "../../components/Preloader";
import { useEffect, useState } from "react";
export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header />
      <main className={styles.main}>
        <section className={styles.about_heading}>
          <div>
            <h1>Helping brands thrive</h1>
            <h1>in the digital world</h1>
          </div>
          <div className={styles.rotating_Earth}>
            <div></div>
          </div>
        </section>
      </main>
    </>
  );
}
