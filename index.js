// Importer le module Express
import express from 'express';
import cors from 'cors';
import { generateText, generateTextUchange } from './ollama';

// Créer une application Express
const app = express();

// Middleware pour permettre la gestion des données JSON dans les requêtes POST
app.use(express.json());
app.use(cors());

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

    const result = await generateTextUchange(data);

    // Renvoyer le résultat sous forme de réponse JSON
    res.json(result);
  } catch (error) {
    // Gérer les erreurs ici
    console.error('Une erreur est survenue :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors du traitement.' });
  }
});

app.post('/api/chat', async (req, res) => {
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

