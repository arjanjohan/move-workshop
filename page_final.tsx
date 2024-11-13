"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import type { NextPage } from "next";
import { Address, InputBase } from "~~/components/scaffold-move";
import { useGetAccountResource } from "~~/hooks/scaffold-move";
import { useGetModule } from "~~/hooks/scaffold-move/useGetModule";
import useSubmitTransaction from "~~/hooks/scaffold-move/useSubmitTransaction";
import { useView } from "~~/hooks/scaffold-move/useView";

// Alert Component for showing error messages or warnings
const Alert = ({ message }: { message: string }) => (
  <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
    <p className="text-3xl mt-14">{message}</p>
  </div>
);


const Billboard: NextPage = () => {
  const { account } = useWallet();
  const [inputMessage, setInputMessage] = useState<string>("");

  const { submitTransaction, transactionResponse, transactionInProcess } = useSubmitTransaction("billboard");

  const moveModule = useGetModule("billboard");
  const billboardAbi = moveModule?.abi;

  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useView({ moduleName: "billboard", functionName: "get_messages", args: [] });

  // If the billboard module or ABI is not found, show an alert message and return early
  if (!billboardAbi) {
    return <Alert message="Billboard module not found!" />;
  }

  const addMessage = async () => {
    if (!inputMessage) {
      console.error("Message is empty");
      return;
    }

    try {
      await submitTransaction("add_message", [inputMessage]);

      if (transactionResponse?.transactionSubmitted) {
        console.log("Transaction successful:", transactionResponse.success ? "success" : "failed");
        setInputMessage(""); // Clear input after successful submission
        await refetchMessages(); // Refresh messages
        console.log(messages);
      }
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const clearBillboard = async () => {
    try {
      await submitTransaction("clear", []);

      if (transactionResponse?.transactionSubmitted) {
        console.log("Billboard cleared:", transactionResponse.success ? "success" : "failed");
        await refetchMessages(); // Refresh messages after clearing
      }
    } catch (error) {
      console.error("Error clearing billboard:", error);
    }
  };

  // const isOwner = account?.address === "0x{{ your_contract_address }}"; // Replace with your actual contract address

  return (
    <div className="flex items-center flex-col flex-grow">
      <div className="flex flex-col items-center bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl p-6 mt-8 w-full max-w-lg">
        <div className="text-xl">Billboard Messages</div>
        <p className="text-sm mb-2">Post and view messages on the Aptos blockchain.</p>
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={account?.address} />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 p-6 mt-8 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Post a Message</h2>
        <div className="w-full flex flex-col space-y-2">
          <InputBase 
            placeholder="Write your message" 
            value={inputMessage} 
            onChange={setInputMessage} 
          />
        </div>
        <button 
          className="btn btn-secondary mt-2" 
          disabled={!account || !inputMessage} 
          onClick={addMessage}
        >
          Post Message
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 p-6 mt-8 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Messages</h2>
        <div className="flex gap-2">
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => refetchMessages()}
            >
              Refresh
            </button>
            {/* {isOwner &&  */}
            <button 
              className="btn btn-error btn-sm" 
                onClick={clearBillboard}
              >
                Clear All
              </button>
            
            {/* //  */}
          </div>

        {messages && !isLoadingMessages && (
          <div className="space-y-4 w-full max-w-lg">
            {messages[0].map((msg: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">From:</span>
                  <Address address={msg.sender} />
                </div>
                <div className="mt-2">
                  <p className="text-sm">{msg.message}</p>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Posted at: {new Date(msg.added_at * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Billboard;