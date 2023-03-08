export interface IExecutable {
    execute(data:any): void | any | Promise<void>;
}