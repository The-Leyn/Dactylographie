// fetch('text.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Erreur de réseau ou fichier introuvable');
//     }
//     return response.json();
//   })
//   .then(data => {
//     let paragrapheComplet = document.getElementById('complet');
//     let paragraphePartiel = document.getElementById('partiel');
//     let content = data[0].content;
//     paragrapheComplet.textContent = data[0].content;

//     let index = 0;

//     // Ajoute un gestionnaire d'événement pour la touche enfoncée
//     document.addEventListener('keydown', function(event) {
//       // Vérifie si la touche enfoncée correspond à la lettre attendue
//       if (event.key === content[index] || event.key === "'" && content[index] === "’" || event.code === `Key${content[index].toUpperCase()}`) {
//         // Met à jour le texte partiel avec la lettre tapée
//         paragraphePartiel.textContent += event.key;
//         index++;

    
        

//         // Vérifie si toutes les lettres ont été tapées
//         if (index === content.length) {
//           alert('Test de dactylographie terminé!');
//           // Vous pouvez ajouter d'autres actions après la fin du test
//         }
//       }
//     });

//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Erreur lors de la récupération des données JSON:', error);
//   });





// Focus sur le input
window.onload = function() {
    var monInput = document.getElementById('partiel');
    
    monInput.value = null
    monInput.focus();
  };




fetch('text.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau ou fichier introuvable');
    }
    return response.json();
  })
  .then(data => {
    let paragrapheComplet = document.getElementById('complet');
    let paragraphePartiel = document.getElementById('partiel');
    let content = data[0].content;
    paragrapheComplet.textContent = content;

   // Wrap each letter in a span for individual styling
    paragrapheComplet.innerHTML = content
    .split('')
    .map((letter, index) => `<span id="letter${index}">${letter}</span>`)
    .join('');

    let index = 0;
    let errorCount = 0;
    console.log("erreur count"+errorCount);
    // Ajoute un gestionnaire d'événement pour la touche enfoncée
    document.addEventListener('keydown', function(event) {
        let currentLetterSpan = document.getElementById(`letter${index}`);
        let nextLetterSpan = document.getElementById(`letter${index + 1}`);
        // let prevoiusLetterSpan = document.getElementById(`letter${index - 1}`);
      // Vérifie si la touche enfoncée correspond à la lettre attendue
      
      if (event.key === content[index] || event.key === "'" && content[index] === "’") {
        // Met à jour le texte partiel avec la lettre tapée
        paragraphePartiel.textContent += event.key;
        index++;

        currentLetterSpan.style.color = "green";
        if(index < content.length){

            nextLetterSpan.style.backgroundColor = "orange";
        }
        currentLetterSpan.style.backgroundColor = "transparent";

        console.log(`lettre actuel : ${index}, taille du texte : ${content.length}`);
        // Vérifie si toutes les lettres ont été tapées
        
        if (index === content.length) {
            // Add other actions after the test completion if needed
            checkCompletion(errorCount); // Appel de la fonction checkCompletion ici
        }
      } else if(event.key !== content[index] && event.key !== "'" && content[index] !== "’" && !event.shiftKey && !isExcludedKey(event)) {
        currentLetterSpan.style.backgroundColor = "red";
        errorCount++;
        
      }
    });

    console.log(data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données JSON:', error);
  });

  function checkCompletion(errorCount) {
    if (errorCount === 0) {
      alert('Test de dactylographie terminé sans erreurs !');
      // Ajoutez d'autres actions après la fin du test si nécessaire
    } else {
      alert(`Test de dactylographie terminé avec ${errorCount} erreur(s).`);
      // Ajoutez d'autres actions en cas d'erreurs si nécessaire
    }
  }
  function isExcludedKey(event) {
    // Define the key codes or names of the keys you want to exclude
    const excludedKeys = ['Tab', 'CapsLock', 'Control', 'Alt', 'Meta'];
    return excludedKeys.includes(event.key) || excludedKeys.includes(event.code);
  }



