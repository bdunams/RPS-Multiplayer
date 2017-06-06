// Rock Paper Scissors Game
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfdmMeRdHOipDeg5Mu155JKZLbGnlG0Ik",
  authDomain: "rock-paper-scissors-5717f.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-5717f.firebaseio.com",
  projectId: "rock-paper-scissors-5717f",
  storageBucket: "rock-paper-scissors-5717f.appspot.com",
  messagingSenderId: "618025177570"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;
var playerOneName = '';
var playerTwoName = '';
var playerOneGuess;
var playerTwoGuess;
var turn = 1;
var ties;
var wins;
var losses;

// --------------------------------------------------------------

$('#playerOneOptions').hide();
$('#playerTwoOptions').hide();


// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  if(snap.numChildren() > 0){
    $('#playerOneOptions').show();
    $('#gameStatus').html('<p>Waiting on player two</p>');
  }
  if(snap.numChildren() === 2){
    $('#playerTwoOptions').show();
    $('#gameStatus').html('<p>Both players ready</p>');
  }
  
  console.log(snap.child(1))
  console.log(snap.numChildren())
  
});

$('.options').on('click', function(){
  $(this).addClass('btn-danger').removeClass('btn-primary');
  turn++;
})

$('#add-player').on('click', function(event){
  event.preventDefault();
  
  if(playerOneName === ''){
    playerOneName = $('#name-input').val();
    database.ref('players').push().update({
      name: playerOneName
    })
  }
  else if(playerTwoName === ''){
    playerTwoName = $('name-input').val();
    database.ref('players').push().update({
      name: playerTwoName
    })
  }
  
  
})

// Create Firebase "watcher" Hint: .on("value")
database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());
  
  database.ref().update({
    turns: turn
  })

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});



// Game Rules
function results(){
  
  if (playerOneGuess === playerTwoGuess){
    ties+=1;
    //alert('Its a tie');
  }
  else if(playerOneGuess === 'p'){
    if(playerTwoGuess === 'r'){
      wins+=1;
      alert('paper beats rock');
    }
    else{
      losses+=1;
      alert('player losses');
    }
  }

  else if(playerOneGuess === 's'){
    if(playerTwoGuess === 'p'){
      wins+=1;
      alert('scissors beat paper');
    }
    else{
      losses+=1;
      alert('player losses');
    }
  }

  else if(playerOneGuess === 'r'){
    if(playerTwoGuess === 's'){
      wins+=1;
      alert('rock beats scissors');
    }
    else{
      losses+=1;
      alert('player losses');
    }
  }
}
