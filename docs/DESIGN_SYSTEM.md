
---

# 🎨 Cloud9 Design System

**Version:** 1.0
**Last Updated:** November 2025

---

## ☁️ Overview

The **Cloud9 Design System** defines the visual, interactive, and accessibility standards for the Cloud9 Weather App.
Its primary goal is to create a **calm, inclusive, and readable interface**, one that’s friendly to users across visual, auditory, and cognitive spectrums.

This document ensures consistency across all UI components such as `WeatherCard`, `VoiceMemo`, and `SubtitleDisplay`.

---

## 🌈 Core Design Principles

1. **Clarity** – Present data cleanly, without clutter.
2. **Accessibility First** – Every color, typeface, and layout must meet WCAG AA+ contrast ratios.
3. **Friendly Feel** – Rounded corners, soft shadows, and balanced spacing.
4. **Universal Input** – Designed to work equally well with touch, mouse, keyboard, or voice.
5. **Scalability** – Style tokens and CSS variables allow easy adaptation to dark, high-contrast, or brand themes.

---

## 🎨 Color Palette

| Purpose                       | Light Mode        | Dark Mode         | Notes                                              |
| ----------------------------- | ----------------- | ----------------- | -------------------------------------------------- |
| **Primary (Accent)**          | `#2563EB`         | `#3B82F6`         | Main interactive color (buttons, highlights).      |
| **Secondary (Success/Voice)** | `#10B981`         | `#34D399`         | For confirmation, voice actions, or "Play" states. |
| **Danger/Alert**              | `#EF4444`         | `#F87171`         | Weather warnings, error text.                      |
| **Card Background**           | `#FFFFFF`         | `#1F2937`         | Surface background for cards.                      |
| **Text Primary**              | `#111827`         | `#F9FAFB`         | Default text color.                                |
| **Text Secondary**            | `#6B7280`         | `#D1D5DB`         | Subtext or labels.                                 |
| **Shadow**                    | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.4)` | Soft elevation for cards.                          |

> **Contrast Guideline:**
> All text/background combinations meet **WCAG AA (4.5:1)** or higher.

---

## 🧱 Typography

| Element         | Font               | Weight  | Size        | Notes                                     |
| --------------- | ------------------ | ------- | ----------- | ----------------------------------------- |
| **Headings**    | Inter / Sans-serif | 600–700 | 1.25–1.5rem | For component titles and section headers. |
| **Body Text**   | Inter / Sans-serif | 400     | 0.875–1rem  | Clean, legible type for general content.  |
| **Temperature** | Inter / Sans-serif | 700     | 2–3rem      | High-visibility number for quick reading. |
| **Captions**    | Inter / Sans-serif | 400     | 0.75rem     | Used for alerts or labels below icons.    |

> Cloud9 uses [Inter](https://rsms.me/inter/) because of its **high readability** and **optimized web performance**.

---

## 🧩 Layout & Spacing

| Element                               | Spacing                             |
| ------------------------------------- | ----------------------------------- |
| **Card Padding**                      | `1rem` (16px)                       |
| **Element Gap (inside cards)**        | `0.5rem` (8px)                      |
| **Outer Margin (between components)** | `1.5rem` (24px)                     |
| **Border Radius**                     | `1rem` (16px) for cards and buttons |
| **Shadow**                            | `0 4px 12px rgba(0, 0, 0, 0.1)`     |

**Guidelines**

* Use consistent spacing units (4px scale).
* Maintain generous white space for legibility.
* Cards and buttons should appear soft and touch-friendly.

---

## ☀️ Component Styling — Weather Card

| Element            | Property      | Value                        | Purpose                          |
| ------------------ | ------------- | ---------------------------- | -------------------------------- |
| **Card Container** | Background    | `var(--card-bg, #fff)`       | Main surface for data display.   |
|                    | Border Radius | `1rem`                       | Soften edges, approachable feel. |
|                    | Shadow        | `0 4px 12px rgba(0,0,0,0.1)` | Elevation from background.       |
|                    | Padding       | `1rem`                       | Balanced breathing space.        |
| **Location Text**  | Font Size     | `1.25rem`                    | Emphasis on locality.            |
|                    | Weight        | `600`                        | Readable but not heavy.          |
| **Temperature**    | Font Size     | `2rem`                       | Immediate visual hierarchy.      |
|                    | Color         | `#2563EB`                    | Links to brand accent.           |
| **Condition**      | Font Size     | `0.875rem`                   | Secondary emphasis.              |
|                    | Opacity       | `0.8`                        | Visual hierarchy.                |
| **Alert Text**     | Color         | `#EF4444`                    | Urgency indicator.               |
| **Listen Button**  | Background    | `#2563EB`                    | Interactive accent.              |
|                    | Hover         | `#1D4ED8`                    | Subtle motion feedback.          |
|                    | Text Color    | `#FFFFFF`                    | Contrast + clarity.              |
|                    | Border Radius | `0.75rem`                    | Finger-friendly.                 |

---

## 🔊 Component Styling — Voice Memo

| Element                   | Property      | Value         |
| ------------------------- | ------------- | ------------- |
| **Container**             | Layout        | Centered flex |
| **Play Button (default)** | Background    | `#10B981`     |
|                           | Text Color    | `#FFFFFF`     |
|                           | Hover         | `#059669`     |
|                           | Border Radius | `0.5rem`      |
| **Speaking State**        | Background    | `#9CA3AF`     |
|                           | Cursor        | `not-allowed` |

> Voice feedback always includes **visual state changes** and **ARIA updates**.

---

## 💬 Component Styling — Subtitle Display

| Element       | Property      | Value                          |
| ------------- | ------------- | ------------------------------ |
| **Container** | Background    | `rgba(0, 0, 0, 0.7)`           |
|               | Text Color    | `#FFFFFF`                      |
|               | Font Size     | `0.9rem`                       |
|               | Border Radius | `0.5rem`                       |
|               | Padding       | `0.5rem 1rem`                  |
|               | Max Width     | `20rem`                        |
|               | Alignment     | Center                         |
|               | Role          | `status`, `aria-live="polite"` |

**Accessibility Standards**

* Supports **live text updates** during voice playback.
* Maintains **minimum 4.5:1 contrast ratio**.
* Toggle available for users who prefer or require visual captions.

---

## ♿ Accessibility Guidelines Summary

| Feature                  | Implementation                                     |
| ------------------------ | -------------------------------------------------- |
| **Contrast**             | ≥ 4.5:1 on all text/backgrounds                    |
| **Keyboard Navigation**  | All interactive elements reachable via `Tab`       |
| **ARIA Labels**          | Descriptive labels on buttons and dynamic elements |
| **Screen Reader Alerts** | `aria-live` used in subtitles and voice status     |
| **Reduced Motion**       | Honor user `prefers-reduced-motion` setting        |
| **Voice Alternative**    | All spoken info available in text form             |

---

## 🧭 Design Tokens (CSS Variables)

These are defined globally in `:root` for easy theming.

```css
:root {
  --card-bg: #ffffff;
  --accent-color: #2563eb;
  --accent-color-hover: #1d4ed8;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --alert-color: #ef4444;
  --success-color: #10b981;
}

[data-theme="dark"] {
  --card-bg: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
}
```

---

## 🧠 Visual Identity Summary

* **Mood:** Calm, reliable, friendly, inclusive
* **Personality:** Informative but warm
* **Design Language:** Soft cards, large typography, clean icons
* **Accessibility:** Central to all UI decisions

---

### ✅ Example Component Alignment

| Component       | Font  | Primary Color        | Corner Radius | Shadow  | Accessibility           |
| --------------- | ----- | -------------------- | ------------- | ------- | ----------------------- |
| WeatherCard     | Inter | `#2563EB`            | `1rem`        | Yes     | High contrast           |
| VoiceMemo       | Inter | `#10B981`            | `0.5rem`      | Minimal | Screen reader supported |
| SubtitleDisplay | Inter | `#FFFFFF` on dark bg | `0.5rem`      | None    | `aria-live` text        |

---

### 🪄 Future Additions

* Expanded color tokens for themes (Sunrise / Dusk / High Contrast)
* Component motion guidelines (transitions, micro-interactions)
* Voice synthesis style customization (tone, language, pacing)

---
