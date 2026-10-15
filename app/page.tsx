import fs from 'fs';
import path from 'path';
import '../style.css';
import LegacyScripts from './components/LegacyScripts';

// Render the exact markup of index.html so the Next page matches it 1:1.
function getIndexBody(): string {
  const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? '';
  // Scripts are loaded separately by <LegacyScripts /> (innerHTML scripts don't execute)
  return body.replace(/<script[\s\S]*?<\/script>/gi, '');
}

export default function HomePage() {
  return (
    <>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: getIndexBody() }} />
      <LegacyScripts />
    </>
  );
}
