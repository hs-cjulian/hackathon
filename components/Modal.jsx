'use client'
import styles from "./Modal.module.scss"
import React from "react"

export default function Modal({children, closeModal}) {
  return (
    <div className={styles.shade} onClick={closeModal}>
      <div
        className={styles.content}
        onClick={e => { e.stopPropagation() }}
      >
        {children}
      </div>
    </div>
  )
}