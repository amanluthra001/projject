const terminalText = [
    { type: 'command', text: 'git pull origin main' },
    { type: 'output', text: 'Updating 590b30f..bb3bc7e\nFast-forward\n  public/index.html | 42 ++\n  public/styles.css | 150 +++++++\n  2 files changed, 192 insertions(+)\n' },
    { type: 'command', text: 'docker build -t devops-local-app:latest .' },
    { type: 'output', text: 'Sending build context to Docker daemon...\nStep 1/6 : FROM node:18-alpine\n ---> 3a0ca3...\nStep 2/6 : WORKDIR /usr/src/app\n ---> Running in 4361ee...\nStep 6/6 : CMD [ "npm", "start" ]\n ---> Successfully built devops-local-app:latest\n' },
    { type: 'command', text: 'docker-compose up -d' },
    { type: 'output', text: 'Recreating local-app-container ... done\n' },
    { type: 'command', text: 'npm run health-check' },
    { type: 'output', text: 'Status: ALL SYSTEMS NOMINAL 🟢\n' }
];

const terminal = document.getElementById('terminal');

async function typeEffect(element, text, speed) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
        await new Promise(r => setTimeout(r, speed));
    }
}

async function runTerminal() {
    for (const line of terminalText) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        
        if (line.type === 'command') {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'jenkins@deploy-server:~$';
            
            const cmdSpan = document.createElement('span');
            cmdSpan.className = 'command';
            
            lineDiv.appendChild(promptSpan);
            lineDiv.appendChild(cmdSpan);
            terminal.appendChild(lineDiv);
            
            await typeEffect(cmdSpan, line.text, 50);
            await new Promise(r => setTimeout(r, 800)); 
        } else {
            const outSpan = document.createElement('span');
            outSpan.className = 'output';
            lineDiv.appendChild(outSpan);
            terminal.appendChild(lineDiv);
            
            await typeEffect(outSpan, line.text, 5); 
            await new Promise(r => setTimeout(r, 400));
        }
        
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    const cursorLine = document.createElement('div');
    cursorLine.className = 'terminal-line';
    cursorLine.innerHTML = '<span class="prompt">jenkins@deploy-server:~$</span><span class="cursor"></span>';
    terminal.appendChild(cursorLine);
}

setTimeout(runTerminal, 1000);

setInterval(() => {
    const uptimeEl = document.getElementById('uptime');
    const random = Math.random();
    if(random > 0.95) uptimeEl.innerText = "99.8%";
    else if(random > 0.90) uptimeEl.innerText = "100%";
    else uptimeEl.innerText = "99.9%";
}, 5000);
