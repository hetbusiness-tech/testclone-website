declare module "*.css";
declare module "*.md" {
  const content: string;
  export default content;
}
declare module "cloudflare:workers" {
  export const env: any;
}
