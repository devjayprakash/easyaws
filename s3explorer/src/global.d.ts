import { PreloadScriptType } from './preload'

declare global {
    interface Window {
        s3_api: PreloadScriptType
    }
}
