import { X } from 'lucide-react'
import Button from './Button.jsx'

// content shape: { title, badge, sections: [{ type, ... }] }
// section types:
//  - text:    { type: 'text', body }
//  - list:    { type: 'list', heading?, items: [] }
//  - formula: { type: 'formula', label, expression }
//  - insight: { type: 'insight', body }
//  - action:  { type: 'action', body }
function Section({ section }) {
  switch (section.type) {
    case 'text':
      return <p className="text-sm text-text/90 leading-relaxed">{section.body}</p>
    case 'list':
      return (
        <div>
          {section.heading && <p className="text-xs tracking-wide text-muted mb-2">{section.heading}</p>}
          <ul className="space-y-1.5">
            {section.items.map((item, i) => (
              <li key={i} className="text-sm text-text/90 flex gap-2">
                <span className="text-accent">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'formula':
      return (
        <div className="bg-surface2 border border-accent/30 rounded-sm px-4 py-3">
          {section.label && <p className="text-[11px] text-muted mb-1">{section.label}</p>}
          <p className="font-mono text-accent text-base">{section.expression}</p>
        </div>
      )
    case 'insight':
      return (
        <div className="border-l-2 border-accent3 pl-3 py-1">
          <p className="text-sm text-accent3 leading-relaxed">{section.body}</p>
        </div>
      )
    case 'action':
      return (
        <div className="border-l-2 border-accent2 pl-3 py-1">
          <p className="text-sm text-accent2 leading-relaxed">{section.body}</p>
        </div>
      )
    default:
      return null
  }
}

export default function FlashcardOverlay({ isOpen, onClose, content }) {
  if (!isOpen || !content) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="concept-title"
      style={{ background: 'rgba(5,8,15,0.78)', backdropFilter: 'blur(10px)' }}
    >
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-accent/30 rounded-sm animate-fade-slide-up shadow-2xl">
        <div className="p-6 border-b border-muted/20 flex items-center justify-between">
          <div>
            {content.badge && (
              <span className="text-[10px] font-orbitron tracking-[0.12em] text-accent uppercase">{content.badge}</span>
            )}
            <h2 id="concept-title" className="font-orbitron text-xl text-text mt-1">{content.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close concept guide" className="rounded-sm p-2 text-muted hover:bg-surface2 hover:text-text transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 flex flex-col gap-5">
          {content.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </div>
        <div className="p-6 pt-2 flex justify-end">
          <Button onClick={onClose} variant="primary">
            Start lab
          </Button>
        </div>
      </div>
    </div>
  )
}
