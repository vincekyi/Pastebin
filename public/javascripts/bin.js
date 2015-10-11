var myFirebaseRef = new Firebase("https://popping-inferno-8464.firebaseio.com/");

var content = myFirebaseRef.child('bin/testbin/content');

content.on("value", function(snapshot) {
  $( '#content' ).val(snapshot.val());  // Alerts "San Francisco"
});

$( '#content' ).on('keyup', function(event) {
    content.set($( '#content' ).val());
});
