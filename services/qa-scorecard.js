// QA Health Scorecard - Interactive Questionnaire

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('qaQuestionnaire');
    const resultsSection = document.getElementById('resultsSection');
    const progressFill = document.getElementById('progressFill');
    const progressContainer = document.querySelector('.progress-container');
    const answeredCount = document.getElementById('answeredCount');
    const totalScoreEl = document.getElementById('totalScore');
    const averageScoreEl = document.getElementById('averageScore');
    const scoreStatusEl = document.getElementById('scoreStatus');
    const recommendationsEl = document.getElementById('recommendations');
    const emailForm = document.getElementById('emailForm');
    const questionCards = document.querySelectorAll('.question-card');

    let scores = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
    };

    // Track answered questions
    function updateProgress() {
        const answered = Object.values(scores).filter(score => score > 0).length;
        const percentage = (answered / 10) * 100;
        
        progressFill.style.width = percentage + '%';
        answeredCount.textContent = answered;

        // If all questions answered, show results
        if (answered === 10) {
            calculateAndShowResults();
        }
    }

    // Calculate total score
    function calculateScore() {
        return Object.values(scores).reduce((sum, score) => sum + parseInt(score), 0);
    }

    // Show results
    function calculateAndShowResults() {
        const totalScore = calculateScore();
        const averageScore = (totalScore / 10).toFixed(1);

        totalScoreEl.textContent = totalScore;
        averageScoreEl.textContent = averageScore;

        // Determine status and recommendations
        let status, statusClass, recommendations;

        if (totalScore >= 41) {
            status = '🎯 Excellent QA Maturity - Continuous Improvement';
            statusClass = 'excellent';
            recommendations = getExcellentRecommendations();
        } else if (totalScore >= 31) {
            status = '✅ Good QA Foundation - Optimization Opportunities';
            statusClass = 'good';
            recommendations = getGoodRecommendations();
        } else if (totalScore >= 21) {
            status = '⚠️ Major QA Gaps - Strategic Improvement Needed';
            statusClass = 'major';
            recommendations = getMajorRecommendations();
        } else {
            status = '🚨 Critical QA Gaps - Immediate Action Required';
            statusClass = 'critical';
            recommendations = getCriticalRecommendations();
        }

        scoreStatusEl.textContent = status;
        scoreStatusEl.className = 'score-status ' + statusClass;
        recommendationsEl.innerHTML = recommendations;

        // Show results section and scroll to it
        resultsSection.style.display = 'block';
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // Recommendation templates
    function getCriticalRecommendations() {
        return `
            <h3>Recommended Actions:</h3>
            <ul>
                <li><strong>Immediate:</strong> Establish basic smoke test suite for critical user flows</li>
                <li><strong>Week 1-2:</strong> Set up CI/CD pipeline with automated test execution</li>
                <li><strong>Month 1:</strong> Implement test coverage tracking and set 30% coverage target</li>
                <li><strong>Month 2-3:</strong> Build regression suite for core functionality</li>
                <li><strong>Consider:</strong> <a href="qa-retainer.html">Automation sprint engagement</a> to fast-track foundation</li>
            </ul>
            <p><strong>Priority Focus:</strong> Test automation (start with API tests), CI/CD integration, basic metrics tracking, environment stability</p>
        `;
    }

    function getMajorRecommendations() {
        return `
            <h3>Recommended Actions:</h3>
            <ul>
                <li><strong>Immediate:</strong> Expand automation coverage to 50% of critical flows</li>
                <li><strong>Week 1-2:</strong> Implement quality gates in CI/CD pipeline</li>
                <li><strong>Month 1:</strong> Establish QA metrics dashboard (coverage, escape rate, cycle time)</li>
                <li><strong>Month 2-3:</strong> Cross-browser and performance testing automation</li>
                <li><strong>Consider:</strong> <a href="qa-retainer.html">Retainer engagement</a> for ongoing QA leadership and acceleration</li>
            </ul>
            <p><strong>Priority Focus:</strong> Increase automation coverage (target 60%+), quality gates and release confidence, metrics visibility</p>
        `;
    }

    function getGoodRecommendations() {
        return `
            <h3>Recommended Actions:</h3>
            <ul>
                <li><strong>Immediate:</strong> Expand automation to 80%+ coverage including edge cases</li>
                <li><strong>Week 1-2:</strong> Implement advanced metrics (predictive analytics, quality trends)</li>
                <li><strong>Month 1:</strong> Performance testing automation and baseline monitoring</li>
                <li><strong>Month 2-3:</strong> Cross-platform testing expansion and test data automation</li>
                <li><strong>Consider:</strong> <a href="qa-retainer.html">Strategic retainer</a> for advanced optimization and team enablement</li>
            </ul>
            <p><strong>Priority Focus:</strong> Advanced automation (edge cases, performance), predictive quality metrics, team enablement</p>
        `;
    }

    function getExcellentRecommendations() {
        return `
            <h3>Recommended Actions:</h3>
            <ul>
                <li><strong>Maintain:</strong> Continue monitoring and optimization</li>
                <li><strong>Enhance:</strong> Advanced capabilities (AI-assisted testing, predictive quality)</li>
                <li><strong>Scale:</strong> Enable other teams with your QA frameworks</li>
                <li><strong>Innovate:</strong> Explore emerging QA tools and methodologies</li>
                <li><strong>Consider:</strong> <a href="qa-retainer.html">Strategic partnership</a> for scaling QA across organization</li>
            </ul>
            <p><strong>Focus Areas:</strong> Innovation and emerging technologies, scaling QA practices to other teams, advanced analytics</p>
        `;
    }

    // Create fixed slots before each question so moving the progress bar doesn't change layout (prevents oscillation)
    let progressSlots = [];
    function ensureProgressSlots() {
        if (!form || !progressContainer || questionCards.length === 0) return;

        // If slots already exist, reuse them
        progressSlots = Array.from(form.querySelectorAll('.progress-slot'));
        if (progressSlots.length === questionCards.length) return;

        progressSlots = [];
        questionCards.forEach(card => {
            const slot = document.createElement('div');
            slot.className = 'progress-slot';
            slot.setAttribute('aria-hidden', 'true');
            form.insertBefore(slot, card);
            progressSlots.push(slot);
        });

        // Put progress container into the first slot initially
        if (progressSlots[0] && progressContainer.parentElement !== progressSlots[0]) {
            progressSlots[0].appendChild(progressContainer);
        }
    }

    function syncProgressSlotHeight() {
        if (!form || !progressContainer) return;
        const h = progressContainer.offsetHeight || 72;
        form.style.setProperty('--progress-slot-height', `${h}px`);
    }

    // Move progress bar into the slot above the question in view
    let lastVisibleQuestionIndex = -1;
    function updateProgressBarPosition() {
        if (!form || !progressContainer || questionCards.length === 0) return;

        ensureProgressSlots();
        syncProgressSlotHeight();

        const navbarHeight = 40;
        const minVisibleThreshold = 100; // Only move when question is at least 100px visible

        // Find the question card that's currently most visible in viewport
        let visibleQuestion = null;
        let maxVisibleArea = 0;

        questionCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardTop = rect.top;
            const cardBottom = rect.bottom;
            const viewportBottom = window.innerHeight;

            const visibleTop = Math.max(cardTop, navbarHeight);
            const visibleBottom = Math.min(cardBottom, viewportBottom);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);

            // Only consider questions that are significantly visible (reduces jitter)
            if (visibleArea > minVisibleThreshold && visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                visibleQuestion = card;
            }
        });

        // If no question meets threshold, find the one closest to viewport top
        if (!visibleQuestion) {
            let minDistance = Infinity;
            questionCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardTop = rect.top;
                const distance = Math.abs(cardTop - navbarHeight);
                if (distance < minDistance && cardTop < window.innerHeight) {
                    minDistance = distance;
                    visibleQuestion = card;
                }
            });
        }

        // If still no question, do nothing
        if (!visibleQuestion) return;

        const questionIndex = Array.from(questionCards).indexOf(visibleQuestion);
        if (questionIndex === -1) return;

        // Only move DOM when the visible question actually changed (with hysteresis)
        if (questionIndex !== lastVisibleQuestionIndex) {
            // Temporarily reduce opacity to minimize visual glitch
            progressContainer.style.opacity = '0.7';
            
            // Use requestAnimationFrame to ensure smooth DOM manipulation
            requestAnimationFrame(() => {
                lastVisibleQuestionIndex = questionIndex;
                const targetSlot = progressSlots[questionIndex];
                if (targetSlot && progressContainer.parentElement !== targetSlot) {
                    targetSlot.appendChild(progressContainer);
                }
                
                // Restore opacity after a brief moment
                requestAnimationFrame(() => {
                    progressContainer.style.opacity = '1';
                });
            });
        }
    }

    // Update progress position on scroll/resize (rAF throttle)
    let rafId = null;
    function requestUpdateProgressPosition() {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
            rafId = null;
            updateProgressBarPosition();
        });
    }

    window.addEventListener('scroll', requestUpdateProgressPosition, { passive: true });
    window.addEventListener('resize', () => {
        ensureProgressSlots();
        syncProgressSlotHeight();
        requestUpdateProgressPosition();
    });

    // Initial placement
    ensureProgressSlots();
    syncProgressSlotHeight();
    updateProgressBarPosition();

    // Listen for radio button changes
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const questionName = this.name;
            const questionNum = questionName.replace('q', '');
            scores[questionName] = parseInt(this.value);
            
            // Mark question as answered
            const questionCard = this.closest('.question-card');
            questionCard.classList.add('answered');
            
            updateProgress();
            
            // Update progress bar position after answering (layout may shift)
            requestUpdateProgressPosition();
        });
    });

    // Handle optional email form - using Formspree like contact form
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('emailInput');
            const email = emailInput.value;
            const submitBtn = emailForm.querySelector('.btn-submit-optional');
            const originalBtnText = submitBtn ? submitBtn.textContent : '';
            
            if (!email) {
                return;
            }

            // Disable button during submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Get score data for the email
            const totalScore = calculateScore();
            const averageScore = (totalScore / 10).toFixed(1);
            
            // Prepare form data
            const formData = new FormData();
            formData.append('email', email);
            formData.append('score', totalScore);
            formData.append('average', averageScore);
            formData.append('_subject', 'QA Health Scorecard - Detailed Report Request');
            formData.append('_replyto', email);

            try {
                // Use Formspree endpoint (same as contact form)
                const response = await fetch('https://formspree.io/f/xeopzzyo', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success
                    if (submitBtn) {
                        submitBtn.textContent = '✓ Sent!';
                        submitBtn.style.background = '#10b981';
                        setTimeout(() => {
                            submitBtn.textContent = originalBtnText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 2000);
                    }
                    emailForm.reset();
                    
                    // Show success message
                    const successMsg = document.createElement('p');
                    successMsg.textContent = 'Thank you! We\'ll send your detailed report shortly.';
                    successMsg.style.color = '#10b981';
                    successMsg.style.fontSize = '8px';
                    successMsg.style.marginTop = '8px';
                    emailForm.parentNode.appendChild(successMsg);
                    setTimeout(() => successMsg.remove(), 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting email:', error);
                
                // Fallback: Use mailto for local testing
                const subject = encodeURIComponent('QA Health Scorecard - Detailed Report Request');
                const body = encodeURIComponent(`Email: ${email}\nScore: ${totalScore}/50 (${averageScore}/5.0 average)\n\nPlease send detailed report.`);
                window.location.href = `mailto:payam.dehkordy@gmail.com?subject=${subject}&body=${body}`;
                
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
