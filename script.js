var count = 0;
var wrongAns = 0;
var scoreCount = 0;
var streakCount = 0;
var name;
var lives = 3;

const ans = document.getElementById('answer');
const docQ = document.getElementById('question');
const docScore = document.getElementById('score');
const docStreak = document.getElementById('streak');
const docCountQ = document.getElementById('countQ');
const docFailScore = document.getElementById('failScore');
const docFailName = document.getElementById('failName');
const docWinName = document.getElementById('winName');
const docWinScore = document.getElementById('winScore');
const docExitName = document.getElementById('exitName');
const docExitScore = document.getElementById('exitScore');


function isEmpty(){
	var name = window.prompt("Enter your name: ");
	this.name = name;
	if(name.trim()==null || name.trim()==""){
		console.log("Name not set");
	}
	else{
		alert("Your name has been set as " + name);
		window.location.href = "category.html";
	}
}

function question(question, answer,points){
	this.question = question;
	this.answer = answer;
	this.points = points;
}

var foodQuestions = [new question('What is the local name for Shadow Beni?','BANDANYA',5),
	new question('What is the name of the dish that is made by soaking and boiling pieces of salted fish, then blending them with tomatoes, hot peppers, sweet peppers, onions, and oil?','SALTFISH BULJOL',10),
	new question('What is a famous dish we buy at Maracas Bay most of the time?','BAKE AND SHARK',15),
	new question('What is a famous soup made with fish and vegetables in Trinidad and Tobago?','FISH BROTH',20),
	new question('What is the name of the most common street food in Trinidad and Tobago?','DOUBLES',25)];

var personQuestions = [new question('Who was the first President of Trinidad and Tobago?','SIR ELLIS CLARKE',5),
	new question('Who was the first female Prime Minister of Trinidad and Tobago?','KAMLA PERSAD-BISSESSAR',10),
	new question('Which person led the 1990 coup to overthrow the government?','YASIN ABU BAKR',15),
	new question("Name the legendary cricketer, known as the 'Prince of Trinidad'",'BRIAN LARA',20),
	new question('Who is the most popular Soca Artiste?','MACHEL MONTANO',25)];

var geographyQuestions = [new question('Name the most well known hill in south Trinidad','SAN FERNANDO HILL',5),
	new question('Trinidad is home to the largest round-about in the world. What is its name?','QUEENS PARK SAVANNAH',10),
	new question('Name the two identical towers in the capital of Trinidad','TWIN TOWERS',15),
	new question('Where is the protected nesting area for the national bird of Trinidad?','BIRD SANCTUARY',20),
	new question('Name the largest natural deposit of asphalt on the island','PITCH LAKE',25)];

var celebrations = [new question('What is the largest street parade, usually in February called?','CARNIVAL',5),
	new question('Name the music festival that usually happens every April in Tobago','TOBAGO JAZZ FESTIVAL',10),
	new question('What day marks the commemoration of liberation from chattel slavery?','EMANCIPATION DAY',15),
	new question('Name the week-long mid-year event celebrating the rich diversity of cultures','WE BEAT FESTIVAL',20),
	new question('A historic marking of the cross-cultural relationship between the Amerindians and the Roman Catholic Church. The festival is held in August in honour of the remaining Caribs on the islands. What is it called?','SANTA ROSA FESTIVAL',25)];

function loadQuestions(x,y){

	switch(y){
		case 1:{
			docCountQ.innerText = 'Question ' + (x+1);
			docQ.innerText = foodQuestions[x].question;
			
			break;
		}
		case 2:{
			docCountQ.innerText = 'Question ' + (x+1);
			docQ.innerText = personQuestions[x].question;
			
			break;
		}
		case 3:{
			docCountQ.innerText = 'Question ' + (x+1);
			docQ.innerText = geographyQuestions[x].question;
			
			break
		}
		case 4:{
			docCountQ.innerText = 'Question ' + (x+1);
			docQ.innerText = celebrations[x].question;
			
			break
		}
		default:console.log('ERROR!');
	}
	
}

function submit(y){
	if(emptyAnswer()){
		if(checkAnswer(y)){
			if(count==4){
				window.location.href = "youWin.html?"+name+"?"+scoreCount;
			}
			else{
				count++;
				loadQuestions(count,y);
				ans.value = "";
			}
			
		}
		else{
			if(count==4){
				window.location.href = "fail.html?"+name+"?"+scoreCount;
			}
			else{
				count++;
				loadQuestions(count,y);
				ans.value = "";
			}
			
		}
		
	}
}

function emptyAnswer(){
	if (ans.value == null || ans.value.trim() == "" ) {
		alert('Please enter an answer');
		return false;
	}
	else{
		return true;
	}
}

function checkAnswer(y){
	var check;
	switch(y){
		case 1:{
			check = foodQuestions[count].answer;			
			break;
		}
		case 2:{
			check = personQuestions[count].answer;
			break;
		}
		case 3:{
			check = geographyQuestions[count].answer;
			break
		}
		case 4:{
			check = celebrations[count].answer;
			break
		}
		default:console.log('ERROR!');
	}


	if(ans.value.toUpperCase().trim()==check){
		alert('Correct Answer');
		updateScore();
		streak();
		return true;
	}
	else{
		streakCount = 0;
		docStreak.innerText = streakCount;
		docScore.innerText = scoreCount;
		lives--;
		alert('Wrong Answer\nYou entered: '+ans.value+'\nCorrect Answer: '+check+"\nLives Remaining: " + lives);
		wrongAns++;
		if(wrongAns>2){
			window.location.href = "fail.html?"+name+"?"+scoreCount;
		}
		return false;
	}
	
}

function updateScore() {
	scoreCount += foodQuestions[count].points;
	docScore.innerText = scoreCount;
}

function streak(){
	streakCount++;
	docStreak.innerText = streakCount;
}

function fail(){
	var queryString = location.search.substring(1);
	var a = queryString.split("?");
	docFailName.innerText = "Better Luck next time " + a[0];
	docFailScore.innerText = "Your score is " + a[1];
}

function win(){
	var queryString = location.search.substring(1);
	var a = queryString.split("?");
	if(parseInt(a[1]) == 75){
		docWinName.innerText = "CONGRATS " + a[0];
		docWinScore.innerText = "Your score is " + a[1];
	}

	else if(parseInt(a[1]) < 75){
		var queryString = location.search.substring(1);
		var a = queryString.split("?");
		docWinName.innerText = a[0] + " has received a commendation reward.";
		docWinScore.innerText = "Your score is " + a[1];
	}
	
}

function exit(){
	window.location.href = "exit.html?"+name+"?"+scoreCount;
}

function thanks(){
	var queryString = location.search.substring(1);
	var a = queryString.split("?");
	docExitName.innerText = "Come again " + a[0];
	docExitScore.innerText = "Your score is " + a[1];
}