import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array.slice() 
  }

  if (numItems < 1 || numItems > array.length) {
    numItems = Math.floor(Math.random() * (array.length)) + 1
  }

  const shuffledArray = array.slice().sort(() => Math.random() - 0.5)

  return shuffledArray.slice(0, numItems)
};


export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {

  numQuestions = Math.max(1, numQuestions)
  numChoices = Math.max(2, numChoices)

  const prompts = [];

  for (let q = 1; q <= numQuestions; q++) {
    const question = {
      type: 'input',
      name: `question-${q}`,
      message: `Enter question ${q}`
    }
    prompts.push(question)

    for (let c = 1; c <= numChoices; c++) {
      const choice = {
        type: 'input',
        name: `question-${q}-choice-${c}`,
        message: `Enter answer choice ${c} for question ${q}`
      };
      prompts.push(choice)
    }
  }

  return prompts
};


export const createQuestions = (obj = {}) => {
  const questions = []

  for (let key in obj) {
      const questionName = key
      const questionData = obj[key]

      const { question, choices } = questionData

      const questionObject = {
        type: 'list',
        name: questionName,
        message: question,
        choices: choices
      }

      questions.push(questionObject)
  }

  return questions
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
