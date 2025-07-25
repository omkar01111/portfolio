"use client";
import { useRef, useState } from "react";
import styles from "./style.module.scss";
import Rounded from "../../common/RoundedButton";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    organization: "",
    services:"",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", organization: "" }); // Reset form
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.questionNumber}>01</div>
          <div className={styles.inputContainer}>
            <label className={styles.question}>What&rsquo;s your name?</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`${styles.input} ${
                focusedField === "name" ? styles.focused : ""
              } ${formData.name ? styles.hasValue : ""}`}
              placeholder="omkar more"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.questionNumber}>02</div>
          <div className={styles.inputContainer}>
            <label className={styles.question}>What&rsquo;s your email?</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`${styles.input} ${
                focusedField === "email" ? styles.focused : ""
              } ${formData.email ? styles.hasValue : ""}`}
              placeholder="john@doe.com *"
              required
            />
          </div>
        </div>

        
        <div className={styles.formGroup}>
          <div className={styles.questionNumber}>03</div>
          <div className={styles.inputContainer}>
            <label className={styles.question}>Contact No?</label>
            <input
              type="number"
              value={formData.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              onFocus={() => setFocusedField("number")}
              onBlur={() => setFocusedField(null)}
              className={`${styles.input} ${
                focusedField === "number" ? styles.focused : ""
              } ${formData.number ? styles.hasValue : ""}`}
              placeholder="+91 70210 11 *"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.questionNumber}>04</div>
          <div className={styles.inputContainer}>
            <label className={styles.question}>
              What&rsquo;s the name of your organization?
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) =>
                handleInputChange("organization", e.target.value)
              }
              onFocus={() => setFocusedField("organization")}
              onBlur={() => setFocusedField(null)}
              className={`${styles.input} ${
                focusedField === "organization" ? styles.focused : ""
              } ${formData.organization ? styles.hasValue : ""}`}
              placeholder="John & Doe ®"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.questionNumber}>05</div>
          <div className={styles.inputContainer}>
            <label className={styles.question}>
              What services are you looking for?
            </label>
            <input
              type="text"
              value={formData.services}
              onChange={(e) =>
                handleInputChange("services", e.target.value)
              }
              onFocus={() => setFocusedField("services")}
              onBlur={() => setFocusedField(null)}
              className={`${styles.input} ${
                focusedField === "services" ? styles.focused : ""
              } ${formData.organization ? styles.hasValue : ""}`}
              placeholder="Web Design, Web Development ..."
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.questionNumber}>06</div>
          <div className={styles.inputContainer}>
            <label className={styles.question}>Your message</label>
            <textarea
              type="text"
              value={formData.message}
              onChange={(e) =>
                handleInputChange("message", e.target.value)
              }
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              className={`${styles.input} ${
                focusedField === "message" ? styles.focused : ""
              } ${formData.organization ? styles.hasValue : ""}`}
              placeholder="Hello Omkar, can you help me with ... *"
            />
          </div>
        </div>
        <div>
          <div>
            <motion.div
              style={{ x }}
              className={styles.buttonContainer}
              // Optional: role for accessibility
              role="button"
              aria-disabled={isSubmitting}
              onClick={!isSubmitting ? handleSubmit : undefined} // only triggers when not submitting
            >
              <Rounded backgroundColor={"#334BD3"} className={styles.button}>
                <p>{isSubmitting ? "Sending..." : "Get in touch"}</p>
              </Rounded>
            </motion.div>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className={styles.successMessage}>
            <p>✓ Thank you! Your message has been sent successfully.</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className={styles.errorMessage}>
            <p>
              ✗ Sorry, there was an error sending your message. Please try
              again.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
