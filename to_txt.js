import fs from 'fs';
import { generateTextUchange } from './ollama.js';

// Chemin vers le fichier JSON
const filePath = 'test.txt';

// Fonction pour lire et traiter le fichier JSON
fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
    return;
  }

  try {
    // Analyser le contenu JSON en un tableau d'objets
    const jsonContent = data.split('\n').filter(line => line.trim() !== '').map(JSON.parse);

    // const modifiedData = jsonContent.map(async (obj, index) => {
    //   const data = {
    //     model: "llama2",
    //     prompt: obj.website_desc + obj.value_proposition_en + obj.value_proposition_fr,
    //     stream: false
    //   };
    //   const response = await generateTextUchange(data)
    //   console.log("En cours", index, response.response);
    //   return { ...obj, response: response.response };
    // });

    // Promise.all(modifiedData).then(async (modifiedData) => {
      // Convertir les objets modifiés en JSON
      const jsonData = jsonContent.map(obj => JSON.stringify(obj.id + '\n\n' + obj.website_desc + '\n\n' + obj.value_proposition_en + '\n\n-' + obj.value_proposition_fr)).join('\n');
      // Enregistrer les modifications dans le fichier
      // fs.writeFile(filePath, jsonData, 'utf8');
      fs.writeFileSync(filePath, jsonData);
      console.log('Les modifications ont été enregistrées avec succès.');
    // })
    // .catch(err => {
    //   console.error('Erreur lors de l\'enregistrement du fichier :', err);
    // });
  } catch (error) {
    console.error('Erreur lors du traitement du fichier JSON :', error);
  }
});
