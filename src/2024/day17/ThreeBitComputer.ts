export class ThreeBitComputer {
    private ip = 0;
    private output = '';

    constructor(public registers: { a: number; b: number; c: number }) {}

    processInstruction(opcode: number, operand: number): void {
        switch (opcode) {
            case 0:
                this.adv(operand);
                break;
            case 1:
                this.bxl(operand);
                break;
            case 2:
                this.bst(operand);
                break;
            case 3:
                this.jnz(operand);
                break;
            case 4:
                this.bxc();
                break;
            case 5:
                this.out(operand);
                break;
            case 6:
                this.bdv(operand);
                break;
            case 7:
                this.cdv(operand);
                break;
            default:
                throw new Error(`Invalid opcode: ${opcode}`);
        }
        this.ip += 2;
    }

    public runProgram(program: number[]): string {
        this.output = '';
        this.ip = 0;
        while (this.ip < program.length) {
            this.processInstruction(program[this.ip], program[this.ip + 1]);
        }
        return this.output;
    }

    private comboOperand = (value: number): number => {
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
                return value;
            case 4:
                return this.registers.a;
            case 5:
                return this.registers.b;
            case 6:
                return this.registers.c;
            case 7:
                throw new Error('Invalid operand: 7');
            default:
                throw new Error(`Invalid operand: ${value}`);
        }
    };

    private adv = (operand: number): void => {
        const numerator = this.registers.a;
        const denominator = 2 ** this.comboOperand(operand);
        this.registers.a = Math.floor(numerator / denominator);
    };

    private bdv = (operand: number): void => {
        const numerator = this.registers.a;
        const denominator = 2 ** this.comboOperand(operand);
        this.registers.b = Math.floor(numerator / denominator);
    };

    private cdv = (operand: number): void => {
        const numerator = this.registers.a;
        const denominator = 2 ** this.comboOperand(operand);
        this.registers.c = Math.floor(numerator / denominator);
    };

    private bxl = (operand: number): void => {
        this.registers.b = this.registers.b ^ operand;
    };

    private out = (operand: number) => {
        const result = this.comboOperand(operand) % 8;
        if (this.output) {
            this.output += ',';
        }
        this.output += result;
    };

    private bxc = (): void => {
        this.registers.b = this.registers.b ^ this.registers.c;
    };

    private jnz = (operand: number): void => {
        if (this.registers.a !== 0) {
            this.ip = operand - 2;
        }
    };

    private bst = (operand: number): void => {
        this.registers.b = this.comboOperand(operand) % 8;
    };
}
