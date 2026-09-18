import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });

    if (isServer) {
      const serverDir = path.join(process.cwd(), ".next", "server");
      if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(serverDir, "package.json"),
        JSON.stringify({ type: "commonjs" })
      );
    }
    return config;
  },
};

export default nextConfig;
