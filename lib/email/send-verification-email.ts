import { getAppBaseUrl } from '@/lib/app-url';

interface SendVerificationEmailInput {
  email: string;
  token: string;
}

export async function sendVerificationEmail({
  email,
  token,
}: SendVerificationEmailInput) {
  const verificationUrl = new URL(
    `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
    getAppBaseUrl()
  ).toString();

  console.info(
    `[vacky][local-email] verification for ${email}: ${verificationUrl}`
  );

  return { verificationUrl };
}
