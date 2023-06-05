import React, { useState, useEffect } from "react";
//ethers&contract
import { ethers } from "ethers";
import { DONATE_ADDRESS } from "../constants/addresses";
import { DONATE_ABI } from "../constants/abi";
//hooks
import { useProvider } from "../hooks/useProvider";
import { useSigner } from "../hooks/useSigner";
import { useAddress } from "../hooks/useAddress";
import { useContract } from "../hooks/useContract";
//redux
import { setDonateContract } from "../store/slicers/contract";
import { batch, useDispatch } from "react-redux";
import {
  setAccount,
  setAddress,
  setProvider,
  setSigner,
  setOperator,
} from "../store/slicers/data";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import ModalComponent from "./Modal";
import "../style/Header.scss";
import customStyles from "../style/customStyles";

function Header() {
  const dispatch = useDispatch();
  const provider = useProvider();
  const signer = useSigner();
  const address = useAddress();
  const donateContract = useContract();
  const [wallet, setWallet] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }

    const initialize = async () => {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const donateContract = new ethers.Contract(
          DONATE_ADDRESS,
          DONATE_ABI,
          signer
        );

        batch(() => {
          dispatch(setProvider(provider));
          dispatch(setDonateContract(donateContract));
          dispatch(setSigner(signer));
        });
      } catch (error) {
        console.error("Error initializing:", error);
      }
    };

    initialize();
  }, [dispatch]);

  const connect = async () => {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }
    if (!provider) return;
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      dispatch(setAccount(accounts[0]));

      const address = await signer.getAddress();
      const address2 = address.substring(0, 7);
      dispatch(setAddress(address));
      setWallet(address2);
      const operator = await donateContract.operator();
      dispatch(setOperator(operator));
    } catch (error) {
      console.error("Error connecting:", error);
      showErrorNotification("cekilise katilirken bir hata olustu");
    }
  };

  const showErrorNotification = (errorMessage) => {
    toast.error(errorMessage);
  };
  const handleClose = () => setIsOpen(false);
  return (
    <header>
      <Link to="/" className="title">
        Donate App
      </Link>

      <div className="btn-container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleClose}
          style={customStyles}
        >
          <ModalComponent handleClose={handleClose} />
        </Modal>
        <ToastContainer position="top-right" autoClose={5000} />

        <button
          className={`button ${address ? "connected" : "inconnect"}`}
          onClick={connect}
        >
          {address ? (
            <div className="wallet">
              <p>Connected</p>
              <p>{wallet}</p>
            </div>
          ) : (
            "Connect"
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
