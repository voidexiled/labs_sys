/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "gdehlqhfixbmqgpioojy.supabase.co",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
