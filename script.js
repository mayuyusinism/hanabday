import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDKgN7yxndgUzkTxbpigmMmr_iPFXIzc0Y",
  authDomain: "mayuyusinism.github.io",
  projectId: "hana-sbday",
  storageBucket: "hana-sbday.firebasestorage.app",
  messagingSenderId: "137429702000",
  appId: "1:137429702000:web:0e2ac224b3ca846b3bebb5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const text = `chúc Hana một tuổi mới thật hạnh phúc và bình yên.  
mong rằng ở Đài từng ngày của chị đều có những điều nhỏ xíu nhưng tuyệt vời làm chị mỉm cười.

em biết hành trình du học không phải lúc nào cũng dễ dàng,  
nhưng em mong chị sẽ luôn mạnh mẽ, vững vàng và tin vào chính mình như cách chị đã luôn cố gắng đến bây giờ. 

cảm ơn Hana vì rất nhiều điều <33`;


let i = 0;
let typingTimeout;

function typeWriter(){
const el = document.getElementById("typingText");
if(!el) return;

if(i < text.length){
el.innerHTML += text.charAt(i);
i++;
typingTimeout = setTimeout(typeWriter, 30);
}
}



function openLetter(){

const envelopeContainer = document.getElementById("envelope");
if(!envelopeContainer) return;

const envelope = envelopeContainer.querySelector(".envelope");


i = 0;
clearTimeout(typingTimeout);

const textEl = document.getElementById("typingText");
if(textEl) textEl.innerHTML = "";


envelopeContainer.classList.add("show");


setTimeout(()=>{
if(envelope){
envelope.classList.add("open");
}
},200);


setTimeout(()=>{
typeWriter();
},800);


confetti();
}



document.addEventListener("click", function(e){

const envelopeContainer = document.getElementById("envelope");
if(!envelopeContainer) return;

const envelope = envelopeContainer.querySelector(".envelope");

if(!envelopeContainer.classList.contains("show")) return;

if(!e.target.closest(".envelope") && !e.target.closest("button")){

envelopeContainer.classList.remove("show");

if(envelope){
envelope.classList.remove("open");
}

i = 0;
clearTimeout(typingTimeout);

const textEl = document.getElementById("typingText");
if(textEl) textEl.innerHTML = "";

}
});



function confetti(){

for(let j = 0; j < 80; j++){

let div = document.createElement("div");
div.classList.add("confetti");

div.style.left = Math.random() * 100 + "vw";
div.style.animationDuration = (Math.random() * 3 + 2) + "s";

document.body.appendChild(div);

setTimeout(()=>{
div.remove();
},5000);
}
}



function goToPage2(){
const book = document.querySelector(".book");
if(book){
book.classList.add("flipped");
}
}



function createNote(text){
const div = document.createElement("div");
div.className = "note";
div.innerText = text;

div.onclick = () => {
alert(text);
};

document.getElementById("notesContainer").appendChild(div);
}



async function submitNote(){

const input = document.getElementById("noteInput");
if(!input) return;

const text = input.value;
if(!text) return;

await addDoc(collection(db, "notes"), {
content: text
});

createNote(text);

input.value = "";
}



async function loadNotes(){

const container = document.getElementById("notesContainer");
if(!container) return;

container.innerHTML = "";

const querySnapshot = await getDocs(collection(db, "notes"));

querySnapshot.forEach(doc => {
createNote(doc.data().content);
});
}

loadNotes();
window.openLetter = openLetter;
window.goToPage2 = goToPage2;
window.submitNote = submitNote;
document.body.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  music.play().catch(() => {});
}, { once: true });
function goBack() {
  document.querySelector(".book").classList.remove("flipped");
}
window.goBack = goBack;
setInterval(()=>{
  const sparkle = document.createElement("div");
  sparkle.className = "confetti";
  sparkle.style.left = Math.random()*100 + "vw";
  sparkle.style.animationDuration = (Math.random()*3+2)+"s";
  document.body.appendChild(sparkle);

  setTimeout(()=>sparkle.remove(),5000);
},300);
setInterval(()=>{
  const sparkle = document.createElement("div");
  sparkle.className = "confetti";
  sparkle.style.left = Math.random()*100 + "vw";
  sparkle.style.animationDuration = (Math.random()*3+2)+"s";
  document.body.appendChild(sparkle);

  setTimeout(()=>sparkle.remove(),5000);
},300);
