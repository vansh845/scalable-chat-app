'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:8000')
export default function Page(): JSX.Element {

  const [message, setMessage] = useState('');
  const [event, setEvent] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setEvent(message)
    })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      socket.emit('message', message);
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" value={message} id="message" onChange={handleChange} />
        <button type="submit">send</button>
      </form>
      <p>{event}</p>
    </main>
  );
}
