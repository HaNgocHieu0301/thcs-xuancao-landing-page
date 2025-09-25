interface RichTextProps {
  html?: string | null;
}

export default function RichText({ html }: RichTextProps) {
  if (!html) return null;
  return (
    <div
      className="richtext space-y-4 text-base leading-relaxed text-slate-700 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_a]:text-primary-600 [&_a:hover]:text-primary-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
