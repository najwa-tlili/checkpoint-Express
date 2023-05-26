const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware pour vérifier l'heure de la demande
const WorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
};

app.use(WorkingHours);
app.set('view engine', 'html');

// Middleware pour traiter les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Page d'accueil
app.get('/', (req, res) => {
  res.render('home');
});

// Page Nos services
app.get('/services', (req, res) => {
  res.render('services');
});

// Page Contactez-nous
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000');
});
