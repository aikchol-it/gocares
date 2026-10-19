'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Bot, User, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export interface MessageProps {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  actionLabel?: string;
  actionUrl?: string;
  actionType?: 'booking' | 'line' | 'call' | 'url';
}

interface ChatMessageComponentProps {
  message: MessageProps;
  onSelectSuggestion?: (text: string) => void;
  onTriggerAction?: (actionUrl: string, actionType?: string) => void;
}

export default function ChatMessage({
  message,
  onSelectSuggestion,
  onTriggerAction
}: ChatMessageComponentProps) {
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
            <span style={{ fontWeight: 600, color: '#004680' }}>ผู้ช่วยอัจฉริยะ GO CARES</span>
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
          maxWidth: '92%',
          borderRadius: isAssistant ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          padding: '12px 14px',
          backgroundColor: isAssistant ? '#ffffff' : '#004680',
          color: isAssistant ? '#1e293b' : '#ffffff',
          boxShadow: isAssistant
            ? '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)'
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
                h1: ({ ...props }) => <h3 style={{ margin: '8px 0 4px', fontSize: '15px', color: '#004680', fontWeight: 700 }} {...props} />,
                h2: ({ ...props }) => <h4 style={{ margin: '8px 0 4px', fontSize: '14.5px', color: '#004680', fontWeight: 700 }} {...props} />,
                h3: ({ ...props }) => <h5 style={{ margin: '6px 0 4px', fontSize: '13.5px', color: '#004680', fontWeight: 600 }} {...props} />,
                p: ({ ...props }) => <p style={{ margin: '5px 0' }} {...props} />,
                ul: ({ ...props }) => <ul style={{ paddingLeft: '18px', margin: '5px 0' }} {...props} />,
                ol: ({ ...props }) => <ol style={{ paddingLeft: '18px', margin: '5px 0' }} {...props} />,
                li: ({ ...props }) => <li style={{ margin: '2px 0' }} {...props} />,
                a: ({ ...props }) => (
                  <a
                    style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: 600 }}
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
                      padding: '6px 8px',
                      background: '#f1f5f9',
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#004680'
                    }}
                    {...props}
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    style={{
                      border: '1px solid #e2e8f0',
                      padding: '6px 8px'
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

            {/* Action CTA Button */}
            {message.actionLabel && message.actionUrl && (
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={() => onTriggerAction?.(message.actionUrl!, message.actionType)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #004680 0%, #002d54 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0, 70, 128, 0.25)',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <span>{message.actionLabel}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}

            {/* Interactive Follow-up Suggestion Chips */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11.5px',
                    color: '#004680',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  <Sparkles size={12} color="#2DCCD3" />
                  <span>คำถามที่แนะนำสอบถามต่อ:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {message.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onSelectSuggestion?.(sug)}
                      style={{
                        background: '#f8fafc',
                        color: '#004680',
                        border: '1px solid #cbd5e1',
                        borderRadius: '16px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all 0.15s',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#004680';
                        e.currentTarget.style.background = '#eef6ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                    >
                      <span>💬</span>
                      <span>{sug}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
              marginTop: '6px',
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
