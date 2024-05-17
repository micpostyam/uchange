import fetch from 'node-fetch';
const OLLAMA_BASE_URL = 'http://localhost:11434/api';

export const generateText = async (data) => {
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

export const generateTextUchange = async (data) => {
  let prompt = "Tu es une API REST, tu réponds uniquement au format JSON sous la forme {incubateur: 1 ou 0, accelerateur: 1 ou 0}, tu dois être précis, sans faire de commentaire, pas de description ni tout autre information juste du JSON. A partir de la description suivante tu dois pourvoir dire si une entreprise est un incubateur et/ou accelerateur ou non. Je te rappelle la définition d'incubateur et d'accélérateur: Une entreprise incubateur est une structure qui offre un soutien et des ressources aux entrepreneurs et aux jeunes entreprises au stade initial de leur développement. Ces ressources peuvent inclure un espace de travail partagé, un mentorat, des conseils en gestion, un accès à un réseau professionnel, et parfois même un financement initial. D'autre part, une entreprise accélérateur est une organisation qui travaille avec des startups déjà établies pour accélérer leur croissance. Les accélérateurs fournissent généralement un programme intensif de mentorat, de formation, de mise en réseau et de financement sur une période définie, visant à aider les startups à atteindre rapidement de nouveaux marchés, à développer leur clientèle et à accroître leur valeur. Je te rappelle encore de ne faire aucun commentaire dans ta réponse.Voici la description: "

  data.prompt = prompt + data.prompt;

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