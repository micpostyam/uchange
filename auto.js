const fs = require('fs');

// Chemin vers le fichier JSON
const filePath = 'test.json';

const OLLAMA_BASE_URL = 'http://localhost:11434/api';

const generateText = async (data) => {
    try {
      const response = await fetch(OLLAMA_BASE_URL+"/generate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Error generating text');
      }
  
      const generatedText = await response.json();
      // Faites quelque chose avec le texte généré ici
      return generatedText;
    } catch (error) {
      console.error('Error:', error);
    }
}

// Fonction pour lire et traiter le fichier JSON
fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
    return;
  }

  try {
    // Analyser le contenu JSON en un tableau d'objets
    const jsonContent = data.split('\n').filter(line => line.trim() !== '').map(JSON.parse);

    // Ajouter la clé `response` à chaque objet
    const data = {
        model: model,
        prompt: prompt,
        stream: stream
    };
  
    const result = await generateText(data);

    const modifiedData = jsonContent.map(obj => ({ ...obj, response: 'valeur_de_response' }));

    // Convertir les objets modifiés en JSON
    const jsonData = modifiedData.map(obj => JSON.stringify(obj)).join('\n');

    // Enregistrer les modifications dans le fichier
    fs.writeFile(filePath, jsonData, 'utf8', err => {
      if (err) {
        console.error('Erreur lors de l\'enregistrement du fichier :', err);
        return;
      }
      console.log('Les modifications ont été enregistrées avec succès.');
    });
  } catch (error) {
    console.error('Erreur lors du traitement du fichier JSON :', error);
  }
});
