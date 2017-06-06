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
var playerOneGuess;
var playerTwoGuess;
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
    
    $('#playerOneOptions').show();

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
  $("#watchers").html(snap.numChildren());
});


// Game Rules
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