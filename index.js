// Importer le module Express
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

// Créer une application Express
const app = express();

// Middleware pour permettre la gestion des données JSON dans les requêtes POST
app.use(express.json());
app.use(cors());

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

// Route pour gérer la requête POST
app.post('/api/generate', async (req, res) => {
  try {
    // Extraire les données JSON de la requête
    const { model, prompt, stream } = req.body;

    // Vous pouvez traiter les données asynchrones ici
    // Dans cet exemple, je vais simplement les renvoyer telles quelles
    const data = {
      model: model,
      prompt: prompt,
      stream: stream
    };

    const result = await generateText(data);

    // Renvoyer le résultat sous forme de réponse JSON
    res.json(result);
  } catch (error) {
    // Gérer les erreurs ici
    console.error('Une erreur est survenue :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors du traitement.' });
  }
});

app.get('/', (req, res) => {
  res.send('Bonjour, monde !');
});

// Définir le port d'écoute
const port = 80;

// Démarrer le serveur et écouter les connexions entrantes
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

