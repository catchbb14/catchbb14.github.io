   

    function Pokemon(name, nameTag, imagePath, hp, baseAttack, counter) {
        this.name = name;
        this.nameTag = nameTag;
        this.imagePath = imagePath;
        this.hp = hp;
        this.baseAttack = baseAttack;
        this.counter = counter;
        this.attack = baseAttack;
        this.attackEnemy = function(enemy) {
            enemy.hp -= this.attack;
            this.attack += this.baseAttack;
            return enemy.isAlive();
        }
        this.attackYou = function(friendly) {
            friendly.hp -= this.counter;
        }
        this.isAlive = function() {
            if(this.hp > 0) { return true; }
            return false;
        }
    }

    var pikachu = {};
    var charmander = {};
    var bulbasaur = {};
    var squirtle = {};

    var characterList = [];
    var enemyList = [];
    var defeated = [];
    var yourPokemon;
    var enemyPokemon;  

    function resetGame() {
        pikachu = new Pokemon("Pikachu", "assets/images/pikachu-name.png", "assets/images/pikachu.png", 120, 8, 15);
        charmander = new Pokemon("Charmander", "assets/images/charmander-name.png", "assets/images/charmander.png", 100, 15, 5);
        bulbasaur = new Pokemon("Bulbasaur", "assets/images/bulbasaur-name.png", "assets/images/bulbasaur.png", 150, 9, 20);
        squirtle = new Pokemon("Squirtle", "assets/images/squirtle-name.png", "assets/images/squirtle.png", 180, 6, 25);

        characterList = [pikachu, charmander, bulbasaur, squirtle];
        enemyList = [];
        defeated = [];
        
        $("#player").toggle();
        updateCaptured();
        updateEnemiesLeft();
        updateStats();

        $("#sec-heading").text("Please Select Your Character!");

        
        $("#player-image").attr("src", "http://via.placeholder.com/200x200");
        $("#enemy-image").attr("src", "http://via.placeholder.com/200x200");

        $("#character-name").css("visibility", "hidden");
        $("#enemy-name").css("visibility", "hidden");

    }

    function updateFriendlyModal() {
        $('.modal-header').text('Select your character!');
        var characterDisplay = '';
        characterList.forEach( function(pokemon) {
            characterDisplay += `<img class="pokemon-thumbnail" src="${pokemon.imagePath}" data-name="${pokemon.name}">`    
        })
        $("#modal-list-container").empty();
        $("#modal-list-container").append(characterDisplay);
        $(".modal-footer").empty();
        var button = '<button type="button" id="modal-submit" class="btn btn-success" style="display:none;" data-dismiss="modal">Select</button>';
        $(".modal-footer").append(button);
    }

    function updateEnemyModal() {
        $('.modal-header').text('Select your character!');
        var characterDisplay = '';
        enemyList.forEach( function(pokemon) {
            characterDisplay += `<img class="pokemon-thumbnail enemy-thumbnail" src="${pokemon.imagePath}" data-name="${pokemon.name}">`    
        })
        $("#modal-list-container").empty();
        $("#modal-list-container").append(characterDisplay);
        $(".modal-footer").empty();
        var button = '<button type="button" id="enemy-submit" class="btn btn-danger" style="display:none;" data-dismiss="modal">Select</button>';
        $(".modal-footer").append(button);
    }

    function startDuel() {
        updateStats();
        updateEnemiesLeft();
        $("#sec-heading").text("Duel!");
        $("#attack-button").toggle();
    }

    function fight() {
        yourPokemon.attackEnemy(enemyPokemon);
            updateStats();
            if(enemyPokemon.isAlive()) {
                enemyPokemon.attackYou(yourPokemon);
                updateStats();
            } else {
                enemyPokemon.hp = 0;
                updateStats();
                defeated.push(enemyPokemon);
                updateCaptured();
                $("#attack-button").toggle();
                if(defeated.length === 3) {
                    playAgain("Congratulations! You have defeated all enemies!");
                } else {
                    $("#enemy-button").toggle();
                    $("#enemy-name").css("visibility", "hidden");
                    $("#enemy-image").attr("src", "http://via.placeholder.com/200x200");     
                }    
            }
            if(!yourPokemon.isAlive()) {
                playAgain("Better luck next time!");
            }
    }

    function playAgain(message) {
        $("#modal-footer").empty();
        $(".modal-footer").append(`
            <button type="button" id="yes" class="btn btn-success" style="display: inline;" data-dismiss="modal">Yes</button>
            <button type="button" id="no" class="btn btn-danger" style="display: inline;" data-dismiss="modal">No</button>
        `);
        $("#outcome").text(message);
        $("#playAgain").modal('show')
    }

    function updateStats() {
        $("#currentCharHP").text(yourPokemon.hp);
        $("#currentCharAttack").text(yourPokemon.attack);
        
        $("#currentEnemyHP").text(enemyPokemon.hp);
        $("#currentEnemyAttack").text(enemyPokemon.attack);
    }

    function updateCaptured() {
        $(".capturedList").empty();
        var html = "";
        defeated.forEach(function(pokemon) {
            html += `<li class="list-group-item float-left" style="border-style:none;">
                        <img class="captured" src="${pokemon.imagePath}">
                    </li>`
        })
        $(".capturedList").append(html);
    }

    function updateEnemiesLeft() {
        $(".enemiesLeft").empty();
        var html = "";
        enemyList.forEach(function(pokemon) {
            html += `<li class="list-group-item float-left" style="border-style:none;">
                        <img class="captured" src="${pokemon.imagePath}">
                    </li>`
        })
        $(".enemiesLeft").append(html);
    }

    

    function clickEvents() {

        var selectedCharacter = "";
        var selectedEnemy = "";
        
        $(document).on("click", "#player", function() {
            updateFriendlyModal();
        })

        $(document).on("click", "#enemy-button",function() {
            updateEnemyModal();
        })

        $(document).on("click", ".pokemon-thumbnail", function() {
            selectedCharacter = $(this).attr("data-name");
            $("#modal-submit").show();
        })

        $(document).on("click", ".enemy-thumbnail", function() {
            selectedEnemy = $(this).attr("data-name");
            $("#enemy-submit").show();
        })

        $(document).on("click", "#modal-submit", function() {
            
            yourPokemon = characterList.find(function(pokemon) {
                return selectedCharacter === pokemon.name;
            })
            
            enemyList = characterList.filter(function(pokemon) {
                return selectedCharacter !== pokemon.name;
            })
            $("#character-name").attr("src", yourPokemon.nameTag);
            $("#character-name").css("visibility", "visible");
            $("#player-image").attr("src", yourPokemon.imagePath);
            $("#player").toggle();
            $("#enemy-button").toggle();

        })

        $(document).on("click", "#enemy-submit", function() {
            enemyPokemon = characterList.find(function(pokemon) {
                return selectedEnemy === pokemon.name;
            })
            
            enemyList = enemyList.filter(function(pokemon) {
                return selectedEnemy !== pokemon.name;
            })
            
            $("#enemy-name").attr("src", enemyPokemon.nameTag);
            $("#enemy-name").css("visibility", "visible");
            $("#enemy-image").attr("src", enemyPokemon.imagePath);
            $("#enemy-button").toggle();
            startDuel();
        })

        $(document).on("click", "#attack-button", function() {
            fight();
        })

        $(document).on("click", "#yes", resetGame);
    }

    clickEvents();
    resetGame();