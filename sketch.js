let sky1;
let sky2;
let sky3;
let sky4;
let sky5;
let sky6;
let sky7;
let sky8;
let sky9;
let sky10;
let sky11;
let sky12;
let sky13;
let sky14;
let sky15;
let sky16;
let front;
let cloud;
let sun;
let rain;
let snow;
let fps = 60;


function preload() {
    sky1 = loadImage('images/sky1.jpg');
    sky2 = loadImage('images/sky2.jpg');
    sky3 = loadImage('images/sky3.jpg');
    sky4 = loadImage('images/sky4.jpg');
    sky5 = loadImage('images/sky5.jpg');
    sky6 = loadImage('images/sky6.jpg');
    sky7 = loadImage('images/sky7.jpg');
    sky8 = loadImage('images/sky8.jpg');
    sky9 = loadImage('images/sky9.jpg');
    sky10 = loadImage('images/sky10.jpg');
    sky11 = loadImage('images/sky11.jpg');
    sky12 = loadImage('images/sky12.jpg');
    sky13 = loadImage('images/sky13.jpg');
    sky14 = loadImage('images/sky14.jpg');
    sky15 = loadImage('images/sky15.jpg');
    sky16 = loadImage('images/sky16.jpg');
    front = loadImage('images/circle.jpg');
    cloud = loadImage('images/cloudEmoji.png');
    sun = loadImage('images/sunEmoji.png');
    rain = loadImage('images/rainEmoji.png');
    snow = loadImage('images/snowEmoji.png');
}


function setup() {
    createCanvas(800, 800);
    frameRate(fps);
}


function draw() {
    background(220);
    image(sky1, 40, 30, 200, 200);
    image(sky2, 200, 0, 200, 200);
    image(sky3, 390, 0, 200, 200);
    image(sky4, 585, 50, 200, 200);
    image(sky16, 0, 205, 200, 200);
    image(sky6, 197, 200, 200, 200);
    image(sky8, 605, 220, 200, 200);
    image(sky9, 0, 398, 200, 200);
    image(sky11, 402, 399, 200, 200);
    image(sky12, 600, 401, 200, 200);
    image(sky13, 40, 595, 200, 200);
    image(sky14, 220, 599, 200, 200);
    image(sky5, 590, 590, 200, 200);
    image(sky15, 402, 596, 210, 210);
    image(sky7, 395, 197, 210, 210);
    image(sky10, 196, 400, 208, 208);
    
    let theta = atan2(mouseY - height / 2, mouseX - width / 2);
    
    let ballX = map(cos(theta), -1, 1, 0, width);
    let ballY = map(sin(theta), -1, 1, 0, height);
    
    if (ballX < width/2 && ballY < height/2) {
        sunset();
    } else if (ballX < width/2 && ballY > height/2) {
        raining();    
    } else if (ballX > width/2 && ballY > height/2) {
        snowing();
    } else if (ballX > width/2 && ballY < height/2) {
        cloudy();
    }
    
    frame();
    
    controller();;
}


//change the image that represents mouse position based on the different filter in use;
//"sunset" = sun emoji;
//"raining" = rainy emoji;
//"snowing" = snow emoji;
//"cloudy" = cloud emoji;
function controller() {
    push();
    imageMode(CENTER);
    
    let theta = atan2(mouseY - height / 2, mouseX - width / 2);
    
    let ballX = map(cos(theta), -1, 1, 0, width);
    let ballY = map(sin(theta), -1, 1, 0, height);
    
    if (ballX < width/2 && ballY < height/2) {
        image(sun, ballX, ballY, 50, 50);
    } else if (ballX < width/2 && ballY > height/2) {   
        image(rain, ballX, ballY, 50, 50);
    } else if (ballX > width/2 && ballY > height/2) {
        image(snow, ballX, ballY, 50, 50);
    } else if (ballX > width/2 && ballY < height/2) {
        image(cloud, ballX, ballY, 50, 50);
    }
    pop();
}


//the filter "sunset"; make the selected color into yellowish;
function sunset() {
    fps = 60;
    
    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width)*4;
        
            let r = pixels[index+0];
            let g = pixels[index+1];
            let b = pixels[index+2];
            let a = pixels[index+3];   
        
            if (b > 170 && r > 170 && g > 170) {
                pixels[index+0] = r + 100;
                pixels[index+1] = g + 70;
                pixels[index+2] = b - 30;
                pixels[index+3] = 255;
            } else if (b > 100){
                pixels[index+0] = 80 + r;
                pixels[index+1] = g;
                pixels[index+2] = b - 90;
                pixels[index+3] = 255;
            }
        }
    }
    updatePixels();  
}


//the filter "raining"; make the color of 1 to 10 pixels in the same column the same, giving a sense of movement;
function raining() { 
    fps = 6;
    
    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width)*4;
          
            let index2;
          
            for (let i=1; i<random(10);i++) {
                index2 = (x + (y+i) * width) * 4;
            }
        
            let r = pixels[index+0];
            let g = pixels[index+1];
            let b = pixels[index+2];
            let a = pixels[index+3];   
         
            pixels[index2+0] = r;
            pixels[index2+1] = g;
            pixels[index2+2] = b;
            pixels[index2+3] = 255;
        }
    }
    updatePixels(); 
}


//the filter "cloudy"; change the color of the pixels into different gray colors based on the brightness;
function cloudy() {
    fps = 60;
    
    loadPixels();
  	for (var x = 0; x < width; x++) {
    	for (var y = 0; y < height; y++) {
                   
            var index = (x + y * width)*4;
  
            let r = pixels[index+0];
            let g = pixels[index+1];
            let b = pixels[index+2];
            let a = pixels[index+3];    
          
            let c = color(r, b, g, a);
          
            let bright = brightness(c);
          
          
            if (bright>100) {
                pixels[index+0] = 170;
                pixels[index+1] = 175;
                pixels[index+2] = 187;
                pixels[index+3] = 200;   
            } else if (bright > 90 && bright <= 100) {
                pixels[index+0] = 202;
                pixels[index+1] = 201;
                pixels[index+2] = 200;
                pixels[index+3] = 180;  
            } else if (bright > 85 && bright <=90) {
              pixels[index+0] = 227;
                pixels[index+1] = 227;
                pixels[index+2] = 227;
                pixels[index+3] = 220;  
            } else if (bright > 80 && bright <= 85) {
                pixels[index+0] = 193;
                pixels[index+1] = 190;
                pixels[index+2] = 187;
                pixels[index+3] = 180; 
            } else if (bright > 75 && bright <= 80) {
                pixels[index+0] = 219;
                pixels[index+1] = 215;
                pixels[index+2] = 220;
                pixels[index+3] = 190; 
            } else if (bright > 70 && bright <= 75) {
                pixels[index+0] = 227;
                pixels[index+1] = 227;
                pixels[index+2] = 224;
                pixels[index+3] = 198; 
            } else if (bright > 60 && bright <= 70) {
                pixels[index+0] = 200;
                pixels[index+1] = 204;
                pixels[index+2] = 198;
                pixels[index+3] = 200; 
            } else if (bright > 55 && bright <= 60) {
                pixels[index+0] = 240;
                pixels[index+1] = 236;
                pixels[index+2] = 240;
                pixels[index+3] = 170; 
            }
            
            r = pixels[index+0];
            g = pixels[index+1];
            b = pixels[index+2];
            a = pixels[index+3]; 
          
            pixels[index+0] = r - 45;
            pixels[index+1] = g - 50;
            pixels[index+2] = b - 45;
            pixels[index+3] = 220;    
        }
    }
    updatePixels();
}


//the filter "snowing"; change the color of random pixels into white, causing visual effect of snowing;
function snowing() {
    fps = 5;
    
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          
            var index = (x + y * width)*4;
  
            let r = pixels[index+0];
            let g = pixels[index+1];
            let b = pixels[index+2];
            let a = pixels[index+3];      
          
            pixels[index+0] = r + 50;
            pixels[index+1] = g + 50;
            pixels[index+2] = b + 50;
            pixels[index+3] = 255;      
        }
    }
  
  
  	for (var i = 0; i < width; i+=floor(random(2,6))) {
    	for (var j = 0; j < height; j+=floor(random(2,5))) {
          
            let i = floor(random(width));
            let j = floor(random(0, height));
                   
            var indexSnow = (i + j * width)*4;
  
            let sr = pixels[indexSnow+0];
            let sg = pixels[indexSnow+1];
            let sb = pixels[indexSnow+2];
            let sa = pixels[indexSnow+3];      
          
            pixels[indexSnow+0] = 255;
            pixels[indexSnow+1] = 255;
            pixels[indexSnow+2] = 255;
            pixels[indexSnow+3] = 255;      
        }
    }
    updatePixels();
}


//the white circle frame; 
function frame() {    
    image(front, 0, 0, width, height);
  
    front.loadPixels();
    for (var fy = 0; fy < front.height; fy++) {
        for (var fx = 0; fx < front.width; fx++) {
            var index = (fx + fy * front.width)*4;
        
            let fr = front.pixels[index+0];
            let fg = front.pixels[index+1];
            let fb = front.pixels[index+2];
            let fa = front.pixels[index+3];   
          
            if (fr > 200 && fg < 200 && fb < 200) {
          
                front.pixels[index+3] = 0;
            }
        }
    }
    front.updatePixels();
}