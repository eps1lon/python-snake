import Display from '../Display';
import Screen from '../Screen';
declare class ConsoleOut implements Display {
    static screenToString(screen: Screen): string;
    private calls;
    show(screen: Screen): void;
}
export default ConsoleOut;
