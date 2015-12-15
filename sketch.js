var iss;
var url = "http://api.open-notify.org/iss-now.json?callback=?";
var tick = 0; 
var lon = 0;
var lat = 0;
var d;


var astro1 = {//Scott Joseph Kelly_USA
    lat : 40.788611,
    lon :  -74.255278
};
var astro2 = {//Kimiya Yui_JAPAN_()
lat: 36.25,
lon: 138.09972
};
var astro3 = {//Sergei Alexandrowitsch Wolkow_UKRAINE
lat: 49.835556,
lon: 36.683611
};
var astro4 = {//Mikhail Kornienko_RUSSIA
lat: 53.166667,
lon: 48.466667
};
var astro5 = {//Dr. Kjell Norwood Lindgren_USA_(born in Taipei, Taiwan)
lat: 25.033333,
lon: 121.53333
};
var astro6 = {// Oleg Kononenko_RUSSIA_(Tukmenistan)
lat: 39.085833,
lon: 63.579444
};

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

colorMode(HSB,100,100,100,100);

 home = loadImage('love.png');
 star = loadImage('clearnight.png');
  console.log('We received the data from the ISS location via a jsonp callback');
  console.log(timeConverter(iss.timestamp)); // log the time
  
 
  var canvas = createCanvas(800,800); // draw the canvas
  canvas.parent('sketch');
}

function draw() {



  if (tick % 500 === 0) {
    iss = JSON.parse(sessionStorage.getItem('data')); // get the data from storage
    console.log(iss); // just to prof that we have data
    // so when we got the data we can
    // grab lat/lon from it and draw our marker
    if (iss !== null) {
      lat = iss.iss_position.latitude; // get lat of the current position
      lon = iss.iss_position.longitude; // get lat of the current position
    }
  }
  tick++;// tick tock some time has passed

// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
      
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

  // add distance_home to astro (oobject)
astro1.d = getDistanceFromLatLonInKm(lat,lon,astro1.lat,astro1.lon)+400;
astro2.d = getDistanceFromLatLonInKm(lat,lon,astro2.lat,astro2.lon)+400;
astro3.d = getDistanceFromLatLonInKm(lat,lon,astro3.lat,astro3.lon)+400;
astro4.d = getDistanceFromLatLonInKm(lat,lon,astro4.lat,astro4.lon)+400;
astro5.d = getDistanceFromLatLonInKm(lat,lon,astro5.lat,astro5.lon)+400;
astro6.d = getDistanceFromLatLonInKm(lat,lon,astro6.lat,astro6.lon)+400;


  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

var h = height/2;
var w = width/2;

  function lineAtAngle( dist, angle) {

 line(w, h,w + dist * Math.cos(angle),h + dist * Math.sin(angle)); 

}
function astroEllipse( dist, angle) { 
  fill(0);
  ellipse(w + dist * Math.cos(angle),h + dist * Math.sin(angle),12,12); 


}

function line_ellipse_astro (dist,angle){

col1 = map(dist,50,18000/50,160,0);
noFill();
stroke(col1, 70,70,70);
ellipse(w,h,dist*2,dist*2);
lineAtAngle(dist,radians(angle));
astroEllipse( dist, radians(angle));

// console.log(dist);

}
image(star,0,0);
noStroke();
textSize(75);
fill(0,0,100,20);
textAlign(CENTER);
text(timeConverter(iss.timestamp),w,780);

line_ellipse_astro (astro1.d/50,300);
line_ellipse_astro (astro2.d/50,0);
line_ellipse_astro (astro3.d/50,60);
line_ellipse_astro (astro4.d/50,120);
line_ellipse_astro (astro5.d/50,180);
line_ellipse_astro (astro6.d/50,240);


if (astro1.d/50 < 50 || astro2.d/50 < 50 || astro3.d/50 < 50 || astro4.d/50 < 50 || astro5.d/50 < 50 || astro6.d/50 < 50){
  fill(0);
  ellipse(w,h,35,35);
  image(home,w-12.5,h-10);
 
}else{
 fill(0);
 ellipse(w,h,35,35);
}


console.log(astro1.d,'astro1');
console.log(astro2.d,'astro2');
console.log(astro3.d,'astro3');
console.log(astro4.d,'astro4');
console.log(astro5.d,'astro5');
console.log(astro6.d,'astro6');
}
