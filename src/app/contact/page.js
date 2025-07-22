"use client";
import styles from "./page.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  color,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Preloader from "../../components/Preloader";

import ContactForm from "../../components/ContactForm";
import Image from "next/image";
import Magnetic from "../../common/Magnetic";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <main className={`${styles.main} main`}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <div className={styles.body}>
        {/* header div */}
        <div className={styles.title_container}>
          <div className={styles.title}>
            <span>
              <h3>Let&apos;s start a </h3>
            </span>
            <span>
              <h3>Project together</h3>
            </span>
          </div>
          <div>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/background.png`} />
            </div>
          </div>
        </div>
        {/* arrow div */}

        <div className={styles.arrow_container}>
          <div></div>
          <div className={styles.arrow}>
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrow}
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        {/* contact form */}
        <div className={styles.contact}>
          <div className={styles.contact_form}>
            <ContactForm />
          </div>
          <div className={styles.info}>
            <div>
              <h3>CONTACT DETAILS</h3>

              <Magnetic>
                <p>omkarmore0702@gmail.com</p>
              </Magnetic>
              <Magnetic>
                <p>+91 7021011068</p>
              </Magnetic>
            </div>

            <div>
              <h3>LOCATION</h3>

              <p>Mumbai, Maharashtra, India </p>

              <p>Open to Remote / Freelance Work </p>
            </div>

            <div>
              <h3>Socials</h3>

              <Magnetic>
                <p>Linkedin</p>
              </Magnetic>
              <Magnetic>
                <p>Instagram</p>
              </Magnetic>
              <Magnetic>
                <p>Freelance</p>
              </Magnetic>
              <Magnetic>
                <p>GitHub</p>
              </Magnetic>
            </div>
          </div>
        </div>

        
      </div>
      {/* footer */}
         <div className={styles.info}>
          <div className={styles.versionInfo}>
            <span>
              <h3>Version</h3>
              <p>2022 © Edition</p>
            </span>
            <span>
              <h3>Designed by</h3>
              <p>Omkar More</p>
            </span>
          </div>
          <div className={styles.socialLinks}>
            <span>
              <h3>socials</h3>
              <Magnetic>
                 <p>Linkedin</p>
              </Magnetic>
            </span>

            
              <Magnetic>
                <p>Instagram</p>
              </Magnetic>
              <Magnetic>
                <p>Freelance</p>
              </Magnetic>
              <Magnetic>
                <p>GitHub</p>
              </Magnetic>
          </div>

          {/* Mobile-only footer */}
          <div className={styles.mobileFooter}>
            <div className={styles.mobileSocials}>
              <h3>SOCIALS</h3>
              <div className={styles.socialRow}>
                <Magnetic>
                <p>Linkedin</p>
              </Magnetic>
              <Magnetic>
                <p>Instagram</p>
              </Magnetic>
              <Magnetic>
                <p>Freelance</p>
              </Magnetic>
              <Magnetic>
                <p>GitHub</p>
              </Magnetic>
              </div>
            </div>
            <div className={styles.mobileVersion}>
              <div className={styles.versionCol}>
                <h3>VERSION</h3>
                <p>2022 © Edition</p>
              </div>
              <div className={styles.timeCol}>
                <h3>Designed by</h3>
                <p>Omkar More</p>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
