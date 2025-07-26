"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function Index() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const menuButton = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll trigger for the floating button (desktop only)
    if (button.current) {
      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight,
          onLeave: () => {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onEnterBack: () => {
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: "power1.out",
            });
            setIsActive(false);
          },
        },
      });
    }

    // For mobile, show the floating menu immediately
    if (menuButton.current) {
      if (window.innerWidth <= 540) {
        gsap.set(menuButton.current, { scale: 1 });
      }
    }
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        {/* Left side logo - Always visible */}

        <Link href="/" legacyBehavior>
          <a className={styles.logo}>
            <p className={styles.copyright}>©</p>
            <div className={styles.name}>
              <p className={styles.codeBy}>Code by</p>
              <p className={styles.omkar}>Omkar</p>
              <p className={styles.more}>More</p>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation - Hidden on mobile (≤540px) */}
        {/* <div className={styles.desktopNav}>
          <Magnetic>
            <div className={styles.el}>
              <a href="/work">Work</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a href="about">About</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a href="contact">Contact</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div> */}

        <div className={styles.desktopNav}>
          {[
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((item) => {
            const isActive = pathname === item.href;

            return (
              <Magnetic key={item.href}>
                <div
                  className={`${styles.el} ${isActive ? styles.active : ""}`}
                >
                  <Link href={item.href}>{item.label}</Link>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
            );
          })}
        </div>
      </div>

      {/* Floating Menu Button after scroll - Desktop */}
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>

      {/* Floating Menu Button - Mobile/Tablet (Always visible on mobile) */}
      <div ref={menuButton} className={styles.mobileMenuButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
