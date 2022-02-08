import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseApp } from "../util/firebaseConnection";
import { message } from "../util/types";
import { useMoralis } from "react-moralis";
import { MessageSharp } from "@mui/icons-material";
export const Chat = () => {
  const [messages, setMessages] = useState([] as message[]);
  const { Moralis, user } = useMoralis();
  useEffect(() => {
    return onSnapshot(
      query(
        collection(getFirestore(firebaseApp), "messages"),
        orderBy("id", "asc")
      ),
      (query) => {
        let messages = [] as message[];
        query.forEach((doc) => messages.push(doc.data() as message));
        setMessages(messages);
      }
    );
  }, []);
  if (user.attributes.ethAddress)
    return (
      <ChatBox
        messages={messages}
        user={{
          uid: user.attributes.ethAddress,
        }}
        onSubmit={(text: string) => {
          addDoc(collection(getFirestore(firebaseApp), "messages"), {
            text: text,
            id: messages.length + 1,
            sender: {
              uid: user.attributes.ethAddress,
              name: user.attributes.ethAddress,
              avatar:
                "https://data.cometchat.com/assets/images/avatars/ironman.png",
            },
          });
        }}
      />
    );
  else {
    return null;
  }
};
