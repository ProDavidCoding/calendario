
var speech = false;
let transcript;
let synth = speechSynthesis,
isSpeaking = true;

click_to_record.addEventListener('click',function(){
    if(speech == true) {
        speech = true;
        window.SpeechRecognition = window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', e => {

            if(speech == true) {

                transcript = Array.from(e.results)

                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')

                    document.getElementById("calendario_response").innerHTML = "asjdnjasnd";
            }

        });
        
        if (speech == true) {
            recognition.start();
        } else {
            recognition.stop();
        }
    }
})

function endSpeech() {

    if(speech == true) {

        speech = false;

    } else {

        speech = true;
    }

}

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

function toggleVoice(res) {

    if(res !== ""){
        if(!synth.speaking){
            textToSpeech(res);
        }
        if(res.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){

                    isSpeaking = true;

                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;

            }else{
                synth.pause();
                isSpeaking = true;

            }
        }
    }
}

//THIS IS FOR CHATBOT RESPONSE
 
document.getElementById('click_to_record').addEventListener("click", async (e) => {
    e.preventDefault();

    if(speech == false) {
 
        var req = transcript;
    
        if (req == undefined || req== "") {
    
        }
        else{
        
            let res = "Sorry, I didn't understand that, could you say it again?";

            const req_array = req.split(" ");

            //KEYWORDS:
            const greetings = ['hello', 'hey', 'morning', 'evening', 'night', 'day']
            const greetings_response = ['Hey there!', 'Great to see you again!', 'How have you been doing?'];

            const status = ['doing', 'up']
            const status_response = ['I\'m doing great! How about you?', 'I\'ve been doing very well. How about you', 'Great, thank you. How have you been doing?'];

            const response_to_status = ['I\'m', 'fine', 'good']
            const response_to_status_array = ['Good to hear!', 'Great!', 'Awsome'];

            const sad = ['sad', 'misreable', 'distraught', 'unhappy']
            const sad_response = ['I\'m sorry for that. I\'ll tell you a joke to cheer you up. What car does an egg ride? A yolkswagen.'];

            const joke = ['joke', 'tell']
            const joke_response = ['Here is a good one. What car does an egg ride? A yolkswagen.'];

            if(findCommonElement(req_array, greetings)) {
                res = greetings_response[Math.floor(Math.random() * greetings_response.length)];
            }

            if(findCommonElement(req_array, status)) {
                res = status_response[Math.floor(Math.random() * status_response.length)];
            }

            if(findCommonElement(req_array, response_to_status)) {
                res = response_to_status_array[Math.floor(Math.random() * response_to_status_array.length)];
            }

            if(findCommonElement(req_array, sad)) {
                res = sad_response[Math.floor(Math.random() * sad_response.length)];
            }

            if(findCommonElement(req_array, joke)) {
                res = joke_response[Math.floor(Math.random() * joke_response.length)];
            }

            document.getElementById("calendario_response").innerHTML = res;

            toggleVoice(res);

        }

    }
 
});

function findCommonElement(array1, array2) {
     
    for(let i = 0; i < array1.length; i++) {
         
        for(let j = 0; j < array2.length; j++) {
             
            if(array1[i] === array2[j]) {

                return true;
            }
        }
    }

    return false;
}