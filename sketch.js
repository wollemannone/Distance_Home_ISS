var iss;
var url = "http://api.open-notify.org/iss-now.json?callback=?";

  var d1;
  var d2;
  var d3;
  var d4;
  var d5;
  var d6; 

//Scott Joseph Kelly_USA
var lat1 = 40.788611;
var lon1 =  -74.255278;

//Sergei Alexandrowitsch Wolkow_UKRAINE
var lat2 = 49.835556;
var lon2 = 36.683611;

//Mikhail Kornienko_RUSSIA
var lat3 = 53.166667;
var lon3 = 48.466667;

//Dr. Kjell Norwood Lindgren_USA_(born in Taipei, Taiwan)
var lat4 = 25.033333;
var lon4 = 121.533333;

// Oleg Kononenko_RUSSIA_(Tukmenistan)
var lat5 = 39.085833;
var lon5 = 63.579444;

//Kimiya Yui_JAPAN_()
var lat6 = 36.25;
var lon6 = 138.099722;

/**
 * getData calls the the JSONP API of open notify
 */
function getData(data) {
  iss = data;
}
/**
 * just to see the date
 * taken from
 * http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
 */
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

$(document).ready(function() {
  console.log("ready!");
  // var counter = 0;
  var timer = setInterval(function() {
    console.log('update sessionStorage from open notify API');
    $.getJSON(url, function(data) {
      // localStorage
      sessionStorage.setItem('data', JSON.stringify(data));
      // iss = data;
    });
  }, 5000);
});

function setup() {

colorMode(HSL,100,100,100);

 
  console.log('We received the data from the ISS location via a jsonp callback');
  console.log(timeConverter(iss.timestamp)); // log the time
  
 
  var canvas = createCanvas(800,600); // draw the canvas
  canvas.parent('sketch');
 

}

function draw() {


  var lat = iss.iss_position.latitude; // get lat of the current position
  var lon = iss.iss_position.longitude;// get lat of the current position
  

      
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }
  
 d1 = getDistanceFromLatLonInKm(lat,lon,lat1,lon1);
 d2 = getDistanceFromLatLonInKm(lat,lon,lat2,lon2);
 d3 = getDistanceFromLatLonInKm(lat,lon,lat3,lon3);
 d4 = getDistanceFromLatLonInKm(lat,lon,lat4,lon4);
 d5 = getDistanceFromLatLonInKm(lat,lon,lat5,lon5);
 d6 = getDistanceFromLatLonInKm(lat,lon,lat6,lon6);

  console.log(d1,d2,d3,d4,d5,d6);

  
// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula


background(212,71,28,50);
noFill();
stroke(0,0,100,100);
var h = height/2;
var w = width/2;
text(timeConverter(iss.timestamp),400,550);
ellipse(w,h,d1/50,d1/50 );
ellipse(w,h,d2/50,d2/50 );
ellipse(w,h,d5/50,d5/50 );
ellipse(w,h,d4/50,d4/50 );
ellipse(w,h,d5/50,d5/50 );
ellipse(w,h,d6/50,d6/50 );
// line(width/2,height/2,d6/200,height/2);
// line(width/2,height/2+50,d5/200,height/2+50);


}