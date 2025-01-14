import React, { useCallback } from 'react'
import useSettingsStore from '../store/settings'
import { ModeToggle } from './ModeToggle'
import { useTheme } from './ThemeProvider'
import { Card } from './ui/card'
import mixpanel from 'mixpanel-browser'
import debounce from 'lodash/debounce'

function SettingsPage() {
    const { setEditorTheme, setAccentColor } = useSettingsStore()
    const { setTheme } = useTheme()

    const setAccentColorDebounced = useCallback(
        debounce(setAccentColor, 1000),
        []
    )

    return (
        <div className="p-3">
            <h1 className="text-2xl font-semibold">Settings</h1>

            <Card className="p-3 mt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Theme</h3>
                        <p className="text-sm text-muted-foreground">
                            Switch to dark or light mode
                        </p>
                    </div>
                    <div>
                        <ModeToggle
                            onChange={(theme: 'dark' | 'light') => {
                                mixpanel.track('app_theme_changed', {
                                    theme,
                                })
                                setTheme(theme)
                            }}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-3 mt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Editor Theme</h3>
                        <p className="text-sm text-muted-foreground">
                            Switch your editor theme to light or dark
                        </p>
                    </div>
                    <div>
                        <ModeToggle
                            onChange={(theme) => {
                                mixpanel.track('editor_theme_changed', {
                                    theme,
                                })
                                setEditorTheme(theme)
                            }}
                        />
                    </div>
                </div>
            </Card>
            <Card className="p-3 mt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Editor Theme</h3>
                        <p className="text-sm text-muted-foreground">
                            Accept color
                        </p>
                    </div>
                    <div>
                        <input
                            onChange={(ev) => {
                                setAccentColorDebounced(ev.target.value)
                            }}
                            type="color"
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default SettingsPage
