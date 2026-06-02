# Lagrange Ghost Theme

Custom Ghost theme matching lagrangeengineering.ro (dark-first, dashed borders,
monospace accents, industrial green). Includes a "Back to website" button in the
header linking to https://lagrangeengineering.ro.

## Upload to Ghost

1. Zip the inner `lagrange/` folder (the zip must contain package.json at its root):

   cd ghost-theme && zip -r lagrange-theme.zip lagrange -x '*.DS_Store'

2. Ghost Admin -> Settings -> Design -> Change theme -> Upload theme -> select the zip.
3. Activate.

## Notes

- Set the site logo in Ghost Admin (Settings -> Design -> Brand). Falls back to the
  site title text if no logo is set.
- posts_per_page is 12 (matches the old on-site listing).
- Post URLs are blog.lagrangeengineering.ro/{slug}; the main site links here.
