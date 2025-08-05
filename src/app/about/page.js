"use client";
import styles from "./page.module.scss";

import { AnimatePresence } from "framer-motion";
import Preloader from "../../components/Preloader";
import { useEffect, useState } from "react";
import Image from "next/image";
import MyImg from "../../../public/images/myImge.jpeg";
import Contact from "../../components/Contact";

const skills = [
  {
    no: "01",
    heaing: "Design",
    desc: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)",
  },
  {
    no: "02",
    heaing: "Development",
    desc: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)",
  },
  {
    no: "03",
    heaing: "♦ The full package",
    desc: "A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects.",
  },
];
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

      <main className={styles.main}>
        <section className={styles.about_heading}>
          <div>
            <h1>Helping brands thrive</h1>
            <h1>in the digital world</h1>
          </div>
          <div className={styles.stripe}></div>
          <div className={styles.rotating_Earth}>
            <div></div>
          </div>
        </section>

        <section className={styles.aboutMe}>
          <div className={styles.info}>
            <p>
              I help companies from all over the world with tailor-made
              solutions. With each project, I push my work to new horizons,
              always putting quality first.
            </p>
            <h4>Always exploring...</h4>
          </div>
          <div className={styles.myImg}>
            <Image src={MyImg} alt="About Me" full />
          </div>
        </section>

        <section className={styles.skill_Container}>
          <h4 className={styles.heading}>I can help you with ...</h4>
          <div className={styles.skills}>
            {skills.map((skill, index) => (
              <div className={styles.card} key={index}>
                <p className={styles.no}>{skill.no}</p>
                <h4 className={styles.skill_heading}>{skill.heaing}</h4>
                <p className={styles.desc}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className={styles.fotter}>
        <Contact />
      </div>
    </>
  );
}
