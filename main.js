prediction1= '';
prediction2 = '';

mov_text = "";


Webcam.set({
    width:280,
    height:280,
    dest_width:270,
    dest_height:270,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/V2lIsZ0PW/model.json',modelLoaded)

function modelLoaded()
{
    console.log('Model is Loaded HUZZAH!')
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1;
    speak_data_2 = " And The second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utterThis.rate = 0.8;
    synth.speak(utterThis)
}

function speak_mov()
{
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(mov_text);
    utterThis.rate = 0.8;
    synth.speak(utterThis)
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        setTimeout(()=>{
            speak_mov();
        }, 1000);
        if(results[0].label == "Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128512;"
            mov_text = "Happiness is a form of courage so be happy all the time";
            document.getElementById("mov_text").innerHTML = mov_text;
        }

        if(results[0].label == "Sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128549;"
            mov_text = "Worrying doesn't empty tommorrow of its sorrows it empties today of its strengths, so don't be sad";
            document.getElementById("mov_text").innerHTML = mov_text;
        }

        if(results[0].label == "Angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128545;"
            mov_text = "Anger makes you smaller, while forgiveness forces you to grow beyond what you were so don't be a grumpy cat";
            document.getElementById("mov_text").innerHTML = mov_text;
        }

        if(results[0].label == "Funny")
        {
            document.getElementById("update_emoji").innerHTML = "&#128539;"
            mov_text = "A person must never cease striving to enjoy life so don't stop being funny";
            document.getElementById("mov_text").innerHTML = mov_text;
        }

        if(results[1].label == "Happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128512;"
        }

        if(results[1].label == "Sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128549;"
        }

        if(results[1].label == "Angry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128545;"
        }

        if(results[1].label == "Funny")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128539;"
        }
    }
}