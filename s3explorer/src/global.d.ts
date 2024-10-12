import {
    DeveloperScriptType,
    PreloadScriptTypeJson,
    PreloadScriptTypeS3,
} from './preload'

declare global {
    interface Window {
        s3_api: PreloadScriptTypeS3
        json_api: PreloadScriptTypeJson
        developer: DeveloperScriptType
    }
}
