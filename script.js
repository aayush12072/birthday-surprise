const progressBar = document.getElementById("progressBar");
const slideContainer = document.getElementById("slideContainer");
const memoryContainer = document.getElementById("memoryContainer");
const bgMusic = document.getElementById("bgMusic");
const flipSound = document.getElementById("flipSound");

let step = 0;
let prankClicks = 0;

function setProgress(p){
  progressBar.style.width = p + "%";
}

function startMusic(){
  bgMusic.play().catch(()=>{});
}

const slides = [
  { text:"Did you really think I'd keep this simple?", options:["Of course not","Maybe"] },
  { text:"Do you remember how we started?", options:["Yes","Remind me"] },
  { text:"Did you think we'd become this?", options:["Yes","No"] },
  { text:"Congratulations. You've unlocked it.", options:["Finally","That was easy"] },
  { text:"Haha got you. You are only 50% of the way in. Don’t rely on progress bars. Rely on your boyfriend.", options:["Continue","You're annoying"] },
  { text:"Ready to unlock the memories?", options:["Yes","Let's go"] }
];

function renderSlide(){
  slideContainer.innerHTML = "";
  const h = document.createElement("h3");
  h.innerText = slides[step].text;
  slideContainer.appendChild(h);

  slides[step].options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=>{
      startMusic();
      nextStep();
    };
    slideContainer.appendChild(btn);
  });
}

function nextStep(){
  step++;

  if(step===4){ setProgress(100); }
  else if(step===5){ setProgress(50); }
  else if(step===6){ setProgress(75); startGame(); return; }
  else setProgress(step*20);

  if(step<6) renderSlide();
}

function startGame(){
  slideContainer.classList.add("hidden");
  memoryContainer.classList.remove("hidden");

  const images = [
    "assets/img1.jpg","assets/img2.jpg","assets/img3.jpg",
    "assets/img4.jpg","assets/img5.jpg","assets/img6.jpg",
    "assets/img7.jpg","assets/img8.jpg","assets/img9.jpg",
    "assets/img10.jpg","assets/img11.jpg","assets/img12.jpg"
  ];

  let cards = [...images,...images].sort(()=>0.5-Math.random());
  const grid = document.createElement("div");
  grid.className="memory-grid";

  let first=null,second=null,lock=false,match=0;

  cards.forEach(src=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <div class="card-inner">
        <div class="card-face card-front"></div>
        <div class="card-face card-back">
          <img src="${src}">
        </div>
      </div>
    `;

    card.onclick=()=>{
      if(lock||card.classList.contains("flipped"))return;
      flipSound.play();
      card.classList.add("flipped");

      if(!first) first=card;
      else{
        second=card;
        if(first.querySelector("img").src===second.querySelector("img").src){
          match++; first=null; second=null;
          if(match===images.length){
            setTimeout(finalReveal,700);
          }
        } else {
          lock=true;
          setTimeout(()=>{
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            first=null; second=null; lock=false;
          },800);
        }
      }
    };
    grid.appendChild(card);
  });

  memoryContainer.appendChild(grid);
}

function finalReveal(){
  setProgress(100);
  memoryContainer.innerHTML="<h3>Happy Birthday ❤️</h3>";
  const btn=document.createElement("button");
  btn.innerText="Go to the surprise";
  btn.classList.add("move-btn");

  btn.onclick=()=>{
    prankClicks++;
    if(prankClicks===1){
      btn.innerText="Haha got you the first time.";
      btn.style.transform="translate(150px,-80px)";
    }
    else if(prankClicks===2){
      btn.innerText="Even though you don’t drink – are you drunk?";
      btn.style.transform="translate(-120px,100px)";
    }
    else if(prankClicks===3){
      btn.innerText="Okay okay – before you get mad – here it is.";
      btn.style.transform="translate(0px,-150px)";
    }
    else{
      window.location.href="https://www.instagram.com/reel/REEL_ID_HERE/";
    }
  };

  memoryContainer.appendChild(btn);
}

renderSlide();
