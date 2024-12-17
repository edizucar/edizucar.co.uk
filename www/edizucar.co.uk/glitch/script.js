document.getElementById('glitchButton').addEventListener('click', () => {
    const elements = Array.from(document.body.querySelectorAll('h1, p, button'));
    const glitchTokens = ['@', '#', '$', '%', '^', '&', '*', '!', '~', '?'];
    let glitchSpeed = 200; // Initial glitch interval

    // Step 1: Gradually glitch characters on the page
    const glitchInterval = setInterval(() => {
        // Randomly pick an element and glitch one of its characters
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        if (randomElement) {
            glitchify(randomElement);
        }

        // Accelerate the glitch process
        glitchSpeed *= 0.9; // Speed up by 10% each iteration
        if (glitchSpeed < 10) {
            clearInterval(glitchInterval);
            removeElements(elements); // Proceed to next step
        }
    }, glitchSpeed);

    // Step 2: Replace text content with glitch tokens
    function glitchify(element) {
        const text = element.innerText;
        const chars = text.split('');
        const randomIndex = Math.floor(Math.random() * chars.length);
        chars[randomIndex] = glitchTokens[Math.floor(Math.random() * glitchTokens.length)];
        element.innerText = chars.join('');
    }

    // Step 3: Fade out and remove all elements
    function removeElements(elements) {
        elements.forEach((el) => {
            el.classList.add('hidden');
            setTimeout(() => el.remove(), 1000);
        });

        // Proceed to monster reveal
        setTimeout(revealMonster, 2000);
    }

    // Step 4: Reveal the animated ASCII art monster
    function revealMonster() {
        document.body.style.backgroundColor = 'black';

        const monsterArt = `
           ⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⣤⣤⣤⣀⣀⣀
           ⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄
           ⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆
           ⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀
           ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
           ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
           ⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
           ⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟
           ⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟
           ⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⡿⠋⠀
        `;
        const monster = document.createElement('div');
        monster.className = 'monster';
        monster.innerText = monsterArt + '\nHAHAHAHA!!!';
        document.body.appendChild(monster);
    }
});
