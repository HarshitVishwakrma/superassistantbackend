const ComprehensiveQuestion = require('../model/ComprehensiveQuestions');
const ClozeQuestion = require('../model/ClozeQuestion');
const CategoryQuestion = require('../model/CategoryQuestion')

exports.createComprehensiveQuestion = async (req, res) => {
    try {
        const { questions, paragraph } = req.body;

        console.log(req.body)
        console.log(questions[0].options)
        const newQuestion = new ComprehensiveQuestion({
            paragraph: paragraph,
            questions: questions,
        });

        const response = await newQuestion.save(); // Don't forget to save the document
        console.log(response)
        res.status(201).json({ message: "Comprehensive question created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create comprehensive question." });
    }
};


exports.createClozeQuestion = async (req, res)=>{
    try{
        const {question, correctAnswers, additionalOptions} = req.body;
        const newQuestion = new ClozeQuestion({
            additionalOptions : additionalOptions,
            correctAnswers : correctAnswers,
            question : question
        })

        const response = await newQuestion.save();
        console.log('line no. 35')
        console.log(response)

        res.status(201).json({ message: "Cloze question created successfully!" });


    }catch(error){
        console.log(error)
    }
}

exports.createCategoryQuestion = async (req, res)=>{
    try{
        const {categories, options, question} = req.body;

        const newQuestion = new CategoryQuestion({
            categories : categories,
            options : options,
            question : question
        })

        const response = await newQuestion.save();
        console.log(response);

        res.status(201).json({message : 'Category question created succesfully!.'})

    }catch(error){
        console.log(error);
    }
}


exports.structureData = async (req, res) => {
    try {
        // Fetch Category Questions
        console.log('request reached')
        const categoryQuestions = await CategoryQuestion.find();
        const formattedCategoryQuestions = categoryQuestions.map((question) => ({
            type: 'category',
            id: question._id.toString(),
            question: question.question,
            categories: question.categories,
            options: question.options.map((option) => ({
                value: option.text,
                category: option.category,
            })),
        }));

        // Fetch Cloze Questions
        const clozeQuestions = await ClozeQuestion.find();
        const formattedClozeQuestions = clozeQuestions.map((question) => ({
            type: 'cloze',
            id: question._id.toString(),
            question: question.question,
            correctAnswers: question.correctAnswers,
            additionalOptions: question.additionalOptions,
        }));

        // Fetch Comprehensive Questions
        const comprehensiveQuizzes = await ComprehensiveQuestion.find();
        const formattedComprehensiveQuestions = comprehensiveQuizzes.map((quiz) => ({
            type: 'comprehensive',
            id: quiz._id.toString(),
            paragraph: quiz.paragraph,
            questions: quiz.questions.map((q) => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
            })),
        }));

        // Combine all formatted questions
        const allQuestions = [
            ...formattedCategoryQuestions,
            ...formattedClozeQuestions,
            ...formattedComprehensiveQuestions,
        ];

        res.status(200).json({data : allQuestions})
    } catch (error) {
        console.error('Error structuring data:', error);
        throw new Error('Failed to structure questions');
    }
};

