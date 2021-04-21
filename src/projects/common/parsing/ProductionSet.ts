import Production from "./Production";

export default class ProductionSet {
    public allProductions: Map<string, Production[]>;

    constructor(productions: Production[]) {
        this.allProductions = new Map<string, Production[]>();
        for(const p of productions) {
            if(this.allProductions.has(p.name))
                this.allProductions.get(p.name).push(p);
            else
                this.allProductions.set(p.name, [p]);
        }
    }

    static FromGrammarFile(fileLines: string[]): ProductionSet {
        const productions = [];
        for(const line of fileLines) {
            const commentIndex = line.indexOf('#');
            const trimmedLine = line.substr(0, commentIndex === -1 ? line.length : commentIndex).trim();
            if(trimmedLine.length !== 0)
                productions.push(Production.FromString(trimmedLine));
        }
        return new ProductionSet(productions);
    }
}