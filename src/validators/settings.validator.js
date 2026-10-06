import { z } from 'zod';
import { env } from '../config/env.js';
import { sanitizeHtml } from '../utils/sanitizeHtml.js';

const ctaSchema = z.object({
  label: z.string().trim().max(60).optional(),
  href: z.string().trim().max(200).optional(),
});

/**
 * Logos and the favicon render on every public page through next/image, which
 * throws on a hostname it has not been told about. So these accept only what
 * the web app can always render: a path on the site itself, or a file from
 * this API's own uploads. Empty clears the field.
 */
const assetUrl = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) =>
      value === '' ||
      (value.startsWith('/') && !value.startsWith('//')) ||
      value.startsWith(`${env.publicApiUrl}/uploads/`),
    'Upload an image, or enter a path on this site such as /logo.png.'
  );

/** A link the site can follow safely. Rules out javascript: and data: URLs. */
const linkHref = z
  .string()
  .trim()
  .max(200)
  .refine(
    (value) => value === '' || /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i.test(value),
    'Enter a path on this site such as /tours, or a full https:// link.'
  );

/**
 * The map is rendered in an iframe, so the source is pinned to the embed
 * endpoints of the two providers an admin is realistically going to use.
 */
const MAP_EMBED_PREFIXES = [
  'https://www.google.com/maps/embed',
  'https://maps.google.com/maps',
  'https://www.openstreetmap.org/export/embed.html',
];

const mapEmbedUrl = z
  .string()
  .trim()
  .max(1000)
  .refine(
    (value) => value === '' || MAP_EMBED_PREFIXES.some((prefix) => value.startsWith(prefix)),
    'Paste the embed link from Google Maps (Share, then "Embed a map"). It starts with https://www.google.com/maps/embed.'
  );

export const updateSettingsSchema = z.object({
  aboutPage: z
    .object({
      title: z.string().trim().min(1, 'Give the page a title.').max(120).optional(),
      subtitle: z.string().trim().max(200).optional(),
      missionStatement: z.string().trim().max(600).optional(),
      visionStatement: z.string().trim().max(600).optional(),
      // Stored already sanitised, so nothing downstream has to trust it.
      storyHtml: z.string().max(20000).transform(sanitizeHtml).optional(),
      heroImageUrl: assetUrl.optional(),
      stats: z
        .array(
          z.object({
            value: z.string().trim().min(1, 'Each figure needs a value.').max(20),
            label: z.string().trim().min(1, 'Each figure needs a label.').max(60),
          })
        )
        .max(6, 'Six figures at most.')
        .optional(),
    })
    .optional(),

  servicesPage: z
    .object({
      title: z.string().trim().min(1, 'Give the page a title.').max(120).optional(),
      subtitle: z.string().trim().max(200).optional(),
      introText: z.string().trim().max(600).optional(),
      bannerImageUrl: assetUrl.optional(),
      servicesList: z
        .array(
          z.object({
            title: z.string().trim().min(1, 'Each service needs a title.').max(80),
            description: z.string().trim().min(1, 'Each service needs a description.').max(600),
            icon: z.string().trim().max(40).optional(),
          })
        )
        .max(24, 'Twenty-four services at most.')
        .optional(),
    })
    .optional(),

  contactPage: z
    .object({
      inquiryHeadline: z.string().trim().min(1, 'Give the page a headline.').max(120).optional(),
      inquiryIntro: z.string().trim().max(300).optional(),
      bannerImageUrl: assetUrl.optional(),
      address: z.string().trim().max(300).optional(),
      workingHours: z.string().trim().max(200).optional(),
      mapEmbedUrl: mapEmbedUrl.optional(),
      inquiryEmail: z
        .string()
        .trim()
        .max(160)
        .email('Enter a valid email address.')
        .or(z.literal(''))
        .optional(),
    })
    .optional(),

  banner: z
    .object({
      active: z.boolean().optional(),
      announcementText: z.string().trim().max(160).optional(),
      ctaLabel: z.string().trim().max(40).optional(),
      ctaLink: linkHref.optional(),
    })
    .optional(),

  footer: z
    .object({
      copyrightText: z.string().trim().max(160).optional(),
      quickLinks: z
        .array(
          z.object({
            label: z.string().trim().min(1, 'Each link needs a label.').max(40),
            // Not optional-blank like the banner link: a row with no
            // destination is a dead link in the footer of every page.
            href: linkHref.refine((value) => value !== '', 'Each link needs a destination.'),
          })
        )
        .max(12, 'Twelve links at most.')
        .optional(),
    })
    .optional(),

  branding: z
    .object({
      siteName: z.string().trim().min(1, 'Give the site a name.').max(80).optional(),
      logoUrl: assetUrl.optional(),
      footerLogoUrl: assetUrl.optional(),
      faviconUrl: assetUrl.optional(),
    })
    .optional(),

  hero: z
    .object({
      title: z.string().trim().max(160).optional(),
      subtitle: z.string().trim().max(400).optional(),
      backgroundImage: z
        .object({ url: z.string().optional(), alt: z.string().optional() })
        .optional(),
      primaryCta: ctaSchema.optional(),
      secondaryCta: ctaSchema.optional(),
      slides: z
        .array(
          z.object({
            url: assetUrl.refine((value) => value !== '', 'Each slide needs an image.'),
            alt: z.string().trim().max(200).optional(),
          })
        )
        .max(8, 'Eight slides at most.')
        .optional(),
    })
    .optional(),

  values: z
    .array(
      z.object({
        title: z.string().trim().max(80),
        description: z.string().trim().max(400),
        icon: z.string().trim().max(40).optional(),
      })
    )
    .optional(),

  contact: z
    .object({
      phone: z.string().trim().max(40).optional(),
      whatsapp: z.string().trim().max(40).optional(),
      email: z.string().trim().max(160).optional(),
      addressLine: z.string().trim().max(200).optional(),
      poBox: z.string().trim().max(80).optional(),
      city: z.string().trim().max(120).optional(),
      supportHours: z.string().trim().max(120).optional(),
    })
    .optional(),

  socials: z
    .object({
      facebook: z.string().trim().max(200).optional(),
      instagram: z.string().trim().max(200).optional(),
      x: z.string().trim().max(200).optional(),
      youtube: z.string().trim().max(200).optional(),
      tiktok: z.string().trim().max(200).optional(),
    })
    .optional(),

  newsletter: z
    .object({
      heading: z.string().trim().max(120).optional(),
      blurb: z.string().trim().max(400).optional(),
    })
    .optional(),

  footerBlurb: z.string().trim().max(600).optional(),

  // A YouTube ID, not a URL: the homepage builds the embed src from it. Pasting
  // a full watch URL is the obvious mistake, so reject anything outside the
  // 11-character ID alphabet and say what was expected. Empty clears the video.
  video: z
    .object({
      youtubeId: z
        .string()
        .trim()
        .regex(
          /^[A-Za-z0-9_-]{11}$/,
          'Enter the 11-character YouTube video ID (the v= part of the URL), not the whole link.'
        )
        .or(z.literal(''))
        .optional(),
    })
    .optional(),

  seo: z
    .object({
      defaultTitle: z.string().trim().max(70).optional(),
      defaultDescription: z.string().trim().max(200).optional(),
      ogImage: z.string().trim().optional(),
    })
    .optional(),
});
