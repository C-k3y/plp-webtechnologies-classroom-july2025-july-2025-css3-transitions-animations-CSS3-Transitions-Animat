// =============================================
// Part 2: JavaScript Functions - Scope, Parameters & Return Values
// =============================================

// Global scope variable
let globalCounter = 0;

/**
 * Demonstrates variable scope (global vs local)
 * Shows how functions can access and modify variables in different scopes
 */
function demonstrateScope() {
    // Local scope variable
    let localCounter = 0;
    globalCounter++;
    localCounter++;
    
    const output = document.getElementById('scopeOutput');
    output.innerHTML = `
        <strong>Scope Demonstration:</strong><br>
        Global Counter: ${globalCounter}<br>
        Local Counter: ${localCounter}<br>
        <small>Note: Local counter resets each call, global persists</small>
    `;
    
    // Nested function demonstrating closure scope
    function innerFunction() {
        const innerCounter = localCounter + 10; // Can access parent's local variables
        return `Inner function result: ${innerCounter}`;
    }
    
    output.innerHTML += `<br>${innerFunction()}`;
}

/**
 * Calculates mathematical operations based on user input
 * Demonstrates parameters and return values
 * @param {number} number - The input number to perform calculations on
 * @returns {Object} Object containing various calculations
 */
function performCalculations(number) {
    if (typeof number !== 'number' || isNaN(number)) {
        throw new Error('Invalid input: must be a number');
    }
    
    return {
        squared: number * number,
        cubed: number * number * number,
        squareRoot: Math.sqrt(number).toFixed(2),
        isEven: number % 2 === 0,
        factorial: function() {
            if (number < 0) return undefined;
            if (number === 0 || number === 1) return 1;
            let result = 1;
            for (let i = 2; i <= number; i++) {
                result *= i;
            }
            return result;
        }()
    };
}

/**
 * Reusable function to generate random colors
 * Demonstrates return values and reusability
 * @returns {string} Random hex color code
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Reusable text formatting function
 * Demonstrates parameters with default values
 * @param {string} text - Text to format
 * @param {string} style - Formatting style ('upper', 'lower', 'capitalize')
 * @returns {string} Formatted text
 */
function formatText(text, style = 'capitalize') {
    switch (style) {
        case 'upper':
            return text.toUpperCase();
        case 'lower':
            return text.toLowerCase();
        case 'capitalize':
            return text.replace(/\b\w/g, char => char.toUpperCase());
        default:
            return text;
    }
}

/**
 * Utility function to toggle CSS classes
 * Demonstrates reusable DOM manipulation
 * @param {HTMLElement} element - DOM element to modify
 * @param {string} className - CSS class to toggle
 * @param {boolean} force - Force add or remove (optional)
 */
function toggleClass(element, className, force) {
    if (force === true) {
        element.classList.add(className);
    } else if (force === false) {
        element.classList.remove(className);
    } else {
        element.classList.toggle(className);
    }
}

// =============================================
// Part 3: Combining CSS Animations with JavaScript
// =============================================

/**
 * Controls the animated box with start, stop, and reset functionality
 * Demonstrates class manipulation for CSS animations
 */
class AnimationController {
    constructor(boxElement) {
        this.box = boxElement;
        this.animationInterval = null;
        this.isAnimating = false;
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.box.classList.add('animate');
        
        // Additional JavaScript animation for demonstration
        let rotation = 0;
        this.animationInterval = setInterval(() => {
            rotation = (rotation + 2) % 360;
            this.box.style.transform = `rotate(${rotation}deg)`;
        }, 50);
    }
    
    stopAnimation() {
        this.isAnimating = false;
        this.box.classList.remove('animate');
        
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }
    
    resetAnimation() {
        this.stopAnimation();
        this.box.style.transform = 'rotate(0deg)';
        this.box.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }
}

/**
 * Manages the flip card functionality
 * Demonstrates CSS 3D transforms triggered by JavaScript
 */
class FlipCardManager {
    constructor(cardElement) {
        this.card = cardElement;
        this.isFlipped = false;
    }
    
    flip() {
        this.isFlipped = !this.isFlipped;
        toggleClass(this.card, 'flipped', this.isFlipped);
    }
    
    reset() {
        this.isFlipped = false;
        this.card.classList.remove('flipped');
    }
}

/**
 * Controls loading animation with progress simulation
 * Demonstrates CSS animation control via JavaScript classes
 */
class LoadingManager {
    constructor(loadingBar, statusElement) {
        this.loadingBar = loadingBar;
        this.statusElement = statusElement;
        this.loadingInterval = null;
        this.isLoading = false;
    }
    
    startLoading() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.loadingBar.classList.add('loading');
        this.statusElement.textContent = 'Loading...';
        
        // Simulate loading progress
        let progress = 0;
        this.loadingInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                this.finishLoading();
            }
        }, 200);
    }
    
    stopLoading() {
        this.isLoading = false;
        this.loadingBar.classList.remove('loading');
        this.statusElement.textContent = 'Stopped';
        
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
        }
    }
    
    finishLoading() {
        this.isLoading = false;
        this.loadingBar.classList.remove('loading');
        this.statusElement.textContent = 'Complete!';
        
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
        }
    }
}

/**
 * Manages modal popup with slide-in animation
 * Demonstrates CSS keyframe animations triggered by JavaScript
 */
class ModalManager {
    constructor(modalElement) {
        this.modal = modalElement;
    }
    
    open() {
        this.modal.style.display = 'block';
        
        // Trigger reflow to ensure animation plays
        this.modal.offsetHeight;
        
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalSlideIn 0.5s ease-out';
    }
    
    close() {
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalSlideOut 0.3s ease-in';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            modalContent.style.animation = '';
        }, 300);
    }
}

// =============================================
// Event Listeners and Initialization
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Part 2: JavaScript Functions Event Listeners
    const scopeDemoBtn = document.getElementById('scopeDemo');
    const calculateBtn = document.getElementById('calculate');
    const randomColorBtn = document.getElementById('randomColor');
    const formatTextBtn = document.getElementById('formatText');
    
    // Part 3: Combined Animations Initialization
    const animatedBox = new AnimationController(document.getElementById('animatedBox'));
    const flipCard = new FlipCardManager(document.getElementById('flipCard'));
    const loadingManager = new LoadingManager(
        document.querySelector('.loading-bar'),
        document.getElementById('loadingStatus')
    );
    const modalManager = new ModalManager(document.getElementById('modal'));
    
    // Part 2: Event Listeners
    scopeDemoBtn.addEventListener('click', demonstrateScope);
    
    calculateBtn.addEventListener('click', function() {
        const input = document.getElementById('numberInput');
        const output = document.getElementById('calculationOutput');
        
        try {
            const number = parseInt(input.value);
            if (isNaN(number)) {
                throw new Error('Please enter a valid number');
            }
            
            const results = performCalculations(number);
            output.innerHTML = `
                <strong>Calculations for ${number}:</strong><br>
                Squared: ${results.squared}<br>
                Cubed: ${results.cubed}<br>
                Square Root: ${results.squareRoot}<br>
                Even: ${results.isEven ? 'Yes' : 'No'}<br>
                Factorial: ${results.factorial}
            `;
        } catch (error) {
            output.innerHTML = `<strong>Error:</strong> ${error.message}`;
        }
    });
    
    randomColorBtn.addEventListener('click', function() {
        const randomColor = getRandomColor();
        document.body.style.background = `linear-gradient(135deg, ${randomColor} 0%, ${getRandomColor()} 100%)`;
    });
    
    formatTextBtn.addEventListener('click', function() {
        const output = document.getElementById('reusableOutput');
        const styles = ['upper', 'lower', 'capitalize'];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        
        output.textContent = formatText(output.textContent, randomStyle);
        output.innerHTML += `<br><small>Applied style: ${randomStyle}</small>`;
    });
    
    // Part 3: Event Listeners
    // Box Animation Controls
    document.getElementById('startAnimation').addEventListener('click', () => {
        animatedBox.startAnimation();
    });
    
    document.getElementById('stopAnimation').addEventListener('click', () => {
        animatedBox.stopAnimation();
    });
    
    document.getElementById('resetAnimation').addEventListener('click', () => {
        animatedBox.resetAnimation();
    });
    
    // Flip Card Controls
    document.getElementById('flipBtn').addEventListener('click', () => {
        flipCard.flip();
    });
    
    document.getElementById('flipCard').addEventListener('click', () => {
        flipCard.flip();
    });
    
    // Loading Animation Controls
    document.getElementById('startLoading').addEventListener('click', () => {
        loadingManager.startLoading();
    });
    
    document.getElementById('stopLoading').addEventListener('click', () => {
        loadingManager.stopLoading();
    });
    
    // Modal Controls
    document.getElementById('openModal').addEventListener('click', () => {
        modalManager.open();
    });
    
    document.getElementById('closeModal').addEventListener('click', () => {
        modalManager.close();
    });
    
    document.querySelector('.close').addEventListener('click', () => {
        modalManager.close();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modalManager.close();
        }
    });
    
    // Add CSS for modal slide-out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize with some demo values
    console.log('Animation Playground initialized successfully!');
    console.log('Available functions:', {
        demonstrateScope,
        performCalculations,
        getRandomColor,
        formatText,
        toggleClass
    });
});

// =============================================
// Additional Utility Functions
// =============================================

/**
 * Debounce function to limit how often a function can be called
 * Demonstrates advanced function concepts
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        demonstrateScope,
        performCalculations,
        getRandomColor,
        formatText,
        toggleClass,
        debounce,
        throttle
    };
}
