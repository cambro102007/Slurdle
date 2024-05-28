document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll('.row');
    let currentRow = 0;
    const rowInputs = Array.from(rows).map(row => row.querySelectorAll('.textbx'));

    function checkRowCompletion(row) {
        return Array.from(row).every(input => input.value.length === 1);
    }

    function enableNextRow() {
        if (currentRow + 1 < rowInputs.length) {
            rowInputs[currentRow].forEach(input => input.setAttribute('disabled', 'true'));
            currentRow++;
            rowInputs[currentRow].forEach(input => input.removeAttribute('disabled'));
            rowInputs[currentRow][0].focus();
        }
    }

    function checkWord(word) {
        const word1 = "trial";
        const word1Array = word1.split('');
        const wordArray = word.split('');

        for (let i = 0; i < word.length; i++) {
            if (word[i] === word1[i]) {
                rowInputs[currentRow][i].classList.add('correct');
            } else if (word1Array.includes(word[i])) {
                rowInputs[currentRow][i].classList.add('wrong-position');
            } else {
                rowInputs[currentRow][i].classList.add('not-in-word');
            }
        }

        if (word === word1) {
            endGame();
        } else {
            enableNextRow();
        }
    }

    function endGame() {
        const rows = document.querySelectorAll('.row');
        rows.forEach(row => {
            row.querySelectorAll('.textbx').forEach(input => {
                input.setAttribute('disabled', 'true');
            });
        });
    }

    rowInputs.forEach((row, rowIndex) => {
        if (rowIndex !== currentRow) {
            row.forEach(input => input.setAttribute('disabled', 'true'));
        }

        row.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length > 1) {
                    input.value = input.value[0];
                }
                if (input.value.length === 1) {
                    const nextInput = row[index + 1];
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            input.addEventListener('keydown', (e) => {
                if (
                    (e.keyCode < 65 || e.keyCode > 90) &&
                    (e.keyCode < 97 || e.keyCode > 122) &&
                    e.keyCode !== 8 &&
                    e.keyCode !== 13
                ) {
                    e.preventDefault();
                }
                if (e.key === 'Enter' || e.key === 'Return') {
                    if (checkRowCompletion(rowInputs[currentRow])) {
                        const word = Array.from(rowInputs[currentRow]).map(input => input.value).join('');
                        console.log('Word:', word);

                        checkWord(word);
                    }
                } else if (e.key === 'Backspace' && input.value.length === 0) {
                    const prevInput = row[index - 1];
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
        });
    });
});