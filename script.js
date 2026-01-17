document.addEventListener('DOMContentLoaded', function() {
            const inputField = document.getElementById('commandInput');
            const output = document.getElementById('output');

            const try_focus = () => {
                        const inputField = document.getElementById('commandInput');
                        if (input) {
                                    input.focus();
                        } else {
                                    setTimeout(tryFocus, 50);
                        }
            }
            setTimeout(tryFocus, 250);
            
            // Comandos disponíveis
            const commands = {
                'music': {
                    description: 'Acessar Backup de Músicas',
                    action: () => window.location.href = 'https://music.youtube.com/playlist?list=PLbT3bEEJGxvz8mDE4vNx7dnAK0smeIt0t'
                },
                'ls': {
                    description: 'Exibir lista de comandos',
                    action: () => {
                        showOutput();
                        let html = '<div style="margin-bottom: 10px;">Comandos disponíveis:</div>';
                        for (const [cmd, info] of Object.entries(commands)) {
                            html += `<div><span class="output-command">${cmd}</span><span class="output-description">- ${info.description}</span></div>`;
                        }
                        output.innerHTML = html;
                    }
                },
                'clear': {
                    description: 'Limpar a tela',
                    action: () => {
                        output.style.display = 'none';
                        output.innerHTML = '';
                    }
                },
                'y': {
                    description: 'Abrir YouTube',
                    action: () => {
                        window.location.href = 'https://www.youtube.com';
                    }
                },
                'coin': {
                    description: 'Abrir cotação do Bitcoin',
                    action: () => {
                        window.location.href = 'https://coinmarketcap.com/pt-br/currencies/bitcoin/';
                    }
                },
                'chat': {
                    description: 'Abrir ChatGPT',
                    action: () => {
                        window.location.href = 'https://chatgpt.com/';
                    }
                },
                'sig': {
                    description: 'Abrir SIGAA',
                    action: () => {
                        window.location.href = 'https://sig.ifc.edu.br/sigaa/verTelaLogin.do';
                    }
                },
                'gdb': {
                    description: 'Abrir GDB Online',
                    action: () => {
                        window.location.href = 'https://www.onlinegdb.com/online_c_compiler';
                    }
                },
                'git': {
                    description: 'Abrir GitHub',
                    action: () => {
                        window.location.href = 'https://github.com/';
                    }
                },
                'convert': {
                    description: 'Abrir conversor de arquivos',
                    action: () => {
                        window.location.href = 'https://convertio.co/';
                    }
                },
                'gmail': {
                    description: 'Abrir Gmail',
                    action: () => {
                        window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
                    }
                },
                'telegram': {
                    description: 'Abrir o Friv Jogos',
                    action: () => {
                        window.location.href = 'https://web.telegram.org/';
                    }
                },
                't': {
                    description: 'Abrir Google Tradutor',
                    action: () => {
                        window.location.href = 'https://translate.google.com.br/';
                    }
                },
                'aur': {
                    description: 'Abrir AUR Arch Linux',
                    action: () => {
                        window.location.href = 'https://aur.archlinux.org/';
                    }
                },
                'harvard': {
                        description: 'Abrir Harvard',
                        action: () => {
                                    window.location.href = 'https://pll.harvard.edu/catalog';
                        }
                },
                'canva': {
                    description: 'Abrir Canva',
                    action: () => {
                        window.location.href = 'https://www.canva.com';
                    }
                },
                
            };
            
            // Variáveis para controle do autocompletar
            let lastInputValue = '';
            
            // Processar comando quando pressionar Enter
            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const command = this.value.trim().toLowerCase();
                    
                    if (command) {
                        if (commands[command]) {
                            // Executar comando específico
                            commands[command].action();
                        } else if (command.startsWith('http://') || command.startsWith('https://')) {
                            // Se for uma URL completa
                            window.location.href = command;
                        } else if (command.includes('.') && !command.includes(' ')) {
                            // Se for um domínio
                            window.location.href = 'https://' + command;
                        } else {
                            // Pesquisar no Google
                            window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(command);
                        }
                    }
                }
            });
            
            // Auto-completar com TAB
            inputField.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const text = this.value.toLowerCase();
                    
                    if (text) {
                        // Encontrar comandos que começam com o texto digitado
                        const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(text));
                        
                        if (matchingCommands.length > 0) {
                            // Se há apenas um comando correspondente, complete-o
                            if (matchingCommands.length === 1) {
                                this.value = matchingCommands[0];
                            } else {
                                // Se há múltiplos comandos, ciclar entre eles
                                if (lastInputValue !== text) {
                                    // Novo texto, comece do primeiro comando
                                    this.value = matchingCommands[0];
                                    lastInputValue = text;
                                } else {
                                    // Mesmo texto, ciclar para o próximo comando
                                    const currentIndex = matchingCommands.indexOf(this.value);
                                    const nextIndex = (currentIndex + 1) % matchingCommands.length;
                                    this.value = matchingCommands[nextIndex];
                                }
                                
                                // Mostrar mensagem informativa
                                showOutput();
                                output.innerHTML = `<div>Comandos correspondentes: ${matchingCommands.join(', ')}</div>`;
                                
                                // Esconder a mensagem após 2 segundos
                                setTimeout(() => {
                                    output.style.display = 'none';
                                }, 2000);
                            }
                        }
                    }
                }
            });
            
            // Limpar o último valor quando o usuário começar a digitar
            inputField.addEventListener('input', function() {
                if (this.value.toLowerCase() !== lastInputValue) {
                    lastInputValue = '';
                }
            });
            
            // Função para mostrar output
            function showOutput() {
                output.style.display = 'block';
            }
            
            // Focus no input quando a página carregar
            inputField.focus();
        });
