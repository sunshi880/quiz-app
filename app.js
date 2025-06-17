// Quiz App - JavaScript

// DOM Elements
// Welcome Screen
const welcomeScreen = document.getElementById('welcome-screen');
const categorySelect = document.getElementById('category-select');
const questionCountSelect = document.getElementById('question-count');
const enableTimer = document.getElementById('enable-timer');
const showProgress = document.getElementById('show-progress');
const startBtn = document.getElementById('start-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Quiz Screen
const quizScreen = document.getElementById('quiz-screen');
const categoryIndicator = document.getElementById('category-indicator');
const timerContainer = document.getElementById('timer-container');
const timerElement = document.getElementById('timer');
const progressContainer = document.getElementById('progress-container');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container');
const nextBtn = document.getElementById('next-btn');

// Results Screen
const resultsScreen = document.getElementById('results-screen');
const scoreElement = document.getElementById('score');
const maxScoreElement = document.getElementById('max-score');
const percentageElement = document.getElementById('percentage');
const resultsFeedback = document.getElementById('results-feedback');
const playAgainBtn = document.getElementById('play-again-btn');
const homeBtn = document.getElementById('home-btn');

// Quiz State
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 10;
let timerInterval;
let secondsLeft = 10;
let quizEnded = false;
let isAnswered = false;
let selectedCategoryId = null;
let timerEnabled = true;
let progressEnabled = true;

// Sample data (would be fetched from API in full implementation)
const categories = [
  { id: 1, name: 'General Knowledge' },
  { id: 2, name: 'Math' },
  { id: 3, name: 'Coding' }
];

const sampleQuestions = [
  {
    id: 1,
    text: 'What is the capital city of France?',
    categoryId: 1,
    categoryName: 'General Knowledge',
    options: [
      { id: 1, text: 'Paris', isCorrect: true },
      { id: 2, text: 'London', isCorrect: false },
      { id: 3, text: 'Berlin', isCorrect: false },
      { id: 4, text: 'Rome', isCorrect: false }
    ]
  },
  {
    id: 2,
    text: 'Which programming language is known for building interactive web pages?',
    categoryId: 3,
    categoryName: 'Coding',
    options: [
      { id: 5, text: 'Java', isCorrect: false },
      { id: 6, text: 'Python', isCorrect: false },
      { id: 7, text: 'JavaScript', isCorrect: true },
      { id: 8, text: 'C++', isCorrect: false }
    ]
  },
  {
    id: 3,
    text: 'What is 9 × 7?',
    categoryId: 2,
    categoryName: 'Math',
    options: [
      { id: 9, text: '56', isCorrect: false },
      { id: 10, text: '63', isCorrect: true },
      { id: 11, text: '72', isCorrect: false },
      { id: 12, text: '81', isCorrect: false }
    ]
  },
  {
    id: 4,
    text: 'Which data structure follows the LIFO principle?',
    categoryId: 3,
    categoryName: 'Coding',
    options: [
      { id: 13, text: 'Queue', isCorrect: false },
      { id: 14, text: 'Stack', isCorrect: true },
      { id: 15, text: 'Linked List', isCorrect: false },
      { id: 16, text: 'Tree', isCorrect: false }
    ]
  },
  {
    id: 5,
    text: 'What is the square root of 144?',
    categoryId: 2,
    categoryName: 'Math',
    options: [
      { id: 17, text: '10', isCorrect: false },
      { id: 18, text: '12', isCorrect: true },
      { id: 19, text: '14', isCorrect: false },
      { id: 20, text: '16', isCorrect: false }
    ]
  },
  {
    id: 6,
    text: 'Which planet is known as the Red Planet?',
    categoryId: 1,
    categoryName: 'General Knowledge',
    options: [
      { id: 21, text: 'Venus', isCorrect: false },
      { id: 22, text: 'Jupiter', isCorrect: false },
      { id: 23, text: 'Mars', isCorrect: true },
      { id: 24, text: 'Saturn', isCorrect: false }
    ]
  },
  {
    id: 7,
    text: 'What HTML tag is used to create a hyperlink?',
    categoryId: 3,
    categoryName: 'Coding',
    options: [
      { id: 25, text: '<link>', isCorrect: false },
      { id: 26, text: '<href>', isCorrect: false },
      { id: 27, text: '<url>', isCorrect: false },
      { id: 28, text: '<a>', isCorrect: true }
    ]
  },
  {
    id: 8,
    text: 'What is the value of π (pi) to two decimal places?',
    categoryId: 2,
    categoryName: 'Math',
    options: [
      { id: 29, text: '3.14', isCorrect: true },
      { id: 30, text: '3.16', isCorrect: false },
      { id: 31, text: '3.12', isCorrect: false },
      { id: 32, text: '3.18', isCorrect: false }
    ]
  },
  {
    id: 9,
    text: 'Which country is known as the Land of the Rising Sun?',
    categoryId: 1,
    categoryName: 'General Knowledge',
    options: [
      { id: 33, text: 'China', isCorrect: false },
      { id: 34, text: 'South Korea', isCorrect: false },
      { id: 35, text: 'Thailand', isCorrect: false },
      { id: 36, text: 'Japan', isCorrect: true }
    ]
  },
  {
    id: 10,
    text: 'In JavaScript, which method is used to add an element at the end of an array?',
    categoryId: 3,
    categoryName: 'Coding',
    options: [
      { id: 37, text: 'push()', isCorrect: true },
      { id: 38, text: 'append()', isCorrect: false },
      { id: 39, text: 'add()', isCorrect: false },
      { id: 40, text: 'insert()', isCorrect: false }
    ]
  },
  {
    id: 11,
    text: 'Who wrote "To Kill a Mockingbird"?',
    categoryId: 1,
    categoryName: 'General Knowledge',
    options: [
      { id: 41, text: 'J.K. Rowling', isCorrect: false },
      { id: 42, text: 'Harper Lee', isCorrect: true },
      { id: 43, text: 'Ernest Hemingway', isCorrect: false },
      { id: 44, text: 'F. Scott Fitzgerald', isCorrect: false }
    ]
  },
  {
    id: 12,
    text: 'What is the result of 5^3?',
    categoryId: 2,
    categoryName: 'Math',
    options: [
      { id: 45, text: '125', isCorrect: true },
      { id: 46, text: '15', isCorrect: false },
      { id: 47, text: '53', isCorrect: false },
      { id: 48, text: '35', isCorrect: false }
    ]
  },
  {
    id: 13,
    text: 'What does CSS stand for?',
    categoryId: 3,
    categoryName: 'Coding',
    options: [
      { id: 49, text: 'Computer Style Sheets', isCorrect: false },
      { id: 50, text: 'Cascading Style Sheets', isCorrect: true },
      { id: 51, text: 'Creative Style Selector', isCorrect: false },
      { id: 52, text: 'Colorful Style System', isCorrect: false }
    ]
  },
  {
    id: 14,
    text: 'Who painted the Mona Lisa?',
    categoryId: 1,
    categoryName: 'General Knowledge',
    options: [
      { id: 53, text: 'Pablo Picasso', isCorrect: false },
      { id: 54, text: 'Vincent van Gogh', isCorrect: false },
      { id: 55, text: 'Leonardo da Vinci', isCorrect: true },
      { id: 56, text: 'Michelangelo', isCorrect: false }
    ]
  },
  {
    id: 15,
    text: 'Which tag is used to define an unordered list in HTML?',
    categoryId: 3,
    categoryName: 'Coding',
    options: [
      { id: 57, text: '<ol>', isCorrect: false },
      { id: 58, text: '<li>', isCorrect: false },
      { id: 59, text: '<ul>', isCorrect: true },
      { id: 60, text: '<list>', isCorrect: false }
    ]
  }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
playAgainBtn.addEventListener('click', resetQuiz);
homeBtn.addEventListener('click', goHome);
themeToggleBtn.addEventListener('click', toggleTheme);

// Initialize the app
function init() {
  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }

  // Setup category selector
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

// Get a random subset of questions based on settings
function getQuestions() {
  let filteredQuestions = [...sampleQuestions];
  
  // Filter by category if selected
  if (selectedCategoryId && selectedCategoryId !== 'all') {
    filteredQuestions = filteredQuestions.filter(
      q => q.categoryId === parseInt(selectedCategoryId)
    );
  }
  
  // Shuffle the questions
  filteredQuestions = shuffleArray(filteredQuestions);
  
  // Limit to selected question count
  return filteredQuestions.slice(0, totalQuestions);
}

// Start the quiz
function startQuiz() {
  // Get settings
  selectedCategoryId = categorySelect.value;
  totalQuestions = parseInt(questionCountSelect.value);
  timerEnabled = enableTimer.checked;
  progressEnabled = showProgress.checked;
  
  // Get questions
  questions = getQuestions();
  
  if (questions.length === 0) {
    alert('No questions available for the selected category. Please try another category.');
    return;
  }
  
  if (questions.length < totalQuestions) {
    totalQuestions = questions.length;
  }
  
  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  quizEnded = false;
  
  // Update UI for quiz screen
  updateQuizUI();
  
  // Show/hide timer based on settings
  timerContainer.style.display = timerEnabled ? 'flex' : 'none';
  
  // Show/hide progress based on settings
  progressContainer.style.display = progressEnabled ? 'block' : 'none';
  
  // Switch screens
  welcomeScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  resultsScreen.classList.add('hidden');
  
  // Start timer if enabled
  if (timerEnabled) {
    startTimer();
  }
}

// Update the quiz UI for the current question
function updateQuizUI() {
  const currentQuestion = questions[currentQuestionIndex];
  
  // Update question text
  questionText.textContent = currentQuestion.text;
  
  // Update category indicator
  categoryIndicator.textContent = `Category: ${currentQuestion.categoryName}`;
  
  // Update progress if enabled
  if (progressEnabled) {
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    totalQuestionsElement.textContent = totalQuestions;
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  // Clear previous options
  optionsContainer.innerHTML = '';
  
  // Add options
  const optionLetters = ['A', 'B', 'C', 'D'];
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option-btn';
    optionBtn.innerHTML = `
      <span class="option-letter">${optionLetters[index]}</span>
      <span class="option-text">${option.text}</span>
    `;
    optionBtn.addEventListener('click', () => selectOption(option, optionBtn));
    optionsContainer.appendChild(optionBtn);
  });
  
  // Reset state for new question
  isAnswered = false;
  feedbackContainer.classList.add('hidden');
  nextBtn.classList.add('hidden');
  
  // Reset timer if enabled
  if (timerEnabled) {
    secondsLeft = 10;
    timerElement.textContent = secondsLeft;
    timerElement.classList.remove('warning');
    clearInterval(timerInterval);
    startTimer();
  }
}

// Start the timer
function startTimer() {
  secondsLeft = 10;
  timerElement.textContent = secondsLeft;
  
  timerInterval = setInterval(() => {
    secondsLeft--;
    timerElement.textContent = secondsLeft;
    
    // Add warning class when time is running out
    if (secondsLeft <= 3) {
      timerElement.classList.add('warning');
    }
    
    // When time runs out
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      handleTimerExpired();
    }
  }, 1000);
}

// Handle timer expiration
function handleTimerExpired() {
  if (isAnswered) return;
  
  isAnswered = true;
  
  // Show all correct answers
  const optionButtons = optionsContainer.querySelectorAll('.option-btn');
  const currentQuestion = questions[currentQuestionIndex];
  
  optionButtons.forEach((btn, index) => {
    const option = currentQuestion.options[index];
    if (option.isCorrect) {
      btn.classList.add('correct');
    }
    btn.disabled = true;
    btn.classList.add('disabled');
  });
  
  // Show feedback
  showFeedback(false, 'Time\'s up!', currentQuestion.options.find(opt => opt.isCorrect).text);
  
  // Show next button
  nextBtn.classList.remove('hidden');
}

// Handle option selection
function selectOption(option, selectedBtn) {
  if (isAnswered) return;
  
  isAnswered = true;
  clearInterval(timerInterval);
  
  const isCorrect = option.isCorrect;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Update the UI to show correct/incorrect
  const optionButtons = optionsContainer.querySelectorAll('.option-btn');
  
  optionButtons.forEach((btn, index) => {
    const opt = currentQuestion.options[index];
    if (opt.isCorrect) {
      btn.classList.add('correct');
    } else if (btn === selectedBtn && !isCorrect) {
      btn.classList.add('incorrect');
    }
    btn.disabled = true;
    btn.classList.add('disabled');
  });
  
  // Update score if correct
  if (isCorrect) {
    score++;
    showFeedback(true);
  } else {
    const correctAnswer = currentQuestion.options.find(opt => opt.isCorrect).text;
    showFeedback(false, 'Incorrect', correctAnswer);
  }
  
  // Show next button
  nextBtn.classList.remove('hidden');
}

// Show feedback after answering
function showFeedback(isCorrect, message = null, correctAnswer = null) {
  feedbackContainer.innerHTML = '';
  feedbackContainer.className = 'feedback-container';
  
  if (isCorrect) {
    feedbackContainer.classList.add('feedback-correct');
    feedbackContainer.innerHTML = `
      <p><span class="feedback-icon">✓</span> Correct!</p>
      <p>Great job, that's the right answer.</p>
    `;
  } else {
    feedbackContainer.classList.add('feedback-incorrect');
    feedbackContainer.innerHTML = `
      <p><span class="feedback-icon">✗</span> ${message || 'Incorrect'}</p>
      <p>The correct answer is: <strong>${correctAnswer}</strong></p>
    `;
  }
  
  feedbackContainer.classList.remove('hidden');
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex >= totalQuestions) {
    endQuiz();
  } else {
    updateQuizUI();
  }
}

// End the quiz and show results
function endQuiz() {
  quizEnded = true;
  
  // Update results screen
  scoreElement.textContent = score;
  maxScoreElement.textContent = totalQuestions;
  
  const percentage = Math.round((score / totalQuestions) * 100);
  percentageElement.textContent = `${percentage}%`;
  
  // Set feedback message based on score
  let feedbackMessage = '';
  if (percentage >= 90) {
    feedbackMessage = 'Excellent! Youre a quiz master!';
  } else if (percentage >= 70) {
    feedbackMessage = 'Great job! You know your stuff!';
  } else if (percentage >= 50) {
    feedbackMessage = 'Good effort! You passed the quiz.';
  } else {
    feedbackMessage = 'Keep practicing! You will do better next time.';
  }
  
  resultsFeedback.textContent = feedbackMessage;
  
  // Switch to results screen
  quizScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
}

// Reset the quiz to play again
function resetQuiz() {
  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  quizEnded = false;
  isAnswered = false;
  
  // Get fresh questions
  questions = getQuestions();
  
  // Update UI
  updateQuizUI();
  
  // Switch screens
  resultsScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  
  // Start timer if enabled
  if (timerEnabled) {
    startTimer();
  }
}

// Go back to welcome screen
function goHome() {
  // Clear any active timers
  clearInterval(timerInterval);
  
  // Switch screens
  resultsScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
}

// Toggle between light and dark theme
function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Utility function to shuffle an array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}