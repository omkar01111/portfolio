"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../../components/Preloader';
export default function Work() {  
    const [isLoading, setIsLoading] = useState(true);
    
      useEffect( () => {
        (
          async () => {
            
    
              setTimeout( () => {
                setIsLoading(false);
                document.body.style.cursor = 'default'
                window.scrollTo(0,0);
              }, 2000)
          }
        )()
      }, []) 
    return (
        <>
         <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
        </>
    )
}