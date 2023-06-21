let playerName='';
let level='';
let number1=0;
let number2=0;
let exp='';
operators=['+','-','/','*','%'];
let question='';
let time=0;
let counter=null;
let requestAnswer;
let correctAnswer=0;
let resultSheet=[];
let correctAnswers=0;
let wrongAnswers=0;
let questionNumber=0;
let answerState=false;


//start login form js
letsGetStarted= ()=>{
    let playerNameElement =
        document.getElementById('playerName');
    let levelElement =
        document.getElementById('level');
    setBorderColor(playerNameElement)

    let tempPlayerName=playerNameElement.value;
    if (tempPlayerName.trim()===''){ //trim rid spaces
        playerNameElement.style.borderColor='red';
        alert('please insert name and level to continue!')
        return;
    }
   playerName=tempPlayerName;
    level=levelElement.value;
    //==>redirecting gaming console==>
    let playerData={name:playerName,level:level};
    localStorage.setItem("playerData",JSON.stringify(playerData));
    window.location.href="game.html";

}
setBorderColor=(element)=>{
    element.style.borderColor='';
}
//end login form js

//start game console js
setPlayerData = key => {
   let storageData = JSON.parse(localStorage.getItem("playerData"));
    playerName=storageData.name;
    level=storageData.level;
    document.getElementById('player-name')
    .innerHTML=playerName;
    document.getElementById('player-level')
        .innerHTML=level;
}


startGame=()=>{
    generateQuestion();
}


generateQuestion= () =>{
    questionNumber++;
    document.getElementById('questionNumber').innerHTML=questionNumber;
    clearTime();
    let selectedMax=checkLevel();
    number1=generateNumber(1,selectedMax);
    number2=generateNumber(1,selectedMax);
    exp=operators[generateNumber(0,5)];
    question = `${number1} ${exp} ${number2} =?`;
    document.getElementById('question')
        .innerHTML=question;
    executeTime();

}

generateNumber=(min,max)=>{
    return Math.floor(Math.random() * (max - min)+ min);//specific range ==> example 1-101
}

checkLevel=()=>{
    let levelNumber=51; // default Beginner
    switch (level){
        case "Beginner": levelNumber=51;break;
        case "Middle": levelNumber=101;break;
        case "Advanced": levelNumber=1001;break;
    }
    return levelNumber;
}
executeTime=()=>{
   counter =  setInterval(()=>{
        time++;
        document.getElementsByClassName('counter-time')[0].innerHTML=time;
        if(time===60){
            clearTime();
            alert('Failed');
        }
    },1000);
}
clearTime=()=>{
    time=0;
    clearInterval(counter)
}
submitAnswer=()=>{
    requestAnswer = document.getElementById('requestAnswer').value;
    console.log(requestAnswer);
    if (isNaN(requestAnswer) || number1==0 || requestAnswer===''){
        alert('please insert a number or start the game');
        return;
    }

    findAnswer();
    if (correctAnswer===Number(requestAnswer)){
        //set correct and incorrect values
        answerState=true;
        correctAnswers++;
        document.getElementById('congrats').innerHTML='Congratulations😊';
        document.getElementById('congrats').style.color='#2980b9';
        document.getElementById('correctAnswers').innerHTML=correctAnswers;
    }else{
        answerState=false;
        wrongAnswers++;
        document.getElementById('congrats').innerHTML=`Oops...😒(A : ${correctAnswer})`;
        document.getElementById('congrats').style.color='#035400';

        document.getElementById('wrongAnswers').innerHTML=wrongAnswers;
    }

    document.getElementById('question').innerHTML='Processing...'
    setTimeout(()=>{
        greeting();
    },3000);



}
findAnswer=()=>{
    switch (exp){
        case "+": correctAnswer=number1+number2;break;
        case "-": correctAnswer=number1-number2;break;
        case "/": correctAnswer=number1/number2;break;
        case "*": correctAnswer=number1*number2;break;
        case "%": correctAnswer=number1%number2;
    }

}
greeting=()=>{
    let result={
        question_id:questionNumber,
        question: question,
        request_Answer: requestAnswer,
        answer:correctAnswer,
        state:answerState,
        time:time
    };
    resultSheet.push(result);
    //=====clear greeting
    document.getElementById('congrats').innerHTML='';
    document.getElementById('requestAnswer').value='';
    if (questionNumber!==10){
        generateQuestion();
    }else{
       localStorage.setItem('result',JSON.stringify(resultSheet));
        window.location.href = "result.html";
        //reset all data
    }
}

setResult=()=>{
    const data = JSON.parse(localStorage.getItem('result'));
    for (const tempDataSet of data){
        const element = document.getElementsByTagName('tbody')[0];
        const newRow = `<tr>
    <td>${tempDataSet.question_id}</td> 
    <td>${tempDataSet.question}</td> 
    <td>${tempDataSet.request_Answer}</td>
    <td>${tempDataSet.answer}</td>
    <td>${tempDataSet.state?'😊':'😢'}</td> 
    <td>${tempDataSet.time}</td>
 </tr>`
        element.innerHTML+=newRow;
    }
}

//end game console js