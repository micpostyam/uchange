import fs from 'fs';
import { generateTextUchange } from './ollama.js';

// Chemin vers le fichier JSON
const filePath = 'test.json';

// Fonction pour lire et traiter le fichier JSON
fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
    return;
  }

  try {
    // Analyser le contenu JSON en un tableau d'objets
    const jsonContent = data.split('\n').filter(line => line.trim() !== '').map(JSON.parse);

    const modifiedData = jsonContent.map(async (obj) => {
      const data = {
        model: "mistral",
        prompt: obj.website_desc + obj.value_proposition_en + obj.value_proposition_fr,
        stream: false
      };
      const response = await generateTextUchange(data)
      console.log("En cours", response.response);
      return { ...obj, response: response.response };
    });

    Promise.all(modifiedData).then(async (modifiedData) => {
      // Convertir les objets modifiés en JSON
      const jsonData = modifiedData.map(obj => JSON.stringify(obj)).join('\n');

      // Enregistrer les modifications dans le fichier
      await fs.writeFile(filePath, jsonData, 'utf8');
      console.log('Les modifications ont été enregistrées avec succès.');
    })
    .catch(err => {
      console.error('Erreur lors de l\'enregistrement du fichier :', err);
    });
  } catch (error) {
    console.error('Erreur lors du traitement du fichier JSON :', error);
  }
});
