    var trainCount;

    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyCGkjbLLE7oypjbZ_1hRbkveQOZZXsYjn8",
        authDomain: "train-project-11b03.firebaseapp.com",
        databaseURL: "https://train-project-11b03.firebaseio.com",
        projectId: "train-project-11b03",
        storageBucket: "train-project-11b03.appspot.com",
        messagingSenderId: "681244605359"
    };
  
    firebase.initializeApp(config);
    //Initialize Database
    var database = firebase.database();
    //Create reference to stored global variables
    var globalRef = firebase.database().ref('global/');
    globalRef.once("value")
        .then( function(snapshot) {
            if(!snapshot.child('count').exists()) {
                globalRef.set({
                    count: 1
                });
                trainCount = 1;
            } else {
                trainCount = snapshot.child('count').val();
                console.log(trainCount);
            }
        })

    //Create reference to stored train list
    var trainRef = firebase.database().ref('trains/');

    //Capture User Input
    $(document).on("click", "button", function(event) {
        
        event.preventDefault();

        var tempName = $("#newName").val().trim();
        var name = tempName.replace(/[.]/g, '');
        
        var tempDestination = $("#newDestination").val().trim();
        var destination = tempDestination.replace(/[.]/g,' ');
        var firstTrain = $("#newFirstTrain").val().trim();
        var frequency = $("#newFrequency").val().trim();
        // Created Unique Id
        var trainId = destination + "-0" + trainCount;
        
        
        var errorMessage = validInput(name,destination,firstTrain,frequency);
        //Populate firebase if input is valid
        if( errorMessage === "" ) {
            var trainRef = firebase.database().ref(`trains/${trainId}/`);
            trainRef.set({
                dbName: name,
                dbDest: destination,
                dbFirst: firstTrain,
                dbFreq: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            })
            trainCount++;
            globalRef.update( {
                count: trainCount
            })

             //Clear Input Fields
            $("#newName").val("");
            $("#newDestination").val("");
            $("#newFirstTrain").val("");
            $("#newFrequency").val("");
            
        } else {
            alert(errorMessage);
        }
       
    });

    trainRef.on("child_added", function(childSnapshot) {
        var name = (childSnapshot.val().dbName);
        var destination = (childSnapshot.val().dbDest);
        var firstTrain = (childSnapshot.val().dbFirst);
        var frequency = (childSnapshot.val().dbFreq);
        
        
        displayNewTrain(name, destination, firstTrain, frequency);
    });

    function validInput(name, dest, first, freq) {
        if (name === "", dest === "", freq === "") {
            return "Check the name, destination, and Frequency and try again.";
        }
        else if (! moment(first, 'HH:mm').isValid()) {
            return "Check the first time format and try again.";
        } else {
            return "";
        }
    }

    function nextTrain(firstTime, frequency) {
            
        var currentTime = moment();
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        
        var diffTime = moment().diff(firstTimeConverted, 'minutes');
        
        var tRemainder = diffTime % frequency;
        
        var tMinutesTillTrain = frequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        
        return [moment(nextTrain).format("HH:mm"), tMinutesTillTrain];
    }

    function displayNewTrain(name, destination, firstTime, frequency) {
        var calcTime = nextTrain(firstTime, frequency);
        
        var nextArrival = calcTime[0];
        var minutesAway = calcTime[1];
        var newRow = `
        <tr>
            <td>${name}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>${nextArrival}</td>
            <td>${minutesAway}</td>
        </tr>
        `;
        $("table").append(newRow);
    }


    
    