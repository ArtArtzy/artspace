# ARN shared authentication mockup

- `/login` and `/login/forgot-password` default to ARN Space; the header returns to `/`.
- `?from=arnbook` selects ARN Book. Its mock home is `/read`; set the server environment variable `ARNBOOK_HOME_URL` to the real Book home when connecting the products.
- `returnTo` accepts local paths and is preserved between login and password recovery. External homes are configured on the server.
- Authentication and social login retain the existing local-storage mock. Password recovery only shows a confirmation; it does not send email.
- `/register` uses the same ARN shell and source context. It opens the username, email, gender (default: unspecified), and password form directly. Registration validates the form, then returns to login with `registered=success`; it does not create or persist a real account.
- Terms and privacy links use the existing unbuilt-page modal. Their content pages are not implemented.

## Illustration

Asset: `public/images/arn-auth-story-world.webp`. Created with the built-in ImageGen tool and converted to WebP using Sharp.

Generation prompt:

> Use case: illustration-story. Asset type: portrait editorial illustration for ARN shared reading community login website. A beautiful surreal miniature world growing out of an open book: winding emerald path connects a quiet library archway, tiny reading nooks and warm illuminated windows, two small people sharing stories among lush foliage, floating pages like birds. Sophisticated painterly 3D paper sculpture, tactile paper, atmospheric dark charcoal forest green background, emerald highlights and warm ivory book pages. Strong central composition in upper two thirds with calm dark lower third for HTML copy overlay. Premium literary, welcoming and imaginative, subtle detail, no text, no logos, no watermark. Portrait 2:3 composition.
