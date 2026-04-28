import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

function getSearchParam(
  value: string | string[] | undefined,
  fallback = ''
) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = getSearchParam(params.error);
  const email = getSearchParam(params.email);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Finish account setup before signing in on this migration branch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {error ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="rounded-2xl border border-border bg-secondary/50 px-4 py-4 text-sm leading-6 text-foreground">
            {email
              ? `A verification link was generated for ${email}. In local development the link is printed to the server logs.`
              : 'A verification link is required before this account can sign in. In local development the link is printed to the server logs.'}
          </div>

          <Button asChild className="w-full">
            <Link href="/sign-in">Back to sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

