import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange, theme }) {
  return (
    <Editor
      height="100%"
      language="javascript"
      theme={theme === "dark" ? "vs-dark" : "light"}
      value={code}
      onChange={(value) => onChange(value || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        scrollBeyondLastLine: false,
      }}
    />
  );
}
