// Function Buttons

//button menu responsive

var mq = window.matchMedia( "(max-width: 607px)" );
if(mq.matches){
document.querySelector('.text-modal').innerHTML = 'Sua pontuação fica no menu superior!';
}

$('.menu-bars').click(function(){
  $('.slide-list-hidden').slideToggle('slow');
  
})

//Button Points

document.getElementById('coin-icon').addEventListener('click', function(){
  if(document.querySelector('.content-points') != null){
    document.querySelector('.content-points').className = 'content-points-click'
}else{
  document.querySelector('.content-points-click').className = 'content-points'
}
})

//Button começar
$('#btn-startGame').click(function(){
  $('.container-instructions').fadeOut('slow');
  $('.container-game').fadeIn('slow');
})


// Button Jogar
$('#play-btn').click(function(){
  $('html, body').animate({
  scrollTop: $('#instructions').offset().top}, 'slow');
})
// Button Go header
$('.set-header-btn').click(function(){
  $('html, body').animate({
  scrollTop: $('.header').offset().top}, 'slow');
})
// Button Contato
$("#contact-btn").click(function(){
  if(document.querySelector('.nav-bar-simple-fixed') != null) {
    $("#form-contact").slideToggle();
  }else{
    $('html, body').animate({
  scrollTop: $('.footer').offset().top}, 'slow');    
  }                     
});
  



window.onscroll =  function(){
  
 
  document.querySelector('#form-contact').style.display = 'none'
  
  if(document.querySelector('.set-header-btn') != null && document.querySelector('body').scrollTop > 120){
      document.querySelector('.set-header-btn').className = 'set-header-btn-show';
    }

  if(document.querySelector('.set-header-btn-show') != null && document.querySelector('body').scrollTop < 120){
      document.querySelector('.set-header-btn-show').className = 'set-header-btn';
    }
  
  if(document.querySelector('body').scrollTop > 70 && document.querySelector('.nav-bar-simple-fixed') != null){
      document.querySelector('.nav-bar-simple-fixed').className = 'nav-bar-simple-fixed-scroll';
      document.querySelector('.slide-list-hidden').style.color='black';
    }
  
  if(document.querySelector('body').scrollTop < 70  && document.querySelector('.nav-bar-simple-fixed-scroll') != null){
      document.querySelector('.nav-bar-simple-fixed-scroll').className = 'nav-bar-simple-fixed';
    }
}



//Script Game

// Array de questões e respostas e variáveis
var questions = ['O que significa DNS, e pra que serve?', 'Qual é a porta correta do protocolo SMTP?', 'O protocolo IMAP é responsável por que ação?'],
    answers = ['Significa Domain Name System, responsável por apontar seu domínio para o seu servidor.', 'Significa Domain Name Server e é um protocolo de e-mail.', 'Significa Disk Name Space, garante a memória de seu servidor.', 'Significa Domain Name System e é o nome do seu domínio.', 'Porta 25', 'Porta 110', 'Porta 587','Porta 993','Envio de e-mails.', 'Bloqueio de Spam.', 'Recebimento de e-mails.','Subir arquivos do site.' ],
    questionText = document.querySelector('.question'),
    // startGame = document.getElementById('btn-startGame'),
    questionsLength = questions.length,
    number = 1,
    random,
    repeat= [],
    contRepeat = 0,
    questionNumber = 0,
    points = 0,
    modal = 0;

//Objeto referente a Fala GoogleTranslate
// // var msg = new SpeechSynthesisUtterance();

  //Função Acaba jogo - Reiniciar
     document.getElementById('btnRestart').addEventListener('click', function(){
        number = 1,
        random,
        repeat= [],
        contRepeat = 0,
        questionNumber = 0,
        points = 0;
       $('.container-restart').fadeOut('slow');
       $('.container-game').fadeIn('slow');
        startGame()
     })

  //Função conta questão
  function ContQuestion(){
    questionNumber++;
      // var msg = new SpeechSynthesisUtterance();
      // msg.text = 'Pergunta número : ' + questionNumber;
      // msg.lang = 'pt-BR';
      // speechSynthesis.speak(msg)
  }
  
  //Função que da início ao jogo
  function startGame(){
   
    if(modal == 0){
      document.querySelector('.modal-alert').style.display = 'block';
      document.querySelector('.content-modal').style.display = 'block';
      setTimeout(function(){
        document.querySelector('.modal-alert').style.display = 'none';
        document.querySelector('.content-modal').style.display = 'none';
      }, 3000);
      modal++;
    }
    if(document.querySelector('.content-points') != null){
    document.querySelector('.content-points').className = 'content-points-click'
}
    //Adiciona o total de ponto
     if(document.querySelector('#points-responsive') != null){
      document.querySelector('#points-responsive').innerHTML = points;
    }  
    document.querySelector('.points').innerHTML = points;
    //Perguntas radomicas 
    random = Math.floor((Math.random()* questionsLength) + 0);
      //Verifica pergunta Repita
      if(repeat.indexOf(random) != -1){
        if((contRepeat) == (questionsLength)){
          $('.container-game').fadeOut('slow');
          $('.container-restart').fadeIn('slow');
          document.querySelector('.final-points').innerHTML = points;
           }else{
        startGame()
           }
      }else{
        repeat[contRepeat] = random;
        contRepeat++;
      }    
    //Contador de número da questão  
    ContQuestion();
    document.querySelector('.number-question').innerHTML = questionNumber;
    //Apresentar Questão
    questionText.innerHTML = questions[random];
        //Fala das questões
        // msg.text = questions[random];
        // msg.lang = 'pt-BR';
        // speechSynthesis.speak(msg)
  //Fim perguntasrandomicas
  
    // Apresentar Respostas
    number = 1;
    for(var i = random * 4  ; i <= (i + 3); i++){
        var id = 'answer' + number;
        document.getElementById(id).innerHTML = answers[i];
        number++;
    }
  
} 

//Função que valida as respostas
function verifyAnswer(e){
  var click = e.target.id;
  // var msg = new SpeechSynthesisUtterance();
  //Pergunta 1
    if(random == 0){
       if(click == 'answer1'){
          document.querySelector('#' + click).className = 'col-md-8  type-btn-answer-correct text-center';         
         setTimeout(function(){
           document.querySelector('.type-btn-answer-correct').className = 'col-md-8  type-btn-answer text-center';
         }, 1000)
          points = points + 5;
          // msg.text = 'Parabéns! Você acertou!'
          // msg.lang = 'pt-BR';
          // speechSynthesis.speak(msg)
         setTimeout(function(){
           startGame();
         }, 1005)
          
       }else{
         points = points - 3;
         document.querySelector('#' + click).className = 'col-md-8  type-btn-answer-wrong text-center';         
         setTimeout(function(){
           document.querySelector('.type-btn-answer-wrong').className = 'col-md-8  type-btn-answer text-center';
         }, 1000)
         // msg.text = 'Infelizmente você errou, mas tente novamente!'
         //  msg.lang = 'pt-BR';
         //  speechSynthesis.speak(msg)
         setTimeout(function(){
           startGame();
         }, 1000)
       }
    }
  //Pergunta 2
    if(random == 1){
       if(click == 'answer3'){
        document.querySelector('#' + click).className = 'col-md-8  type-btn-answer-correct text-center';         
         setTimeout(function(){
           document.querySelector('.type-btn-answer-correct').className = 'col-md-8  type-btn-answer text-center';
         }, 1000)
          points = points + 5;
          // msg.text = 'Parabéns! Você acertou!'
          // msg.lang = 'pt-BR';
          // speechSynthesis.speak(msg)
         setTimeout(function(){
           startGame();
         }, 1000)
       }else{
         points = points - 3;
          document.querySelector('#' + click).className = 'col-md-8  type-btn-answer-wrong text-center';         
         setTimeout(function(){
           document.querySelector('.type-btn-answer-wrong').className = 'col-md-8  type-btn-answer text-center';
         }, 1000)
         // msg.text = 'Infelizmente você errou, mas tente novamente!'
         //  msg.lang = 'pt-BR';
         //  speechSynthesis.speak(msg)
         setTimeout(function(){
           startGame();
         }, 1000)
       }
    }
  //Pergunta 3
    if(random == 2){
       if(click == 'answer3'){
         document.querySelector('#' + click).className = 'col-md-8  type-btn-answer-correct text-center';         
         setTimeout(function(){
           document.querySelector('.type-btn-answer-correct').className = 'col-md-8  type-btn-answer text-center';
         }, 1000)
          points = points + 5;
          // msg.text = 'Parabéns! Você acertou!'
          // msg.lang = 'pt-BR';
          // speechSynthesis.speak(msg)
         setTimeout(function(){
           startGame();
         }, 1000)
       }else{
         points = points - 3;
          document.querySelector('#' + click).className = 'col-md-8  type-btn-answer-wrong text-center';         
         setTimeout(function(){
           document.querySelector('.type-btn-answer-wrong').className = 'col-md-8  type-btn-answer text-center';
         }, 1000)
         // msg.text = 'Infelizmente você errou, mas tente novamente!'
         //  msg.lang = 'pt-BR';
         //  speechSynthesis.speak(msg)
         setTimeout(function(){
           startGame();
         }, 1000)
       }
    }
  }

    