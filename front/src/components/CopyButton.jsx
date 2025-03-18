import React, { useState } from 'react';

const CopyButton = ({ textToCopy, label, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 text-sm rounded transition-colors ${
        copied 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      } ${className || ''}`}
    >
      {copied ? 'Copied!' : label}
    </button>
  );
};

export default CopyButton;