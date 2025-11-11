// Tutorial module: manages state, DOM, and interactions for the onboarding tutorial
// Usage:
//   import { initTutorial } from './tutorial.js';
//   const tutorial = initTutorial({ steps });
//   tutorial.show();

export function initTutorial({ steps }) {
    // DOM elements
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const tutorialCallout = document.querySelector('.tutorial-callout');
    const tutorialSpotlight = document.querySelector('.tutorial-spotlight');
    const tutorialPointer = document.querySelector('.tutorial-pointer');
    const tutorialStepNumber = document.querySelector('.tutorial-step-number');
    const tutorialTitle = document.querySelector('.tutorial-title');
    const tutorialDescription = document.querySelector('.tutorial-description');
    const tutorialTipElement = document.querySelector('.tutorial-tip span');
    const tutorialPrevBtn = document.getElementById('tutorial-prev');
    const tutorialNextBtn = document.getElementById('tutorial-next');
    const tutorialSkipBtn = document.getElementById('tutorial-skip');
    const tutorialDots = document.querySelectorAll('.tutorial-dot');

    const state = {
        currentStep: 1,
        totalSteps: steps.length
    };

    function show() {
        tutorialOverlay.style.display = 'block';
        state.currentStep = 1;
        updateDisplay();
    }

    function close() {
        tutorialOverlay.style.display = 'none';
        // Clear spotlight
        tutorialSpotlight.style.boxShadow = '';
    }

    function next() {
        if (state.currentStep < state.totalSteps) {
            state.currentStep++;
            updateDisplay();
        } else {
            close();
        }
    }

    function prev() {
        if (state.currentStep > 1) {
            state.currentStep--;
            updateDisplay();
        }
    }

    function goToStep(step) {
        if (step >= 1 && step <= state.totalSteps) {
            state.currentStep = step;
            updateDisplay();
        }
    }

    function updateDisplay() {
        const currentStepIndex = state.currentStep - 1;
        const stepData = steps[currentStepIndex];

        // Update text content
        tutorialStepNumber.textContent = state.currentStep;
        tutorialTitle.textContent = stepData.title;
        tutorialDescription.textContent = stepData.description;
        tutorialTipElement.textContent = stepData.tip;

        // Update dots
        tutorialDots.forEach((dot, index) => {
            if (index === currentStepIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update buttons
        tutorialPrevBtn.style.visibility = state.currentStep === 1 ? 'hidden' : 'visible';
        tutorialNextBtn.innerHTML = state.currentStep === state.totalSteps ? '<i class="fas fa-play"></i>' : '<i class="fas fa-arrow-right"></i>';

        // Position callout and create spotlight
        positionCallout(stepData);
    }

    function positionCallout(stepData) {
        const targetElement = document.querySelector(stepData.highlightElement);
        if (!targetElement) {
            console.warn('Tutorial target element not found:', stepData.highlightElement);
            return;
        }

        const targetRect = targetElement.getBoundingClientRect();
        const calloutRect = tutorialCallout.getBoundingClientRect();

        // Spotlight effect around element
        const spotlightSize = 20;
        tutorialSpotlight.style.boxShadow = `
            0 0 0 9999px rgba(0, 0, 0, 0.7),
            inset 0 0 ${spotlightSize}px rgba(0, 0, 0, 0.3)
        `;
        tutorialSpotlight.style.top = `${targetRect.top - spotlightSize}px`;
        tutorialSpotlight.style.left = `${targetRect.left - spotlightSize}px`;
        tutorialSpotlight.style.width = `${targetRect.width + spotlightSize * 2}px`;
        tutorialSpotlight.style.height = `${targetRect.height + spotlightSize * 2}px`;
        tutorialSpotlight.style.borderRadius = '12px';

        // Position callout
        let calloutTop, calloutLeft;
        let pointerTop, pointerLeft, pointerClass;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (stepData.calloutPosition === 'center') {
            calloutTop = (viewportHeight - calloutRect.height) / 2;
            calloutLeft = (viewportWidth - calloutRect.width) / 2;
            tutorialPointer.style.display = 'none';
        } else if (stepData.calloutPosition === 'left') {
            calloutTop = targetRect.top + (targetRect.height / 2) - (calloutRect.height / 2);
            calloutLeft = targetRect.left - calloutRect.width - 40;
            pointerTop = targetRect.top + (targetRect.height / 2) - 15;
            pointerLeft = targetRect.left - 40;
            pointerClass = 'arrow-right';
            tutorialPointer.style.display = 'block';
        } else if (stepData.calloutPosition === 'right') {
            calloutTop = targetRect.top + (targetRect.height / 2) - (calloutRect.height / 2);
            calloutLeft = targetRect.right + 40;
            pointerTop = targetRect.top + (targetRect.height / 2) - 15;
            pointerLeft = targetRect.right + 10;
            pointerClass = 'arrow-left';
            tutorialPointer.style.display = 'block';
        }

        // Keep within viewport
        calloutTop = Math.max(20, Math.min(calloutTop, viewportHeight - calloutRect.height - 20));
        calloutLeft = Math.max(20, Math.min(calloutLeft, viewportWidth - calloutRect.width - 20));

        tutorialCallout.style.top = `${calloutTop}px`;
        tutorialCallout.style.left = `${calloutLeft}px`;

        if (tutorialPointer.style.display !== 'none') {
            tutorialPointer.className = 'tutorial-pointer ' + pointerClass;
            tutorialPointer.style.top = `${pointerTop}px`;
            tutorialPointer.style.left = `${pointerLeft}px`;
        }
    }

    // Event wiring (within module)
    tutorialPrevBtn.addEventListener('click', prev);
    tutorialNextBtn.addEventListener('click', next);
    tutorialSkipBtn.addEventListener('click', close);
    tutorialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.getAttribute('data-step'));
            goToStep(step);
        });
    });

    // Public API
    return {
        show,
        close,
        next,
        prev,
        goToStep
    };
}


