
interface exerciseOutput {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exerciseInput {
    hours: Array<number>;
    target: number;
}

const exerciseCalculator = (hours: Array<number>, target: number): exerciseOutput => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(day => day > 0).length;

    // average = sum / length, sum with reduce?
    const average = hours.reduce((accumulated, currVal) => accumulated + currVal, 0) / periodLength;
    const success = (average >= target);

    let rating;
    let ratingDescription;

    if (average === target) {
        rating = 2;
        ratingDescription = `good job! You're on your way of being on biggest loser Sverige!`;
    }

    else if (average < target) {
        rating = 1;
        ratingDescription = `forgive yourself, move on. Eat some cheese, great aphrodisiac!`;
    }
    // if (average > target)
    else  {
        rating = 2;
        ratingDescription = `good job son. You'll be as strong as me one day.`;
    }

    const obj = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    return obj;

};




const argsCleanup = (args: Array<string>): exerciseInput => {
    const data = args.slice(2); 

    if (data.length < 3) throw new Error('parameters broken bro.');
    data.forEach(n => {
        if (isNaN(Number(n))) throw new Error('not numbers bro.');
    });
    
    const targetto = Number(data[0]);
    const hours = data.slice(1).map(n => Number(n));

    return {
        hours,
        target: targetto
    };
};




const { hours, target } = argsCleanup(process.argv);
console.log(exerciseCalculator(hours, target));
