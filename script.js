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
    
    // Обработчик нажатия на кнопку старта
    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('greeting').classList.add('hidden');
        document.getElementById('quiz').classList.remove('hidden');
        showQuestion(currentQuestion);
    });
    
    // Функция отображения вопроса
    function showQuestion(index) {
        if (index >= questions.length) {
            showFinal();
            return;
        }
        
        const question = questions[index];
        
        // Сбрасываем флаги подсказок
        hintShown = false;
        detailedHintShown = false;
        
        // Устанавливаем изображение - всегда адаптируем к контейнеру
        const questionImage = document.getElementById('question-image');
        questionImage.src = question.image;
        
        // ПОЛНОСТЬЮ очищаем все элементы, связанные с вопросом
        document.getElementById('question').innerHTML = '';
        document.getElementById('location-message').innerHTML = '';
        document.querySelector('.options').innerHTML = '';
        document.getElementById('hint').classList.add('hidden');
        document.getElementById('location-hint').classList.add('hidden');
        
        // Сначала скрываем все, что связано с вопросами
        document.getElementById('question').classList.add('hidden');
        document.querySelector('.options').classList.add('hidden');
        document.getElementById('hint-button').classList.add('hidden');
        document.getElementById('location-message').classList.add('hidden');
        
        // Теперь показываем только то, что нужно
        if (question.isLocation) {
            // Для вопросов с локацией
            document.getElementById('location-message').classList.remove('hidden');
            document.getElementById('location-message').textContent = question.location;
            
            // Добавляем кнопку для перехода к следующему вопросу
            const nextButton = document.createElement('button');
            nextButton.className = 'main-button';
            nextButton.textContent = 'Следующий вопрос';
            nextButton.style.marginTop = '20px';
            document.getElementById('location-message').appendChild(document.createElement('br'));
            document.getElementById('location-message').appendChild(nextButton);
            
            // Обработчик нажатия на кнопку
            nextButton.addEventListener('click', function() {
                currentQuestion++;
                showQuestion(currentQuestion);
            });
        } else {
            // Для обычных вопросов
            document.getElementById('question').classList.remove('hidden');
            document.querySelector('.options').classList.remove('hidden');
            document.getElementById('hint-button').classList.remove('hidden');
            
            document.getElementById('question').textContent = question.question;
            
            // Создаем варианты ответов
            const optionsContainer = document.querySelector('.options');
            question.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                
                optionElement.addEventListener('click', function() {
                    checkAnswer(i);
                });
                
                optionsContainer.appendChild(optionElement);
            });
        }
        
        // Обновляем обработчик для кнопки подсказки
        const hintButton = document.getElementById('hint-button');
        hintButton.removeEventListener('click', showHint);
        hintButton.addEventListener('click', showHint);
    }
    
    // Функция отображения подсказки
    function showHint() {
        const question = questions[currentQuestion];
        const hintElement = document.getElementById('hint');
        
        if (!hintShown) {
            hintElement.textContent = question.hint;
            hintElement.classList.remove('hidden');
            hintShown = true;
        } else if (!detailedHintShown) {
            hintElement.textContent = question.detailedHint;
            detailedHintShown = true;
        }
    }
    
    // Функция проверки ответа
    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestion];
        const options = document.querySelectorAll('.option');
        
        if (selectedIndex === question.correctAnswer) {
            // Правильный ответ
            options[selectedIndex].classList.add('correct');
            
            // Если есть информация о локации, показываем её
            if (question.location) {
                const locationHint = document.getElementById('location-hint');
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
            if (!hintShown) {
                const hintElement = document.getElementById('hint');
                hintElement.textContent = question.hint;
                hintElement.classList.remove('hidden');
                hintShown = true;
            } else if (!detailedHintShown) {
                const hintElement = document.getElementById('hint');
                hintElement.textContent = question.detailedHint;
                hintElement.classList.remove('hidden');
                detailedHintShown = true;
            }
            
            // Убираем класс неправильного ответа через паузу
            setTimeout(() => {
                options[selectedIndex].classList.remove('incorrect');
            }, 1000);
        }
    }
    
    // Функция отображения финального экрана
    function showFinal() {
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('final').classList.remove('hidden');
    }
});
