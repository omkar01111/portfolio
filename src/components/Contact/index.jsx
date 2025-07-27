import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/background.png`} />
            </div>
            <h2>Let&apos;s work</h2>
          </span>
          <h2>together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#334BD3"} className={styles.button}>
              <p> <Link href="/contact" className={styles.social_link}>
              Get in touch
              </Link> </p>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>Omkarmore0702@gmail.com</p>
          </Rounded>
          <Rounded>
            <p>+91 7021011068</p>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div className={styles.versionInfo}>
            <span>
              <h3>Version</h3>
              <p>  <Link href="/" className={styles.social_link}>
                2025 © Edition
              </Link>{" "}</p>
            </span>
            <span>
              <h3>Designed by</h3>
              <p> {" "}
              <Link href="/" className={styles.social_link}>
                Omkar More
              </Link>{" "}</p>
            </span>
          </div>
          <div className={styles.socialLinks}>
            <span>
              <h3>socials</h3>
              <Magnetic>
                <p><a
                  className={styles.social_link}
                  href="https://www.linkedin.com/in/-omkar-more/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a></p>
              </Magnetic>
            </span>

            <Magnetic>
              <p> <a
                className={styles.social_link}
                href="https://www.instagram.com/omkar_more07?"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a></p>
            </Magnetic>
            <Magnetic>
              <p><a
                className={styles.social_link}
                href="https://www.freelancer.com/u/omkarmore07?sb=t"
                target="_blank"
                rel="noopener noreferrer"
              >
                Freelance
              </a>{" "}</p>
            </Magnetic>
            <Magnetic>
              <p>{" "}
              <a
                className={styles.social_link}
                href="https://github.com/omkar01111"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}</p>
            </Magnetic>
          </div>

          {/* Mobile-only footer */}
          <div className={styles.mobileFooter}>
            <div className={styles.mobileSocials}>
              <h3>SOCIALS</h3>
              <div className={styles.socialRow}>
                <Magnetic>
                  <p><a
                  className={styles.social_link}
                  href="https://www.linkedin.com/in/-omkar-more/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a></p>
                </Magnetic>
                <Magnetic>
                  <p>  <a
                className={styles.social_link}
                href="https://www.instagram.com/omkar_more07?"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a></p>
                </Magnetic>
                <Magnetic>
                  <p><a
                className={styles.social_link}
                href="https://www.freelancer.com/u/omkarmore07?sb=t"
                target="_blank"
                rel="noopener noreferrer"
              >
                Freelance
              </a>{" "}</p>
                </Magnetic>
                <Magnetic>
                  <p>{" "}
              <a
                className={styles.social_link}
                href="https://github.com/omkar01111"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}</p>
                </Magnetic>
              </div>
            </div>
            <div className={styles.mobileVersion}>
              <div className={styles.versionCol}>
                <h3>VERSION</h3>
                <p>2022 © Edition</p>
              </div>
              <div className={styles.timeCol}>
                <h3><Link href="/" className={styles.social_link}>
                2025 © Edition
              </Link>{" "}</h3>
                <p>{" "}
              <Link href="/" className={styles.social_link}>
                Omkar More
              </Link>{" "}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
