import { searchKnowledgeBase } from '@/app/components/chat-widget/search-engine';

export const runtime = 'nodejs';

/**
 * Splits text into streamable chunks while respecting character boundaries
 * and markdown structure (newlines, spaces).
 */
function createChunks(text: string): string[] {
  const tokens = text.match(/[\s\n]+|[^\s\n]{1,4}/g) || [text];
  return tokens;
}

export async function POST(req: Request) {
  try {
    const { message, currentPathname } = await req.json();

    const query = typeof message === 'string' ? message : '';
    const searchResult = searchKnowledgeBase(query, currentPathname);
    const finalizedText = searchResult.answer;

    const chunks = createChunks(finalizedText);
    const encoder = new TextEncoder();

    // Create ReadableStream with simulated typing delay (12ms - 28ms)
    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          controller.enqueue(encoder.encode(chunk));

          const delay = Math.floor(Math.random() * (28 - 12 + 1)) + 12;
          const { promise, resolve } = Promise.withResolvers<void>();
          setTimeout(resolve, delay);
          await promise;
        }
        controller.close();
      }
    });

    const headers: Record<string, string> = {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Content-Type-Options': 'nosniff',
      'x-suggestions': encodeURIComponent(JSON.stringify(searchResult.followUpSuggestions || [])),
      'x-action-label': encodeURIComponent(searchResult.actionLabel || ''),
      'x-action-url': encodeURIComponent(searchResult.actionUrl || ''),
      'x-action-type': encodeURIComponent(searchResult.actionType || ''),
      'x-category': encodeURIComponent(searchResult.category || ''),
      'x-title': encodeURIComponent(searchResult.title || '')
    };

    return new Response(stream, { headers });
  } catch (error) {
    console.error('Chat Widget Streaming API error:', error);
    return new Response('เกิดข้อผิดพลาดในการประมวลผลคำตอบ กรุณาลองใหม่อีกครั้งครับ', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
