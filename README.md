# MiniApp LLM

## Overview

NextAuth.js is a complete open-source authentication solution for Next.js applications.

This example application demonstrates how to implement Sign In with Worldcoin using NextAuth.js.

For more information and documentation, please refer to:

-   [NextAuth.js Documentation](https://next-auth.js.org)
-   [Worldcoin Sign In Documentation](https://docs.worldcoin.org/quick-start/sign-in)

## Getting Started

### 1. Clone the Repository and Install Dependencies

First, clone your repository and install the necessary dependencies:

```bash
git clone git@github.com:0xZap/Zap-miniapp.git
cd Zap-miniapp/client

# You can use bun, yarn...
npm install
```

### 2. Configure Your App in the Worldcoin Developer Portal

1. **Create a New Application**:

    Go to the [Worldcoin Developer Portal](https://developer.worldcoin.org/) and create a new application. Note that:

    - **Staging Apps**: Must use the [Worldcoin Simulator](https://simulator.worldcoin.org) for authentication.
    - **Production Apps**: Will use the [World App](https://worldcoin.org/download).

2. **Add Callback URLs**:

    Under the **Sign in with World ID** section, add the following URLs to the **Redirects**:

    - For local development (staging apps only):

        ```
        http://localhost:3000/api/auth/callback/worldcoin
        ```

    - For production:

        ```
        https://your-app-url.com/api/auth/callback/worldcoin
        ```

    _Replace `your-app-url.com` with your actual domain._

3. **Teams and Permissions**:

    Ensure that your application is properly configured under the **Teams** section, and necessary permissions are granted.

4. **Obtain Credentials**:

    Note down the following credentials from the Developer Portal for the next step:

    - `APP_ID`
    - `DEV_PORTAL_API_KEY`
    - `WLD_CLIENT_ID`
    - `WLD_CLIENT_SECRET`

### 3. Configure Your Local Environment

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your application credentials

### 4. (Optional) Configure Additional Authentication Providers

If you wish to add more authentication providers:

1. **Modify Sign-In Logic**:

    Change line 33 in `components/header.tsx` from `signIn("worldcoin")` to `signIn()`. This allows users to choose their authentication provider from a list.

2. **Update NextAuth Configuration**:

    - Edit `pages/api/auth/[...nextauth].js` to include additional providers.
    - Configure each provider according to NextAuth.js documentation.

3. **Set Callback URLs for Each Provider**:

    In each provider's developer console, set the callback URL to:

    ```
    http://localhost:3000/api/auth/callback/{provider}
    ```

    _Example for Google OAuth:_

    ```
    http://localhost:3000/api/auth/callback/google
    ```

    More information is available at [NextAuth.js OAuth Providers](https://next-auth.js.org/configuration/providers/oauth).

4. **Configure a Database (If Needed)**:

    If you're adding providers that require persistence (like email sign-in), configure a database:

    - Refer to [NextAuth.js Adapters](https://next-auth.js.org/adapters/overview) for setup instructions.

### 5. Start the Application

To run your application locally:

```bash
npm run dev
```

To build and run it in production mode:

```bash
npm run build
npm run start
```

### 6. Prepare for Production

-   **Deployment**:

    Follow the [NextAuth.js Deployment Guide](https://authjs.dev/guides/basics/deployment) to deploy your application.

-   **Set Environment Variables**:

    Ensure that all environment variables from `.env.local` are set in your production environment.

## Common Issues

-   **Cannot sign in with World ID**:

    For the Sign in with World ID to work correctly, you must specify at least one redirect URL in the **Sign in with World ID** section of your app in the Worldcoin Developer Portal.

    Example Redirect URL:

    ```
    http://localhost:3000/api/auth/callback/worldcoin
    ```

    _Replace with your production domain when deploying._

    ![example](https://github.com/user-attachments/assets/c35048e7-39cb-45c1-8dd5-312d627a7695)
