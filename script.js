document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll('.row');
    let currentRow = 0;
    const rowInputs = Array.from(rows).map(row => row.querySelectorAll('.textbx'));

    const wordList = [
        "Abbie", "mites", "Apple", "Argie", "Asing", "Aseng", "Sally", "Bimbo", "Black", 
        "black", "brute", "brown", "brown", "brute", "Boche", "bosch", "hater", "Boong", 
        "boong", "bunga", "Bakra", "Bushy", "Eater", "Camel", "camel", "China", "Swede", 
        "Ching", "chong", "Chink", "Cholo", "Chile", "népek", "Cokin", "South", "Cushi", 
        "Kushi", "Dalle", "Batak", "Dalle", "darky", "Dhoti", "Dogan", "dogun", "Eight", 
        "8ball", "guizi", "juif)", "Frenk", "Fritz", "fricc", "Gabel", "Gadjo", "Galla", 
        "Garoi", "(검둥이)", "Gexhë", "Godon", "Gooky", "(गोरा", "گورا)", "Goyim", "Goyum", 
        "Grago", "Groid", "Gubba", "Guizi", "Guido", "Ginzo", "Gyopo", "Kyopo", "Gypsy", 
        "Gyppo", "gippo", "gyppy", "Hajji", "Hadji", "Haole", "Honky", "Huana", "Hujaa", 
        "Hunky", "Hymie", "[from", "Indon", "Injun", "Jakun", "Jamet", "Jamet", "women", 
        "Japie", "Jawir", "Jerry", "Jidan", "jocky", "bunny", "Jutku", "(แกว)", "kafir", 
        "South", "Kalar", "Kalia", "Kallu", "Katwa", "Katwe", "kacap", "Kebab", "Kettō", 
        "Khach", "Ikula", "(코쟁이)", "Kraut", "Māori", "Labus", "thief", 
        "Leupe", "lonko", "Limey", "Londo", "Lubra", "Lundy", "Lugan", "Majus", "Malau", 
        "Malon", "Mango", "Manne", "Mocro", "Muklo", "Nawar", "niger", "nigor", "nigra", 
        "nigre", "nigar", "nigga", "negro", "neger", "neche", "nichi", "nidge", "Paddy", 
        "Pepsi", "Pikey", "piker", "Pilak", "Paddy", "Plouc", "Pocho", "pocha", "Polak", 
        "Pommy", "Grant", "Potet", "Pshek", "Roske", "ruski", "ryssä", "Sambo", "(三国人)", 
        "Party", "Seppo", "river", "Sibun", "Shina", "Zhina", "Shine", "(死阿陸)", "Slant", 
        "Slobo", "Slope", "slopy", "Sooty", "Fairy", "Spade", "spick", "Spook", "Squaw", 
        "banan", "Swamp", "Szkop", "Szwab", "Taffy", "(also", "Teig)", "Tanka", "Tibla", 
        "Timur", "Tonto", "Touch", "brush", "Towel", "Turco", "Turko", "Twink", "Ukrop", 
        "Uncle", "Vanja", "Wagon", "White", "White", "Wigga", "white", "White", "White", 
        "trash", "Rìběn"
    ];

    const word1 = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    console.log("Random word to guess:", word1);

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

        // Check if the whole word is correct
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