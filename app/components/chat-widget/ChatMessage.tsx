'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Bot, User } from 'lucide-react';

export interface MessageProps {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatMessage({ message }: { message: MessageProps }) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.sender === 'assistant';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isAssistant ? 'flex-start' : 'flex-end',
        marginBottom: '14px',
        maxWidth: '100%'
      }}
    >
      {/* Sender Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '4px',
          fontSize: '11px',
          color: '#64748b'
        }}
      >
        {isAssistant ? (
          <>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #004680, #2DCCD3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Bot size={11} />
            </div>
            <span style={{ fontWeight: 600, color: '#004680' }}>AI Assistant</span>
          </>
        ) : (
          <>
            <span style={{ fontWeight: 500 }}>คุณ</span>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569'
              }}
            >
              <User size={11} />
            </div>
          </>
        )}
        <span>{message.timestamp}</span>
      </div>

      {/* Message Bubble Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '88%',
          borderRadius: isAssistant ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          padding: '10px 14px',
          backgroundColor: isAssistant ? '#f8fafc' : '#004680',
          color: isAssistant ? '#1e293b' : '#ffffff',
          boxShadow: isAssistant
            ? '0 2px 6px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)'
            : '0 2px 8px rgba(0, 70, 128, 0.25)',
          border: isAssistant ? '1px solid #e2e8f0' : 'none',
          fontSize: '13.5px',
          lineHeight: '1.55',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        {isAssistant ? (
          <div className="chat-markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h3 style={{ margin: '6px 0 4px', fontSize: '15px', color: '#004680' }} {...props} />,
                h2: ({ ...props }) => <h4 style={{ margin: '6px 0 4px', fontSize: '14.5px', color: '#004680' }} {...props} />,
                h3: ({ ...props }) => <h5 style={{ margin: '4px 0 4px', fontSize: '13.5px', color: '#004680' }} {...props} />,
                p: ({ ...props }) => <p style={{ margin: '4px 0' }} {...props} />,
                ul: ({ ...props }) => <ul style={{ paddingLeft: '18px', margin: '4px 0' }} {...props} />,
                ol: ({ ...props }) => <ol style={{ paddingLeft: '18px', margin: '4px 0' }} {...props} />,
                li: ({ ...props }) => <li style={{ margin: '2px 0' }} {...props} />,
                a: ({ ...props }) => (
                  <a
                    style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: 500 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                table: ({ ...props }) => (
                  <div className="table-scroll-container" style={{ overflowX: 'auto', margin: '8px 0', overscrollBehavior: 'contain' }}>
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        fontSize: '12px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px'
                      }}
                      {...props}
                    />
                  </div>
                ),
                th: ({ ...props }) => (
                  <th
                    style={{
                      border: '1px solid #cbd5e1',
                      padding: '5px 8px',
                      background: '#f1f5f9',
                      fontWeight: 600,
                      textAlign: 'left'
                    }}
                    {...props}
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    style={{
                      border: '1px solid #e2e8f0',
                      padding: '5px 8px'
                    }}
                    {...props}
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    style={{
                      borderLeft: '3px solid #2DCCD3',
                      paddingLeft: '10px',
                      margin: '6px 0',
                      color: '#475569',
                      background: 'rgba(45, 204, 211, 0.08)',
                      padding: '6px 10px',
                      borderRadius: '0 6px 6px 0'
                    }}
                    {...props}
                  />
                )
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
        )}

        {/* Copy Button for Assistant Message */}
        {isAssistant && message.content && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '4px',
              paddingTop: '4px'
            }}
          >
            <button
              onClick={handleCopy}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: copied ? '#16a34a' : '#94a3b8',
                fontSize: '11px',
                padding: '2px 4px',
                borderRadius: '4px',
                transition: 'color 0.2s'
              }}
              title="คัดลอกข้อความ"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

