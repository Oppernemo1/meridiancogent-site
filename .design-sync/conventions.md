# MeridianCogent: building with this design system

These are the real components from the MeridianCogent marketing site (Next.js + Tailwind). They're on `window.MeridianCogent`. The look is **Tailwind utility classes generated from the site's design tokens**. There are no theme props and no provider: import `styles.css` and use the token classes below.

## Setup

- No provider or wrapper component is needed. Components are styled by `styles.css`, which is the compiled Tailwind output plus the Gelasio webfont. Without it, everything renders as unstyled browser defaults.
- Set the page ground with `bg-paper text-ink font-sans`. Headings `h1`–`h2` automatically use Gelasio serif in `text-graphite`. `h3`/`h4` are sans, medium weight.
- Page skeleton: `Header`, then `<main>` with page content inside `Container`, then `Footer`. `Header` and `Footer` take no props.
- Only classes compiled into `styles.css` exist. Every token class listed here is guaranteed. Stock Tailwind layout utilities (`flex`, `grid`, `gap-*`, `p-*`, `md:` variants) are available when the site already uses them. Check `_ds_bundle.css` before relying on an unusual one.

## Token classes (the design language)

| Family | Classes |
|---|---|
| Colour | `graphite` (dark ground, headings), `ink` (body text), `muted` (secondary text), `paper` (page ground), `hairline` (borders), `accent` (orange fills and rules, **never text**), `accent-dark` (orange text on paper), `accent-light` (orange text on graphite), `on-dark-primary` / `on-dark-secondary` (text on graphite), `status-green` / `status-red`. Use them as `bg-*`, `text-*`, `border-*`, `divide-*`. |
| Type size | `text-h1` / `text-h1-sm`, `text-h2` / `text-h2-sm`, `text-h3`, `text-body` / `text-body-sm`, `text-label`, `text-small`, `text-nav`, `text-sidebar`. Mobile-first: `text-h2-sm md:text-h2`. |
| Section label | `text-label font-semibold uppercase text-accent-dark` (use `text-accent-light` on graphite) |
| Spacing | `py-section md:py-section-lg` (section rhythm), `mt-heading-gap` (heading → first paragraph), `space-y-paragraph-gap` (between paragraphs) |
| Width | `max-w-content` (1100px page column), `max-w-measure` (720px prose), `max-w-panel` (165px side panel) |

Rules: sections are separated by a hairline rule (`border-t border-hairline`), not by changing the background colour. Dark bands use `bg-graphite` with `on-dark-*` text. Links in prose: `text-accent-dark underline underline-offset-4 hover:text-muted`. Corners are square, except `DataPanel` (`rounded-lg`).

## Components

- `Container`: centred `max-w-content` column with side gutters. Wrap every page band in it.
- `Section`: label + optional `heading` + prose `children`, with an optional `panel` (usually a `DataPanel`) floated on the right.
- `DataPanel`: graphite fact panel, `rows: {label, value}[]`.
- `PostCard`: resource card taking `post: {slug, title, description, date, tags, readingTime?}`. Lay cards out in `grid gap-6 md:grid-cols-3`.
- `EarlyAccessForm`: email capture form. `theme="dark"` on graphite, `fields="full"` for name/company/role/email, `download` for guide downloads.

Read each component's `.prompt.md` and `.d.ts` for the full props. Read `styles.css` → `_ds_bundle.css` for the exact classes.

## Example

```jsx
const { Container, Section, DataPanel } = window.MeridianCogent;

<main className="bg-paper">
  <Container>
    <Section
      id="tsa"
      label="TSA exposure"
      heading="Transitional services, modelled as exposure"
      panel={<DataPanel label="Modelled" rows={[
        { label: "Exposure", value: "With step-up" },
        { label: "Exit risk", value: "Months ahead" },
      ]} />}
    >
      <p>A TSA is not a document to be stored. It is a live cost with an end date.</p>
    </Section>
  </Container>
</main>
```
