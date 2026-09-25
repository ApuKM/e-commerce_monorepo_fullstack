# 🛒 e-commerce-ui (ecomgithub)

> A high-performance, responsive e-commerce storefront layout engineered for speed using Next.js 15 (Turbopack), React 19, and the brand-new utility compiler engine of Tailwind CSS v4.

This storefront is architected to optimize core web vitals, utilizing lightweight atomic state slices to manage fluid shopping cart behavior and strict structural schema payloads for checkout workflows.

---

## 🚀 Key Features

*   **Turbopack Accelerated Dev Loops:** Uses the high-speed Next.js Rust-based engine (`--turbopack`) for instant hot-module replacements (HMR) and optimized build times.
*   **Atomic Cart State Management:** Engineered a fast, persistent global shopping cart pipeline with `Zustand` to manage line items, price recalculations, and checkout stages smoothly without heavy re-renders.
*   **Strict Schema Validation:** Checkout billing details, customer inputs, and dynamic form targets are guarded by `Zod` combined with `@hookform/resolvers`.
*   **Non-Blocking Form Controls:** Built seamless product configurations and interactive customer detail paths utilizing lightweight, type-safe structures via `react-hook-form`.
*   **Micro-Interaction Visuals:** Integrated crisp, reactive visual indicators via `react-toastify` and contextual vector icons using `lucide-react` to enhance the user shopping journey.

---

## 🛠️ Tech Stack & Architecture

### Core Architecture
*   **Framework Layer:** `React 19` & `Next.js 15` (App Router Core)
*   **Compilation Engine:** `Turbopack` (Rust-based builder)
*   **Type Management:** `TypeScript` (Strict schema verification)

### Layout & Global State
*   **Styling Engine:** `Tailwind CSS v4` paired with `@tailwindcss/postcss`
*   **State Machine:** `Zustand` (Client-side localized store abstraction)
*   **Form Validation:** `React Hook Form` + `Zod` (Payload schema sanitization)

---

## 💻 Getting Started & Installation

Follow these quick steps to launch the e-commerce client environment locally:

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   **Node.js:** v20.x or greater recommended
*   **Package Manager:** `pnpm` (Standard Node runtime package manifest)

### 2. Clone and Dependency Installation
Clone the active repository folder layout and download the asset arrays:
```bash
git clone [https://github.com/ApuKM/e-commerce-ui.git](https://github.com/ApuKM/e-commerce-ui.git)
cd e-commerce-ui
pnpm install
