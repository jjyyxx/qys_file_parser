import { Global } from '../Global';
// TODO: consider refactoring
function Token(constructor) {
    if (constructor.pattern instanceof RegExp) {
        Global.RegisterTokenPattern(constructor, constructor.pattern);
    }
    else {
        // tslint:disable-next-line:forin
        for (const key in constructor.pattern) {
            Global.RegisterTokenPattern(constructor, constructor.pattern[key], key);
        }
    }
}
export { Token };
//# sourceMappingURL=TokenDecorator.js.map