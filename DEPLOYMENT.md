# Deployment & Troubleshooting Guide

## Build for Production

```sh
npm run build
```
- Output is in the `dist/` directory.

## Environment Variables
- Copy `.env.example` to `.env` and fill in all required values.
- Common variables:
  - `VITE_API_URL` — Base URL for backend API
  - Any third-party API keys as needed

## Deploying

### Vercel
- Push your repo to GitHub/GitLab
- Import into Vercel dashboard
- Set environment variables in Vercel settings
- Vercel auto-detects Vite/React and builds/deploys

### Netlify
- Push your repo to GitHub/GitLab
- Import into Netlify dashboard
- Set environment variables in Netlify settings
- Set build command: `npm run build`
- Set publish directory: `dist`

### Node/Custom Server
- Build locally: `npm run build`
- Serve with a static server (e.g., `serve dist`)
- Or use Docker for containerized deployment

## Troubleshooting

- **Build fails:**
  - Check Node/npm versions
  - Ensure all env vars are set
  - Run `npm install` to refresh dependencies

- **App won't start:**
  - Check `.env` and API endpoints
  - Look for errors in the browser console and server logs

- **API errors:**
  - Ensure backend is running and accessible
  - Check CORS settings if frontend and backend are on different domains

- **E2E tests fail:**
  - Make sure the dev server is running on port 8080
  - Check Playwright config for correct base URL

- **Styling issues:**
  - Run `npm run build` and check for Tailwind or PostCSS errors

## Support
- For persistent issues, open an issue in the repository or contact the maintainer. 