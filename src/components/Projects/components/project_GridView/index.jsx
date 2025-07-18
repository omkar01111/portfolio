'use client';
import React from 'react'
import styles from './style.module.scss';
import Image from 'next/image';

export default function ProjectCard({ title, src, color }) {
  return (
    <div className={styles.card}>
      <div
        style={{ background: color || "#f1f1f1" }}
        className={styles.image_background}
      >
        <Image
          src={`/images/${src}`}
          height={300}
          width={500}
          className={styles.project_img}
          alt={title}
        />
      </div>

      <h2 className={styles.project_heading}>{title}</h2>
    </div>
  );
}

