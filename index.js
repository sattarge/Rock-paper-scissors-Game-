
    const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };
    const names  = { rock: 'Pathar', paper: 'Kagaz', scissors: 'Qainchi' };
    const options = ['rock', 'paper', 'scissors'];

    let scores = { player: 0, computer: 0, draw: 0 };
    let history = [];
    let animating = false;

    function getResult(p, c) {
      if (p === c) return 'draw';
      if ((p==='rock'&&c==='scissors')||(p==='scissors'&&c==='paper')||(p==='paper'&&c==='rock')) return 'player';
      return 'computer';
    }

    function play(playerChoice) {
      if (animating) return;
      animating = true;

      const compChoice = options[Math.floor(Math.random() * 3)];
      const pBox = document.getElementById('p-box');
      const cBox = document.getElementById('c-box');
      const resultEl = document.getElementById('result-msg');

      // Highlight selected button
      options.forEach(o => document.getElementById('btn-' + o).classList.remove('selected'));
      document.getElementById('btn-' + playerChoice).classList.add('selected');

      // Remove glow classes
      pBox.className = 'choice-box'; cBox.className = 'choice-box';
      resultEl.className = 'result-msg'; resultEl.classList.remove('show');

      // Shake animation
      pBox.textContent = '✊'; cBox.textContent = '✊';
      pBox.classList.add('shake'); cBox.classList.add('shake');

      setTimeout(() => {
        pBox.classList.remove('shake'); cBox.classList.remove('shake');
        pBox.textContent = emojis[playerChoice];
        cBox.textContent = emojis[compChoice];
        pBox.classList.add('pop'); cBox.classList.add('pop');

        const winner = getResult(playerChoice, compChoice);

        if (winner === 'player') {
          scores.player++;
          resultEl.textContent = '🎉 Aap jeet gaye! ' + names[playerChoice] + ' > ' + names[compChoice];
          resultEl.className = 'result-msg win';
          pBox.classList.add('win-glow'); cBox.classList.add('lose-glow');
          history.push('win');
        } else if (winner === 'computer') {
          scores.computer++;
          resultEl.textContent = '😔 Computer jeeta! ' + names[compChoice] + ' > ' + names[playerChoice];
          resultEl.className = 'result-msg lose';
          pBox.classList.add('lose-glow'); cBox.classList.add('win-glow');
          history.push('lose');
        } else {
          scores.draw++;
          resultEl.textContent = '🤝 Barabar! Dono ne ' + names[playerChoice] + ' chuna';
          resultEl.className = 'result-msg draw';
          pBox.classList.add('draw-glow'); cBox.classList.add('draw-glow');
          history.push('draw');
        }

        setTimeout(() => resultEl.classList.add('show'), 50);
        document.getElementById('p-score').textContent = scores.player;
        document.getElementById('c-score').textContent = scores.computer;

        // History dots
        const histEl = document.getElementById('history');
        const dotsEl = document.getElementById('history-dots');
        histEl.style.display = 'block';
        dotsEl.innerHTML = history.slice(-20).map(r =>
          `<div class="dot ${r}" title="${r}"></div>`
        ).join('');

        // Score pulse
        const scoreEl = document.getElementById(winner === 'player' ? 'p-score' : winner === 'computer' ? 'c-score' : 'd-score');
        // scoreEl.style.transform = `scale(1.3)`;
        setTimeout(() => scoreEl.style.transform = '', 200);

        setTimeout(() => {
          pBox.classList.remove('pop'); cBox.classList.remove('pop');
          animating = false;
        }, 400);
      }, 450);
    }

    function resetGame() {
      scores = { player: 0, computer: 0, draw: 0 };
      history = [];
      document.getElementById('p-score').textContent = '0';
      document.getElementById('c-score').textContent = '0';
      document.getElementById('p-box').className = 'choice-box';
      document.getElementById('c-box').className = 'choice-box';
      document.getElementById('p-box').textContent = '🤔';
      document.getElementById('c-box').textContent = '🤖';
      const r = document.getElementById('result-msg');
      r.className = 'result-msg';
      r.textContent = 'Koi bhi haath chuniye shuru karne ke liye!';
      document.getElementById('history').style.display = 'none';
      document.getElementById('history-dots').innerHTML = '';
      options.forEach(o => document.getElementById('btn-' + o).classList.remove('selected'));
      animating = false;
    }

    // Keyboard support: R = rock, P = paper, S = scissors
    document.addEventListener('keydown', e => {
      const key = e.key.toLowerCase();
      if (key === 'r') play('rock');
      else if (key === 'p') play('paper');
      else if (key === 's') play('scissors');
    });