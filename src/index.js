// Importation des différents modules
const express = require("express")
const path = require("path")
const users = require("./data")

// Initialisation des variables
const port = 3000
const publicFolder = path.join(__dirname, "../public")

// Création de mon serveur
const app = express()

// Utilisation de middleware
app.use(express.json()) // Pour parser le req.body qui serait au format json
app.use(express.static(publicFolder))

// Création des routes - GET - POST - PATCH - PUT - DELETE
app.get("/", (req, res) => {
	res.send("Hello world")
})

app.get("/contact", (req, res) => {
	res.send("Page Contact")
})

app.get("/bienvenue", (req, res) => {
	res.send("<h1>Welcome!</h1>")
})

app.get("/json", (req, res) => {
	res.send({
		user: "Paul le poulpe",
		age: 2,
	})
})

app.post("/json", (req, res) => {
	console.log("Requête POST reçue")
	console.log(req.body)
	res.json(req.body)
})

app.get("/users", (req, res) => {
	res.json(users)
})

app.get("/users/:id", (req, res) => {
	// Grâce à :id dans l'url, je précise que tout ce qui viendra après /users/ sera stocké dans la variable "req.params.id"
	// Si je le nomme "/users/:mavar", cela sera stocké dans "req.params.mavar"
	// http://localhost:3000/users/3 -> req.params.id sera égal à 3
	const foundUser = users.find(user => user.id == req.params.id)
	if (!foundUser) return res.send("Utilisateur inconnu")
	res.json(foundUser)
})

app.get("/search", (req, res) => {
	// Pour récupérer les query parameters (ce qui est après le "?" dans une url), on peux utiliser la variable req.query
	// http://localhost:3000/search?color=green&size=m
	// req.query affichera {color: 'green', size= 'm'}
	console.log(req.query)
	res.json(req.query)
})

// Si aucune des routes du dessus ne convient, alors je renvoie la page 404. Attention, cette route doit être la dernière.
app.get("*", (req, res) => {
	res.send("<p>Page 404</p>")
})

// Lancement de mon serveur afin qu'il écoute les requêtes entrantes
app.listen(port, () => {
	console.log(`Serveur lancé sur: http://localhost:${port}`)
})