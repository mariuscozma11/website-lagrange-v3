import { NextRequest, NextResponse } from 'next/server';

const supportedLanguages = ['en', 'ro'] as const;
type SupportedLanguage = typeof supportedLanguages[number];
const defaultLanguage: SupportedLanguage = 'ro';

function getPreferredLanguage(request: NextRequest): SupportedLanguage {
  // Check for stored preference in cookie
  const preferredLang = request.cookies.get('preferred-language')?.value;
  if (preferredLang && supportedLanguages.includes(preferredLang as SupportedLanguage)) {
    return preferredLang as SupportedLanguage;
  }

  // Check Accept-Language header for browser preference
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,ro;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, priority = 'q=1'] = lang.trim().split(';');
        const q = parseFloat(priority.replace('q=', '')) || 1;
        // Get primary language code (e.g., "en-US" -> "en")
        const primaryCode = code.split('-')[0].toLowerCase();
        return { code: primaryCode, q };
      })
      .sort((a, b) => b.q - a.q);

    // Find first supported language
    for (const { code } of languages) {
      if (supportedLanguages.includes(code as SupportedLanguage)) {
        return code as SupportedLanguage;
      }
    }
  }

  return defaultLanguage;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a language prefix
  const pathnameHasLanguage = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // If pathname already has a language prefix, continue
  if (pathnameHasLanguage) {
    return NextResponse.next();
  }

  // Detect preferred language
  const preferredLanguage = getPreferredLanguage(request);

  // Redirect to preferred language
  const newUrl = pathname === '/'
    ? new URL(`/${preferredLanguage}`, request.url)
    : new URL(`/${preferredLanguage}${pathname}`, request.url);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
