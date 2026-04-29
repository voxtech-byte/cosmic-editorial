---
name: Cosmic Editorial
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: clamp(3rem, 10vw, 8rem)
    fontWeight: '700'
    lineHeight: '0.9'
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: clamp(2rem, 5vw, 4rem)
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  body-serif:
    fontFamily: Newsreader
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-sans:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  arabic-modifier:
    fontSize: 1.125rem
    lineHeight: '1.8'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 2rem
  margin: clamp(1rem, 5vw, 4rem)
  asymmetric-split: '7_5'
---

## Brand & Style

This design system targets an intellectual audience seeking a synthesis between empirical science, theological reflection, and artificial intelligence. The aesthetic is "Cosmic Editorial"—a high-end, scholarly look that feels both ancient and futuristic. It leverages **Glassmorphism** and **Spatial Depth** to create a sense of infinite discovery, while **Minimalist** typography provides the structural rigor of a scientific journal.

The experience should evoke a sense of "Awe-Struck Intellectualism." Users are treated as observers of a vast digital landscape. The UI utilizes subtle noise textures to mimic cosmic dust and intentional asymmetry to reflect the organic, non-linear nature of spiritual and scientific growth.

## Colors

The palette is anchored in **Space Dark**, providing a deep, expansive void that allows the semantic colors to vibrate. **Science Emerald** represents biological and empirical data; **AI Indigo** signifies the synthetic intelligence layer; and **Reflection Amber** is used for human-centric, theological, or historical insights.

Radial gradients are used to create "nebulae" behind content areas, subtly shifting between the background tones to prevent a flat appearance. Every color is defined using OKLCH to ensure perceptual uniformity across varying depths of transparency.

## Typography

Typography acts as a structural element, often breaking the grid or serving as a background texture. 

- **Headlines:** Use **Space Grotesk** for a technical, geometric edge. Apply tight tracking and fluid scaling via `clamp()` to ensure a commanding presence on all screen sizes.
- **Body Mix:** **Newsreader** (Serif) is reserved for long-form philosophical or theological arguments to provide an authoritative, literary feel. **Manrope** (Sans) is used for data points, UI labels, and technical AI descriptions.
- **Script Sensitivity:** To maintain visual parity with Latin characters, Arabic scripts must be scaled up by 1 level and utilize an expanded line-height of 1.8 to accommodate tall ascenders and descents.

## Layout & Spacing

This design system rejects standard symmetry in favor of a **Broken Editorial Grid**. The primary desktop layout follows a **7/5 column split**. The 7-column span houses primary narratives or data visualizations, while the 5-column span holds citations, AI interpretations, or spiritual reflections.

Elements should frequently utilize **negative margins** to overlap one another, creating a layered, "collage" effect. Use vertical spacing to dictate rhythm—tight clusters for technical data and expansive whitespace for reflective passages.

## Elevation & Depth

Depth is not communicated through traditional drop shadows but through **optical layering**:
1. **The Void:** The base dark gradient background with a 2% grain/noise overlay.
2. **Atmospheric Layer:** Radial blurs of Science Emerald or AI Indigo appearing deep behind content.
3. **Glass Plane:** Surfaces using `backdrop-blur-xl` and a 1px border with 10% white opacity.
4. **Active Elements:** High-refraction highlights on hover, making elements appear to "float" closer to the user through increased transparency and subtle translation.

## Shapes

The geometry is a hybrid of sharp editorial edges and soft cosmic forms. Standard containers use a 0.5rem radius to feel modern but structured. High-level "Premium Glass" cards utilize a 1.5rem radius to suggest a more organic, lens-like quality. 

Lines and separators should be hairline-thin (0.5px to 1px) to maintain the technical sophistication of a scientific instrument.

## Components

- **Premium Glass Cards:** Feature a background blur, a very thin internal stroke, and a slight "inner glow" at the top edge. When stacked, they use negative margins to overlap.
- **Tactile Buttons:** These should feel "bouncy" using spring-physics transitions. On press, they shift their outer shadow from a diffuse glow to a tight, high-contrast border, simulating physical displacement.
- **Horizontal Scrollers:** Used for cross-referencing galleries or timeline sequences. These utilize a momentum-based scroll and hide the scrollbar to keep the interface clean.
- **Scroll-Driven Reveals:** Elements should fade and slide upward or scale from 0.95 to 1.0 as they enter the viewport, synchronized with the user's scroll speed to mimic the sensation of moving through a nebula.
- **Data Callouts:** Small, floating labels with monospaced text and thin leader lines connecting to specific points in the body text or images.