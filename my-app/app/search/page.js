"use client";

import { useState } from "react";
import { useProvider, useSigner, useContract } from "wagmi";
import { landContractABI, landNFT, landNFTABI } from "@/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Loading from "../loading.js";

function search() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    text: "",
  });
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);

  //////create interface for contract ////////////

  const provider = useProvider();
  const { data: signer } = useSigner();

  const landContract = useContract({
    addressOrName: address,
    contractInterface: landContractABI,
    signerOrProvider: signer || provider,
  });

  const NFTContract = useContract({
    addressOrName:landNFT,
    contractInterface:landNFTABI,
    signerOrProvider: signer || provider
    });

  function handleOnChange(e) {
    setAddress(e.target.value);
  }

  async function handleData() {
    try {
      setLoading(true);
      let country = await landContract.country();
      let state = await landContract.state();
      let district = await landContract.district();
      let village = await landContract.village();
      let landaddress = await landContract.landaddress();
      let length = await landContract.length();
      let width = await landContract.width();
      let owner = await landContract.currentOwner();
      let allowners = await landContract.getOwners();
      let survey = await landContract.survey();
      setData({
        country: country,
        state: state,
        district: district,
        village: village,
        landaddress: landaddress,
        length: length,
        width: width,
        owner: owner,
        survey: survey
      });

      setOwners(allowners);
      setLoading(false);
    } catch (err) {
      toast.error("Your address is not valid");
    }
  }

  //// creating dialog //////

  async function handleSubmit(e) {
    e.preventDefault();
    let newaddress = form.text;

    if (address.length !== 42) {
      toast.error("enter a valid address");
      handleClose();
    } else {
      try {
        let tx = await landContract.transferRights(newaddress);
        await tx.wait();
        toast.success("transfering nft now...");
        let tokenid = await NFTContract.gettokenid(address)
        tx = await NFTContract.transferFrom(data['owner'], newaddress, tokenid);
        await tx.wait(); 
        toast.success("Ownership transfered !!!!!!!");
        handleClose();
      } catch (err) {
        toast.error("you are not the owner of this land !!!! ");
        handleClose();
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInput(e) {
    e.preventDefault();
    form[e.target.name] = e.target.value;
    setForm((prev) => {
      return {
        ...prev,
        ...form,
      };
    });
  }

  //////////////////////////
  return (
    <div className="h-[100vh]">
      <h1 className="block text-center text-gray-100 text-[2em] font-bold my-2 font-homefont1 ">
        SEARCH YOUR LAND DETAILS
      </h1>
      <div className="w-[80vw] h-[20vh] mx-auto  flex flex-row justify-center items-center">
        <input
          className="shadow appearance-none border rounded w-[40vw] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="address"
          placeholder="Enter contract address"
          onChange={handleOnChange}
          autoComplete="off"
        />
        <button
          className="bg-[#ec4899] hover:bg-[#ec4899] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleData}
        >
          search
        </button>
      </div>
      { loading? <Loading/>: Object.keys(data).length > 0 ? (
        <div className="w-[80vw]  mx-auto  flex flex-col  font-bold text-black p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-black text-center font-bold text-xl border-b-2">LAND DETAILS</h2>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 border-b-2 ">{`COUNTRY - ${data.country}`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 border-b-2">{`STATE - ${data.state}`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 border-b-2">{`DISTRICT - ${data.district}`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 border-b-2">{`VILLAGE - ${data.village}`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 border-b-2">{`LAND ADDRESS - ${data.landaddress}`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-2">{`LENGTH - ${data.length} in feets`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-2">{`WIDTH - ${data.width} in feets`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-2">{`OWNER - ${data.owner}`}</h1>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 border-b-2">{`SURVEY-NUMBER - ${data.survey}`}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClickOpen}
          >
            Transfer
          </button>
        </div>
      ) : (
        ""
      )}
      {owners.length > 0 ? (
        <div className="w-[80vw]   mx-auto my-5  flex flex-col  font-bold text-black p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-black text-center font-bold text-xl border-b-2">List Of Previous Owners</h2>
          {owners.map((ele, idx) => {
            return (
              <div className="w-[70%] bg-white text-black text-2xl font-bold p-3 rounded m-3 border-b-2">
                <h1>{`Owner${idx + 1}`}</h1>
                <div>{ele}</div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1 className="text-black font-extrabold font-2xl block mt-5">
            NEW OWNER ADDRESS
          </h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <form className="mt-5 flex flex-col justify-around items-center  border-solid border-2 p-4">
            <input
              type="text"
              name="text"
              className="shadow appearance-none border rounded w-[40vw] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={`Enter the address`}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} autoFocus>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default search;
