document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Инициализация Telegram WebApp
    let tg;
    try {
        tg = window.Telegram.WebApp;
        tg.expand(); // Расширяем приложение на весь экран
        console.log('Telegram WebApp инициализирован');
    } catch (e) {
        console.error('Ошибка инициализации Telegram WebApp:', e);
    }
    
    // Получаем элементы DOM
    const startButton = document.getElementById('start-button');
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
    
    // Проверяем наличие кнопки старта
    if (!startButton) {
        console.error('Кнопка "Начать приключение" не найдена!');
        return;
    }
    
    // Массив с вопросами и ответами
    const questions = [
        {
            question: "Голова этой медузы стала трофеем Персея. О ком идёт речь?",
            options: ["Химера", "Горгона", "Сцилла", "Гидра"],
            correctAnswer: 1,
            hint: "Один взгляд на неё превращал в камень.",
            detailedHint: "Она была одной из трёх сестёр с змеями вместо волос. Персей убил её, используя свой щит как зеркало.",
            location: "Загляни в тумбу, там тебя ждёт следующая подсказка.",
            image: "https://i.pinimg.com/736x/7b/52/c9/7b52c9c10b1b143e709458d6bdad49a4.jpg",
            isLocation: false
        },
        {
            question: "Птица, возрождающаяся из пепла — символ бессмертия и возрождения.",
            options: ["Сирин", "Алконост", "Феникс", "Гриф"],
            correctAnswer: 2,
            hint: "По легенде она живёт почти 500 лет, затем сгорает и возрождается вновь.",
            detailedHint: "Эта птица ассоциируется с огнём и солнцем. В мифологии разных народов она символизирует бессмертие.",
            location: "Загляни в микроволновку, там следующая подсказка.",
            image: "https://cs12.pikabu.ru/video/2022/06/27/12/og_og_1656363324335587978.jpg",
            isLocation: true
        },
        {
            question: "Уязвимая часть тела, которая погубила героя Ахилла.",
            options: ["Колено", "Глаз", "Пятка", "Сердце"],
            correctAnswer: 2,
            hint: "По легенде его мать окунула его в реку Стикс, держа за эту часть тела.",
            detailedHint: "Именно из-за этой незащищённой части тела появилось выражение «ахиллесова ...»",
            location: "Загляни под подушку на диване.",
            image: "https://i.pinimg.com/originals/5a/6d/95/5a6d9535851af7e77cdc12dea4d5d4a5.jpg",
            isLocation: true
        },
        {
            question: "В образе какого зверя изображался древнеславянский бог Велес – покровитель диких зверей и домашних животных?",
            options: ["Медведь", "Волк", "Змей", "Сокол"],
            correctAnswer: 0,
            hint: "Этот зверь считался самым сильным и мудрым в лесу.",
            detailedHint: "По преданиям, это человек, превращенный злым колдуном в дикого зверя. Он умеет ходить на задних лапах.",
            location: "",
            image: "https://cdn.culture.ru/images/3a70067a-27b4-5d7d-a019-7db0b286f5d8",
            isLocation: true
        },
        {
            question: "Какая птица по преданиям древних славян считалась вещей и жила триста лет?",
            options: ["Кукушка", "Ворон", "Орел", "Сокол"],
            correctAnswer: 1,
            hint: "Эта птица питается только мертвечиной.",
            detailedHint: "Эта черная птица в мифологии многих народов ассоциируется с мудростью и долголетием.",
            location: "",
            image: "https://stranatur.ru/img5/33_1035_post_media_OH30.jpeg",
            isLocation: false
        },
        {
            question: "Как называется племя, в котором живет Джейкоб в саге 'Сумерки'?",
            options: ["Хохи", "Десять колец", "Квилеты", "Утлапа"],
            correctAnswer: 2,
            hint: "Это племя коренных американцев, члены которого могут превращаться в волков.",
            detailedHint: "Члены этого племени являются потомками древних оборотней и смертельными врагами вампиров.",
            location: "",
            image: "https://i.ytimg.com/vi/IaplwFDzsRA/maxresdefault.jpg",
            isLocation: false
        },
        {
            question: "Какое волшебное заклинание открывает все двери в мире Гарри Поттера?",
            options: ["Риктусемпра", "Алохомора", "Экспеллиармус", "Люмос"],
            correctAnswer: 1,
            hint: "Это заклинание Гермиона использовала в первой книге, чтобы открыть запертую дверь.",
            detailedHint: "Алохомора (Алоомора) - заклинание которое открывает простые замки. Не работает на замки, которые защищены магией.",
            location: "",
            image: "https://kartinkof.club/uploads/posts/2022-03/1648352975_13-kartinkof-club-p-deniel-redkliff-mem-13.jpg",
            isLocation: false
        }
    ];
    
    // Текущий вопрос
    let currentQuestion = 0;
    // Флаг показа подсказки
    let hintShown = false;
    // Флаг показа детальной подсказки
    let detailedHintShown = false;
    
    // ИСПРАВЛЕНИЕ: Явно задаем обработчик клика на кнопку старта
    startButton.onclick = function(event) {
        console.log('Кнопка Начать нажата');
        if (greetingScreen && quizScreen) {
            greetingScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            showQuestion(currentQuestion);
        } else {
            console.error('Ошибка: не найдены экраны приветствия или квиза');
        }
    };
    
    // Отображение вопроса
    function showQuestion(index) {
        console.log('Показываем вопрос', index);
        
        if (index >= questions.length) {
            showFinal();
            return;
        }
        
        const question = questions[index];
        
        // Сбрасываем флаги подсказок
        hintShown = false;
        detailedHintShown = false;
        
        // Устанавливаем изображение
        if (questionImage) {
            questionImage.src = question.image;
        }
        
        // ПОЛНОСТЬЮ очищаем все элементы
        if (questionText) questionText.innerHTML = '';
        if (locationMessage) locationMessage.innerHTML = '';
        if (optionsContainer) optionsContainer.innerHTML = '';
        if (hintText) hintText.classList.add('hidden');
        if (locationHint) locationHint.classList.add('hidden');
        
        // Скрываем все элементы
        if (questionText) questionText.classList.add('hidden');
        if (optionsContainer) optionsContainer.classList.add('hidden');
        if (hintButton) hintButton.classList.add('hidden');
        if (locationMessage) locationMessage.classList.add('hidden');
        
        // Показываем нужные элементы в зависимости от типа вопроса
        if (question.isLocation) {
            // Для вопросов с локацией
            if (locationMessage) {
                locationMessage.classList.remove('hidden');
                locationMessage.textContent = question.location;
                
                // Добавляем кнопку для перехода к следующему вопросу
                const nextButton = document.createElement('button');
                nextButton.className = 'main-button';
                nextButton.textContent = 'Следующий вопрос';
                nextButton.style.marginTop = '20px';
                locationMessage.appendChild(document.createElement('br'));
                locationMessage.appendChild(nextButton);
                
                // Обработчик для кнопки следующего вопроса
                nextButton.onclick = function() {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                };
            }
        } else {
            // Для обычных вопросов
            if (questionText) {
                questionText.classList.remove('hidden');
                questionText.textContent = question.question;
            }
            
            if (optionsContainer) {
                optionsContainer.classList.remove('hidden');
                
                // Создаем варианты ответов
                question.options.forEach((option, i) => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'option';
                    optionElement.textContent = option;
                    
                    optionElement.onclick = function() {
                        checkAnswer(i);
                    };
                    
                    optionsContainer.appendChild(optionElement);
                });
            }
            
            if (hintButton) {
                hintButton.classList.remove('hidden');
            }
        }
        
        // Обновляем обработчик для кнопки подсказки
        if (hintButton) {
            // ИСПРАВЛЕНИЕ: Используем простой onclick вместо addEventListener
            hintButton.onclick = showHint;
        }
    }
    
    // Показать подсказку
    function showHint() {
        const question = questions[currentQuestion];
        
        if (!hintShown) {
            if (hintText) {
                hintText.textContent = question.hint;
                hintText.classList.remove('hidden');
                hintShown = true;
            }
        } else if (!detailedHintShown) {
            if (hintText) {
                hintText.textContent = question.detailedHint;
                detailedHintShown = true;
            }
        }
    }
    
    // Проверка ответа
    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestion];
        const options = document.querySelectorAll('.option');
        
        if (selectedIndex === question.correctAnswer) {
            // Правильный ответ
            options[selectedIndex].classList.add('correct');
            
            // Если есть информация о локации, показываем её
            if (question.location && locationHint) {
                locationHint.textContent = question.location;
                locationHint.classList.remove('hidden');
            }
            
            // Переходим к следующему вопросу через паузу
            setTimeout(() => {
                currentQuestion++;
                showQuestion(currentQuestion);
            }, 1500);
        } else {
            // Неправильный ответ
            options[selectedIndex].classList.add('incorrect');
            
            // Показываем подсказку, если еще не показана
            if (!hintShown && hintText) {
                hintText.textContent = question.hint;
                hintText.classList.remove('hidden');
                hintShown = true;
            } else if (!detailedHintShown && hintText) {
                hintText.textContent = question.detailedHint;
                hintText.classList.remove('hidden');
                detailedHintShown = true;
            }
            
            // Убираем класс неправильного ответа через паузу
            setTimeout(() => {
                options[selectedIndex].classList.remove('incorrect');
            }, 1000);
        }
    }
    
    // Финальное сообщение
    function showFinal() {
        if (quizScreen) quizScreen.classList.add('hidden');
        if (finalScreen) finalScreen.classList.remove('hidden');
    }
});
