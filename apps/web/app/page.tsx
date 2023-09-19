"use client";

import { TestComponent } from "@mynance/shared-ui";

import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <TestComponent />
    </div>
  );
}
