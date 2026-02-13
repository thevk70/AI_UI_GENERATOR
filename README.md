🧠 AI UI Generator – Deterministic UI Agent

AI-powered deterministic UI generator inspired by Claude Code

📌 Overview

This project implements an AI-driven, deterministic UI generation system that converts natural language UI intent into:

✅ Valid React UI code

✅ Live rendered preview

✅ Human-readable explanation of decisions

✅ Versioned history with rollback support

The system strictly enforces a fixed component library to ensure reproducibility, safety, and debuggability, as required by the Ryze AI assignment.

## 📸 Screenshots

![Landing](screenshots/Interface.png)
![Video Clip](screenshots/AI_UI.mp4)

🎯 Goals

Convert plain English UI requests into working UI code

Enforce deterministic component usage

Support incremental UI edits (no full rewrites unless requested)

Explain why the AI made each UI decision

Allow rollback to previous UI versions

Render UI safely with validation and error boundaries

🧱 Fixed Component System (Core Constraint)

All generated UIs use only the following predefined components:

Navbar

Sidebar

Card

Input

Button

Table

Modal

🚫 Strictly Prohibited

Inline styles in generated code

AI-generated CSS

Tailwind class generation

External UI libraries

Creating new components

Runtime logic (loops, conditionals, hooks) in generated code

Component implementation and styling never change.
The AI may only select, compose, and configure components.

🧠 AI Agent Design (Multi-Step)

A single LLM call is not used.
The system is intentionally split into explicit agent stages:

1️⃣ Planner Agent

Interprets user intent

Chooses layout structure

Selects allowed components

Produces a structured UI plan (JSON)

2️⃣ Generator Agent

Converts the plan into valid React JSX

Uses only allowed components & props

Enforces strict output rules

Produces render-safe code

3️⃣ Explainer Agent

Explains UI decisions in plain English

References component choices and layout changes

Describes incremental edits when modifying UI

Prompt separation is explicit and visible in code, as required.

🖥 Application UI (Claude-Style)

The app UI is structured into three main areas:

Left Panel

AI chat input

User intent / modification requests

Version history list with rollback

Middle Panel

Generated React code (editable)

Live updates on regeneration

Right Panel

Live UI preview (iframe-based)

Explanation of AI decisions

🔁 Iteration & Edit Awareness

The system supports incremental UI updates:

The AI modifies existing code instead of regenerating everything

Component usage is preserved

Each change is explained

Full rewrites occur only if explicitly requested

Example:

“Make this more minimal and add a settings modal”

🛡 Safety & Validation

The system includes real, lightweight protections:

✅ Component whitelist validation

✅ Generated code validation before rendering

✅ Inline export stripping for preview safety

✅ Error boundaries in preview renderer

✅ Protection against invalid JSX & object rendering

✅ Graceful error messages in preview

🧰 Tech Stack
Frontend

React (Vite)

Monaco Editor (code editing)

iframe-based preview renderer

Babel Standalone (safe JSX execution)

Backend

Node.js + Express

In-memory version store

REST APIs:

/api/generate

/api/history

/api/history/:id

AI

LLM API (Groq / OpenAI compatible)

Explicit agent orchestration (Planner → Generator → Explainer)

📦 Deliverables (As Required)

✅ Working local & deployed application

✅ Deterministic component system

✅ Multi-step AI agent

✅ Version history with rollback

✅ Live UI preview

✅ Editable generated code

✅ Explanation output

✅ Full commit history

✅ Clear setup instructions (below)

# Clone repository

git clone <repo-url>
cd ai-ui-generator

# Install dependencies

npm install

# Start backend

cd backend
npm run dev

# Start frontend

cd ../frontend
npm run dev

📧 Submission

Email: jayant@get-ryze.ai

Subject: AI UI Generator Assignment – VISHWAJEET KUMAR

Include:

GitHub repository link

Deployed app URL

Demo video link (optional but recommended)

🙌 Final Notes

This project focuses on correctness, determinism, and trustworthiness, not visual polish.
Every design decision was made to align strictly with the Ryze AI assignment constraints.
