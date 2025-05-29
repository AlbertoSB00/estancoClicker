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

        this.clicksPerSecond = 0; // Clicks automáticos por segundo

        // Variables para logros especiales
        this.gameStartTime = Date.now();
        this.speedClickCount = 0;
        this.speedClickStartTime = 0;

        // Mejoras de clicks manuales
        this.clickUpgrades = {
            cursor: {
                count: 0,
                baseCost: 15,
                clickBonus: 1,
                name: "Cursor",
                description: "Mejora tus clicks manuales"
            }
        };

        this.businessUpgrades = {
            miron: {
                count: 0,
                baseCost: 5,
                incomeBonus: 0.1,
                level: 2,
                name: "Mirón del Estanco",
                description: "Solo ves cómo otros compran cigarros",
                icon: "👀",
                signText: "MIRANDO ESTANCOS"
            },
            recolector: {
                count: 0,
                baseCost: 10,
                incomeBonus: 0.2,
                level: 3,
                name: "Recolector de Colillas",
                description: "Recoges colillas medio fumadas en la calle",
                icon: "🚬",
                signText: "RECOLECTANDO COLILLAS"
            },
            casero: {
                count: 0,
                baseCost: 25,
                incomeBonus: 0.5,
                level: 4,
                name: "Cigarrillo Casero",
                description: "Aprendes a liar cigarros con papel de periódico",
                icon: "📰",
                signText: "CIGARROS CASEROS"
            },
            dealer: {
                count: 0,
                baseCost: 50,
                incomeBonus: 1,
                level: 5,
                name: "Dealer de Cigarros Sueltos",
                description: "Vendes cigarros sueltos en la esquina",
                icon: "🚭",
                signText: "CIGARROS SUELTOS"
            },
            callejon: {
                count: 0,
                baseCost: 100,
                incomeBonus: 2,
                level: 6,
                name: "Vendedor de Callejón",
                description: "Llevas una cajita de cigarros baratos a escondidas",
                icon: "📦",
                signText: "VENTA EN CALLEJÓN"
            },
            mercado: {
                count: 0,
                baseCost: 500,
                incomeBonus: 10,
                level: 8,
                name: "Puesto en el Mercado",
                description: "Tienes un lugar fijo los fines de semana",
                icon: "🏪",
                signText: "PUESTO DEL MERCADO"
            },
            mini_estanco: {
                count: 0,
                baseCost: 1000,
                incomeBonus: 20,
                level: 9,
                name: "Mini Estanco",
                description: "Primer local en un barrio sencillo",
                icon: "🏬",
                signText: "MINI ESTANCO"
            },
            legalizado: {
                count: 0,
                baseCost: 2500,
                incomeBonus: 40,
                level: 10,
                name: "Estanco Legalizado",
                description: "Tienes licencia municipal",
                icon: "📋",
                signText: "ESTANCO LEGAL"
            },
            empleados: {
                count: 0,
                baseCost: 5000,
                incomeBonus: 80,
                level: 11,
                name: "Estanquero con Empleados",
                description: "Contratas tu primer ayudante",
                icon: "👥",
                signText: "ESTANCO CON EMPLEADOS"
            },
            veinticuatro: {
                count: 0,
                baseCost: 10000,
                incomeBonus: 150,
                level: 12,
                name: "Estanco 24 Horas",
                description: "Ahora también vendes de noche",
                icon: "🌙",
                signText: "ABIERTO 24H"
            },
            cadena: {
                count: 0,
                baseCost: 25000,
                incomeBonus: 300,
                level: 13,
                name: "Cadena de Estancos",
                description: "Abres más sucursales por la ciudad",
                icon: "🏢",
                signText: "CADENA DE ESTANCOS"
            },
            almacen: {
                count: 0,
                baseCost: 250000,
                incomeBonus: 2500,
                level: 16,
                name: "Almacén Centralizado",
                description: "Tienes un centro de distribución",
                icon: "🏭",
                signText: "ALMACÉN CENTRAL"
            },
            puros: {
                count: 0,
                baseCost: 2500000,
                incomeBonus: 25000,
                level: 19,
                name: "Puros Premium Artesanales",
                description: "Lanzamiento de línea de lujo",
                icon: "🚬",
                signText: "PUROS PREMIUM"
            },
            publicidad: {
                count: 0,
                baseCost: 5000000,
                incomeBonus: 50000,
                level: 20,
                name: "Inversiones en Publicidad",
                description: "Contratas influencers del humo",
                icon: "📺",
                signText: "PUBLICIDAD MASIVA"
            },
            contrabando: {
                count: 0,
                baseCost: 10000000,
                incomeBonus: 100000,
                level: 21,
                name: "Contrabando Creativo",
                description: "Encuentras formas de burlar regulaciones",
                icon: "🕵️",
                signText: "OPERACIONES ESPECIALES"
            },
            patrocinador: {
                count: 0,
                baseCost: 25000000,
                incomeBonus: 250000,
                level: 22,
                name: "Patrocinador de Eventos",
                description: "Apareces en fiestas, carreras, etc",
                icon: "🎪",
                signText: "PATROCINIOS"
            },
            lobby: {
                count: 0,
                baseCost: 50000000,
                incomeBonus: 500000,
                level: 23,
                name: "Lobby Político",
                description: "Convences a políticos para flexibilizar leyes",
                icon: "🏛️",
                signText: "LOBBY POLÍTICO"
            },
            exportador: {
                count: 0,
                baseCost: 100000000,
                incomeBonus: 1000000,
                level: 24,
                name: "Exportador Internacional",
                description: "Tus cigarros llegan a Europa y Asia",
                icon: "🌍",
                signText: "EXPORTACIÓN GLOBAL"
            },
            multinacional: {
                count: 0,
                baseCost: 250000000,
                incomeBonus: 2500000,
                level: 25,
                name: "Compañía Multinacional",
                description: "Abres sedes en varios países",
                icon: "🌐",
                signText: "MULTINACIONAL"
            },
            adquisicion: {
                count: 0,
                baseCost: 500000000,
                incomeBonus: 5000000,
                level: 26,
                name: "Adquisición de Competencia",
                description: "Compras otras marcas más pequeñas",
                icon: "💼",
                signText: "ADQUISICIONES"
            },
            grupo: {
                count: 0,
                baseCost: 1000000000,
                incomeBonus: 10000000,
                level: 27,
                name: "Grupo Tabacalero Global",
                description: "Tienes diferentes marcas, estilos y sabores",
                icon: "🏢",
                signText: "GRUPO GLOBAL"
            },
            fusion: {
                count: 0,
                baseCost: 2500000000,
                incomeBonus: 25000000,
                level: 28,
                name: "Fusión con Industria del Alcohol",
                description: "Tabaco + licor = imperio combinado",
                icon: "🥃",
                signText: "FUSIÓN TABACO-ALCOHOL"
            },
            magnate: {
                count: 0,
                baseCost: 5000000000,
                incomeBonus: 50000000,
                level: 29,
                name: "Magnate del Tabaco",
                description: "Eres portada de revistas económicas",
                icon: "📰",
                signText: "MAGNATE"
            },
            isla: {
                count: 0,
                baseCost: 25000000000,
                incomeBonus: 250000000,
                level: 31,
                name: "Dueño de una Isla Tabacalera",
                description: "Toda una isla dedicada a tu marca",
                icon: "🏝️",
                signText: "ISLA TABACALERA"
            },
            dios: {
                count: 0,
                baseCost: 100000000000,
                incomeBonus: 1000000000,
                level: 32,
                name: "Dios del Estanco",
                description: "Nivel místico desbloqueado. Apareces como leyenda urbana",
                icon: "⚡",
                signText: "DIOS DEL ESTANCO"
            }
        };

        this.achievements = [
            // Logros básicos
            { id: 'first_click', name: 'Primer Cliente', description: 'Haz tu primer click', icon: '🎉', unlocked: false },
            { id: 'hundred_euros', name: 'Primer Billete', description: 'Gana 100€', icon: '💶', unlocked: false },
            { id: 'thousand_euros', name: 'Mil Euros', description: 'Gana 1000€', icon: '💰', unlocked: false },
            { id: 'ten_thousand_euros', name: 'Rico', description: 'Gana 10,000€', icon: '💸', unlocked: false },
            { id: 'hundred_thousand_euros', name: 'Muy Rico', description: 'Gana 100,000€', icon: '🤑', unlocked: false },
            { id: 'million_euros', name: 'Millonario', description: 'Gana 1,000,000€', icon: '💵', unlocked: false },
            { id: 'millionaire', name: 'Multimillonario', description: 'Gana 25,000,000€', icon: '💎', unlocked: false },

            // Logros de clicks
            { id: 'click_master', name: 'Maestro del Click', description: 'Haz 1000 clicks', icon: '🖱️', unlocked: false },
            { id: 'click_veteran', name: 'Veterano del Click', description: 'Haz 5000 clicks', icon: '⚡', unlocked: false },
            { id: 'click_legend', name: 'Leyenda del Click', description: 'Haz 10,000 clicks', icon: '🔥', unlocked: false },
            { id: 'click_god', name: 'Dios del Click', description: 'Haz 50,000 clicks', icon: '⚡', unlocked: false },

            // Logros de cursores automáticos
            { id: 'first_cursor', name: 'Primer Cursor', description: 'Compra tu primer cursor automático', icon: '🖱️', unlocked: false },
            { id: 'cursor_collector', name: 'Coleccionista de Cursores', description: 'Compra 10 cursores automáticos', icon: '🖲️', unlocked: false },
            { id: 'cursor_army', name: 'Ejército de Cursores', description: 'Compra 50 cursores automáticos', icon: '⚔️', unlocked: false },
            { id: 'cursor_empire', name: 'Imperio de Cursores', description: 'Compra 100 cursores automáticos', icon: '🏰', unlocked: false },

            // Logros de negocios
            { id: 'pequeno_estanco', name: 'Pequeño Comerciante', description: 'Abre tu pequeño estanco', icon: '🏪', unlocked: false },
            { id: 'franquicia', name: 'Franquiciado', description: 'Expande con una franquicia', icon: '🏬', unlocked: false },
            { id: 'distribuidor', name: 'Distribuidor Regional', description: 'Conviértete en distribuidor', icon: '🚚', unlocked: false },
            { id: 'marca_propia', name: 'Marca Propia', description: 'Crea tu propia marca', icon: '🏷️', unlocked: false },
            { id: 'fabrica', name: 'Industrial', description: 'Construye tu fábrica', icon: '🏭', unlocked: false },
            { id: 'marketing', name: 'Magnate del Marketing', description: 'Domina el marketing', icon: '📺', unlocked: false },
            { id: 'global', name: 'Empresario Global', description: 'Expande globalmente', icon: '🌍', unlocked: false },
            { id: 'emperador', name: 'Emperador del Tabaco', description: 'Domina el mundo', icon: '👑', unlocked: false },

            // Logros de ingresos pasivos
            { id: 'passive_income_1', name: 'Ingresos Pasivos', description: 'Genera 1€/seg en ingresos pasivos', icon: '📈', unlocked: false },
            { id: 'passive_income_10', name: 'Flujo de Dinero', description: 'Genera 10€/seg en ingresos pasivos', icon: '💹', unlocked: false },
            { id: 'passive_income_100', name: 'Máquina de Dinero', description: 'Genera 100€/seg en ingresos pasivos', icon: '🏦', unlocked: false },
            { id: 'passive_income_1000', name: 'Imperio Financiero', description: 'Genera 1000€/seg en ingresos pasivos', icon: '🏛️', unlocked: false },

            // Logros de prestigio
            { id: 'first_prestige', name: 'Primer Prestigio', description: 'Haz tu primer prestigio', icon: '⭐', unlocked: false },
            { id: 'prestige_master', name: 'Maestro del Prestigio', description: 'Alcanza prestigio nivel 5', icon: '🌟', unlocked: false },
            { id: 'prestige_legend', name: 'Leyenda del Prestigio', description: 'Alcanza prestigio nivel 10', icon: '✨', unlocked: false },
            { id: 'prestige_god', name: 'Dios del Prestigio', description: 'Alcanza prestigio nivel 25', icon: '🌠', unlocked: false },

            // Logros especiales
            { id: 'speed_demon', name: 'Demonio de la Velocidad', description: 'Haz 100 clicks en 10 segundos', icon: '💨', unlocked: false },
            { id: 'patient_player', name: 'Jugador Paciente', description: 'Juega durante 1 hora', icon: '⏰', unlocked: false },
            { id: 'dedicated_player', name: 'Jugador Dedicado', description: 'Juega durante 5 horas', icon: '🕐', unlocked: false },
            { id: 'business_mogul', name: 'Magnate de Negocios', description: 'Compra todas las mejoras de negocio', icon: '🎩', unlocked: false },
            { id: 'completionist', name: 'Completista', description: 'Desbloquea todos los demás logros', icon: '🏆', unlocked: false }
        ];



        this.init();
    }

    init() {
        this.loadGame();
        this.bindEvents();
        this.updateDisplay();
        this.updateBusinessDisplay();
        this.updateClickUpgradesDisplay();

        // Renderizar logros y upgrades dinámicamente
        this.renderAchievements();
        this.renderClickUpgrades();
        this.renderBusinessUpgrades();

        this.startIncomeLoop();
        this.checkAchievements();
    }

    bindEvents() {
        // Click principal
        document.getElementById('main-click').addEventListener('click', (e) => {
            this.handleMainClick(e);
        });

        // Los event listeners de upgrades se añaden dinámicamente en los métodos render

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
        // Verificar que moneyPerClick sea válido antes de usar
        if (isNaN(this.moneyPerClick) || this.moneyPerClick < 1) {
            console.error('DETECTADO NaN en handleMainClick! moneyPerClick:', this.moneyPerClick);
            this.moneyPerClick = 1; // Corregir inmediatamente
        }

        this.money += this.moneyPerClick;
        this.totalClicks++;
        this.totalEarned += this.moneyPerClick;

        // Lógica para el logro "Demonio de la Velocidad"
        const currentTime = Date.now();
        if (this.speedClickStartTime === 0 || currentTime - this.speedClickStartTime > 10000) {
            // Reiniciar contador si han pasado más de 10 segundos
            this.speedClickStartTime = currentTime;
            this.speedClickCount = 1;
        } else {
            this.speedClickCount++;
            if (this.speedClickCount >= 100) {
                // Desbloquear logro "Demonio de la Velocidad"
                const speedAchievement = this.achievements.find(a => a.id === 'speed_demon');
                if (speedAchievement && !speedAchievement.unlocked) {
                    speedAchievement.unlocked = true;
                    this.unlockAchievement(speedAchievement);
                }
            }
        }

        this.createFloatingMoney(e, this.moneyPerClick);
        this.updateDisplay();
        this.checkAchievements();
        this.saveGame();
    }

    handleClickUpgradeClick(e) {
        const upgradeId = e.currentTarget.id.replace('upgrade-', '');
        const upgrade = this.clickUpgrades[upgradeId];



        if (upgrade) {
            const cost = this.getClickUpgradeCost(upgradeId);

            if (this.money >= cost) {
                this.money -= cost;
                upgrade.count++;

                // Recalcular dinero por click
                const newMoneyPerClick = this.calculateMoneyPerClick();

                // Verificar que el resultado sea válido
                if (isNaN(newMoneyPerClick) || newMoneyPerClick < 1) {
                    console.error('Error calculando moneyPerClick:', newMoneyPerClick);
                    this.moneyPerClick = 1; // Valor por defecto seguro
                } else {
                    this.moneyPerClick = newMoneyPerClick;
                }

                this.updateDisplay();
                this.updateClickUpgradesDisplay();
                this.checkAchievements();
                this.saveGame();

                this.showNotification(`¡${upgrade.name} comprado! +${upgrade.clickBonus}€ por click`);
            }
        }
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

    getClickUpgradeCost(upgradeId) {
        const upgrade = this.clickUpgrades[upgradeId];
        return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
    }

    getBusinessUpgradeCost(upgradeId) {
        const upgrade = this.businessUpgrades[upgradeId];
        return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
    }

    calculateMoneyPerClick() {
        // El dinero por click: 1€ base + bonus de cursores + bonus de prestigio
        let baseClick = 1;

        // Bonus de cursores manuales (verificar que existan)
        if (this.clickUpgrades && typeof this.clickUpgrades === 'object') {
            Object.values(this.clickUpgrades).forEach(upgrade => {
                if (upgrade && typeof upgrade.count === 'number' && typeof upgrade.clickBonus === 'number') {
                    baseClick += upgrade.count * upgrade.clickBonus;
                }
            });
        }

        // Aplicar bonus de prestigio (10% por nivel de prestigio)
        const prestigeLevel = this.prestigeLevel || 0;
        const prestigeMultiplier = 1 + (prestigeLevel * 0.1);
        const finalClick = Math.floor(baseClick * prestigeMultiplier);

        // Asegurar que siempre sea al menos 1
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
        this.clicksPerSecond = 0;
        this.totalClicks = 0;
        this.totalEarned = 0;
        this.currentBusinessLevel = 1;

        // Resetear mejoras de clicks manuales
        Object.values(this.clickUpgrades).forEach(upgrade => {
            upgrade.count = 0;
        });

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
        this.updateClickUpgradesDisplay();
        this.renderAchievements();
        this.saveGame();

        this.showNotification(`¡Prestigio completado! Nivel ${this.prestigeLevel} (+${prestigeBonus}% bonus) - Ganaste ${newPrestigePoints} puntos de prestigio!`);
    }

    resetGame() {
        // Resetear completamente todo
        this.money = 0;
        this.moneyPerClick = 1;
        this.incomePerSecond = 0;
        this.clicksPerSecond = 0;
        this.totalClicks = 0;
        this.totalEarned = 0;
        this.currentBusinessLevel = 1;
        this.prestigeLevel = 0;
        this.prestigePoints = 0;
        this.totalLifetimeEarnings = 0;

        // Resetear mejoras de clicks manuales
        Object.values(this.clickUpgrades).forEach(upgrade => {
            upgrade.count = 0;
        });

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
        this.updateClickUpgradesDisplay();
        this.renderAchievements();

        this.showNotification('¡Juego reseteado completamente! Empezando desde cero...');
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
            1: "¡Haz click!"
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
        // Verificar que moneyPerClick sea válido antes de mostrar
        if (isNaN(this.moneyPerClick) || this.moneyPerClick < 1) {
            console.error('DETECTADO NaN en updateDisplay! moneyPerClick:', this.moneyPerClick);
            this.moneyPerClick = 1; // Corregir inmediatamente
        }

        document.getElementById('money').textContent = this.formatNumber(Math.floor(this.money));
        document.getElementById('income-per-second').textContent = this.formatNumber(this.incomePerSecond.toFixed(1));
        document.getElementById('money-per-click').textContent = this.formatNumber(this.moneyPerClick);

        // Actualizar también el valor en el área de click
        document.getElementById('click-value').textContent = this.formatNumber(this.moneyPerClick);

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
                if (priceElement) priceElement.textContent = this.formatNumber(this.getBusinessUpgradeCost(upgradeId));

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

        // También actualizar las mejoras de clicks manuales
        this.updateClickUpgradesDisplay();
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



    updateClickUpgradesDisplay() {
        // Actualizar contadores de mejoras de clicks manuales y costos
        Object.keys(this.clickUpgrades).forEach(upgradeId => {
            const upgrade = this.clickUpgrades[upgradeId];
            const upgradeElement = document.getElementById(`upgrade-${upgradeId}`);

            if (upgradeElement) {
                const countElement = upgradeElement.querySelector('.count');
                const priceElement = upgradeElement.querySelector('.price');

                if (countElement) countElement.textContent = upgrade.count;
                if (priceElement) priceElement.textContent = this.formatNumber(this.getClickUpgradeCost(upgradeId));

                // Marcar si es asequible
                const cost = this.getClickUpgradeCost(upgradeId);
                if (this.money >= cost) {
                    upgradeElement.classList.add('affordable');
                } else {
                    upgradeElement.classList.remove('affordable');
                }

                // Marcar si ya está adquirido
                if (upgrade.count > 0) {
                    upgradeElement.classList.add('owned');
                } else {
                    upgradeElement.classList.remove('owned');
                }
            }
        });
    }

    checkAchievements() {
        // Definir los requisitos de logros (se pierden al cargar desde localStorage)
        const achievementRequirements = {
            // Logros básicos
            'first_click': () => this.totalClicks >= 1,
            'hundred_euros': () => this.totalEarned >= 100,
            'thousand_euros': () => this.totalEarned >= 1000,
            'ten_thousand_euros': () => this.totalEarned >= 10000,
            'hundred_thousand_euros': () => this.totalEarned >= 100000,
            'million_euros': () => this.totalEarned >= 1000000,
            'millionaire': () => this.totalEarned >= 25000000,

            // Logros de clicks
            'click_master': () => this.totalClicks >= 1000,
            'click_veteran': () => this.totalClicks >= 5000,
            'click_legend': () => this.totalClicks >= 10000,
            'click_god': () => this.totalClicks >= 50000,

            // Logros de cursores manuales
            'first_cursor': () => this.clickUpgrades.cursor.count >= 1,
            'cursor_collector': () => this.clickUpgrades.cursor.count >= 10,
            'cursor_army': () => this.clickUpgrades.cursor.count >= 50,
            'cursor_empire': () => this.clickUpgrades.cursor.count >= 100,

            // Logros de negocios (usando los nuevos IDs)
            'ambulante': () => this.businessUpgrades.ambulante.count >= 1,
            'pequeno_estanco': () => this.businessUpgrades.mini_estanco.count >= 1,
            'franquicia': () => this.businessUpgrades.franquicia.count >= 1,
            'distribuidor': () => this.businessUpgrades.distribuidor.count >= 1,
            'marca_propia': () => this.businessUpgrades.marca_propia.count >= 1,
            'fabrica': () => this.businessUpgrades.fabrica.count >= 1,
            'marketing': () => this.businessUpgrades.publicidad.count >= 1,
            'global': () => this.businessUpgrades.exportador.count >= 1,
            'emperador': () => this.businessUpgrades.emperador.count >= 1,

            // Logros de ingresos pasivos
            'passive_income_1': () => this.incomePerSecond >= 1,
            'passive_income_10': () => this.incomePerSecond >= 10,
            'passive_income_100': () => this.incomePerSecond >= 100,
            'passive_income_1000': () => this.incomePerSecond >= 1000,

            // Logros de prestigio
            'first_prestige': () => this.prestigeLevel >= 1,
            'prestige_master': () => this.prestigeLevel >= 5,
            'prestige_legend': () => this.prestigeLevel >= 10,
            'prestige_god': () => this.prestigeLevel >= 25,

            // Logros especiales
            'speed_demon': () => this.checkSpeedDemon(),
            'patient_player': () => this.checkPlayTime(3600), // 1 hora en segundos
            'dedicated_player': () => this.checkPlayTime(18000), // 5 horas en segundos
            'business_mogul': () => this.checkAllBusinessUpgrades(),
            'completionist': () => this.checkCompletionist()
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
        const achievementsCount = document.getElementById('achievements-count');
        const achievementsTotal = document.getElementById('achievements-total');

        if (!achievementsList) return;

        // Limpiar lista actual
        achievementsList.innerHTML = '';

        // Contar logros desbloqueados
        const unlockedCount = this.achievements.filter(achievement => achievement.unlocked).length;
        const totalCount = this.achievements.length;

        // Actualizar contador
        if (achievementsCount) achievementsCount.textContent = unlockedCount;
        if (achievementsTotal) achievementsTotal.textContent = totalCount;

        // Organizar logros por categorías
        const categories = {
            'Dinero': ['first_click', 'hundred_euros', 'thousand_euros', 'ten_thousand_euros', 'hundred_thousand_euros', 'million_euros', 'millionaire'],
            'Clicks': ['click_master', 'click_veteran', 'click_legend', 'click_god'],
            'Cursores Manuales': ['first_cursor', 'cursor_collector', 'cursor_army', 'cursor_empire'],
            'Evolución del Negocio': ['ambulante', 'pequeno_estanco', 'franquicia', 'distribuidor', 'marca_propia', 'fabrica', 'marketing', 'global', 'emperador'],
            'Ingresos Pasivos': ['passive_income_1', 'passive_income_10', 'passive_income_100', 'passive_income_1000'],
            'Prestigio': ['first_prestige', 'prestige_master', 'prestige_legend', 'prestige_god'],
            'Especiales': ['speed_demon', 'patient_player', 'dedicated_player', 'business_mogul', 'completionist']
        };

        // Renderizar por categorías
        Object.entries(categories).forEach(([categoryName, achievementIds]) => {
            const categoryAchievements = achievementIds.map(id =>
                this.achievements.find(achievement => achievement.id === id)
            ).filter(Boolean);

            if (categoryAchievements.length > 0) {
                // Crear título de categoría
                const categoryTitle = document.createElement('div');
                categoryTitle.className = 'achievement-category';
                categoryTitle.innerHTML = `<h4>${categoryName}</h4>`;
                achievementsList.appendChild(categoryTitle);

                // Añadir logros de la categoría
                categoryAchievements.forEach(achievement => {
                    const achievementElement = document.createElement('div');
                    achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
                    achievementElement.innerHTML = `
                        <span class="achievement-icon">${achievement.icon}</span>
                        <div class="achievement-text">
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-description">${achievement.description}</div>
                        </div>
                    `;
                    achievementsList.appendChild(achievementElement);
                });
            }
        });
    }

    renderClickUpgrades() {
        const container = document.getElementById('click-upgrades-container');
        if (!container) return;

        // Limpiar contenedor
        container.innerHTML = '';

        // Generar cada upgrade dinámicamente
        Object.entries(this.clickUpgrades).forEach(([upgradeId, upgrade]) => {
            const upgradeElement = document.createElement('div');
            upgradeElement.className = 'upgrade auto-click-upgrade';
            upgradeElement.id = `upgrade-${upgradeId}`;

            upgradeElement.innerHTML = `
                <div class="upgrade-info">
                    <span class="upgrade-icon">🖱️</span>
                    <div class="upgrade-details">
                        <div class="upgrade-name">${upgrade.name}</div>
                        <div class="upgrade-description">${upgrade.description}</div>
                        <div class="upgrade-benefit">+${upgrade.clickBonus}€ por click</div>
                        <div class="upgrade-owned">Tienes: <span class="count">0</span></div>
                    </div>
                </div>
                <div class="upgrade-cost">
                    <span class="price">${this.formatNumber(this.getClickUpgradeCost(upgradeId))}</span>€
                </div>
            `;

            container.appendChild(upgradeElement);
        });

        // Después de renderizar, añadir event listeners
        setTimeout(() => {
            this.bindClickUpgradeEvents();
            this.updateClickUpgradesDisplay();
        }, 100);
    }

    renderBusinessUpgrades() {
        const container = document.getElementById('business-upgrades-container');
        if (!container) return;

        // Limpiar contenedor
        container.innerHTML = '';

        // Generar cada upgrade dinámicamente
        Object.entries(this.businessUpgrades).forEach(([upgradeId, upgrade]) => {
            const upgradeElement = document.createElement('div');
            upgradeElement.className = 'upgrade business-upgrade';
            upgradeElement.id = `upgrade-${upgradeId}`;

            upgradeElement.innerHTML = `
                <div class="upgrade-info">
                    <span class="upgrade-icon">${upgrade.icon}</span>
                    <div class="upgrade-details">
                        <div class="upgrade-name">${upgrade.name}</div>
                        <div class="upgrade-description">${upgrade.description}</div>
                        <div class="upgrade-benefit">+${this.formatNumber(upgrade.incomeBonus)}€/seg</div>
                        <div class="upgrade-owned">Tienes: <span class="count">0</span></div>
                    </div>
                </div>
                <div class="upgrade-cost">
                    <span class="price">${this.formatNumber(this.getBusinessUpgradeCost(upgradeId))}</span>€
                </div>
            `;

            container.appendChild(upgradeElement);
        });

        // Después de renderizar, añadir event listeners y actualizar estados
        setTimeout(() => {
            this.bindBusinessUpgradeEvents();
            this.updateBusinessDisplay();
        }, 100);
    }

    bindClickUpgradeEvents() {
        // Añadir event listeners a los upgrades de clicks generados dinámicamente
        document.querySelectorAll('.auto-click-upgrade').forEach(upgrade => {
            upgrade.addEventListener('click', (e) => {
                this.handleClickUpgradeClick(e);
            });
        });
    }

    bindBusinessUpgradeEvents() {
        // Añadir event listeners a los upgrades de negocio generados dinámicamente
        document.querySelectorAll('.business-upgrade').forEach(upgrade => {
            upgrade.addEventListener('click', (e) => {
                this.handleBusinessUpgradeClick(e);
            });
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
            clicksPerSecond: this.clicksPerSecond,
            totalClicks: this.totalClicks,
            totalEarned: this.totalEarned,
            currentBusinessLevel: this.currentBusinessLevel,
            prestigeLevel: this.prestigeLevel,
            prestigePoints: this.prestigePoints,
            totalLifetimeEarnings: this.totalLifetimeEarnings,

            clickUpgrades: this.clickUpgrades,
            businessUpgrades: this.businessUpgrades,
            achievements: this.achievements,
            gameStartTime: this.gameStartTime,
            speedClickCount: this.speedClickCount,
            speedClickStartTime: this.speedClickStartTime
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
            this.clicksPerSecond = gameData.clicksPerSecond || 0;
            this.totalClicks = gameData.totalClicks || 0;
            this.totalEarned = gameData.totalEarned || 0;
            this.currentBusinessLevel = gameData.currentBusinessLevel || 1;
            this.prestigeLevel = gameData.prestigeLevel || 0;
            this.prestigePoints = gameData.prestigePoints || 0;
            this.totalLifetimeEarnings = gameData.totalLifetimeEarnings || 0;

            this.gameStartTime = gameData.gameStartTime || Date.now();
            this.speedClickCount = gameData.speedClickCount || 0;
            this.speedClickStartTime = gameData.speedClickStartTime || 0;

            if (gameData.clickUpgrades) {
                Object.assign(this.clickUpgrades, gameData.clickUpgrades);
            } else if (gameData.autoClickUpgrades) {
                // Migrar datos antiguos
                Object.assign(this.clickUpgrades, gameData.autoClickUpgrades);
            }

            if (gameData.businessUpgrades) {
                // Migrar datos antiguos a la nueva estructura
                const oldToNewMapping = {
                    'pequeno_estanco': 'mini_estanco',
                    'marketing': 'publicidad',
                    'global': 'exportador'
                };

                // Primero, aplicar los datos guardados
                Object.assign(this.businessUpgrades, gameData.businessUpgrades);

                // Luego, migrar datos de IDs antiguos a nuevos si existen
                Object.entries(oldToNewMapping).forEach(([oldId, newId]) => {
                    if (gameData.businessUpgrades[oldId] && this.businessUpgrades[newId]) {
                        // Si el upgrade antiguo tenía compras, transferirlas al nuevo
                        if (gameData.businessUpgrades[oldId].count > 0) {
                            this.businessUpgrades[newId].count = gameData.businessUpgrades[oldId].count;
                        }
                    }
                });
            }

            if (gameData.achievements) {
                this.achievements = gameData.achievements;
            }

            // Recalcular el dinero por click basado en las mejoras cargadas
            const calculatedMoneyPerClick = this.calculateMoneyPerClick();
            if (isNaN(calculatedMoneyPerClick) || calculatedMoneyPerClick < 1) {
                console.error('Error calculando moneyPerClick en loadGame:', calculatedMoneyPerClick);
                this.moneyPerClick = 1; // Valor por defecto seguro
            } else {
                this.moneyPerClick = calculatedMoneyPerClick;
            }

            // Recalcular ingresos por segundo
            this.recalculateIncomePerSecond();

            // Recalcular clicks por segundo
            this.recalculateClicksPerSecond();


        }
    }

    recalculateIncomePerSecond() {
        this.incomePerSecond = 0;
        const prestigeMultiplier = 1 + (this.prestigeLevel * 0.1);

        Object.values(this.businessUpgrades).forEach(upgrade => {
            this.incomePerSecond += upgrade.count * upgrade.incomeBonus * prestigeMultiplier;
        });
    }

    recalculateClicksPerSecond() {
        // Los cursores ya no generan clicks automáticos, solo mejoran clicks manuales
        this.clicksPerSecond = 0;
    }

    // Métodos auxiliares para logros especiales
    checkSpeedDemon() {
        // Este se verifica en handleMainClick cuando se detectan clicks rápidos
        return false; // Se activará dinámicamente
    }

    checkPlayTime(requiredSeconds) {
        const currentTime = Date.now();
        const playTimeSeconds = (currentTime - this.gameStartTime) / 1000;
        return playTimeSeconds >= requiredSeconds;
    }

    checkAllBusinessUpgrades() {
        // Verificar que todas las mejoras de negocio han sido compradas al menos una vez
        return Object.values(this.businessUpgrades).every(upgrade => upgrade.count >= 1);
    }

    checkCompletionist() {
        // Verificar que todos los demás logros están desbloqueados (excepto este mismo)
        const otherAchievements = this.achievements.filter(a => a.id !== 'completionist');
        return otherAchievements.every(achievement => achievement.unlocked);
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.game = new EstancoClicker();
});
