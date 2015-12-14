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

 
  console.log('We received the data from the ISS location via a jsonp callback');
  console.log(timeConverter(iss.timestamp)); // log the time
  
 
  var canvas = createCanvas(800,600); // draw the canvas
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
astro1.d = getDistanceFromLatLonInKm(lat,lon,astro1.lat,astro1.lon);
astro2.d = getDistanceFromLatLonInKm(lat,lon,astro2.lat,astro2.lon);
astro3.d = getDistanceFromLatLonInKm(lat,lon,astro3.lat,astro3.lon);
astro4.d = getDistanceFromLatLonInKm(lat,lon,astro4.lat,astro4.lon);
astro5.d = getDistanceFromLatLonInKm(lat,lon,astro5.lat,astro5.lon);
astro6.d = getDistanceFromLatLonInKm(lat,lon,astro6.lat,astro6.lon);


  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  function lineAtAngle(x1, y1, length, angle) {

 line(x1, y1,x1 + length * Math.cos(angle),y1 + length * Math.sin(angle)); 
}
function astroEllipse(x1, y1, length, angle) {

  ellipse(x1 + length * Math.cos(angle),y1 + length * Math.sin(angle),25,25); 
}
  // console.log(astro1);
  // console.log(astro2);

background(0);
noFill();
stroke(0,0,100,100,20);
var h = height/2;
var w = width/2;
text(timeConverter(iss.timestamp),w,550);


function line_ellipse (radiant,angle){

col = map(radiant,10,400,20,100);
  stroke(70, 70,col);

fill(0,0,10,10);
ellipse(w,h,radiant*2,radiant*2);
lineAtAngle(w,h,radiant,radians(angle));
fill(0,0,100,col);
astroEllipse(w,h, radiant, radians(angle));

console.log(radiant);

}

line_ellipse (astro1.d/50,300);
line_ellipse (astro2.d/50,0);
line_ellipse (astro3.d/50,60);
line_ellipse (astro4.d/50,120);
line_ellipse (astro5.d/50,180);
line_ellipse (astro6.d/50,240);





}