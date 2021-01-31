let slideIndex = 0;
let pageIndex ;
let pages = document.getElementsByClassName("page");
let clickedImg;

showWelcome();
showSlides();
document.getElementsByClassName( "continue")[0].style.display = "none";
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("myslide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

 function showPage() {

   for (let i = 0; i < pages.length; i++) {
     pages[i].style.display = "none";
   }

   pages[pageIndex].style.display = "block";
   return false;
 }

function showImgPick() {
  pageIndex = 1;
  showPage();
  return false;
}

function showWelcome() {
  pageIndex = 0;
  showPage();
  return false;
}

function showPuzzlePage() {
    console.log( "here");
  pageIndex = 2;
  showPage();
  createBoard();
  return false;
}
function showPuzzlePage2() {
    console.log("here");
    pageIndex = 2;
    showPage();
    return false;
}


///////////////////////////////////////////////////////////////////////
function mark(ID) { //creates border
    let images = document.getElementsByClassName("border-pic");
    let i;


    // clear any other borders that might be set
    for ( i = 0; i < images.length; i++ ) {
       images[i].style.border = '';
    }

    // Then set the one that got clicked.
    document.getElementById(ID).style.border="10px solid white";
    clickedImg = ID;
    document.getElementsByClassName( "continue")[0].style.display = "block";
    return false;
}


//Shuffler
const selectElement = document.querySelector('.shuffle');
const result = document.querySelector('.hideButton');
result.style.display = "none"
selectElement.addEventListener('change', (event) => {
  result.style.display = "block";
});



//////////////////////////////////////
//Game
    let tiles = [];
    let num = 0;
    const emptyTile = 0;
    let immovables = [];
    let movables = [];
    let solved = false;
    let shuffleAmount = 0;
    let reset = true;
    let madeSteps = false;

    let topMargin = 5;
    for (let row = 0; row < 3; row++)
    {
        let leftMargin = 5;
        for (let column = 0; column < 3; column++)
        {
            tiles.push(
                {
                    btop: -row * 150,
                    bleft: -column * 150,
                    data: num,
                    move:
                    {
                        left: column * 150 + leftMargin,
                        top: row * 150 + topMargin,
                        row: row,
                        col: column,
                        current: num++
                    }
                });
            leftMargin += 5;
        }
        topMargin += 5;
    }


    ///////////////////////////
     ///////////////////////////
     ///////////////////////////
     ///////////////////////////
let getImmovables = function () {
    immovables = [];
    movables = [];
    let correctTiles = 0;
    for( let i = 0; i< tiles.length; i++)
    {
        console.log( "Tile"+ i + " data:" + tiles[i].data);
    }
    for (let i = 0; i < tiles.length; i++) {
        if (Math.abs(tiles[i].move.row - tiles[emptyTile].move.row) + Math.abs(tiles[i].move.col - tiles[emptyTile].move.col) !== 1)
            immovables.push(tiles[i].data);
        else
            movables.push(tiles[i].move.current);

        if (tiles[i].data === tiles[i].move.current)
            correctTiles++;
        console.log( "immovables: " +immovables);
    }
    solved = correctTiles === 9;
    if (solved && madeSteps)
    {
        let bd = document.getElementById("backdrop");
        bd.style.display = "block";
        let top = 300;
        let font = 0;
        let id = setInterval(frame, 5);

        function frame() {
            if (font === 120)
            {
                clearInterval(id);
            }
            else
            {
                top--;
                font++;
                //bd.style.top = top + "px";
                bd.style.fontSize = font + "px";
            }
        }
    }
}

    let isMovable = function (index)
    {
        return movables.includes(tiles[index].move.current);
    }

    //  select shuffle
document.getElementById('shuffle').addEventListener('change', function (e) {
    shuffleAmount = Number.parseInt(e.target.value);
    document.getElementsByClassName("hideButton")[0].style.display = "";
});

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    let animationComplete = true;
    let animation = false;
     function createBoard()
    {
        document.getElementsByClassName("ul").innerHTML = "";
        const div = document.getElementById("ul");
        for ( let i = 1; i < tiles.length; i++) {
            let li = document.createElement("li");
            li.id = tiles[i].data;
            li.style.background = "url(../pics/img" + clickedImg + "jpg) no-repeat";
            li.style.backgroundPosition =  tiles[i].bleft + "px " + tiles[i].btop + "px";
            li.style.top = tiles[i].move.top + "px";
            li.style.left = +tiles[i].move.left + "px";
            li.className = "correct";
            li.onclick = tileClick;
            div.appendChild(li);
        }
        return  false;
    }

     getImmovables();



function setClass(index)
    {

        let li = document.getElementById(index);

        if (tiles[index].data === tiles[index].move.current)
        {

            li.className = "correct";
        }
        else
            li.className = "incorrect";
    }

async function shuffle(){
    let num = -1;
    let c = shuffleAmount;
    changeOpacity(1);
    animationComplete = true;
    let time;
    if( shuffleAmount === 3)
    {
        time = 1;
    }
    else
    {
        time = 10;
    }

    while (c > 0)
    {
        let rand;

        do {
            rand = Math.floor(Math.random() * 9);

        } while (num === rand || !isMovable(rand));

        num = rand;
                if (isMovable(num) && animationComplete) {
                    let li = document.getElementById(num);
                    let top = parseInt(li.style.top || 0, 10);
                    let left = parseInt(li.style.left, 10);
                    let id = setInterval(frame, 3);

                    function frame()
                    {
                        if (top === tiles[emptyTile].move.top && left === tiles[emptyTile].move.left) {
                            clearInterval(id);
                            let temp = tiles[li.id].move;
                            tiles[li.id].move = tiles[emptyTile].move;
                            tiles[emptyTile].move = temp;
                            setClass(li.id);
                            getImmovables();
                            animationComplete = true;
                            madeSteps = true;


                        } else {
                            console.log( "here");
                            animationComplete = false;
                            //Check if on the left
                            if (tiles[emptyTile].move.left > left) {
                                //Move right
                                left++;
                                li.style.left = left + 'px';
                            } else if (tiles[emptyTile].move.left < left) {
                                left--;
                                li.style.left = left + 'px';
                            }

                            //Check if on top
                            else if (tiles[emptyTile].move.top > top) {
                                //Move right
                                top++;
                                li.style.top = top + 'px';
                            } else {
                                top--;
                                li.style.top = top + 'px';
                            }

                        }
                    changeFrame();
                    }
                } else {
                    //changeOpacity(0.5);
                }
        await new Promise(resolve => setTimeout(resolve, 1000));
        c--;
        }
        animation = true;
}




function  play()
{

     document.getElementsByClassName("shuffle")[0].style.display = "none";
     document.getElementsByClassName("for-shuffle")[0].innerHTML= "Solve the puzzle now";
     document.getElementsByClassName("hideButton")[0].style.display = "none";
     shuffle();
     solved = false;
}



function changeOpacity( opacity)
{

    console.log( immovables);
    console.log( "animation" + animation);
        for (let i = 0; i < immovables.length; i++) {
            if (tiles[i].data !== 0 && !solved && animation ) {
                document.getElementById(immovables[tiles[i].data]).style.opacity = opacity;
            }
    }
}

function changeFrame()
{
    for( let i = 0; i < tiles.length; i++)
    {
        if( tiles[i].data !== 0)
        {
            if ( tiles[i].data === tiles[i].move.current)
                document.getElementById(tiles[i].data).style.border = "3px solid #86e225";
            else {
                document.getElementById(tiles[i].data).style.border = "3px solid #d23535";
            }
        }
    }
}

function  tileClick( clicked)
{
    let li = document.getElementById( this.id);
                if( movables.includes(tiles[this.id].move.current) && !solved && animationComplete)
                {
                    let top = parseInt(li.style.top || 0, 10);
                    let left = parseInt(li.style.left, 10);
                    let id = setInterval(frame, 3);

                    function frame()
                    {
                        if (top === tiles[emptyTile].move.top && left === tiles[emptyTile].move.left) {
                            clearInterval(id);
                            let temp = tiles[li.id].move;
                            tiles[li.id].move = tiles[emptyTile].move;
                            tiles[emptyTile].move = temp;
                            setClass(li.id);
                            changeOpacity(1);
                            getImmovables();
                            changeOpacity(0.5);
                            animationComplete = true;
                            madeSteps = true;

                        } else {
                            animationComplete = false;
                            //Check if on the left
                            if( tiles[emptyTile].move.left > left )
                            {
                                //Move right
                                left++;
                                li.style.left = left + 'px';
                            }
                            else if ( tiles[emptyTile].move.left < left)
                            {
                                left--;
                                li.style.left = left + 'px';
                            }

                            //Check if on top
                            else if( tiles[emptyTile].move.top > top )
                            {
                                //Move right
                                top++;
                                li.style.top = top + 'px';
                            }
                            else
                            {
                                top--;
                                li.style.top = top + 'px';
                            }

                        }
                        changeFrame();
                    }
                }
}

////////////////////////////////////
////////////////////////////////
////To restart

document.onkeydown = fkey;
function fkey(e)
{
    if (e.keyCode === 116) {
        e.preventDefault();
        solved = true;
        document.getElementById("backdrop").style.display = "none";
        document.getElementsByClassName("shuffle")[0].style.display = "block";
        document.getElementsByClassName("for-shuffle")[0].innerHTML= "Choose shuffle";
        document.getElementsByClassName("hideButton")[0].style.display = "block";
        showPuzzlePage2();
        madeSteps = false;
        animation = false;
        getImmovables();
        //changeOpacity(0.5);
    }
}