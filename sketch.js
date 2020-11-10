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

}


function setup() {
    createCanvas(1000, 1000);
}

function draw() {
    background(220);
    image(sky1, 0, 0, 250, 250);
    image(sky2, 250, 0, 250, 250);
    image(sky3, 500, 0, 250, 250);
    image(sky4, 750, 0, 250, 250);
    image(sky5, 0, 250, 250, 250);
    image(sky6, 250, 250, 250, 250);
    image(sky7, 500, 250, 250, 250);
    image(sky8, 750, 250, 250, 250);
    image(sky9, 0, 500, 250, 250);
    image(sky10, 250, 500, 250, 250);
    image(sky11, 500, 500, 250, 250);
    image(sky12, 750, 500, 250, 250);
    image(sky13, 0, 750, 250, 250);
    image(sky14, 250, 750, 250, 250);
    image(sky15, 500, 750, 250, 250);
    image(sky16, 750, 750, 250, 250);
    
    let theta = atan2(mouseY - height / 2, mouseX - width / 2);
    
    let ballX = map(cos(theta), -1, 1, 0, width);
    let ballY = map(sin(theta), -1, 1, 0, height);
    
    if (ballX < width/2 && ballY < height/2) {
        sunset();
    } else if (ballX < width/2 && ballY > height/2) {
        raining();        
    }
    
    frame();
    
    //little controller;

  
    noStroke();
    fill(220, 220, 120);
    circle(ballX, ballY, 25);
}


function sunset() {
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


function raining() { 
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