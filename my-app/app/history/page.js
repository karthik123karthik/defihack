"use client";

import { useEffect, useState } from "react";
import { useContract, useSigner, useProvider } from "wagmi";
import {
  deployerContractAddress,
  deployerContractABI,
} from "../../constants/index.js";
import Loading from "./loading.js";

function history() {

  ////////////////// construct interface/////////////////
  const provider = useProvider();
  const { data: signer } = useSigner();
  const deployerContract = useContract({
    addressOrName: deployerContractAddress,
    contractInterface: deployerContractABI,
    signerOrProvider: signer || provider,
  });
  ////////////////////////////////////////////////////////////

  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (deployerContract) {
      getallContracts();
    }

  }, [deployerContract])


  async function getallContracts() {
    try {
      setLoading(true)
      let contracts = await deployerContract.getallcontracts()
      await contracts;
      setContracts(contracts);
      setLoading(false)
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="w-[80vw] mx-auto flex flex-col justify-center items-center p-3">
      <h1 className="font-bold text-white text-[2em] mb-3 font-homefont1">Deployed Contracts using Landly</h1>
     {loading? <Loading/>: 
      contracts.length > 0 && contracts.map((ele, idx) => 
      { return(
      <div className="w-[70%] bg-white text-black text-xl font-bold p-3 rounded m-3">
       <h1>{`Contract ${idx+1}`}</h1>
       <div>{`Address - ${ele}`}</div>
       </div>
      )})
}
    </div>
  )
}

export default history;
