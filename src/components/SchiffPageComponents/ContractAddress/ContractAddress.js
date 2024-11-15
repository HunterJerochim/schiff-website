import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const ContractAddress = () => {
  const contract = "G7Qyg6omCK2ff2g9pzzaURZUqoPLvNQHmg26pVGBpump";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(contract)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy!", err);
          alert("Failed to copy the contract address.");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = contract;

      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy!", err);
        alert("Failed to copy the contract address.");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <MainContractContainer>
      <ContractAddressTitle>Copy the Contract Address</ContractAddressTitle>
      <ContractContainer
        onClick={handleCopy}
        title={contract}
        tabIndex="0"
        role="button"
        aria-label="Copy contract address"
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCopy();
          }
        }}
      >
        {contract}
      </ContractContainer>
      {copied && <CopyMessage>Copied!</CopyMessage>}
    </MainContractContainer>
  );
};

export default ContractAddress;

const MainContractContainer = styled.div`
  margin-top: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const titleGlow = keyframes`
  0% {
    color: #1a1a1a; 
    text-shadow: 0 0 2px #1a1a1a, 0 0 4px #1a1a1a;
  }
  50% {
    color: #000000; 
    text-shadow: 0 0 2px #000000, 0 0 4px #000000;
  }
  100% {
    color: #1a1a1a; 
    text-shadow: 0 0 2px #1a1a1a, 0 0 4px #1a1a1a;
  }
`;

const ContractAddressTitle = styled.h1`
  color: #1a1a1a;
  padding: 20px;
  animation: ${titleGlow} 4s infinite;
  border-radius: 5px;
  font-family: "Sour Gummy", sans-serif;
  text-align: center;
  font-size: 2.5rem;
`;

const ContractContainer = styled.div`
  background-color: #1d1d1d;
  padding: 12px 20px;
  border-radius: 20px;
  border: 1px solid #a0a0a0;
  display: inline-block;
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  color: #e1e1a3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d2d2d;
  }

  &:focus {
    outline: 2px solid #4caf50;
    background-color: #2d2d2d;
  }
`;

const CopyMessage = styled.div`
  margin-top: 10px;
  color: #4caf50;
  font-size: 14px;
  opacity: 0.9;
  transition: opacity 0.3s;
`;
