import Fuse from 'fuse.js';
import {
  MOCK_KNOWLEDGE_BASE,
  KnowledgeEntry,
  DEFAULT_FALLBACK_ANSWER,
  FALLBACK_TOPICS
} from './knowledge-base';

export interface SearchResult {
  found: boolean;
  answer: string;
  category?: string;
  suggestedTopics?: string[];
  actionLabel?: string;
  actionUrl?: string;
}

// Setup Fuse instance for fuzzy search
const fuse = new Fuse<KnowledgeEntry>(MOCK_KNOWLEDGE_BASE, {
  keys: [
    { name: 'keywords', weight: 0.5 },
    { name: 'questions', weight: 0.35 },
    { name: 'category', weight: 0.15 }
  ],
  threshold: 0.4, // Flexible threshold allowing typos
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true
});

/**
 * Searches the mock knowledge base and returns a randomized answer if multiple are present.
 */
export function searchKnowledgeBase(query: string, currentPathname?: string): SearchResult {
  const cleanQuery = (query || '').trim();

  if (!cleanQuery) {
    return {
      found: false,
      answer: DEFAULT_FALLBACK_ANSWER,
      suggestedTopics: FALLBACK_TOPICS
    };
  }

  const results = fuse.search(cleanQuery);

  if (results && results.length > 0 && results[0].item) {
    const matchedEntry = results[0].item;
    const answersList = matchedEntry.answers || [];

    // Randomize answer among variations to simulate dynamic response
    const selectedAnswer = answersList.length > 0
      ? answersList[Math.floor(Math.random() * answersList.length)]
      : DEFAULT_FALLBACK_ANSWER;

    return {
      found: true,
      answer: selectedAnswer,
      category: matchedEntry.category,
      actionLabel: matchedEntry.actionLabel,
      actionUrl: matchedEntry.actionUrl
    };
  }

  // Fallback if no matching entry is found
  return {
    found: false,
    answer: DEFAULT_FALLBACK_ANSWER,
    suggestedTopics: FALLBACK_TOPICS
  };
}

