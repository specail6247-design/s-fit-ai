# Deployment Guide

This project is configured for automated deployment to Vercel via GitHub Actions.

## Prerequisites

1.  **Vercel Project**: Create a new project on Vercel and link it to your GitHub repository.
2.  **Vercel Tokens**:
    *   Get your Vercel Account Token from [Account Settings > Tokens](https://vercel.com/account/tokens).
    *   Get your Org ID and Project ID from the project settings.

## Environment Variables

### GitHub Secrets

Add the following secrets to your GitHub repository settings:

*   `VERCEL_TOKEN`: Your Vercel account token.
*   `VERCEL_ORG_ID`: Your Vercel Organization ID.
*   `VERCEL_PROJECT_ID`: Your Vercel Project ID.

### Vercel Project Environment Variables

Configure the following environment variables in your Vercel Project Settings:

*   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anonymous Key.
*   `REPLICATE_API_TOKEN`: Your Replicate API Token.
*   `NEXT_PUBLIC_APP_URL`: The URL of your deployed application (e.g., `https://s-fit-ai.vercel.app`).
*   `GOOGLE_ANALYTICS_ID`: (Optional) Your Google Analytics ID.

## Deployment Process

### Production

Pushing to the `main` branch triggers the production deployment workflow:

1.  Checks out code.
2.  Installs dependencies (`npm ci`).
3.  Builds the application (`npm run build`).
4.  Runs tests (`npm run test`).
5.  Deploys to Vercel (Production).

### Preview

Pull Requests automatically trigger Vercel Preview deployments (configured via Vercel Dashboard integration with GitHub).

## Configuration Files

*   `vercel.json`: Contains Vercel-specific configuration (headers, regions).
*   `.github/workflows/deploy.yml`: Defines the production deployment pipeline.
*   `lib/env.ts`: Specific environment variable validation logic.

## Post-Deployment Verification

After deployment, verify:
1.  **Homepage**: Loads without errors.
2.  **Virtual Try-On**: Test the functionality with sample images.
3.  **Performance**: Check Vercel Analytics and Core Web Vitals.
