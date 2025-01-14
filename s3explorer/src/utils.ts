import { defaultStyles } from 'react-file-icon'

export function addAlpha(color: string, opacity: number) {
    // coerce values so it is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255)
    return color + _opacity.toString(16).toUpperCase()
}

export const extensionData = [
    {
        extensionData: 'rdb',
        style: defaultStyles.txt,
        name: 'redis',
    },
    {
        extension: 'js',
        style: defaultStyles.js,
        name: 'javascript',
    },
    {
        extension: 'ts',
        style: defaultStyles.ts,
        name: 'typescript',
    },
    {
        extension: 'py',
        style: defaultStyles.py,
        name: 'python',
    },
    {
        extension: 'java',
        style: defaultStyles.java,
        name: 'java',
    },
    {
        extension: 'cpp',
        style: defaultStyles.cpp,
        name: 'cpp',
    },
    {
        extension: 'cs',
        style: defaultStyles.cs,
        name: 'csharp',
    },
    {
        extension: 'rb',
        style: defaultStyles.rb,
        name: 'ruby',
    },
    {
        extension: 'php',
        style: defaultStyles.php,
        name: 'php',
    },
    {
        extension: 'html',
        style: defaultStyles.html,
        name: 'html',
    },
    {
        extension: 'css',
        style: defaultStyles.css,
        name: 'css',
    },
    {
        extension: 'json',
        style: defaultStyles.json,
        name: 'json',
    },
    {
        extension: 'md',
        style: defaultStyles.md,
        name: 'markdown',
    },
    {
        extension: 'txt',
        style: defaultStyles.txt,
        name: 'plaintext',
    },
    {
        extension: 'Dockerfile',
        style: defaultStyles.txt,
        name: 'dockerfile',
    },
    {
        extension: 'xml',
        style: defaultStyles.txt,
        name: 'xml',
    },
    {
        extension: 'sh',
        style: defaultStyles.txt,
        name: 'shell',
    },
    {
        extension: 'yml',
        style: defaultStyles.txt,
        name: 'yaml',
    },
    {
        extension: 'yaml',
        style: defaultStyles.txt,
        name: 'yaml',
    },
    {
        extension: 'sql',
        style: defaultStyles.txt,
        name: 'sql',
    },
    {
        extension: 'kt',
        style: defaultStyles.txt,
        name: 'kotlin',
    },
    {
        extension: 'mp3',
        style: defaultStyles.mp3,
        name: 'mp3',
    },
    {
        extension: 'mkv',
        style: defaultStyles.mkv,
        name: 'mkv',
    },
    {
        extension: 'mp4',
        style: defaultStyles.mp4,
        name: 'mp4',
    },
    {
        extension: 'avi',
        style: defaultStyles.avi,
        name: 'avi',
    },
    {
        extension: 'jpg',
        style: defaultStyles.jpg,
        name: 'jpg',
    },
    {
        extension: 'png',
        style: defaultStyles.png,
        name: 'png',
    },
    {
        extension: 'gif',
        style: defaultStyles.gif,
        name: 'gif',
    },
    {
        extension: 'jpeg',
        style: defaultStyles.jpeg,
        name: 'jpeg',
    },
    {
        extension: 'svg',
        style: defaultStyles.svg,
        name: 'svg',
    },
    {
        extension: 'pdf',
        style: defaultStyles.pdf,
        name: 'pdf',
    },
    {
        extension: 'zip',
        style: defaultStyles.zip,
        name: 'zip',
    },
    {
        extension: 'tar',
        style: defaultStyles.tar,
        name: 'tar',
    },
    {
        extension: 'gz',
        style: defaultStyles.gz,
        name: 'gz',
    },
    {
        extension: 'rar',
        style: defaultStyles.rar,
        name: 'rar',
    },
    {
        extension: 'exe',
        style: defaultStyles.exe,
        name: 'exe',
    },
    {
        extension: 'dmg',
        style: defaultStyles.dmg,
        name: 'dmg',
    },
    {
        extension: 'bin',
        style: defaultStyles.bin,
        name: 'bin',
    },
    {
        extension: 'docx',
        style: defaultStyles.docx,
        name: 'docx',
    },
    {
        extension: 'doc',
        style: defaultStyles.doc,
        name: 'doc',
    },
    {
        extension: 'pptx',
        style: defaultStyles.pptx,
        name: 'pptx',
    },
    {
        extension: 'ppt',
        style: defaultStyles.ppt,
        name: 'ppt',
    },
    {
        extension: 'xls',
        style: defaultStyles.xls,
        name: 'xls',
    },
    {
        extension: 'xlsx',
        style: defaultStyles.xlsx,
        name: 'xlsx',
    },
    {
        extension: 'csv',
        style: defaultStyles.csv,
        name: 'csv',
    },
    {
        extension: 'psd',
        style: defaultStyles.psd,
        name: 'psd',
    },
    {
        extension: 'ai',
        style: defaultStyles.ai,
        name: 'ai',
    },
    {
        extension: 'indd',
        style: defaultStyles.indd,
        name: 'indd',
    },
    {
        extension: 'eps',
        style: defaultStyles.eps,
        name: 'eps',
    },
    {
        extension: 'zip',
        style: defaultStyles.zip,
        name: 'zip',
    },
    {
        extension: 'tar',
        style: defaultStyles.tar,
        name: 'tar',
    },
    {
        extension: 'gz',
        style: defaultStyles.gz,
        name: 'gz',
    },
    {
        extension: 'rar',
        style: defaultStyles.rar,
        name: 'rar',
    },
]

export const isImageFileByKey = (key: string) => {
    const ext = key.split('.').pop()
    return ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)
}

export const getFileIconStyle = (key: string) => {
    const ext = key.split('.').pop()
    return extensionData.find((d) => d.extension === ext)?.style || {}
}

export const getExtension = (key: string) => {
    return key.split('.').pop()
}
