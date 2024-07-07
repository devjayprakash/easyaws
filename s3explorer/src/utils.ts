export const getLanguageFromExtension = (extension: string) => {
  const extensionToLanguageMap: { [e: string]: string } = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    cs: 'csharp',
    rb: 'ruby',
    go: 'go',
    php: 'php',
    html: 'html',
    css: 'css',
    json: 'json',
    xml: 'xml',
    md: 'markdown',
    txt: 'plaintext',
    Dockerfile: 'dockerfile', // Add more mappings as needed
  };

  return extensionToLanguageMap[extension] || 'plaintext';
};
