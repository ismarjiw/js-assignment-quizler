import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  
    if (array.length <= 1) return array;

    if (numItems < 1 || numItems > array.length) {
        numItems = Math.floor(Math.random() * array.length) + 1;
    }

    const newArray = array.slice();

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray.slice(0, numItems);
};


export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {

    const prompts = [];

    for (let i = 1; i <= numQuestions; i++) {
        prompts.push({
            type: 'input',
            name: `question-${i}`,
            message: `Enter question ${i}`
        });

        for (let j = 1; j <= numChoices; j++) {
            prompts.push({
                type: 'input',
                name: `question-${i}-choice-${j}`,
                message: `Enter answer choice ${j} for question ${i}`
            });
        }
    }

    return prompts;
};


export const createQuestions = (obj = {}) => {

  const questions = [];

  // Extract unique question numbers
  const questionNumbers = [...new Set(Object.keys(obj).map(key => key.split('-')[1]))];

  questionNumbers.forEach(questionNumber => {
      const questionKey = `question-${questionNumber}`;
      const question = obj[questionKey];
      const choices = [];

      for (const key in obj) {
          if (key.startsWith(questionKey) && key !== questionKey) {
              choices.push(obj[key]);
          }
      }

      questions.push({
          type: 'list',
          name: questionKey,
          message: question,
          choices: choices
      });
  });

  return questions;
};


export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
