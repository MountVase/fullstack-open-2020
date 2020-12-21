
// calculateBmi(height, weight)

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / height / height * 10000;
    
    if (bmi < 18.5) return "Underweight";
    else if (bmi <= 25) return "Normal (healthy weight)";
    else if (bmi <= 30) return "Overweight";
    else if (bmi > 30) return "Obese";
};


console.log(calculateBmi(180, 74))
