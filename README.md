# sri-dev

My portfolio, as an interactive menu in your terminal. One command, nothing to install.
 
```bash
npx sri-dev
```


## Requirements
 
Node.js 18 or newer, and an interactive terminal.
 
### Windows
 
Works as-is in PowerShell, Command Prompt and the VS Code terminal (Git Bash included). In the standalone Git Bash window, run it through winpty:
 
```bash
winpty npx.cmd sri-dev
```
 
That window doesn't give Node a real terminal, so the menu can't read arrow keys or Ctrl+C on its own. Turning on pseudo console support in the Git for Windows installer also fixes it.