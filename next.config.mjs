/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pages are statically rendered where possible. The one exception is the
  // /api/early-access route handler (Resend integration), which runs as a
  // serverless function on Vercel — so we deliberately do NOT use
  // `output: 'export'` here.
};

export default nextConfig;
