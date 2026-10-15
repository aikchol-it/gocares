import { searchKnowledgeBase } from '@/app/components/chat-widget/search-engine';

export const runtime = 'nodejs';

/**
 * Splits text into streamable chunks while respecting character boundaries
 * and markdown structure (newlines, spaces).
 */
function createChunks(text: string): string[] {
  // Split by whitespace and small segments while maintaining Thai & English words
  const tokens = text.match(/[\s\n]+|[^\s\n]{1,4}/g) || [text];
  return tokens;
}

export async function POST(req: Request) {
  try {
    const { message, currentPathname } = await req.json();

    const query = typeof message === 'string' ? message : '';
    const searchResult = searchKnowledgeBase(query, currentPathname);
    const fullAnswer = searchResult.answer;

    // Append action link or fallback suggestions if available
    let finalizedText = fullAnswer;
    if (!searchResult.found && searchResult.suggestedTopics?.length) {
      finalizedText += '\n\n**หัวข้อที่สามารถสอบถามได้:**\n' +
        searchResult.suggestedTopics.map(t => `- ${t}`).join('\n');
    }

    const chunks = createChunks(finalizedText);
    const encoder = new TextEncoder();

    // Create ReadableStream with simulated typing delay (15ms - 35ms)
    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          controller.enqueue(encoder.encode(chunk));

          // Random delay between 15ms and 35ms
          const delay = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error('Chat Widget Streaming API error:', error);
    return new Response('เกิดข้อผิดพลาดในการประมวลผลคำตอบ กรุณาลองใหม่อีกครั้งครับ', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
