# Design System Specification: The Domestic Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Concierge."** 

Moving away from the sterile, utilitarian feel of standard gig-economy apps, this system adopts a high-end editorial aesthetic. It treats home service discovery not as a transaction, but as a curated experience of trust. We achieve this through **Soft Minimalism**: a philosophy that prioritizes breathing room, intentional asymmetry, and tonal depth over rigid grids and harsh borders. By layering soft surfaces and utilizing sophisticated typography scales, we create an environment that feels as organized and calm as the homes our professionals provide.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, regal purple (`primary`) and a warm, sun-drenched orange (`secondary`), balanced against a sophisticated range of cool grays.

### Tonal Surface Palette
*   **Primary:** `#5341cd` | **Primary Container:** `#6c5ce7` (The heart of the brand)
*   **Secondary:** `#7c5800` | **Secondary Container:** `#ffcd70` (Used for warmth and highlights)
*   **Surface:** `#f8f9fb` (The base canvas)
*   **Surface Container Low:** `#f2f4f6` (Subtle depth)
*   **Surface Container Highest:** `#e1e2e4` (Prominent structural elements)

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. Structural definition must be achieved through:
1.  **Background Shifts:** Placing a `surface-container-low` card against a `surface` background.
2.  **Negative Space:** Using the `12` (3rem) or `16` (4rem) spacing tokens to let content breathe.

### Glass & Gradient Rule
To elevate the mobile experience in Accra's vibrant market, use **Glassmorphism** for floating action buttons or navigation bars. Use a background blur of `12px` combined with `surface-container-lowest` at 80% opacity. 
*   **Signature Texture:** Main CTAs should utilize a subtle linear gradient from `primary` (#5341cd) to `primary_container` (#6c5ce7) at a 135-degree angle to provide a "gemstone" depth that flat colors lack.

---

## 3. Typography: The Editorial Voice
We use **Inter** as our typographic backbone, leaning heavily on weight contrast to create hierarchy.

| Token | Size | Weight | Intent |
| :--- | :--- | :--- | :--- |
| **Display-LG** | 3.5rem | Bold | Hero statements; high-impact landing areas. |
| **Headline-MD** | 1.75rem | SemiBold | Major section headers. |
| **Title-LG** | 1.375rem | Medium | Service category titles (e.g., "Deep Cleaning"). |
| **Body-LG** | 1.0rem | Regular | Service descriptions and professional bios. |
| **Label-MD** | 0.75rem | SemiBold | Metadata (Price, Rating, Duration). |

**Editorial Note:** Use `Headline-MD` with tight letter-spacing (-0.02em) to create a premium, "locked-in" look for headers.

---

## 4. Elevation & Depth
Hierarchy is established through **Tonal Layering** rather than drop shadows where possible.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f2f4f6) background. This creates a natural "lift" that mimics fine stationery.
*   **Ambient Shadows:** For floating elements (like a "Book Now" bar), use a multi-layered shadow: 
    *   `0px 10px 30px rgba(83, 65, 205, 0.06)` — The shadow color must be a tinted version of the `primary` or `on-surface` token to maintain a natural, atmospheric feel.
*   **The Ghost Border Fallback:** If a container requires definition against a similar background, use `outline-variant` (#c8c4d7) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components & Interaction

### Cards & Lists
*   **The Rule of No Dividers:** Forbid the use of horizontal lines between list items. Use `8` (2rem) vertical spacing or a subtle background toggle (Alternating `surface` and `surface-container-low`).
*   **Service Cards:** Use `xl` (1.5rem) corner radius. Imagery should be slightly inset from the card edge to create an editorial "frame" effect.

### Buttons
*   **Primary:** Gradient-fill (`primary` to `primary-container`), `full` (pill) or `xl` (1.5rem) roundedness. Minimum height: 56px for mobile accessibility.
*   **Secondary:** `secondary-container` background with `on-secondary-container` text. No border.

### Chips & Tags
*   **Selection Chips:** Use `surface-container-high` as the base. Upon selection, transition to `primary` with a subtle `2.5` (0.625rem) elevation shadow.

### Input Fields
*   **Style:** Minimalist. `surface-container-highest` background, no border. The label should float above the field in `label-md` using `primary` color when the field is active.

### Specialized Component: The "Trust Badge"
A bespoke component for this system: A small, semi-transparent `secondary-fixed` (#ffdea7) pill with a glass blur, used to overlay professional certifications on provider photos.

---

## 6. Do’s and Don’ts

### Do
*   **Do** embrace white space. If a screen feels "empty," it is likely working.
*   **Do** use asymmetrical layouts for hero sections (e.g., text aligned left, service provider image overlapping the container boundary to the right).
*   **Do** use `primary-fixed-dim` for disabled states to keep the brand's purple soul visible even in inactive elements.

### Don't
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#191c1e) to keep the contrast high but the "vibe" soft.
*   **Don't** use standard Material Design 4dp shadows. They are too "heavy" for this system.
*   **Don't** use icons without purpose. Icons should be used as "wayfinders," not just decoration. Use a consistent stroke weight (1.5px) for all custom domestic service icons.