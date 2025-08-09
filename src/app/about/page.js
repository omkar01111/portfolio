"use client";
import styles from "./page.module.scss";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import Preloader from "../../components/Preloader";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MyImg from "../../../public/images/myImge.jpeg";
import Contact from "../../components/Contact";

const skills = [
  {
    no: "01",
    heading: "Design",
    desc: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)",
  },
  {
    no: "02",
    heading: "Development",
    desc: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)",
  },
  {
    no: "03",
    heading: "♦ The full package",
    desc: "A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects.",
  },
];

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring configuration for buttery animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Different parallax speeds for layered effect
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), springConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -600]), springConfig);
  
  // Rotation and scale effects
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.9, 0.3]), springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <div ref={containerRef} className={styles.container}>
        
        {/* Section 1 - Front Layer */}
        <motion.section 
          className={`${styles.section} ${styles.frontLayer}`}
          style={{ y: y1 }}
        >
          <motion.div 
            className={styles.about_heading}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className={styles.headingWrapper}>
              <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                Helping brands thrive
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
              >
                in the digital world
              </motion.h1>
            </div>
            
            <motion.div 
              className={styles.stripe}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
            
            
          </motion.div>
        </motion.section>

        {/* Section 2 - Behind Layer */}
        <motion.section 
          className={`${styles.section} ${styles.behindLayer}`}
          style={{ y: y2, opacity }}
        >
          <motion.div 
            className={styles.aboutMe}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className={styles.info}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
              I’m a developer who’s always been curious about how computers and programs work. Over the years, I’ve worked with Next.js, WordPress, analytics, and SQL, building projects across different industries — from my time at Moons Technology to my current role at Flipkart. I love taking on new challenges, learning along the way, and keeping my code clean and user-friendly. When I’m not coding, you’ll probably find me gaming or traveling.
              </motion.p>
              <motion.h4
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Always exploring...
              </motion.h4>
            </motion.div>
            
            <motion.div 
              className={styles.myImg}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
            >
              <Image src={MyImg} alt="About Me" />
              <div className={styles.imageOverlay} />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section 3 - Front Layer */}
        <motion.section 
          className={`${styles.section} ${styles.frontLayer}`}
          style={{ y: y3 }}
        >
          <motion.div 
            className={styles.skill_Container}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <motion.h4 
              className={styles.heading}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I can help you with ...
            </motion.h4>
            
            <div className={styles.skills}>
              {skills.map((skill, index) => (
                <motion.div 
                  className={styles.card} 
                  key={index}
                  initial={{ opacity: 0, y: 100, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 * index,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.p 
                    className={styles.no}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 * index }}
                    viewport={{ once: true }}
                  >
                    {skill.no}
                  </motion.p>
                  
                  <motion.h4 
                    className={styles.skill_heading}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 * index }}
                    viewport={{ once: true }}
                  >
                    {skill.heading}
                  </motion.h4>
                  
                  <motion.p 
                    className={styles.desc}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 * index }}
                    viewport={{ once: true }}
                  >
                    {skill.desc}
                  </motion.p>
                  
                  <div className={styles.cardGlow} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

      </div>
      <div className={styles.footer_container}>
 <Contact />    
        
      </div>
 </>
  );
}