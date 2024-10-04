const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

let apostas = []

router.get('/', (req, res) => {
    let resultado = []
    apostas.forEach((aposta) => {
        const { idCliente, evento } = req.query
        if (
            aposta.idCliente.includes(idCliente) || 
            aposta.evento.includes(evento)
        ) {
            resultado.push(aposta)
        }
    })
    res.send(resultado)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    for (let i = 0; i < apostas.length; i++) {
        const aposta = apostas[i]
        if (aposta.id === id) {
            res.send(aposta)
            return
        }
    }
    res.status(404).send('Aposta não encontrada!')
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    for (let i = 0; i < apostas.length; i++) {
        const aposta = apostas[i]
        if (aposta.id === id) {
            apostas.splice(i, 1)
            res.send(aposta)
            return
        }
    }
    res.status(404).send('Aposta não encontrada!')
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    for (let i = 0; i < apostas.length; i++) {
        const aposta = apostas[i]
        if (aposta.id === id) {
            const { idCliente, evento, valor } = req.body
            aposta.idCliente = idCliente
            aposta.evento = evento
            aposta.valor = valor
            res.send(aposta)
            return
        }
    }
    res.status(404).send('Aposta não encontrada!')
})

router.post('/', (req, res) => {
    const { idCliente, evento, valor } = req.body
    const aposta = {
        id: uuidv4(),
        idCliente, 
        evento, 
        valor 
    }
    apostas.push(aposta)
    res.send(aposta)
})

module.exports = router