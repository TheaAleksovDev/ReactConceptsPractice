const newPet = () => {
    const pets = ["dog", "cat", "rabbit", "parrot"];
    
    return () => {
        const randomIndex = Math.floor(Math.random() * pets.length);
        const pet = pets[randomIndex];
        console.log("Congrats, you got a " + pet);
    }
}

const yourNextPet = newPet();
yourNextPet();