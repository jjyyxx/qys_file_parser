import { IState } from './LineTokenizer';
declare class State implements IState {
    wrap: boolean;
    constructor({wrap}?: {
        wrap?: boolean;
    });
    clone(): State;
    equals(target: IState): boolean;
}
export { State };
