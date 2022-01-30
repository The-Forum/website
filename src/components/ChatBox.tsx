import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component'
import { useEffect, useState } from 'react';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseApp } from '../util/firebaseConnection';
import { message } from '../util/types';
import { useMoralis } from 'react-moralis';
import { MessageSharp } from '@mui/icons-material';
export const Chat = () => {
    const [messages, setMessages] = useState([] as message[])
    const { Moralis } = useMoralis()
    useEffect(() => {
        return onSnapshot(query(collection(getFirestore(firebaseApp), "messages"), orderBy("id", "asc")), (query) => {
            let messages = [] as message[]
            query.forEach((doc) => messages.push(doc.data() as message))
            setMessages(messages)
        })
    }, [])
    if (Moralis.account)
        return (
            <ChatBox
                messages={messages}
                user={{
                    "uid": Moralis.account,
                }}
                onSubmit={(text: string) => {
                    addDoc(collection(getFirestore(firebaseApp), "messages"), {
                        text: text,
                        id: messages.length + 1,
                        sender: {
                            "uid": Moralis.account,
                            "name": Moralis.account,
                            "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
                        }
                    })
                }}
            />
        )
    else {
        return null
    }
}