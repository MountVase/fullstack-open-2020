
// calculateBmi(height, weight)

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / height / height * 10000;
    
    if (bmi < 18.5) return "Underweight";
    else if (bmi <= 25) return "Normal (healthy weight)";
    else if (bmi <= 30) return "Overweight";
    else  return "Obese"; //if (bmi > 30)
};


export interface bmiInput {
    height: number;
    weight: number;
}


export const argsCleanup2 = (args: Array<string>): bmiInput => { 
    if (args.length !== 4) throw new Error('give me input: weight, height. no wait the  other way around');

    const h = Number(args[2]);
    const w = Number(args[3]);

    if (isNaN(h) || isNaN(w)) throw new Error('get your numbers together dawg..');

    return {
        height: h,
        weight: w
    };
};


// const { height, weight } = argsCleanup2(process.argv);
// console.log(calculateBmi(height, weight));