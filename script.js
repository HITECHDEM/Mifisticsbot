document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram WebApp
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем приложение на весь экран
    
    // Массив с вопросами и ответами
    const questions = [
        {
            question: "Голова этой медузы стала трофеем Персея. О ком идёт речь?",
            options: ["Химера", "Горгона", "Сцилла", "Гидра"],
            correctAnswer: 1,
            hint: "Один взгляд на неё превращал в камень.",
            detailedHint: "Она была одной из трёх сестёр с змеями вместо волос. Персей убил её, используя свой щит как зеркало.",
            location: "Загляни в тумбу, там тебя ждёт следующая подсказка.",
            image: "https://i.pinimg.com/736x/7b/52/c9/7b52c9c10b1b143e709458d6bdad49a4.jpg"
        },
        {
            question: "Птица, возрождающаяся из пепла — символ бессмертия и возрождения.",
            options: ["Сирин", "Алконост", "Феникс", "Гриф"],
            correctAnswer: 2,
            hint: "По легенде она живёт почти 500 лет, затем сгорает и возрождается вновь.",
            detailedHint: "Эта птица ассоциируется с огнём и солнцем. В мифологии разных народов она символизирует бессмертие.",
            location: "Загляни в микроволновку, там следующая подсказка.",
            image: "https://cs12.pikabu.ru/video/2022/06/27/12/og_og_1656363324335587978.jpg"
        },
        {
            question: "Уязвимая часть тела, которая погубила героя Ахилла.",
            options: ["Колено", "Глаз", "Пятка", "Сердце"],
            correctAnswer: 2,
            hint: "По легенде его мать окунула его в реку Стикс, держа за эту часть тела.",
            detailedHint: "Именно из-за этой незащищённой части тела появилось выражение «ахиллесова ...»",
            location: "Загляни под подушку на диване.",
            image: "https://i.pinimg.com/originals/5a/6d/95/5a6d9535851af7e77cdc12dea4d5d4a5.jpg"
        },
        {
            question: "В образе какого зверя изображался древнеславянский бог Велес – покровитель диких зверей и домашних животных?",
            options: ["Медведь", "Волк", "Змей", "Сокол"],
            correctAnswer: 0,
            hint: "Этот зверь считался самым сильным и мудрым в лесу.",
            detailedHint: "По преданиям, это человек, превращенный злым колдуном в дикого зверя. Он умеет ходить на задних лапах.",
            image: "https://cdn.culture.ru/images/3a70067a-27b4-5d7d-a019-7db0b286f5d8"
        },
        {
            question: "Какая птица по преданиям древних славян считалась вещей и жила триста лет?",
            options: ["Кукушка", "Ворон", "Орел", "Сокол"],
            correctAnswer: 1,
            hint: "Эта птица питается только мертвечиной.",
            detailedHint: "Эта черная птица в мифологии многих народов ассоциируется с мудростью и долголетием.",
            image: "https://stranatur.ru/img5/33_1035_post_media_OH30.jpeg"
        },
        {
            question: "Как называется племя, в котором живет Джейкоб в саге 'Сумерки'?",
            options: ["Хохи", "Десять колец", "Квилеты", "Утлапа"],
            correctAnswer: 2,
            hint: "Это племя коренных американцев, члены которого могут превращаться в волков.",
            detailedHint: "Члены этого племени являются потомками древних оборотней и смертельными врагами вампиров.",
            image: "https://i.ytimg.com/vi/IaplwFDzsRA/maxresdefault.jpg"
        },
        {
            question: "Какое волшебное заклинание открывает все двери в мире Гарри Поттера?",
            options: ["Риктусемпра", "Алохомора", "Экспеллиармус", "Люмос"],
            correctAnswer: 1,
            hint: "Это заклинание Гермиона использовала в первой книге, чтобы открыть запертую дверь.",
            detailedHint: "Алохомора (Алоомора) - заклинание которое открывает простые замки. Не работает на замки, которые защищены магией.",
            image: "https://kartinkof.club/uploads/posts/2022-03/1648352975_13-kartinkof-club-p-deniel-redkliff-mem-13.jpg"
        }
    ];
    
    // Текущий вопрос
    let currentQuestion = 0;
    // Флаг показа подсказки
    let hintShown = false;
    // Флаг показа детальной подсказки
    let detailedHintShown = false;
    
    // Получаем элементы DOM
    const greetingScreen = document.getElementById('greeting');
    const quizScreen = document.getElementById('quiz');
    const finalScreen = document.getElementById('final');
    const questionText = document.getElementById('question');
    const locationMessage = document.getElementById('location-message');
    const questionImage = document.getElementById('question-image');
    const optionsContainer = document.querySelector('.options');
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint');
    const locationHint = document.getElementById('location-hint');
    
    // Обработчик нажатия на кнопку старта
    document.getElementById('start-button').addEventListener('click', function() {
        greetingScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        startQuiz();
    });
    
    // Начало квиза
    function startQuiz() {
        showQuestion(currentQuestion);
    }
    
    // Отображение вопроса
    function showQuestion(index) {
        if (index >= questions.length) {
            showFinal();
            return;
        }
        
        const question = questions[index];
        
        // Сбрасываем флаги подсказок
        hintShown = false;
        detailedHintShown = false;
        
        // Устанавливаем изображение
        questionImage.src = question.image;
        
        // Проверяем, является ли это вопросом с локацией (2, 3 или 4 вопрос)
        if (index === 1 || index === 2 || index === 3) {
            // Для вопросов 2, 3, 4 показываем только локацию
            questionText.classList.add('hidden');
            locationMessage.classList.remove('hidden');
            locationMessage.innerText = question.location;
            optionsContainer.classList.add('hidden');
            hintButton.classList.add('hidden');
            
            // УБРАЛИ автопереход к следующему вопросу
            // Теперь пользователь сам переходит к следующему вопросу, например, через кнопку или по клику
        } else {
            // Для остальных вопросов показываем обычный вопрос с вариантами ответов
            questionText.classList.remove('hidden');
            locationMessage.classList.add('hidden');
            optionsContainer.classList.remove('hidden');
            hintButton.classList.remove('hidden');
            
            // Устанавливаем вопрос
            questionText.innerText = question.question;
            
            // Очищаем прошлые варианты ответов
            optionsContainer.innerHTML = '';
            question.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.dataset.index = i;
                optionElement.addEventListener('click', function() {
                    checkAnswer(i);
                });
                optionsContainer.appendChild(optionElement);
            });
        }
        
        // Скрываем подсказки
        hintText.classList.add('hidden');
        locationHint.classList.add('hidden');
        
        // Убираем предыдущий обработчик
        hintButton.removeEventListener('click', showHint);
        // Добавляем новый обработчик для кнопки подсказки
        hintButton.addEventListener('click', showHint);
    }
    
    // Показать подсказку
    function showHint() {
        const question = questions[currentQuestion];
        
        if (!hintShown) {
            hintText.innerText = question.hint;
            hintText.classList.remove('hidden');
            hintShown = true;
        } else if (!detailedHintShown) {
            hintText.innerText = question.detailedHint;
            detailedHintShown = true;
        }
    }
    
    // Проверка ответа
    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestion];
        const options = document.querySelectorAll('.option');
        
        if (selectedIndex === question.correctAnswer) {
            // Правильный ответ
            options[selectedIndex].classList.add('correct');
            
            // Показываем локацию (только для первого вопроса)
            if (currentQuestion === 0) {
                locationHint.innerText = question.location;
                locationHint.classList.remove('hidden');
            }
            
            // Переходим к следующему вопросу через небольшую задержку
            setTimeout(() => {
                currentQuestion++;
                showQuestion(currentQuestion);
            }, 1500);
        } else {
            // Неправильный ответ
            options[selectedIndex].classList.add('incorrect');
            
            // Показываем подсказку, если еще не показана
            if (!hintShown) {
                hintText.innerText = question.hint;
                hintText.classList.remove('hidden');
                hintShown = true;
            } else if (!detailedHintShown) {
                hintText.innerText = question.detailedHint;
                detailedHintShown = true;
            }
            
            // Через некоторое время убираем стиль неправильного ответа
            setTimeout(() => {
                options[selectedIndex].classList.remove('incorrect');
            }, 1000);
        }
    }
    
    // Финальное сообщение
    function showFinal() {
        quizScreen.classList.add('hidden');
        finalScreen.classList.remove('hidden');
    }
});
