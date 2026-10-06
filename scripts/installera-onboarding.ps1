$app = "https://onboarding-app-black.vercel.app"
$desktop = [Environment]::GetFolderPath("Desktop")
$shortcut = Join-Path $desktop "Onboarding App.lnk"
$shell = New-Object -ComObject WScript.Shell
$link = $shell.CreateShortcut($shortcut)
$link.TargetPath = $app
$link.Save()
Write-Output "Genvag skapad: $shortcut"
