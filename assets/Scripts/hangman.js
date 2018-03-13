
    var words = 
    ['beachball', 'bikini', 'bike', 'boat', 'clam', 'conch', 'cooler', 'coral', 'crab', 'dune', 'family',
     'fish', 'frisbee', 'hat', 'island', 'kayak', 'lifegaurd', 'ocean', 'pelican', 'pier', 'popsicle', 'reef', 'relax',
     'sailboat', 'sand', 'sandals', 'sandbar', 'sandcastle', 'scuba', 'sea', 'seashell', 'seagull', 'shark', 'snorkle',
     'sunbathe', 'sunburn', 'sunglasses', 'sunscreen', 'surf', 'tide', 'towel', 'trunks', 'umbrella', 'vacation', 'waves'];
     var wordsUsed = [];
     var currentGame;
     var imagePath;
     var audioElement = document.createElement("audio");
    audioElement.setAttribute('src', 'assets/Audio/Good_Vibrations.mp3');

    var wins = 0;
    var losses = 0;

    var textToDisplay = "_";


    class Game {
        constructor(wordChosen) {
            this.lettersCorrect = [];
            this.lettersIncorrect= [];
            this.lettersGuessed = [];
            this.guessesLeft= 6;
            this.victory = false;
            this.wordChosen = wordChosen;
        }

        incorrectLetter(letter) {
            this.lettersIncorrect.push(letter);
            this.guessesLeft--;
            this.changeImageIncorrect();
            if(this.guessesLeft==0) {
                losses++;
                alert("You have lost... unfortunately you will not be able to join the fun.");
                document.getElementById("hangman").setAttribute("class", "card-img-top text-center" );
                document.getElementById("hangman").setAttribute('style',"height:386px; width:267px;");
            }
            this.displayIncorrectLetters(letter);
            
            document.getElementById("guesses-left").innerHTML = this.guessesLeft;
        }

        correctLetter(letter) {
            this.lettersCorrect.push(letter);
            this.displayCorrectLetters(letter);
        }

        
        
        checkLetter(letter) {
            if(this.guessesLeft == 0) {
                alert("You have lost, please reset game to try again...");
                return;
            }
            if(this.victory){
                alert("You have won the game, please reset the game to continue!");
                return;
            }
            if(this.lettersGuessed.indexOf(letter) == -1) {
                this.lettersGuessed.push(letter);
                if((this.wordChosen).indexOf(letter) < 0) {
                    this.incorrectLetter(letter);
                } else {
                    this.correctLetter(letter);
                }
            } else {
                alert("You have already guessed this letter.")
                return;
            }
            
        }

        displayUnderscores() {
            for(var i = 0; i < this.wordChosen.length; i++) {
                textToDisplay += "_";
            }
            return textToDisplay;
        }

        displayIncorrectLetters(letter) {
            var temp = this.lettersIncorrect.slice();
            temp = temp.join(", ");
            document.getElementById("incorrect-letters").innerHTML = temp;
        }

        displayCorrectLetters(letter) {
            var index = -1;
            var indicies = [];
            var substring = "";
            var currentText = textToDisplay;
            
            var temp = this.lettersCorrect.slice();
            temp = temp.join(", ");
            document.getElementById("correct-letters").innerHTML = temp;

            while(this.wordChosen.indexOf(letter, index+1) != -1){
                index = this.wordChosen.indexOf(letter, index+1);
                indicies.push(index);
            }

            for(var x = 0; x < this.wordChosen.length; x++) {
                if(currentText.charAt(x) === '_') {
                    if(indicies.indexOf(x) === -1) {
                        substring += "_";
                    } else {
                        substring += letter;
                    }
                } else {
                    substring += currentText.charAt(x);
                }
            }
            
            textToDisplay = substring;
            this.checkVictory(textToDisplay);
            changeTextToDisplay();

        }

        displayInitial() {
            document.getElementById("wins").innerHTML = wins;
            document.getElementById("losses").innerHTML = losses;
            document.getElementById("guesses-left").innerHTML = this.guessesLeft;
            document.getElementById("correct-letters").innerHTML = this.lettersCorrect;
            document.getElementById("incorrect-letters").innerHTML = this.lettersIncorrect;
            this.changeImageIncorrect();
        }

        changeImageIncorrect() {
            imagePath = 'assets/Images/Hangman/hangman-' + this.guessesLeft + '.png';
            document.getElementById("hangman").setAttribute('src',imagePath);
            document.getElementById("hangman").setAttribute('class',"card-img-top gallows");
        }

        changeImageVictory() {
            imagePath = 'assets/Images/Hangman/hangman-win.png';
            document.getElementById("hangman").setAttribute('src',imagePath);
            document.getElementById("hangman").setAttribute('class',"card-img-top text-center");
            document.getElementById("hangman").setAttribute('style',"height:386px; width:267px;");
        }

        changeImageLoss() {
            imagePath = 'assets/Images/Hangman/hangman-loss.png';
            document.getElementById("hangman").setAttribute('src',imagePath);
            document.getElementById("hangman").setAttribute('class',"card-img-top text-center");
            document.getElementById("hangman").setAttribute('style',"height:386px; width:267px;");
        }

        checkVictory(text) {
            if(text.indexOf('_') === -1) {
                this.changeImageVictory();
                wins++;
                this.victory = true;
                alert("You have won! Enjoy your day at the beach!");
                audioElement.play();
            }
        }

        

    }

    

    document.onkeyup = function(event) {
          
        var letter = String.fromCharCode(event.which).toLocaleLowerCase();
        
        if(letter.match(/[a-z]/i)) {
            currentGame.checkLetter(letter);
        }

        
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    
    function changeTextToDisplay() {
        document.getElementById("textToDisplay").innerHTML = textToDisplay;
    }

    function resetGame() {
        var wordChosen;
        textToDisplay = "";
        audioElement.pause();

        function chooseWord() {
            words = shuffle(words);
            var randWord = words.pop();
            wordsUsed.push(randWord);
            return randWord;
        }
        
        wordChosen = chooseWord();
        currentGame = new Game(wordChosen);

        textToDisplay = currentGame.displayUnderscores();
        currentGame.textToDisplay = textToDisplay;
        console.log(currentGame.textToDisplay);
        console.log(currentGame.wordChosen);
        changeTextToDisplay();
        currentGame.displayInitial();
    }


