export default class Aplication {
    constructor() {
        this.languageSel = 'es';
        this.languages = ['es', 'en'];
        this.modeloSel = 'cat';
        this.modelos = [
            { cod: 'cat', name: 'Gato' },
            { cod: 'duck', name: 'Pato' },
        ]
    }

    getLanguageSel() {
        return this.languageSel;
    }
    setLanguageSel(lan) {
        if(this.languages.includes(lang)) {
            this.languageSel = lang;
        } else {
            console.warn(`El idioma ${lang} no está en la lista de idiomas soportados :(`)
        }
    }

    getModeloSel() {
        return this.modeloSel;
    }
    setModeloSel(modelo) {
        const existe = this.modelos.find((m) => m.cod === modelo);
        if(existe) {
            this.modeloSel = modelo;
        } else {
            console.warn(`El modelo ${modelo} no está disponible en la lista de modelos.`);
        }
    }
    
}