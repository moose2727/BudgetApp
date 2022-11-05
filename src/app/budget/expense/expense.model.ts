export class Expense {
    public name: string; 
    public currentTotal: number;
    public weeklyAdd: number;
    public target: number;

    constructor(name: string, currentTotal: number, weeklyAdd: number, target: number){
        this.name = name;
        this.currentTotal = currentTotal;
        this.weeklyAdd = weeklyAdd;
        this.target = target;
    }
}