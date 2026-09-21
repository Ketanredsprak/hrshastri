# Contact form → JSON storage (private admin URL)

## How it works

1. The React contact form `POST`s JSON to `api/contact-submit.php`.
2. PHP appends each submission to `storage/contact-submissions.json`.
3. The `storage/` folder is blocked from direct browser access (`.htaccess`).
4. You view leads only via a **secret URL** (not linked on the public site).

## Setup (WAMP)

1. Ensure `api/config.local.php` exists (copy from `api/config.local.example.php`).
2. Set a long random `view_token` in `config.local.php`.
3. Apache must execute PHP in the project folder (WAMP: `http://localhost/hrshashtri_web/`).

## Private view URL (change token in config.local.php)

```
http://localhost/hrshashtri_web/api/leads-view.php?key=YOUR_VIEW_TOKEN
```

Wrong or missing `key` returns **404 Not Found** (same as a missing page).

## Vite dev (`npm run dev`)

The dev server proxies `/api/*` to WAMP so the form works on port 5173.

## Production

Deploy the `api/` folder and `storage/` folder alongside your built site on the same Apache vhost.

## Security notes

- Change `view_token` to your own long random string.
- Do not commit `api/config.local.php` if the repo is public.
- Submissions JSON is gitignored (`storage/contact-submissions.json`).
