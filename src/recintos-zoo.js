class RecintosZoo {
    constructor() {
        this.animais = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };

        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const espacoNecessario = quantidade * tamanho;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const animaisExistentes = recinto.animaisExistentes;
            const espacoOcupado = animaisExistentes.reduce((total, { especie, quantidade }) => {
                return total + (this.animais[especie].tamanho * quantidade);
            }, 0);

            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            let espacoExtra = 0;

            if (animaisExistentes.length > 0) {
                if (animaisExistentes.some(({ especie }) => this.animais[especie].carnivoro !== carnivoro)) continue;
                if (carnivoro && animaisExistentes.some(({ especie }) => especie !== animal)) continue;
                if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") continue;
                if (animal === "MACACO" && espacoLivre === recinto.tamanhoTotal) continue; 

                espacoExtra = animaisExistentes.some(({ especie }) => especie !== animal) ? 1 : 0;
            }

            if (biomas.some(bioma => recinto.bioma.includes(bioma)) && espacoLivre >= (espacoNecessario + espacoExtra)) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario - espacoExtra} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos("MACACO", 2)); 
console.log(zoo.analisaRecintos("UNICORNIO", 1)); 
console.log(zoo.analisaRecintos("LEAO", 0)); 




export { RecintosZoo as RecintosZoo };
