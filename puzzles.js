// Valentine’s Week Puzzle System

// Check if puzzle is already solved
function isPuzzleSolved(day) {
    return localStorage.getItem(`puzzle-day${day}-solved`) === "true";
}

// Mark puzzle as solved
function markPuzzleSolved(day) {
    localStorage.setItem(`puzzle-day${day}-solved`, "true");
}

// Show puzzle modal
function showPuzzle(day) {
    const modal = document.getElementById("puzzleModal");
    const container = document.getElementById("puzzleContainer");

    const puzzles = {
        1: {
            type: "word",
            title: "Rose Day 🌹",
            question: "What's our special word that means 'I love you'?",
            hint: "Think about what I always say to you...",
            answer: "forever"
        },
        2: {
            type: "memory",
            title: "Propose Day 💍",
            cards: ["💕", "💖", "💗", "💝", "💕", "💖", "💗", "💝"]
        },
        3: {
            type: "quiz",
            title: "Chocolate Day 🍫",
            question: "What's my favorite thing about you?",
            options: [
                "Your beautiful smile",
                "Your kind heart",
                "Everything about you",
                "Your amazing laugh"
            ],
            correctAnswer: 2
        },
        4: {
            type: "word",
            title: "Teddy Day 🧸",
            question: "Complete the sentence: You give me the best ____",
            hint: "Think about how I make you feel...",
            answer: "hugs"
        },
        5: {
            type: "quiz",
            title: "Promise Day 🤝",
            question: "What do I promise you?",
            options: [
                "To love you forever",
                "To make you smile every day",
                "To be by your side always",
                "All of the above"
            ],
            correctAnswer: 3
        },
        6: {
            type: "memory",
            title: "Hug Day 🤗",
            cards: ["🤗", "💝", "🌟", "✨", "🤗", "💝", "🌟", "✨"]
        },
        7: {
            type: "word",
            title: "Kiss Day 💋",
            question: "What makes my heart race?",
            hint: "Think about what you give me...",
            answer: "kisses"
        },
        8: {
            type: "word",
            title: "Valentine's Day ❤️",
            question: "What are we?",
            hint: "Two words that describe our relationship...",
            answer: "soulmates"
        }
    };

    const puzzle = puzzles[day];

    container.innerHTML = `
        <h3>🔒 Unlock ${puzzle.title}</h3>
        <p style="margin-bottom: 30px;">Complete this puzzle to unlock today's letter!</p>
    `;

    if (puzzle.type === "word") {
        container.innerHTML += `
            <div style="margin: 35px auto; max-width: 550px;">
                <p style="font-size: 1.2rem; margin-bottom: 25px; font-style: italic;">
                    ${puzzle.question}
                </p>
                <p style="font-size: 1rem; color: #999; margin-bottom: 25px;">
                    Hint: ${puzzle.hint}
                </p>
                <input type="text" id="wordInput"
                    placeholder="Type your answer..."
                    style="width: 100%; padding: 18px 25px; font-size: 1.3rem;
                           border: 3px solid var(--rose-pink); border-radius: 18px;
                           text-align: center; margin-bottom: 20px;">
                <button onclick="checkWordPuzzle(${day}, '${puzzle.answer}')"
                    style="padding: 18px 40px; font-size: 1.3rem;
                           background: linear-gradient(135deg, var(--rose-pink), var(--deep-pink));
                           color: white; border: none; border-radius: 50px;
                           cursor: pointer; box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);">
                    Submit Answer
                </button>
            </div>
        `;
    }
    else if (puzzle.type === "memory") {
        container.innerHTML += `
            <p style="margin-bottom: 20px;">Match all the pairs to unlock!</p>
            <div id="memoryGrid"
                 style="display: grid; grid-template-columns: repeat(4, 1fr);
                        gap: 18px; margin: 35px auto; max-width: 550px;">
            </div>
            <div id="memorySuccess"
                 style="background: linear-gradient(135deg, #90ee90, #228b22);
                        color: white; padding: 25px; border-radius: 18px;
                        margin: 25px 0; text-align: center; font-size: 1.3rem;
                        display: none;">
                Perfect! Letter unlocked! 🎉
            </div>
        `;
        initMemoryGame(day, puzzle.cards);
    }
    else if (puzzle.type === "quiz") {
        container.innerHTML += `
            <div style="margin: 35px auto;">
                <p style="font-size: 1.4rem; margin-bottom: 25px;">
                    ${puzzle.question}
                </p>
                ${puzzle.options.map((option, index) => `
                    <div class="quiz-option"
                         onclick="checkQuizAnswer(${day}, ${index}, ${puzzle.correctAnswer})"
                         style="background: white; padding: 18px 30px;
                                margin: 15px 0; border-radius: 18px;
                                border: 3px solid var(--soft-pink);
                                cursor: pointer; transition: all 0.3s;
                                font-size: 1.2rem;">
                        ${option}
                    </div>
                `).join("")}
            </div>
            <div id="quizSuccess"
                 style="background: linear-gradient(135deg, #90ee90, #228b22);
                        color: white; padding: 25px; border-radius: 18px;
                        margin: 25px 0; text-align: center; font-size: 1.3rem;
                        display: none;">
                Correct! Letter unlocked! 🎉
            </div>
        `;
    }

    modal.style.display = "flex";
}

// Close puzzle modal
function closePuzzleModal() {
    document.getElementById("puzzleModal").style.display = "none";
}

// Word Puzzle checker
function checkWordPuzzle(day, correctAnswer) {
    const input = document.getElementById("wordInput").value.toLowerCase().trim();

    if (input === correctAnswer.toLowerCase()) {
        markPuzzleSolved(day);
        setTimeout(() => {
            closePuzzleModal();
            window.location.href = `day${day}.html`;
        }, 800);
    } else {
        alert("Not quite right! Try again 💕");
    }
}

// ---------- MEMORY GAME LOGIC ----------
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let currentDay = 0;

function initMemoryGame(day, cards) {
    currentDay = day;
    memoryCards = [...cards].sort(() => Math.random() - 0.5);
    flippedCards = [];
    matchedPairs = 0;

    const grid = document.getElementById("memoryGrid");
    grid.innerHTML = "";

    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.style.cssText = `
            aspect-ratio: 1;
            background: linear-gradient(135deg, var(--rose-pink), var(--deep-pink));
            border-radius: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.8rem;
            transition: all 0.4s;
            position: relative;
            transform-style: preserve-3d;
        `;
        cardElement.dataset.index = index;
        cardElement.dataset.value = card;

        cardElement.innerHTML = `
            <div style="
                position: absolute; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                backface-visibility: hidden; border-radius: 18px;
                background: linear-gradient(135deg, var(--rose-pink), var(--deep-pink));
            ">❤️</div>

            <div style="
                position: absolute; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                backface-visibility: hidden; border-radius: 18px;
                background: white; transform: rotateY(180deg);
            ">${card}</div>
        `;

        cardElement.onclick = () => flipMemoryCard(cardElement);
        grid.appendChild(cardElement);
    });
}

function flipMemoryCard(card) {
    if (
        flippedCards.length >= 2 ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.classList.add("flipped");
    card.style.transform = "rotateY(180deg)";
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMemoryMatch, 800);
    }
}

function checkMemoryMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === memoryCards.length / 2) {
            document.getElementById("memorySuccess").style.display = "block";
            markPuzzleSolved(currentDay);

            setTimeout(() => {
                closePuzzleModal();
                window.location.href = `day${currentDay}.html`;
            }, 1200);
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.style.transform = "rotateY(0deg)";
        card2.style.transform = "rotateY(0deg)";
    }

    flippedCards = [];
}

// ---------- QUIZ PUZZLE ----------
function checkQuizAnswer(day, chosenIndex, correctIndex) {
    if (chosenIndex === correctIndex) {
        document.getElementById("quizSuccess").style.display = "block";
        markPuzzleSolved(day);

        setTimeout(() => {
            closePuzzleModal();
            window.location.href = `day${day}.html`;
        }, 1000);
    } else {
        alert("Try again 💕");
    }
}