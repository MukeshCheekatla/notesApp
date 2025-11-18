import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const colors = [
  { name: 'yellow', class: 'bg-yellow-100' },
  { name: 'blue', class: 'bg-blue-100' },
  { name: 'green', class: 'bg-green-100' },
  { name: 'pink', class: 'bg-pink-100' },
  { name: 'purple', class: 'bg-purple-100' },
  { name: 'gray', class: 'bg-gray-100' }
];

export default function NoteModal({ note, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setColor(note.color || 'yellow');
    } else {
      setTitle('');
      setContent('');
      setColor('yellow');
    }
  }, [note]);

  const handleSave = () => {
    if (!content.trim()) return;
    
    onSave({
      title: title.trim() || 'Untitled',
      content: content.trim(),
      color
    });
    
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-2xl font-semibold mb-4 px-2 py-1 focus:outline-none"
            autoFocus={!note}
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Take a note..."
            className="w-full h-64 px-2 py-1 focus:outline-none resize-none"
          />
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`${c.class} w-10 h-10 rounded-full border-2 ${
                    color === c.name ? 'border-gray-800' : 'border-gray-300'
                  } hover:border-gray-600 transition`}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}