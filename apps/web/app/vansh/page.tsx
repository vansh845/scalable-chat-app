'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

const namespaces = ['/vansh', '/garry'];

const socket = io(`http://localhost:8000/vansh`)
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
            socket.emit('message', JSON.stringify({ message: message, channel: '/vansh' }));
            setMessage('')
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return (
        <main className="p-2 flex h-screen">
            <div id="people" className="border-r w-1/4 ">
                <ul>
                    <li>Vansh</li>
                    <li>Ashi</li>
                </ul>
            </div>
            <div className="w-full flex flex-col h-auto">

                <div className="w-full h-full" id="chats">
                    {event}
                </div>

                <form className="flex w-full" onSubmit={handleSubmit}>
                    <input className="border border-black w-full" type="text" name="message" value={message} id="message" onChange={handleChange} />
                    <button className="border border-black" type="submit">send</button>
                </form>
            </div>
        </main>
    );
}
