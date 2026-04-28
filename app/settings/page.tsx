import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { setTheme } from '@/lib/actions/set-theme';
import { requireSession } from '@/lib/auth/session';
import { resolveTheme, Theme, THEME_COOKIE_NAME } from '@/lib/theme';
import { cookies } from 'next/headers';
import Image from 'next/image';

interface ThemeOption {
  description: string;
  label: string;
  value: Theme;
}

const themeOptions: ThemeOption[] = [
  {
    description: 'Bright surfaces and higher contrast for daylight use.',
    label: 'Light',
    value: 'light',
  },
  {
    description: 'Dark surfaces for lower-glare navigation.',
    label: 'Dark',
    value: 'dark',
  },
];

export default async function SettingsPage() {
  const session = await requireSession({ redirectTo: '/' });

  const cookieStore = await cookies();
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE_NAME)?.value);
  const displayName = session.user.name || 'Traveler';
  const displayEmail = session.user.email;
  const verificationLabel = session.user.emailVerifiedAt
    ? 'Email verified'
    : 'Email pending verification';

  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Manage your account details and the current app theme.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              This reflects the local account stored in the SpacetimeDB
              migration branch.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Image
              src={session.user.image || '/default-avatar.png'}
              alt={`${displayName} profile image`}
              width={72}
              height={72}
              className="size-18 rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-foreground text-lg font-semibold">
                {displayName}
              </p>
              <p className="text-foreground text-sm">
                Local email/password account
                {displayEmail ? <span className="text-muted-foreground"> ({displayEmail})</span> : null}
              </p>
              <p className="text-muted-foreground text-sm">
                {verificationLabel}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose the theme for this browser. The current selection is{' '}
              <span className="text-foreground font-medium">{theme}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {themeOptions.map((option) => (
                <form key={option.value} action={setTheme}>
                  <input type="hidden" name="theme" value={option.value} />
                  <Button
                    type="submit"
                    variant={theme === option.value ? 'default' : 'outline'}
                    className="h-auto w-full flex-col items-start gap-1 px-4 py-4 text-left"
                  >
                    <span>{option.label}</span>
                    <span className="text-xs font-normal opacity-80">
                      {option.description}
                    </span>
                  </Button>
                </form>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Theme preference is stored in a cookie and applied on the server
              before the app renders.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
