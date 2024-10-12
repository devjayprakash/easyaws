import { contextBridge } from 'electron'
import preload_scripts_json from './preloads/json-preload'
import preload_scripts_s3 from './preloads/s3-preload'
import developerScript from './preloads/developer-preload'

export type PreloadScriptTypeS3 = typeof preload_scripts_s3
export type PreloadScriptTypeJson = typeof preload_scripts_json
export type DeveloperScriptType = typeof developerScript

contextBridge.exposeInMainWorld('s3_api', preload_scripts_s3)
contextBridge.exposeInMainWorld('json_api', preload_scripts_json)
contextBridge.exposeInMainWorld('developer', developerScript)
