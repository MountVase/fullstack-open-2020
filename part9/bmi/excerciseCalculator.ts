
interface training {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const excerciseCalculator = (hours: Array<number>, target: number): training => {
    const periodLength = hours.length
    const trainingDays = hours.filter(day => day > 0).length

    // average = sum / length, sum with reduce?
    const average = hours.reduce((accumulated, currVal) => accumulated + currVal, 0) / periodLength
    const success = (average >= target)

    let rating;
    let ratingDescription;

    if (average === target) {
        rating = 2
        ratingDescription = `good job! You're on your way of being on biggest loser Sverige!`
    }

    else if (average < target) {
        rating = 1
        ratingDescription = `forgive yourself, move on. Eat some cheese, great aphrodisiac!`
    }
    else if (average > target) {
        rating = 2
        ratingDescription = `good job son. You'll be as strong as me one day.`
    }

    const obj = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

    return obj

}

console.log(excerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))