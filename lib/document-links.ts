const ONBOARDING_DOCUMENT_PATTERN = /^docs\/onboarding\/([a-z0-9-]+)\.md$/;

export function getOnboardingDocumentSlug(sourcePath?: string) {
  if (!sourcePath) {
    return null;
  }

  const match = sourcePath.match(ONBOARDING_DOCUMENT_PATTERN);
  return match ? match[1] : null;
}

export function getOnboardingDocumentHref(sourcePath?: string) {
  const slug = getOnboardingDocumentSlug(sourcePath);
  return slug ? `/onboarding/document/${slug}` : null;
}
