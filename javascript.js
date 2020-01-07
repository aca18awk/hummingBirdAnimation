/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~Aleksandra Kulbaka~~~~~~*/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~~~~~functions~~~~~~~~~*/

//clears all canvas
function clear() 
{  
    context.clearRect(0,0,1200,600);
}

//draws the pictures of the hummingbird. Size is constant
//(that's why is mainly to draw the hummingbird), but we can change the location and the id of the image. 
function img (context,id,x,y)
{
    var img = document.getElementById(id);
    context.drawImage(img,x,y,200,150);
}

//stops the animation
function stop()
{
	if (requestId){
		cancelAnimationFrame(requestId);
		requestId=false;
	}
}

/*****************************/
/********clear button*********/

//stops any animations, clears canvas and display initial picture of a bird
function begin ()
{	
	//if its value=0, program displays the green bird
    colourful=0;
    stop();
    clear();
    img(context,"img",500,225);	
}

/*****************************/
/********colour button********/

//changes colour of the bird until user presses 'clear' button
function colour()
{  
	//if its value=1, program displays the pink bird.
	colourful+=1;
	//if there is no animation, pressing this button causes reset of the position of the bird. If button has been already pressed before, nothing will happen
	//because we do not have to change anything
    if ((!requestId)&&(colourful==1)){
		clear();
		img(context,"img5",500,225);
	}
}

/*****************************/
/********tree animation*******/
//for making animation frame I used code from the lectures
//animations frame is the same for all animations, that is why I described only the first one in detail

//stops any animations, clears canvas and sets the initial parameters of the animation
function initial_state_treeAnim()
{	
	stop();
	clear();
	//starts at the centre of the canvas
    x=500;
    y=225;
    dx = 3;
    dy = 1.5;
	if (colourful==0)
		picture="img";
	else
		picture="img5";	
}

//changes parameters of the displayed image after every execution of draw
function update_treeAnim()
{ 
	//hummingbird flies to the right bottom corner
	x += dx;
	y += dy;
	//Displays green hummingbird
	if (colourful==0){
		//changes images in the animation (algorithm of wings motion that causes the most relevant appearance of bird:
		//1 image displayed 4 times in the row, the other only once) 
		if (interation%5==0)
			picture="img2";
		else
			picture="img";  
	}
	//Displays pink hummingbird
	else{
		if (interation%5==0)
			picture="img6";
		else
			picture="img5";
	}
	
	//stops bird on the branch
	if (x>=990)
	stop();
}

//draws both images of bird and the tree(img15) and clears the old ones (before drawing) 
function draw_treeAnim()
{
	context.clearRect(x-1,y-1,200,150);
	img(context,picture,x,y); 
	img(context,"img15",1000,450);
}

function nextFrame_treeAnim()
{
  requestId = requestAnimationFrame(nextFrame_treeAnim);
  update_treeAnim();
  draw_treeAnim();
  //causes a change of the image (animation of flying), because interation increases after every execution of nextFrame, so after every draw() and update()
  interation+=1;
}

function start_treeAnim()
{
  draw_treeAnim();
  nextFrame_treeAnim();
}

//runs the animation
function treeAnim ()
{
    initial_state_treeAnim();
    start_treeAnim();
}

/*****************************/
/******flower animation*******/

function initial_state_flowerAnim()
{
	stop();
	clear();
    x=500;
    y=225;
    dx = 3;
    dy = 0.6;
	if (colourful==0)
		picture="img";
	else
		picture="img5";
		
	img(context,"img12",1000,0);
}

function update_flowerAnim()
{
	//hummingbird flies to the right top corner
	if (x<=950){
		x += dx;
		y-=dy;
		if (colourful==0){
			if (interation%5==0)
				picture="img";
			else
				picture="img2";  
		}
		else{
			if (interation%5==0)
				picture="img5";
			else
				picture="img6";
		}
	}
	//when the bird is in the corner, he stops locomoting, but still moves his wings and he changes position of his head (displaying of the new images)
	else{
		x=x;
		y=y;
		if (colourful==0){
			if (interation%5==0)
				picture="img13";
			else
				picture="img14";  
			}
		else{
			if (interation%5==0)
				picture="img16";
			else
				picture="img17";
		}
	}      
}

function draw_flowerAnim()
{
	context.clearRect(x-1,y-1,200,150);
	img(context,picture,x,y); 
	img(context,"img12",1000,0);
}

function nextFrame_flowerAnim()
{
  requestId = requestAnimationFrame(nextFrame_flowerAnim);
  update_flowerAnim();
  draw_flowerAnim();
  interation+=1;
}

function start_flowerAnim()
{
  draw_flowerAnim();
  nextFrame_flowerAnim();
}

function flowerAnim ()
{
    initial_state_flowerAnim();
    start_flowerAnim();
}

/*****************************/
/************flying***********/

function initial_state_flyingAnim()
{	
	stop();
	clear();
    x=500;
    y=225;
	if (colourful==0)
		picture="img";
	else
		picture="img5";
}

function update_flyingAnim()
{	
	//the bird does not locomote, but he moves his wings
	if (colourful==0){
		if (interation%5==0)
			picture="img2";
		else
			picture="img";  
	}
	else{
		if (interation%5==0)
			picture="img6";
		else
			picture="img5";
	}
}

function draw_flyingAnim()
{	
	context.clearRect(x-1,y-1,200,150);
	img(context,picture,x,y); 
}

function nextFrame_flyingAnim()
{
  requestId = requestAnimationFrame(nextFrame_flyingAnim);
  update_flyingAnim();
  draw_flyingAnim();
  interation+=1;
}

function start_flyingAnim()
{
  draw_flyingAnim();
  nextFrame_flyingAnim();
}

function flyingAnim ()
{
    initial_state_flyingAnim();
    start_flyingAnim();
}

/*****************************/
/******kitschy animation******/

//initial position of the second hummingbird
function initial_state_kitschyAnim()
{	
	stop();
    clear();
	//he starts from the right side of the canvas
    x=1200;
    y=225;
    dy=0;
    dx = 3;
	if (colourful==0)
		picture="img3";
	else
		picture="img7";
}

function update_kitschyAnim()
{	
	x -= dx;
	y-=dy;
	if (colourful==0){
		if (interation%5==0)
			picture="img4";
		else
			picture="img3";
	}
	else {
		if (interation%5==0)
			picture="img8";
		else
			picture="img7";	
	}
    if (x<=680){
	stop();
	//drawing of the heart
	var img = document.getElementById("img10");
    context.drawImage(img,390,55,650,550);
	}
}

function draw_kitschyAnim()
{	
	context.clearRect(x-1,y-1,200,150);
	img(context,picture,x,y);
	//drawing of the first hummingbird
	if (colourful==0)
		img(context,"img",500,225);
	else
		img(context,"img5",500,225);	
}

function nextFrame_kitschyAnim()
{
	requestId = requestAnimationFrame(nextFrame_kitschyAnim);
	update_kitschyAnim();
	draw_kitschyAnim();
	interation+=1;
}

function start_kitschyAnim()
{
	draw_kitschyAnim();
	nextFrame_kitschyAnim();
}

function kitschyAnim ()
{
    initial_state_kitschyAnim();
    start_kitschyAnim();
}

/*****************************/
/*******cage animation********/

function initial_state_cageAnim()
{
	stop();
	clear();
    x=500;
    y=225;
    dx = 3;
    dy = 1.5;
	if (colourful==0)
		picture="img";
	else
		picture="img5";
}

function update_cageAnim()
{ 
  x -= dx;
  y += dy;
	if (colourful==0){
		if (interation%5==0)
			picture="img3";
		else
			picture="img4";  
	}
	else{
		if (interation%5==0)
			picture="img7";
		else
			picture="img8";
	}
 
	if (x<=60)
        stop();
}

function draw_cageAnim()
{	
	context.clearRect(x-1,y-1,200,150);
	img(context,picture,x,y);
	//drawing of the cage
	var img2 = document.getElementById("img11");
	context.drawImage(img2,0,0,250,600);
}

function nextFrame_cageAnim()
{
	requestId = requestAnimationFrame(nextFrame_cageAnim);
	update_cageAnim();
	draw_cageAnim();
	interation+=1;
}

function start_cageAnim()
{
	draw_cageAnim();
	nextFrame_cageAnim();
}

function cageAnim ()
{
    initial_state_cageAnim();
    start_cageAnim();
}

/*****************************/
/*******click on canvas*******/
//code from the lectures and from the exercises' solutions:

//returns the position of the mouse on canvas
function getMouseXY(e)
{
	var canvas = document.getElementById('canvas');
	var boundingRect = canvas.getBoundingClientRect();
	var offsetX = boundingRect.left;
	var offsetY = boundingRect.top;
	var w = (boundingRect.width-canvas.width)/2;
	var h = (boundingRect.height-canvas.height)/2;
	offsetX += w;
	offsetY += h;
	var mx = Math.round(e.clientX-offsetX);
	var my = Math.round(e.clientY-offsetY);
	return {x: mx, y: my};
}

//does something, when user clicks on the specified parts of the canvas
function doSomething(evt) 
{
	var pos = getMouseXY(evt);
	//when user clicks on the left part of the canvas, cageAnim() will be executed
	if ((pos.x<300))
		cageAnim();
	//when user clicks on the bottom right corner of the canvas, treeAnim() will be executed
	else if ((pos.x>900)&&(pos.y>300))
		treeAnim();
	//when user clicks on the top right corner of the canvas,flowerAnim() will be executed
	else if ((pos.x>900)&&(pos.y<300))
		flowerAnim();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~~~main program~~~~~~~~*/

// program makes use of the following global variables
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var requestId;
//counter of the iterations of the animation
var interation=0;
//variable used to change the colour of the hummingbird
var colourful=0;

//buttons
var clear_button = document.getElementById("clear_button");
clear_button.addEventListener("click",begin);

var colour_button = document.getElementById("colour_button");
colour_button.addEventListener("click", colour);

var fly_button = document.getElementById("fly_button");
fly_button.addEventListener("click",flyingAnim);

var kitschy_button = document.getElementById("kitschy_button");
kitschy_button.addEventListener("click",kitschyAnim);

canvas.addEventListener('click', doSomething); 

//draws hummingbird
begin();
