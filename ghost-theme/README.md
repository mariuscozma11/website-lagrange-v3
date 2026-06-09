# NovaWorks Ghost Theme

Custom Ghost theme matching novaworks.ro (dark-first, dashed borders,
monospace accents, industrial green). Includes a "Back to website" button in the
header linking to https://novaworks.ro.

## Upload to Ghost

1. Zip the inner `novaworks/` folder (the zip must contain package.json at its root):

   cd ghost-theme && zip -r novaworks-theme.zip novaworks -x '*.DS_Store'

2. Ghost Admin -> Settings -> Design -> Change theme -> Upload theme -> select the zip.
3. Activate.

## Notes

- The header brand is the "NovaWorks" wordmark (text). No logo image required.
- posts_per_page is 12 (matches the old on-site listing).
- Post URLs are blog.novaworks.ro/{slug}; the main site links here.
