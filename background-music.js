// Generador de música de fondo para Fumadero Tycoon
// Crea una melodía relajante usando Web Audio API

class BackgroundMusicGenerator {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.volume = 0.5;
        this.currentOscillators = [];
        this.melodyIndex = 0;

        // Melodía principal - notas en Hz
        this.melody = [
            { freq: 261.63, duration: 1000 }, // C4
            { freq: 293.66, duration: 1000 }, // D4
            { freq: 329.63, duration: 1000 }, // E4
            { freq: 293.66, duration: 1000 }, // D4
            { freq: 261.63, duration: 1500 }, // C4
            { freq: 220.00, duration: 1500 }, // A3
            { freq: 246.94, duration: 1000 }, // B3
            { freq: 261.63, duration: 2000 }, // C4
        ];

        // Armonía de fondo
        this.harmony = [
            { freq: 130.81, duration: 4000 }, // C3
            { freq: 146.83, duration: 4000 }, // D3
            { freq: 164.81, duration: 4000 }, // E3
            { freq: 130.81, duration: 4000 }, // C3
        ];
    }

    async init() {
        try {
            // Crear contexto de audio
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Reanudar contexto si está suspendido
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            console.log('AudioContext creado, estado:', this.audioContext.state);
            return true;
        } catch (error) {
            console.log('Audio no disponible:', error);
            return false;
        }
    }

    createOscillator(frequency, type = 'sine', volume = 0.3) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(volume * this.volume, this.audioContext.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        return { oscillator, gainNode };
    }

    playNote(frequency, duration, volume = 0.15, type = 'sine') {
        if (!this.audioContext || !this.isPlaying) return;

        const { oscillator, gainNode } = this.createOscillator(frequency, type, volume);

        // Fade in
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * this.volume, this.audioContext.currentTime + 0.1);

        // Fade out
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000 - 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);

        this.currentOscillators.push(oscillator);

        // Limpiar referencia cuando termine
        oscillator.onended = () => {
            const index = this.currentOscillators.indexOf(oscillator);
            if (index > -1) {
                this.currentOscillators.splice(index, 1);
            }
        };
    }

    playMelody() {
        if (!this.isPlaying) return;

        const note = this.melody[this.melodyIndex];
        this.playNote(note.freq, note.duration, 0.12, 'triangle');

        // Programar la siguiente nota
        setTimeout(() => {
            this.melodyIndex = (this.melodyIndex + 1) % this.melody.length;
            this.playMelody();
        }, note.duration);
    }

    playHarmony() {
        if (!this.isPlaying) return;

        const harmonyIndex = Math.floor(this.melodyIndex / 2) % this.harmony.length;
        const chord = this.harmony[harmonyIndex];

        // Tocar acorde (nota base + quinta)
        this.playNote(chord.freq, chord.duration, 0.08, 'sine');
        this.playNote(chord.freq * 1.5, chord.duration, 0.06, 'sine'); // Quinta

        // Programar el siguiente acorde
        setTimeout(() => {
            this.playHarmony();
        }, chord.duration);
    }

    async start() {
        if (!this.audioContext) {
            console.log('AudioContext no disponible');
            return false;
        }

        try {
            // Reanudar contexto si está suspendido
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
                console.log('AudioContext reanudado');
            }

            if (this.isPlaying) {
                console.log('La música ya está reproduciéndose');
                return true;
            }

            this.isPlaying = true;
            this.melodyIndex = 0;

            console.log('Iniciando música de fondo...');

            // Iniciar melodía y armonía
            this.playMelody();
            this.playHarmony();

            return true;
        } catch (error) {
            console.error('Error al iniciar música:', error);
            return false;
        }
    }

    stop() {
        this.isPlaying = false;

        // Detener todos los osciladores activos
        this.currentOscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // El oscilador ya se detuvo
            }
        });

        this.currentOscillators = [];
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    async toggle() {
        if (this.isPlaying) {
            this.stop();
            console.log('Música detenida');
            return false;
        } else {
            const started = await this.start();
            console.log('Música iniciada:', started);
            return started;
        }
    }
}

// Exportar para uso global
window.BackgroundMusicGenerator = BackgroundMusicGenerator;
