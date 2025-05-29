class EstancoClicker {
    constructor() {
        this.money = 0;
        this.moneyPerClick = 1;
        this.incomePerSecond = 0;
        this.totalClicks = 0;
        this.totalEarned = 0;
        this.currentBusinessLevel = 1;
        this.prestigeLevel = 0;
        this.prestigePoints = 0;
        this.totalLifetimeEarnings = 0;
        this.musicVolume = 0.8;
        this.musicPlaying = true; // Por defecto activada

        this.businessUpgrades = {
            ambulante: {
                count: 0,
                baseCost: 15,
                clickBonus: 2,
                incomeBonus: 0.5,
                level: 2,
                name: "Puesto Ambulante",
                description: "Montas un pequeño puesto móvil",
                icon: "🛒",
                signText: "PUESTO AMBULANTE"
            },
            pequeno_estanco: {
                count: 0,
                baseCost: 100,
                clickBonus: 5,
                incomeBonus: 2,
                level: 3,
                name: "Pequeño Estanco",
                description: "Abres un pequeño estanco de barrio",
                icon: "🏪",
                signText: "PEQUEÑO ESTANCO"
            },
            franquicia: {
                count: 0,
                baseCost: 500,
                clickBonus: 12,
                incomeBonus: 8,
                level: 4,
                name: "Franquicia Local",
                description: "Expandes con una franquicia local",
                icon: "🏬",
                signText: "FRANQUICIA LOCAL"
            },
            distribuidor: {
                count: 0,
                baseCost: 2500,
                clickBonus: 30,
                incomeBonus: 25,
                level: 5,
                name: "Distribuidor Regional",
                description: "Distribuyes a múltiples establecimientos",
                icon: "🚚",
                signText: "DISTRIBUIDOR REGIONAL"
            },
            marca_propia: {
                count: 0,
                baseCost: 12000,
                clickBonus: 75,
                incomeBonus: 60,
                level: 6,
                name: "Marca Propia de Tabaco",
                description: "Creas tu propia marca de cigarrillos",
                icon: "🏷️",
                signText: "MARCA PROPIA"
            },
            fabrica: {
                count: 0,
                baseCost: 60000,
                clickBonus: 200,
                incomeBonus: 150,
                level: 7,
                name: "Fábrica de Producción",
                description: "Produces tabaco a gran escala",
                icon: "🏭",
                signText: "FÁBRICA DE PRODUCCIÓN"
            },
            marketing: {
                count: 0,
                baseCost: 300000,
                clickBonus: 500,
                incomeBonus: 400,
                level: 8,
                name: "Magnate del Marketing",
                description: "Dominas la publicidad y el marketing",
                icon: "📺",
                signText: "MAGNATE DEL MARKETING"
            },
            global: {
                count: 0,
                baseCost: 1500000,
                clickBonus: 1250,
                incomeBonus: 1000,
                level: 9,
                name: "Empresario Global",
                description: "Expandes tu imperio mundialmente",
                icon: "🌍",
                signText: "EMPRESARIO GLOBAL"
            },
            emperador: {
                count: 0,
                baseCost: 10000000,
                clickBonus: 3000,
                incomeBonus: 2500,
                level: 10,
                name: "Emperador del Tabaco",
                description: "Controlas el mercado mundial del tabaco",
                icon: "👑",
                signText: "EMPERADOR DEL TABACO"
            }
        };

        this.achievements = [
            { id: 'first_click', name: 'Primer Cliente', description: 'Haz tu primer click', icon: '🎉', unlocked: false },
            { id: 'hundred_euros', name: 'Primer Billete', description: 'Gana 100€', icon: '💶', unlocked: false },
            { id: 'ambulante', name: 'Vendedor Ambulante', description: 'Monta tu puesto ambulante', icon: '🛒', unlocked: false },
            { id: 'thousand_euros', name: 'Mil Euros', description: 'Gana 1000€', icon: '💰', unlocked: false },
            { id: 'pequeno_estanco', name: 'Pequeño Comerciante', description: 'Abre tu pequeño estanco', icon: '🏪', unlocked: false },
            { id: 'franquicia', name: 'Franquiciado', description: 'Expande con una franquicia', icon: '🏬', unlocked: false },
            { id: 'distribuidor', name: 'Distribuidor Regional', description: 'Conviértete en distribuidor', icon: '🚚', unlocked: false },
            { id: 'marca_propia', name: 'Marca Propia', description: 'Crea tu propia marca', icon: '🏷️', unlocked: false },
            { id: 'fabrica', name: 'Industrial', description: 'Construye tu fábrica', icon: '🏭', unlocked: false },
            { id: 'marketing', name: 'Magnate del Marketing', description: 'Domina el marketing', icon: '📺', unlocked: false },
            { id: 'global', name: 'Empresario Global', description: 'Expande globalmente', icon: '🌍', unlocked: false },
            { id: 'emperador', name: 'Emperador del Tabaco', description: 'Domina el mundo', icon: '👑', unlocked: false },
            { id: 'click_master', name: 'Maestro del Click', description: 'Haz 1000 clicks', icon: '🖱️', unlocked: false },
            { id: 'millionaire', name: 'Multimillonario', description: 'Gana 25,000,000€', icon: '💎', unlocked: false },
            { id: 'first_prestige', name: 'Primer Prestigio', description: 'Haz tu primer prestigio', icon: '⭐', unlocked: false },
            { id: 'prestige_master', name: 'Maestro del Prestigio', description: 'Alcanza prestigio nivel 5', icon: '🌟', unlocked: false }
        ];

        this.init();
    }

    init() {
        this.loadGame();
        this.bindEvents();
        this.updateDisplay();
        this.updateBusinessDisplay();
        this.renderAchievements(); // Renderizar logros al inicio
        this.startIncomeLoop();
        this.checkAchievements();
        this.initAudio();
    }

    bindEvents() {
        // Click principal
        document.getElementById('main-click').addEventListener('click', (e) => {
            this.handleMainClick(e);
        });

        // Mejoras de negocio
        document.querySelectorAll('.business-upgrade').forEach(upgrade => {
            upgrade.addEventListener('click', (e) => {
                this.handleBusinessUpgradeClick(e);
            });
        });

        // Botón de prestigio
        document.getElementById('prestige-btn').addEventListener('click', () => {
            if (this.canPrestige()) {
                if (confirm('¿Estás seguro de que quieres hacer prestigio? Perderás todo tu progreso actual pero ganarás bonificaciones permanentes.')) {
                    this.doPrestige();
                }
            }
        });

        // Botón de reset completo
        document.getElementById('reset-btn').addEventListener('click', () => {
            if (confirm('¿ESTÁS SEGURO? Esto borrará COMPLETAMENTE tu progreso, incluyendo prestigio y logros. Esta acción NO se puede deshacer.')) {
                if (confirm('ÚLTIMA CONFIRMACIÓN: ¿Realmente quieres borrar TODO tu progreso?')) {
                    this.resetGame();
                }
            }
        });

        // Control de volumen
        document.getElementById('volume-btn').addEventListener('click', () => {
            this.toggleMusic();
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        // Sistema de importar/exportar
        const exportBtn = document.getElementById('export-btn');
        const importBtn = document.getElementById('import-btn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                console.log('Botón de exportar clickeado');
                this.exportGame();
            });
        } else {
            console.error('No se encontró el botón de exportar');
        }

        if (importBtn) {
            importBtn.addEventListener('click', () => {
                console.log('Botón de importar clickeado');
                this.importGame();
            });
        } else {
            console.error('No se encontró el botón de importar');
        }

        // Guardar automáticamente cada 10 segundos
        setInterval(() => {
            this.saveGame();
        }, 10000);
    }

    handleMainClick(e) {
        this.money += this.moneyPerClick;
        this.totalClicks++;
        this.totalEarned += this.moneyPerClick;

        this.createFloatingMoney(e, this.moneyPerClick);
        this.updateDisplay();
        this.checkAchievements();
        this.saveGame();
    }

    handleBusinessUpgradeClick(e) {
        const upgradeId = e.currentTarget.id.replace('upgrade-', '');
        const upgrade = this.businessUpgrades[upgradeId];

        if (upgrade) {
            const cost = this.getBusinessUpgradeCost(upgradeId);

            if (this.money >= cost) {
                this.money -= cost;
                upgrade.count++;

                // Actualizar el nivel del negocio si es la primera vez que compra esta mejora
                if (upgrade.count === 1 && upgrade.level > this.currentBusinessLevel) {
                    this.currentBusinessLevel = upgrade.level;
                    this.moneyPerClick = this.calculateMoneyPerClick();
                    this.updateBusinessDisplay();
                    this.showNotification(`¡Negocio evolucionado! Ahora eres: ${upgrade.name}`);
                }

                // Añadir ingresos pasivos con bonus de prestigio
                const prestigeMultiplier = 1 + (this.prestigeLevel * 0.1);
                this.incomePerSecond += upgrade.incomeBonus * prestigeMultiplier;

                this.updateDisplay();
                this.checkAchievements();
                this.saveGame();
            }
        }
    }

    getBusinessUpgradeCost(upgradeId) {
        const upgrade = this.businessUpgrades[upgradeId];
        return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
    }

    calculateMoneyPerClick() {
        let baseClick = 1;
        let highestLevel = 1;

        // Encontrar el nivel más alto desbloqueado
        Object.values(this.businessUpgrades).forEach(upgrade => {
            if (upgrade.count > 0 && upgrade.level > highestLevel) {
                highestLevel = upgrade.level;
                baseClick = upgrade.clickBonus;
            }
        });

        // Aplicar bonus de prestigio (10% por nivel de prestigio)
        const prestigeMultiplier = 1 + (this.prestigeLevel * 0.1);
        const finalClick = Math.floor(baseClick * prestigeMultiplier);

        // Asegurar que siempre sea al menos 1, incluso con prestigio
        return Math.max(1, finalClick);
    }

    canPrestige() {
        // El prestigio debe costar más que el último rango (Emperador del Tabaco: 10M€)
        return this.totalEarned >= 25000000; // Requiere 25 millones para prestigio
    }

    calculatePrestigePoints() {
        if (!this.canPrestige()) return 0;
        // Calcular puntos basado en el nuevo requisito (25M base)
        return Math.floor(Math.sqrt(this.totalEarned / 25000000));
    }

    doPrestige() {
        if (!this.canPrestige()) {
            this.showNotification("¡Necesitas ganar al menos 25,000,000€ para hacer prestigio!");
            return;
        }

        const newPrestigePoints = this.calculatePrestigePoints();
        this.prestigePoints += newPrestigePoints;
        this.prestigeLevel++;

        // Guardar el bonus actual antes del reset
        const prestigeBonus = this.prestigeLevel * 10; // 10% por nivel

        // Resetear progreso pero mantener prestigio
        this.money = 0;
        this.incomePerSecond = 0;
        this.totalClicks = 0;
        this.totalEarned = 0;
        this.currentBusinessLevel = 1;

        // Resetear mejoras de negocio
        Object.values(this.businessUpgrades).forEach(upgrade => {
            upgrade.count = 0;
        });

        // Recalcular dinero por click con el nuevo bonus de prestigio
        this.moneyPerClick = this.calculateMoneyPerClick();

        // Resetear algunos logros (mantener los de prestigio y click master)
        this.achievements.forEach(achievement => {
            if (!achievement.id.includes('prestige') && achievement.id !== 'click_master') {
                achievement.unlocked = false;
            }
        });

        this.updateDisplay();
        this.updateBusinessDisplay();
        this.renderAchievements();
        this.saveGame();

        this.showNotification(`¡Prestigio completado! Nivel ${this.prestigeLevel} (+${prestigeBonus}% bonus) - Ganaste ${newPrestigePoints} puntos de prestigio!`);
    }

    resetGame() {
        // Resetear completamente todo
        this.money = 0;
        this.moneyPerClick = 1;
        this.incomePerSecond = 0;
        this.totalClicks = 0;
        this.totalEarned = 0;
        this.currentBusinessLevel = 1;
        this.prestigeLevel = 0;
        this.prestigePoints = 0;
        this.totalLifetimeEarnings = 0;

        // Resetear mejoras de negocio
        Object.values(this.businessUpgrades).forEach(upgrade => {
            upgrade.count = 0;
        });

        // Resetear todos los logros
        this.achievements.forEach(achievement => {
            achievement.unlocked = false;
        });

        // Limpiar localStorage
        localStorage.removeItem('fumaderoTycoonSave');
        localStorage.removeItem('estancoClickerSave'); // Por compatibilidad

        // Actualizar interfaz
        this.updateDisplay();
        this.updateBusinessDisplay();
        this.renderAchievements();

        this.showNotification('¡Juego reseteado completamente! Empezando desde cero...');
    }

    initAudio() {
        // Sistema de audio simplificado
        this.musicGenerator = new BackgroundMusicGenerator();
        this.audioInitialized = false;

        // Inicializar audio automáticamente al primer click
        const initAudioOnClick = async () => {
            if (!this.audioInitialized) {
                try {
                    console.log('Inicializando audio...');
                    const success = await this.musicGenerator.init();
                    if (success) {
                        this.musicGenerator.setVolume(this.musicVolume);
                        if (this.musicPlaying && this.musicVolume > 0) {
                            await this.musicGenerator.start();
                            console.log('Música iniciada automáticamente');
                        }
                        this.audioInitialized = true;
                        this.updateVolumeButton();
                    }
                } catch (error) {
                    console.error('Error inicializando audio:', error);
                }
            }
        };

        // Escuchar clicks para inicializar
        document.addEventListener('click', initAudioOnClick, { once: true });
        document.addEventListener('touchstart', initAudioOnClick, { once: true });
    }

    async toggleMusic() {
        if (!this.audioInitialized) {
            this.showNotification('Haz click en cualquier parte para inicializar el audio primero.');
            return;
        }

        try {
            if (this.musicPlaying) {
                // Pausar música
                if (this.musicGenerator) {
                    this.musicGenerator.stop();
                }
                this.musicPlaying = false;
                console.log('Música pausada');
            } else {
                // Reanudar música
                if (this.musicGenerator) {
                    await this.musicGenerator.start();
                }
                this.musicPlaying = true;
                console.log('Música reanudada');
            }
            this.updateVolumeButton();
        } catch (error) {
            console.error('Error al cambiar estado de música:', error);
        }
    }

    updateVolumeButton() {
        const volumeBtn = document.getElementById('volume-btn');
        if (this.musicVolume === 0 || !this.musicPlaying) {
            volumeBtn.textContent = '🔇';
        } else if (this.musicVolume < 0.5) {
            volumeBtn.textContent = '🔉';
        } else {
            volumeBtn.textContent = '🔊';
        }
    }



    exportGame() {
        try {
            console.log('Iniciando exportación...');

            // Crear objeto con todos los datos del juego
            const gameData = {
                money: this.money,
                moneyPerClick: this.moneyPerClick,
                incomePerSecond: this.incomePerSecond,
                totalClicks: this.totalClicks,
                totalEarned: this.totalEarned,
                currentBusinessLevel: this.currentBusinessLevel,
                prestigeLevel: this.prestigeLevel,
                prestigePoints: this.prestigePoints,
                totalLifetimeEarnings: this.totalLifetimeEarnings,
                musicVolume: this.musicVolume,
                businessUpgrades: this.businessUpgrades,
                achievements: this.achievements,
                exportDate: new Date().toISOString(),
                gameVersion: "1.0"
            };

            console.log('Datos del juego:', gameData);

            // Convertir a JSON y luego a Base64 (con soporte para UTF-8)
            const jsonString = JSON.stringify(gameData);
            console.log('JSON generado, longitud:', jsonString.length);

            // Codificar UTF-8 a Base64 de forma segura
            const base64String = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(_, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }));
            console.log('Base64 generado, longitud:', base64String.length);

            // Añadir prefijo y sufijo para identificación
            const saveCode = `FT_${base64String}_END`;
            console.log('Código final generado, longitud:', saveCode.length);

            // Mostrar en el textarea
            const exportTextarea = document.getElementById('export-code');
            if (exportTextarea) {
                exportTextarea.value = saveCode;
                console.log('Código mostrado en textarea');
            } else {
                console.error('No se encontró el textarea de exportación');
            }

            // Copiar al portapapeles automáticamente
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(saveCode).then(() => {
                    this.showNotification('¡Código de partida generado y copiado al portapapeles!');
                }).catch((err) => {
                    console.error('Error copiando al portapapeles:', err);
                    this.showNotification('¡Código de partida generado! Cópialo manualmente.');
                });
            } else {
                this.showNotification('¡Código de partida generado! Cópialo manualmente.');
            }

        } catch (error) {
            this.showNotification('Error al generar el código de partida: ' + error.message);
            console.error('Export error:', error);
        }
    }

    importGame() {
        try {
            console.log('Iniciando importación...');

            const importCodeElement = document.getElementById('import-code');
            if (!importCodeElement) {
                console.error('No se encontró el textarea de importación');
                this.showNotification('Error: No se encontró el área de importación.');
                return;
            }

            const importCode = importCodeElement.value.trim();
            console.log('Código a importar:', importCode.substring(0, 50) + '...');

            if (!importCode) {
                this.showNotification('Por favor, pega un código de partida válido.');
                return;
            }

            // Verificar formato del código
            if (!importCode.startsWith('FT_') || !importCode.endsWith('_END')) {
                this.showNotification('Código de partida inválido. Asegúrate de copiar el código completo.');
                return;
            }

            // Extraer la parte Base64
            const base64String = importCode.slice(3, -4); // Quitar "FT_" y "_END"
            console.log('Base64 extraído, longitud:', base64String.length);

            // Decodificar de Base64 a JSON (con soporte para UTF-8)
            const decodedString = atob(base64String);
            const jsonString = decodeURIComponent(decodedString.split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            console.log('JSON decodificado, longitud:', jsonString.length);

            const gameData = JSON.parse(jsonString);
            console.log('Datos parseados:', gameData);

            // Verificar que es un save válido de Fumadero Tycoon
            if (!gameData.hasOwnProperty('money') || !gameData.hasOwnProperty('businessUpgrades')) {
                this.showNotification('El código no corresponde a una partida válida de Fumadero Tycoon.');
                return;
            }

            // Confirmar la importación
            if (!confirm('¿Estás seguro de que quieres cargar esta partida? Se perderá tu progreso actual.')) {
                return;
            }

            // Cargar los datos
            this.money = gameData.money || 0;
            this.moneyPerClick = gameData.moneyPerClick || 1;
            this.incomePerSecond = gameData.incomePerSecond || 0;
            this.totalClicks = gameData.totalClicks || 0;
            this.totalEarned = gameData.totalEarned || 0;
            this.currentBusinessLevel = gameData.currentBusinessLevel || 1;
            this.prestigeLevel = gameData.prestigeLevel || 0;
            this.prestigePoints = gameData.prestigePoints || 0;
            this.totalLifetimeEarnings = gameData.totalLifetimeEarnings || 0;
            this.musicVolume = gameData.musicVolume || 0.5;

            // Cargar mejoras de negocio
            if (gameData.businessUpgrades) {
                Object.assign(this.businessUpgrades, gameData.businessUpgrades);
            }

            // Cargar logros
            if (gameData.achievements) {
                this.achievements = gameData.achievements;
            }

            // Recalcular valores
            this.moneyPerClick = this.calculateMoneyPerClick();

            // Actualizar interfaz
            this.updateDisplay();
            this.updateBusinessDisplay();
            this.renderAchievements();

            // Actualizar slider de volumen
            document.getElementById('volume-slider').value = this.musicVolume * 100;

            // Limpiar el textarea de importación
            document.getElementById('import-code').value = '';

            // Guardar la partida importada
            this.saveGame();

            const importDate = gameData.exportDate ? new Date(gameData.exportDate).toLocaleDateString() : 'Desconocida';
            this.showNotification(`¡Partida cargada exitosamente! (Exportada el: ${importDate})`);

        } catch (error) {
            this.showNotification('Error al cargar la partida. Verifica que el código sea válido.');
            console.error('Import error:', error);
        }
    }

    setVolume(volume) {
        this.musicVolume = volume;

        // Actualizar volumen del generador de música
        if (this.musicGenerator) {
            this.musicGenerator.setVolume(volume);
        }

        // Manejar silenciado
        if (volume === 0 && this.musicPlaying) {
            if (this.musicGenerator) {
                this.musicGenerator.stop();
            }
            this.musicPlaying = false;
        } else if (volume > 0 && !this.musicPlaying && this.audioInitialized) {
            if (this.musicGenerator) {
                this.musicGenerator.start();
            }
            this.musicPlaying = true;
        }

        this.updateVolumeButton();
    }

    updateBusinessDisplay() {
        // Encontrar el negocio actual más avanzado
        let currentBusiness = {
            level: 1,
            name: "Vendedor de Cigarrillos",
            description: "Vendes cigarrillos sueltos en la calle",
            icon: "🚬",
            signText: "VENDIENDO CIGARRILLOS"
        };

        Object.values(this.businessUpgrades).forEach(upgrade => {
            if (upgrade.count > 0 && upgrade.level > currentBusiness.level) {
                currentBusiness = upgrade;
            }
        });

        // Actualizar la interfaz
        document.getElementById('business-level').textContent = currentBusiness.level;
        document.getElementById('business-name').textContent = currentBusiness.name;
        document.getElementById('business-description').textContent = currentBusiness.description;
        document.getElementById('main-icon').textContent = currentBusiness.icon;
        document.getElementById('business-sign').textContent = currentBusiness.signText;

        // Actualizar el texto del click
        const clickTexts = {
            1: "¡Haz click para vender cigarrillos!",
            2: "¡Haz click para atender el puesto!",
            3: "¡Haz click para gestionar el estanco!",
            4: "¡Haz click para operar la franquicia!",
            5: "¡Haz click para gestionar la distribución!",
            6: "¡Haz click para desarrollar tu marca!",
            7: "¡Haz click para operar la fábrica!",
            8: "¡Haz click para dirigir el marketing!",
            9: "¡Haz click para expandir globalmente!",
            10: "¡Haz click para gobernar tu imperio!"
        };

        document.getElementById('click-text').textContent = clickTexts[currentBusiness.level] || clickTexts[1];
    }

    createFloatingMoney(e, amount) {
        const floatingMoney = document.createElement('div');
        floatingMoney.className = 'floating-money';
        floatingMoney.textContent = `+${amount}€`;

        const rect = e.currentTarget.getBoundingClientRect();
        floatingMoney.style.left = (rect.left + Math.random() * rect.width) + 'px';
        floatingMoney.style.top = (rect.top + rect.height / 2) + 'px';

        document.body.appendChild(floatingMoney);

        setTimeout(() => {
            floatingMoney.remove();
        }, 1000);
    }

    updateDisplay() {
        document.getElementById('money').textContent = this.formatNumber(Math.floor(this.money));
        document.getElementById('income-per-second').textContent = this.formatNumber(this.incomePerSecond.toFixed(1));
        document.getElementById('money-per-click').textContent = this.formatNumber(this.moneyPerClick);

        // Actualizar información de prestigio
        if (document.getElementById('prestige-level')) {
            document.getElementById('prestige-level').textContent = this.prestigeLevel;
        }
        if (document.getElementById('prestige-level-display')) {
            document.getElementById('prestige-level-display').textContent = this.prestigeLevel;
        }
        if (document.getElementById('prestige-points')) {
            document.getElementById('prestige-points').textContent = this.prestigePoints;
        }
        if (document.getElementById('prestige-bonus')) {
            document.getElementById('prestige-bonus').textContent = (this.prestigeLevel * 10) + '%';
        }
        if (document.getElementById('prestige-bonus-display')) {
            document.getElementById('prestige-bonus-display').textContent = (this.prestigeLevel * 10) + '%';
        }
        if (document.getElementById('next-prestige-points')) {
            document.getElementById('next-prestige-points').textContent = this.calculatePrestigePoints();
        }

        // Actualizar botón de prestigio
        const prestigeBtn = document.getElementById('prestige-btn');
        if (prestigeBtn) {
            if (this.canPrestige()) {
                prestigeBtn.classList.add('available');
                prestigeBtn.classList.remove('unavailable');
            } else {
                prestigeBtn.classList.add('unavailable');
                prestigeBtn.classList.remove('available');
            }
        }

        // Actualizar contadores de mejoras de negocio y costos
        Object.keys(this.businessUpgrades).forEach(upgradeId => {
            const upgrade = this.businessUpgrades[upgradeId];
            const upgradeElement = document.getElementById(`upgrade-${upgradeId}`);

            if (upgradeElement) {
                const countElement = upgradeElement.querySelector('.count');
                const priceElement = upgradeElement.querySelector('.price');

                if (countElement) countElement.textContent = upgrade.count;
                if (priceElement) priceElement.textContent = this.getBusinessUpgradeCost(upgradeId);

                // Marcar si es asequible
                const cost = this.getBusinessUpgradeCost(upgradeId);
                if (this.money >= cost) {
                    upgradeElement.classList.add('affordable');
                } else {
                    upgradeElement.classList.remove('affordable');
                }

                // Marcar si ya está adquirido (primera compra)
                if (upgrade.count > 0) {
                    upgradeElement.classList.add('owned');
                } else {
                    upgradeElement.classList.remove('owned');
                }
            }
        });
    }



    startIncomeLoop() {
        setInterval(() => {
            if (this.incomePerSecond > 0) {
                const income = this.incomePerSecond / 10; // Dividido por 10 porque se ejecuta cada 100ms
                this.money += income;
                this.totalEarned += income;
                this.updateDisplay();
            }
        }, 100);
    }

    checkAchievements() {
        // Definir los requisitos de logros (se pierden al cargar desde localStorage)
        const achievementRequirements = {
            'first_click': () => this.totalClicks >= 1,
            'hundred_euros': () => this.totalEarned >= 100,
            'ambulante': () => this.businessUpgrades.ambulante.count >= 1,
            'thousand_euros': () => this.totalEarned >= 1000,
            'pequeno_estanco': () => this.businessUpgrades.pequeno_estanco.count >= 1,
            'franquicia': () => this.businessUpgrades.franquicia.count >= 1,
            'distribuidor': () => this.businessUpgrades.distribuidor.count >= 1,
            'marca_propia': () => this.businessUpgrades.marca_propia.count >= 1,
            'fabrica': () => this.businessUpgrades.fabrica.count >= 1,
            'marketing': () => this.businessUpgrades.marketing.count >= 1,
            'global': () => this.businessUpgrades.global.count >= 1,
            'emperador': () => this.businessUpgrades.emperador.count >= 1,
            'click_master': () => this.totalClicks >= 1000,
            'millionaire': () => this.totalEarned >= 25000000,
            'first_prestige': () => this.prestigeLevel >= 1,
            'prestige_master': () => this.prestigeLevel >= 5
        };

        this.achievements.forEach(achievement => {
            const requirement = achievementRequirements[achievement.id];
            if (!achievement.unlocked && requirement && requirement()) {
                achievement.unlocked = true;
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        this.showNotification(`¡Logro desbloqueado: ${achievement.name}!`);
        this.renderAchievements();
    }

    renderAchievements() {
        const achievementsList = document.getElementById('achievements-list');
        achievementsList.innerHTML = '';

        this.achievements.filter(a => a.unlocked).forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = 'achievement';
            achievementElement.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-text">
                    <div>${achievement.name}</div>
                    <div style="font-size: 0.8em; color: #666;">${achievement.description}</div>
                </div>
            `;
            achievementsList.appendChild(achievementElement);
        });
    }

    showNotification(message) {
        // Crear una notificación simple
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #228B22;
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toString();
    }

    saveGame() {
        const gameData = {
            money: this.money,
            moneyPerClick: this.moneyPerClick,
            incomePerSecond: this.incomePerSecond,
            totalClicks: this.totalClicks,
            totalEarned: this.totalEarned,
            currentBusinessLevel: this.currentBusinessLevel,
            prestigeLevel: this.prestigeLevel,
            prestigePoints: this.prestigePoints,
            totalLifetimeEarnings: this.totalLifetimeEarnings,
            musicVolume: this.musicVolume,
            businessUpgrades: this.businessUpgrades,
            achievements: this.achievements
        };

        localStorage.setItem('fumaderoTycoonSave', JSON.stringify(gameData));
    }

    loadGame() {
        // Intentar cargar primero con el nuevo nombre, luego con el antiguo para compatibilidad
        let savedData = localStorage.getItem('fumaderoTycoonSave');
        if (!savedData) {
            savedData = localStorage.getItem('estancoClickerSave');
            // Si encontramos datos antiguos, migrarlos al nuevo formato
            if (savedData) {
                localStorage.setItem('fumaderoTycoonSave', savedData);
                localStorage.removeItem('estancoClickerSave');
            }
        }

        if (savedData) {
            const gameData = JSON.parse(savedData);

            this.money = gameData.money || 0;
            this.moneyPerClick = gameData.moneyPerClick || 1;
            this.incomePerSecond = gameData.incomePerSecond || 0;
            this.totalClicks = gameData.totalClicks || 0;
            this.totalEarned = gameData.totalEarned || 0;
            this.currentBusinessLevel = gameData.currentBusinessLevel || 1;
            this.prestigeLevel = gameData.prestigeLevel || 0;
            this.prestigePoints = gameData.prestigePoints || 0;
            this.totalLifetimeEarnings = gameData.totalLifetimeEarnings || 0;
            this.musicVolume = gameData.musicVolume || 0.5;

            if (gameData.businessUpgrades) {
                Object.assign(this.businessUpgrades, gameData.businessUpgrades);
            }

            if (gameData.achievements) {
                this.achievements = gameData.achievements;
            }

            // Recalcular el dinero por click basado en las mejoras cargadas
            this.moneyPerClick = this.calculateMoneyPerClick();

            // Actualizar slider de volumen
            document.getElementById('volume-slider').value = this.musicVolume * 100;
        }
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new EstancoClicker();
});
