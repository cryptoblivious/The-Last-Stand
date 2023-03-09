

export default class GameComponent {
    execute() {
      throw new Error("Method not implemented.");
    }
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}