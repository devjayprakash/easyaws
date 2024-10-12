import { ipcRenderer } from 'electron'
import { deleteUserData } from '../handlers/developer-handlers'

const developerScript = {
    deleteUserData: async () => {
        const result = (await ipcRenderer.invoke(
            'delete-user-data'
        )) as ReturnType<typeof deleteUserData>
        return result
    },
}

export default developerScript
