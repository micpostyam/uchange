import fs from 'fs';

// Lire le contenu du fichier JSON
const inputFilename = 'mistral.json';

const correctedJson = (data) => {
    let line = "{}"
    if (!data.trim().endsWith('}')) {
        line = data.trim() + '}';
    }else{
        line = data;
    }

    return line.replace(/([{,])\s*([^",\s]+)\s*:/g, '$1"$2":');
}

fs.readFile(inputFilename, 'utf8', async (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier :', err);
      return;
    }
  
    try {
      // Analyser le contenu JSON en un tableau d'objets
      const jsonContent = data.split('\n').filter(line => line.trim() !== '').map(JSON.parse);
  
      const modifiedData = jsonContent.map(async (obj, index) => {     
        const { incubateur, accelerateur } = JSON.parse(correctedJson(obj.response));
        const { response, ...newJson } = obj;
        return { ...newJson,  incubateur, accelerateur};
      });
        
  
      Promise.all(modifiedData).then(async (modifiedData) => {
        // Convertir les objets modifiés en JSON
        const jsonData = modifiedData.map(obj => JSON.stringify(obj)).join('\n');
  
        // Enregistrer les modifications dans le fichier
        await fs.promises.writeFile(inputFilename, jsonData, 'utf8');
        console.log('Les modifications ont été enregistrées avec succès.');
      })
      .catch(err => {
        console.error('Erreur lors de l\'enregistrement du fichier :', err);
      });
    } catch (error) {
      console.error('Erreur lors du traitement du fichier JSON :', error);
    }
  });
