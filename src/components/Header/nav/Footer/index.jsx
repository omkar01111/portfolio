import styles from './style.module.scss';

export default function Index() {
  return (
    <div className={styles.footer}>
        <a href='https://www.linkedin.com/in/-omkar-more/'  className={styles.social_link} target='_blank'>Linkedin</a>
      <a
                className={styles.social_link}
                href="https://www.instagram.com/omkar_more07?"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
       <a
                className={styles.social_link}
                href="https://www.freelancer.com/u/omkarmore07?sb=t"
                target="_blank"
                rel="noopener noreferrer"
              >
                Freelance
              </a>{" "}
        <a
                className={styles.social_link}
                href="https://github.com/omkar01111"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
    </div>
  )
}
