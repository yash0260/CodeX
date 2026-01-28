import Editor from '@monaco-editor/react';

export default function CodeEditor({ code, onChange, language }) {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={value => onChange(value ?? '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
    
  );
}
