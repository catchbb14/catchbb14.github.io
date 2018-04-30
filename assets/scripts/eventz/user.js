
var UserAuthentication = function() {
    
    var currentUID; 

    function saveEventCurrentUser(event) {
        console.log(event);
    }
    
    function captureInput(form) {
        var email = form.find('#user-email').val().trim();
        var password = form.find('#user-password').val().trim();
        var city = form.find('#user-city').val().trim();
        var state = form.find('#user-state').val(); 

        userApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage)
            console.log(error);
        });
        
        $('#signupModal').modal('hide');
        
    }

    function signInHandler() {
        var email = $('#signinEmail').val().trim();
        var password = $('#signinPassword').val();

        userApp.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage);
            console.log(error);
        });

        


    }

    function authStateListner() {

        userApp.auth().onAuthStateChanged( function(user) {
            //  TO BE ADDED
            // var saveEventBtn = document.getElementsByClassName('btn-save-event');
            // for (var elem = 0; elem < saveEventBtn.length; i++) {
            //     saveEventBtn[elem].toggle();
            // }
            
            
            if(user && currentUID === user.uid) {
                return;
            }
            
            if(user) {
                console.log("Current user is: " + user.email);
                currentUID = user.uid;

                writeUserData(user.uid, user.email);
                //displaySavedEvents();
                
                
            } else {
                currentUID = null;
            }
        })
    }

    function writeUserData(userID, email) {

        userApp.database().ref('users/' + userID).set({
            email: email
        })

    }

    
    
    function clickEventHandlers() {
        'use strict';
        $(document).on('click', '#submitNewUser', function(event) {
            event.preventDefault();
            captureInput($('#sign-up-form'));  
        })

        $(document).on('click', '#signinButton', function(event) {
            event.preventDefault();
            signInHandler();
        })

        $(document).on('click', '.btn-save-event', function() {

            saveEventCurrentUser($(this).parent().parent().attr("data-event-id"));
        })
    }
    
    function init() {
        clickEventHandlers();
        authStateListner();
    }

    return {
        init: init
    }

}();

UserAuthentication.init();

