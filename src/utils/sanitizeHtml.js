/**
 * Allowlist HTML sanitiser for the few admin-authored rich-text fields that the
 * public site renders as markup (currently the About page story).
 *
 * Built so the output is safe by construction rather than by spotting bad
 * input: every `<` that survives is one this module wrote itself, as a bare
 * allowlisted tag or an anchor whose href passed the scheme check. Anything
 * else, attributes, unknown tags, comments, stray angle brackets, is dropped or
 * escaped. That makes pasted Word or Google Docs markup collapse to clean
 * paragraphs instead of failing the save.
 */

const PLAIN_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u',
  'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote',
]);

/** Site-relative paths and the ordinary link schemes. Never javascript: or data:. */
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i;

function anchor(attributes) {
  const match = attributes.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  const href = (match?.[1] ?? match?.[2] ?? '').trim();
  if (!href || !SAFE_HREF.test(href) || /["<>\s]/.test(href)) return '<a>';

  const external = /^https?:\/\//i.test(href);
  return external
    ? `<a href="${href}" target="_blank" rel="noopener noreferrer">`
    : `<a href="${href}">`;
}

export function sanitizeHtml(input) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    // Script and style bodies would otherwise be left behind as visible text.
    .replace(/<(script|style)\b[^<>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^<>]*)>|</g, (whole, slash, name, attributes) => {
      if (!name) return '&lt;';

      const tag = name.toLowerCase();
      if (tag === 'a') return slash ? '</a>' : anchor(attributes);
      if (!PLAIN_TAGS.has(tag)) return '';
      if (tag === 'br') return '<br>';
      return `<${slash}${tag}>`;
    })
    .trim();
}
