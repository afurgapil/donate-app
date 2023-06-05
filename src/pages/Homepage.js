import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useContract } from "../hooks/useContract";
import { useAddress } from "../hooks/useAddress";
import { formatEther } from "ethers/lib/utils";
import "../style/Homepage.scss";
import ModalComponent from "../components/Modal";
import customStyles from "../style/customStyles";
import { ToastContainer, toast } from "react-toastify";
import { parseEther } from "ethers/lib/utils";
Modal.setAppElement("#root");
function Homepage() {
  const adres = useAddress();
  const [choosedAddress, setChoosedAddress] = useState();
  const [balance, setBalance] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const donateContract = useContract();

  useEffect(() => {
    const getDonationAddres = async () => {
      try {
        if (donateContract) {
          const donationAddress = await donateContract.donationAddress();
          setChoosedAddress(donationAddress);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const getBalance = async () => {
      try {
        if (donateContract) {
          const txn = await donateContract.getBalance();
          const balanceDecimal = formatEther(txn);
          setBalance(balanceDecimal);
        }
      } catch (error) {
        console.error("Error fetching getBalance:", error);
      }
    };
    getDonationAddres();
    getBalance();
  }, [donateContract, adres, amount]);
  const deposit = async () => {
    try {
      setIsOpen(true);
      const parsedAmount = parseEther(amount);
      const txn = await donateContract.deposit({ value: parsedAmount });
      await txn.wait();
      setIsOpen(false);
      setAmount("");
    } catch (error) {
      showErrorNotification("An error occurred while deposit amount.");
      setIsOpen(false);
    }
  };
  const handleClose = () => setIsOpen(false);
  const showErrorNotification = (errorMessage) => {
    toast.error(errorMessage);
  };
  return (
    <div className="Homepage">
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleClose}
          style={customStyles}
        >
          <ModalComponent handleClose={handleClose} />
        </Modal>
        <ToastContainer position="top-right" autoClose={5000} />
      </>
      <div className="homepage-item">
        <div className="intro">
          {balance > 0 && (
            <p className="balance">Current Balance: {balance} Matic</p>
          )}
          {choosedAddress && (
            <p className="address">Current Donation Address:{choosedAddress}</p>
          )}
        </div>
        <div className="deposit btn-container">
          <input
            type="text"
            value={amount}
            placeholder="Deposit Amount"
            onChange={(event) => setAmount(event.target.value)}
          />
          <button className="deposit-btn" onClick={deposit}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
