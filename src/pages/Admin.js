import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { useContract } from "../hooks/useContract";
import customStyles from "../style/customStyles";
import ModalComponent from "../components/Modal";
import "../style/Admin.scss";

Modal.setAppElement("#root");
function Admin() {
  const donateContract = useContract();
  const [address, setAddress] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const sendDonation = async () => {
    try {
      setIsOpen(true);
      const txn = await donateContract.sendDonation();
      await txn.wait();
      setIsOpen(false);
    } catch (error) {
      showErrorNotification("An error occurred while sending donate.");
      setIsOpen(false);
    }
  };
  const changeDonation = async () => {
    try {
      setIsOpen(true);
      const txn = await donateContract.setDonationAddress(address);
      await txn.wait();
      setIsOpen(false);
      setAddress("");
    } catch (error) {
      showErrorNotification("An error occurred while changing address.");
      setIsOpen(false);
    }
  };
  const handleClose = () => setIsOpen(false);
  const showErrorNotification = (errorMessage) => {
    toast.error(errorMessage);
  };
  return (
    <div className="admin-container">
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleClose}
          style={customStyles}
        >
          <ModalComponent handleClose={handleClose} />
        </Modal>
      </>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="change-address">
        <input
          type="text"
          value={address}
          placeholder="Change Donation Address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <button className="change-address-btn" onClick={changeDonation}>
          Change Address
        </button>
        <button className="send-donation-btn" onClick={sendDonation}>
          Send Donation
        </button>
      </div>
    </div>
  );
}

export default Admin;
