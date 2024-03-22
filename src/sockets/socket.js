/* eslint-disable no-console */
import socket from 'socket.io'
import express from 'express'
import http from 'http'

// import env from '~/config/environment'

const app = express()
const server = http.createServer(app)
const io = socket(server)

io.on('connection', (client) => {
  console.log(`Connection: ${client}`)

  client.on('new_message', (message) => {
    console.log(`New message: ${message}`)
  })
})
