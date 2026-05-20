const mongoose=require('mongoose')

/**
 * - job description schema : String
 * - resume text : String
 * - Self description : String
 * - matchScore : number
 * 
 * - Technical questions: 
 *              [{
 *                  question: "",
 *                  intention:"",
 *                  answer: ""
 *              }]
 * - Behaviorial questions : 
 *               [{
 *                  question: "",
 *                  intention:"",
 *                  answer: ""
 *              }]
 * - Skill gaps : 
 *              [{
 *                  skill: "",
 *                  severity:{
 *                      type: String,
 *                      enum: ["low","medium","hard"]
 * }
 *              }]
 * - Preparation plans : [{
 *                   day : String,
 *                   focus : String,
 *                   tasks : [String]
 * }]
 */

const technicalQuestionSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Question is required"]

    },
    intention:{
        type:String,
        required:[true,"Intention is required"]

    },
    answer:{
        type:String,
        required:[true,"Answer is required"]

    }

},{
    _id:false
})

const behavioralQuestionSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Question is required"]

    },
    intention:{
        type:String,
        required:[true,"Intention is required"]

    },
    answer:{
        type:String,
        required:[true,"Answer is required"]

    }

},{
    _id:false
})

const skillsGapSchema= new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]

    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]

    }

},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, "Day is required"]
    },

    focus: {
        type: String,
        required: [true, "Focus is required"]
    },

    tasks: [{
        type: String,
        required: [true, "Tasks are required"]
    }]

}, {
    _id: false
})

const interviewReportSchema= new mongoose.Schema({
    jobDescription:{
        type: String,
        required:[true,"Job Description required"]

    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillsGaps:[skillsGapSchema],
    preparationPlans:[preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:[true,"Job title is required"]
    }
},{
    timestamps:true
})

const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);
module.exports= interviewReportModel;