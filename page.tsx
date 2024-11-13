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
  // TODO: Load wallet

  // TODO: useState for inputMessage

  // TODO: Add useSubmitTransaction hook

  // TODO: get Module with useGetModule

  // TODO: get messages data using useView 

  const addMessage = async () => {
    // TODO: in a try/catch call submitTransaction

    // TODO: if transactionSubmitted, call refetch

    // TODO: catch and log errors
  };

  const clearBillboard = async () => {
    // TODO: in a try/catch call clear using sunmitTransaction
    // TODO: if transactionSubmitted, call refetch
    // TODO: catch and log errors
  };

  return (
    <div className="flex items-center flex-col flex-grow">
      <div className="flex flex-col items-center bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl p-6 mt-8 w-full max-w-lg">
        <div className="text-xl">Billboard Messages</div>
        <p className="text-sm mb-2">Post and view messages on the Aptos blockchain.</p>
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
          <p className="my-2 font-medium">Connected Address:</p>
          {/* TODO: Show account address in an Address component */}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 p-6 mt-8 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Post a Message</h2>
        <div className="w-full flex flex-col space-y-2">
          {/* TODO: Use InputBase for user input message */}
          
        </div>
        {/* TODO: Disable the button if account is not connected or input message is empty */}
        <button 
          className="btn btn-secondary mt-2" 
          onClick={addMessage}
        >
          Post Message
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 p-6 mt-8 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Messages</h2>
        <div className="flex gap-2">
            {/* TODO: Add button to refesh billboard */}
            
            {/* TODO: Only show this button if the owner address is connected */}
            <button 
              className="btn btn-error btn-sm" 
                onClick={clearBillboard}
              >
                Clear All
              </button>
            
            {/* //  */}
          </div>

        {/* 
        TODO: Display messages 
        hint: only show if messages is not empty and is not loading
        hint: data[0] contains the array of up to 5 messages.
         */}

          <div className="space-y-4 w-full max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">From:</span>
                  {/* TODO: Show address of poster */}
                </div>
                <div className="mt-2">
                  {/* TODO: Show message content */}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {/* 
                  TODO: Show date of message
                  hint: {new Date(message.added_at * 1000).toLocaleString()}
                  */}
                </div>
          </div>
      </div>
    </div>
  );
};

export default Billboard;