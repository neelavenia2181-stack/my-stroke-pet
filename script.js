let rock = {
    hunger: 0,
    happiness: 100,
    age: 0
};

function loadRock() {
    const saved = localStorage.getItem('petRock');
    if (saved) {
        rock = JSON.parse(saved);
    }
    updateUI();
}

function saveRock() {
    localStorage.setItem('petRock', JSON.stringify(rock));
}


function updateUI() {
    document.getElementById('hunger').innerText = rock.hunger;
    document.getElementById('happiness').innerText = rock.happiness;
    document.getElementById('age').innerText = rock.age;
    
   
    const art = document.getElementById('ascii-art');
    if (rock.hunger > 80) {
        art.innerText = "      _______\n    /       \\\n   |  X   X  |\n   |    ∆    |\n    \\  ___  /\n      -----"; // Sad/Hungry
    } else if (rock.happiness < 30) {
        art.innerText = "      _______\n    /       \\\n   |  -   -  |\n   |    ∆    |\n    \\  ___  /\n      -----"; // Bored
    } else {
        art.innerText = "      _______\n    /       \\\n   |  O   O  |\n   |    ∆    |\n    \\  ___  /\n      -----"; // Happy
    }
}


function feed() {
    rock.hunger = Math.max(0, rock.hunger - 20);
    rock.happiness = Math.min(100, rock.happiness + 5);
    showMessage("Yum! That was tasty.");
    saveRock();
    updateUI();
}

function play() {
    if (rock.hunger > 80) {
        showMessage("Too hungry to play!");
        return;
    }
    rock.happiness = Math.min(100, rock.happiness + 20);
    rock.hunger = Math.min(100, rock.hunger + 10);
    showMessage("Whee! That was fun.");
    saveRock();
    updateUI();
}

function sleep() {
    rock.age += 1;
    rock.hunger = Math.min(100, rock.hunger + 10);
    rock.happiness = Math.max(0, rock.happiness - 5);
    showMessage("Rock slept well. It is now older.");
    saveRock();
    updateUI();
}

function reset() {
    if(confirm("Reset your rock?")) {
        rock = { hunger: 0, happiness: 100, age: 0 };
        saveRock();
        updateUI();
        showMessage("Rock reborn!");
    }
}

function showMessage(msg) {
    document.getElementById('message').innerText = msg;
}


setInterval(() => {
    rock.hunger = Math.min(100, rock.hunger + 5);
    rock.happiness = Math.max(0, rock.happiness - 2);
    saveRock();
    updateUI();
}, 10000);


loadRock();  