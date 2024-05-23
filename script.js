document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll('.row');
    let currentRow = 0;
    const rowInputs = Array.from(rows).map(row => row.querySelectorAll('.textbx'));

    function checkRowCompletion(row) {
        return Array.from(row).every(input => input.value.length === 1);
    }

    function enableNextRow() {
        if (currentRow + 1 < rowInputs.length) {
            currentRow++;
            rowInputs[currentRow].forEach(input => input.removeAttribute('disabled'));
            rowInputs[currentRow][0].focus();
        }
    }

    rowInputs.forEach((row, rowIndex) => {
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
                if (e.key === 'Enter' || e.key === 'Return') {
                    if (checkRowCompletion(rowInputs[currentRow])) {
                        const word = Array.from(rowInputs[currentRow]).map(input => input.value).join('');
                        console.log(word);

                        enableNextRow();
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