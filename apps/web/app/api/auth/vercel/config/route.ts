import { type NextRequest } from "next/server";

type VercelOauthConfigDiagnostic = {
  clientIdPresent: boolean;
  clientIdMasked: string | null;
  clientIdLength: number;
  clientSecretPresent: boolean;
  clientSecretLength: number;
  callbackUrl: string;
  vercelEnv: string | null;
  vercelUrl: string | null;
  productionUrl: string | null;
};

function maskClientId(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  if (value.length <= 8) {
    return `${value.slice(0, 2)}***${value.slice(-2)}`;
  }

  return `${value.slice(0, 4)}***${value.slice(-4)}`;
}

export async function GET(req: NextRequest): Promise<Response> {
  const clientId = process.env.NEXT_PUBLIC_VERCEL_APP_CLIENT_ID;
  const clientSecret = process.env.VERCEL_APP_CLIENT_SECRET;

  const diagnostic: VercelOauthConfigDiagnostic = {
    clientIdPresent: Boolean(clientId),
    clientIdMasked: maskClientId(clientId),
    clientIdLength: clientId?.length ?? 0,
    clientSecretPresent: Boolean(clientSecret),
    clientSecretLength: clientSecret?.length ?? 0,
    callbackUrl: `${req.nextUrl.origin}/api/auth/vercel/callback`,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    vercelUrl: process.env.VERCEL_URL ?? null,
    productionUrl:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      null,
  };

  return Response.json(diagnostic);
}
