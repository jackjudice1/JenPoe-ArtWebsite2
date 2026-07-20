import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-5 py-32 text-center sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl">This tile isn&apos;t on the table.</h1>
      <p className="mt-3 max-w-sm text-sm text-ink/65">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
