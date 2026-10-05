import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-paper">
      <h1 className="font-display text-8xl text-lime font-extrabold">404</h1>
      <p className="mt-4 text-xl text-paper/70 font-medium">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-lime px-6 text-sm font-medium text-ink transition-colors hover:bg-lime-bright"
      >
        Return Home
      </Link>
    </div>
  );
}
