export class Tests{
    idTest:any;
    title:string;
    creationDate:Date;
    type:string;
    deadline:Date;
    vdDate:Date;
    questions:Array<Question>;

    constructor(idTest:any,
        title:string,
        creationDate:Date,
        type:string,
        deadline:Date,
        vdDate:Date,
        questions:Array<Question>){
        this.idTest=idTest;
        this.title= title;
        this.creationDate=creationDate;
        this.type=type;
        this.deadline=deadline;
        this.vdDate=vdDate;
        this.questions=questions;


    }
}

export class Question{
    questionId:number;
    questionLabel:string;
    falseResponses:Array<string>;
    correctResponses:Array<string>;
    score:number;
    time:number;

    constructor( 
        questionId:number,
        questionLabel:string,
        falseResponses:Array<string>,
        correctResponses:Array<string>,
        score:number,
        time:number){
            this.questionId=questionId;
            this.questionLabel=questionLabel;
            this.correctResponses=correctResponses;
            this.falseResponses=falseResponses;
            this.score=score;
            this.time=time;

    }
}