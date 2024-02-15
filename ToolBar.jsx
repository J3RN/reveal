import React from 'react';

export default function ToolBar({ language, languages, handleLanguageChange, handleReset }) {
  return (
    <div className="tool-bar">
      <select onChange={handleLanguageChange} value={language.name}>
        {languages.map((lang) => (
          <option key={lang.name} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
