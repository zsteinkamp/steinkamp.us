import { Highlight, Prism, type PrismTheme } from 'prism-react-renderer'

// Highlight uses this exact Prism instance internally, so patching it here is
// enough — no need to pass a `prism` prop. `jsonc` (JSON + comments) isn't a
// bundled grammar; synthesize it from `json` so the // labels in our payloads
// highlight as comments while keys/values still tokenize correctly.
const P = Prism as any
if (P.languages?.json && !P.languages.jsonc) {
  P.languages.jsonc = {
    comment: /\/\/.*|\/\*[\s\S]*?\*\//,
    ...P.languages.json,
  }
}

// Colors are CSS variables (defined for both themes in globals.css) so the
// highlighting follows the site's light/dark toggle. No background here — the
// existing `article pre { bg-shadebg }` rule provides it.
const theme: PrismTheme = {
  plain: { color: 'var(--code-text)' },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--code-comment)', fontStyle: 'italic' },
    },
    { types: ['punctuation'], style: { color: 'var(--code-punctuation)' } },
    {
      types: ['property', 'tag', 'symbol', 'deleted'],
      style: { color: 'var(--code-property)' },
    },
    {
      types: ['string', 'char', 'attr-value', 'inserted', 'url'],
      style: { color: 'var(--code-string)' },
    },
    { types: ['number'], style: { color: 'var(--code-number)' } },
    {
      types: ['boolean', 'keyword', 'null', 'constant', 'atrule'],
      style: { color: 'var(--code-keyword)' },
    },
    {
      types: ['function', 'class-name', 'function-variable'],
      style: { color: 'var(--code-function)' },
    },
    {
      types: ['operator', 'entity', 'variable', 'regex'],
      style: { color: 'var(--code-operator)' },
    },
  ],
}

export function CodeBlock({
  content,
  language,
}: {
  content: string
  language?: string
}) {
  const code = (content ?? '').replace(/\n$/, '')
  const lang = language || 'text'

  return (
    <Highlight code={code} language={lang} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre>
          <code>
            {tokens.map((line, i) => (
              <span
                key={i}
                {...getLineProps({ line })}
                style={{ display: 'block' }}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
