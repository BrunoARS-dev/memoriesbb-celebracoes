import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Endereço Wi-Fi usado para conferir o site em celulares na rede local.
  // A permissão se aplica somente ao servidor de desenvolvimento.
  allowedDevOrigins: ["192.168.15.2"],
};

export default nextConfig;
