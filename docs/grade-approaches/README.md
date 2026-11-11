# Grade component: alternative approaches

The `Grade` component in `src/main/ui/common/components/Grade/` renders a card grade as
five stars, each filled proportionally to the grade (e.g. `3.27` → 3 full stars and 27% of
the 4th). The current implementation is a single `StarIcon` component per star with a
`fillPercent` prop, filled via an SVG `<linearGradient>` with a hard stop and a unique id
from `useId()`.

The folders below keep the other approaches considered. Files keep their original import
paths, so they can be copied back into `src/main/ui/common/components/Grade/` as is.
Approaches 2 and 3 rely on the `--grade-star-color` and `--grade-star-color-filled`
variables in `src/index.css`.

## 1. Two images (`1-two-images/`)

An empty star `<img>` with a filled star `<img>` on top, inside an absolutely positioned
wrapper with `overflow: hidden` and `width: {fill}%`. Uses the existing `IconSvg` component.

- Setup: copy `icons/star.svg` and `icons/star-filled.svg` to `src/assets/icons/`.
- Pros: uses the project's existing `<img>` icon pattern; no SVG ids.
- Cons: two icon files; colors are baked into the SVGs and can't be changed from CSS;
  two images plus a wrapper per star.

## 2. CSS mask (`2-css-mask/`)

One `<span>` per star, masked with `star.svg` and painted with a hard-stop
`linear-gradient` whose stop position is passed in as the `--fill` CSS variable.

- Setup: copy `icons/star.svg` to `src/assets/icons/`.
- Pros: one icon file; one element per star; colors come from CSS variables.
- Cons: references an image from CSS; needs the `-webkit-mask` prefix for older
  Safari/Chrome.

## 3. Two `StarIcon` layers (`3-two-star-layers/`)

Same layering as approach 1, but with a plain inline-SVG `StarIcon` component
(`fill="currentColor"`) used twice; each layer's color is set with CSS `color`.

- Setup: none, the star path is inline in `StarIcon.tsx`.
- Pros: one plain icon component that fits a future "icons as components" refactor;
  colors come from CSS variables; no SVG ids.
- Cons: two SVGs plus a wrapper per star.
- Note: this approach was discussed but not run in the app.
