import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";
import { Wrong } from "@/res/icon/wrong";
import { geocoding } from "@/action/geocoding";
import { Correct } from "@/res/icon/check";
import dynamic from "next/dynamic";
import { Location } from "@/res/icon/location";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth_firebase, db } from "../firestore";
import { iso1A2Code } from "@rapideditor/country-coder";
import { onAuthStateChanged } from "firebase/auth";
import { Bed } from "@/res/icon/bed";
import WeekSelect from "./weekselect";

export default function AddBusinessModal({
  transcript,
  isOpen,
  onClose,
  lang,
  reload,
}) {

  const [step, setstep] = useState(1);
  const [shoptype, settype] = useState(new Set([]));
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [pipay, setpipay] = useState(false);
  const [privacy, setprivacy] = useState(false);
  const [checkdata, setcheck] = useState(false);
  const [address_valid, setaddress_valid] = useState(false);
  const [geometric, setgeometric] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [opencheck, set247] = useState(false);
  const [opentime, setopentime] = useState("00:00");
  const [closetime, setclosetime] = useState("23:59");
  const [weekday, setweekday] = useState(
    new Set(["1", "2", "3", "4", "5", "6", "0"])
  );
  const prepage = () => {
    if (step == 1) {
      onClose();
    } else {
      setstep(step - 1);
    }
  };
  const nextpage = () => {
    if (step == 3) {
      onClose();
      onAuthStateChanged(auth_firebase, async (user) => {
        if (user) {
          const shopRef = collection(db, "shop");
          const q = query(shopRef, where("owner", "array-contains", user.uid));
          const querySnapshot = await getDocs(q);
          reload(querySnapshot);
        } else {
          alert("Something Wrong\nContact Developers");
        }
      });
      setstep(1);
      setsubmitted(false);
    } else if (step == 2) {
      setstep(step + 1);
      //submit
      onAuthStateChanged(auth_firebase, async (user) => {
        if (user) {
          const docRef = await addDoc(collection(db, "shop"), {
            address: address,
            country: iso1A2Code([geometric.lng, geometric.lat]),
            latitude: geometric.lat,
            longitude: geometric.lng,
            name: name,
            owner: [user.uid],
            payment: pipay,
            privacyagree: privacy,
            type: shoptype.currentKey,
            photo: [],
            opening: opencheck ? "00:00~23:59" : opentime + "~" + closetime,
            openday: opencheck
              ? ["1", "2", "3", "4", "5", "6", "0"]
              : Array.from(weekday),
            apporder: false,
          });
          setsubmitted(true);
        } else {
          alert("Something Wrong\nContact Developers");
        }
      });
    } else {
      setstep(step + 1);
      setcheck(false);
    }
  };
  const checkaddress = async () => {
    if (address == "") {
      alert("Please add your address before check");
    } else {
      const format_add = await address.replaceAll(" ", "+");
      const locationcheck = await geocoding(format_add, lang);
      if (locationcheck === 0) {
        setaddress_valid(false);
        alert("Something Wrong\nContact Developers");
      } else if(locationcheck === 'need more detail'){
        setaddress_valid(false);
        alert("Your address need more detail");
      } else {
        setgeometric(locationcheck);
        setaddress_valid(true);
      }
    }
  };

  const address_change = (e) => {
    setaddress(e);
    if (address_valid) {
      setaddress_valid(false);
    }
  };

  const MapCheck = useMemo(
    () =>
      dynamic(() => import("./checkmap"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg" />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    if (shoptype.size != 0 && name != "" && address_valid && privacy) {
      setcheck(true);
    } else {
      setcheck(false);
    }
  }, [address_valid, shoptype, name, privacy, weekday]);

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
      <ModalContent>
        <ModalHeader>
          <div className="w-full px-1">
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
              <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500"></div>
              <div
                className={
                  step == 1
                    ? "relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center"
                    : "relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center"
                }
              >
                1
              </div>
              <div
                className={
                  step == 2
                    ? "relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center"
                    : "relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center"
                }
              >
                2
              </div>
              <div
                className={
                  step == 3
                    ? "relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center"
                    : "relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center"
                }
              >
                3
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
        <div className="h-[calc(100vh_-_10rem)] overflow-scroll">
          {step == 1 && (
            <div className="w-full h-full flex flex-col gap gap-4">
              <Input
                labelPlacement="outside"
                color="secondary"
                type="text"
                label={transcript["Business Name"]}
                placeholder={transcript["Give Your Business A Name"]}
                variant="bordered"
                value={name}
                onValueChange={setname}
                className="w-full"
                classNames={{
                  inputWrapper: ["bg-primary", "h-12"],
                  input: ["text-white placeholder:text-white"],
                  label: "text-accent text-md font-semibold text-center w-full",
                }}
              />
              <Select
                labelPlacement="outside"
                label={transcript["Category"]}
                placeholder={transcript["Select Category"]}
                fullWidth
                selectedKeys={shoptype}
                onSelectionChange={settype}
                classNames={{
                  trigger: ["bg-primary", "h-12", "!text-white"],
                  value: "!text-white",
                  label:
                    "!text-accent text-md font-semibold text-center w-full",
                }}
              >
                <SelectItem
                  key="coffee"
                  value="Coffee Shop"
                  startContent={
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 4C3 2.89543 3.89543 2 5 2H17C18.1046 2 19 2.89543 19 4V5.09005C19.3888 5.15136 19.8652 5.25646 20.3511 5.43867C20.9435 5.66081 21.6037 6.01768 22.1224 6.60126C22.6595 7.20549 23 8.00415 23 9C23 9.99585 22.6595 10.7945 22.1224 11.3987C21.6037 11.9823 20.9435 12.3392 20.3511 12.5613C19.8312 12.7563 19.3222 12.863 18.9197 12.9222L18.9186 12.9296C18.8395 13.4569 18.6795 14.1769 18.3494 14.9104C18.0188 15.6451 17.5028 16.4253 16.6968 17.0223C15.8791 17.628 14.8231 18 13.5 18H8.5C7.17691 18 6.12087 17.628 5.30321 17.0223C4.49723 16.4253 3.9812 15.6451 3.65058 14.9104C3.24764 14.015 3.00268 12.9895 3 12.002L3 4ZM19 10.8763V7.12365C19.2094 7.16883 19.4312 7.22971 19.6489 7.31133C20.0565 7.46419 20.3963 7.66982 20.6276 7.92999C20.8405 8.16952 21 8.49585 21 9C21 9.50415 20.8405 9.83049 20.6276 10.07C20.3963 10.3302 20.0565 10.5358 19.6489 10.6887C19.4312 10.7703 19.2094 10.8312 19 10.8763ZM5 11.9973C5.00914 12.7072 5.18467 13.4457 5.47442 14.0896C5.7063 14.6049 6.03403 15.0747 6.49366 15.4152C6.94163 15.747 7.57309 16 8.5 16H13.5C14.4269 16 15.0584 15.747 15.5063 15.4152C15.966 15.0747 16.2937 14.6049 16.5256 14.0896C16.8136 13.4496 16.9975 12.7047 17 11.9974L17 4H5V11.9973Z"
                          fill="#0F0F0F"
                        ></path>
                        <path
                          d="M23 21C23 20.4477 22.5523 20 22 20H2C1.44772 20 1 20.4477 1 21C1 21.5523 1.44772 22 2 22H22C22.5523 22 23 21.5523 23 21Z"
                          fill="#0F0F0F"
                        ></path>
                      </g>
                    </svg>
                  }
                >
                  {transcript["Coffee Shop"]}
                </SelectItem>
                <SelectItem
                  key="Restaurant"
                  value="Restaurant"
                  startContent={
                    <svg
                      fill="#000000"
                      width="1.5rem"
                      height="1.5rem"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 511.999 511.999"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <path d="M256.747,86.809C149.033,86.809,61.4,174.442,61.4,282.156c0,107.715,87.633,195.348,195.347,195.348 c107.715,0,195.347-87.633,195.347-195.348C452.094,174.441,364.462,86.809,256.747,86.809z M256.747,462.295 c-99.328,0-180.138-80.81-180.138-180.139s80.81-180.138,180.138-180.138c99.329,0,180.138,80.809,180.138,180.138 S356.076,462.295,256.747,462.295z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M256.748,155.943c-69.594,0-126.214,56.619-126.214,126.213c0,11.232,1.478,22.375,4.392,33.119l14.678-3.983 c-2.564-9.445-3.863-19.249-3.863-29.137c0-61.208,49.797-111.004,111.005-111.004c17.825,0,34.844,4.093,50.584,12.167 l6.941-13.534C296.364,160.6,277.01,155.943,256.748,155.943z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M156.761,330.436l-13.691,6.624c7.979,16.492,19.726,31.348,33.97,42.961l9.611-11.787 C174.116,358.013,163.78,344.943,156.761,330.436z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M333.721,182.124l-9.282,12.046c27.526,21.212,43.314,53.281,43.314,87.984c0,61.208-49.797,111.005-111.005,111.005 c-21.791,0-42.88-6.309-60.991-18.241l-8.368,12.699c20.602,13.575,44.585,20.751,69.359,20.751 c69.595,0,126.214-56.619,126.214-126.214C382.961,242.698,365.013,206.238,333.721,182.124z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M63.945,48.058v88.065H47.181V48.058H31.972v88.065H15.209V48.058H0v88.065v13.111v2.098h0.057 c0.96,18.283,14.386,33.312,31.916,36.738v281.83h15.209V188.07c17.529-3.427,30.955-18.455,31.916-36.739h0.057v-2.098v-13.111 V48.058H63.945z M39.577,173.601c-12.73,0-23.211-9.813-24.278-22.27h48.557C62.787,163.788,52.306,173.601,39.577,173.601z"></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M499.327,42.243c-22.486,13.731-36.456,38.628-36.456,64.975V273.63h33.919v196.269h15.209v-196.27v-92.423V34.496 L499.327,42.243z M496.791,181.205v77.215h-18.711V107.217c0-16.624,6.948-32.525,18.711-43.896V181.205z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  }
                >
                  {transcript["Restaurant"]}
                </SelectItem>
                <SelectItem
                  key="Grocery"
                  value="Grocery"
                  startContent={
                    <svg
                      fill="#000000"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 64 64"
                      id="Layer_1"
                      version="1.1"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M57.7,23.3C57.7,23.2,57.7,23.2,57.7,23.3c-0.1-0.7-0.4-1.2-0.8-1.5c-0.1,0-0.1-0.1-0.2-0.1C49.9,16.7,43.1,11.8,36.2,7 c-1-0.7-1.9-1.4-2.9-2.1c-0.5-0.4-1.5-0.4-2,0c-7,4.9-14,9.8-21,14.6c-1,0.7-2,1.4-3,2.1c-0.1,0-0.1,0.1-0.1,0.1 c-0.5,0.3-0.8,0.8-0.8,1.6c0,9.8,0,19.5,0,29.3c0,1.4,0,2.7,0,4.1c0,1.1,0.9,2,2,2c5.3,0,10.7,0,16,0c8.5,0,17.1,0,25.6,0 c2,0,3.9,0,5.9,0c1.1,0,2-0.9,2-2c0-9.8,0-19.5,0-29.3C57.8,26.1,57.8,24.7,57.7,23.3C57.8,23.3,57.7,23.3,57.7,23.3z M39.7,54.7 c-8.5,0-17.1,0-25.6,0c-1.3,0-2.6,0-3.9,0c0-9.1,0-18.2,0-27.3c0-1,0-2,0-3.1c6.7-4.6,13.4-9.3,20.1-13.9c0.7-0.5,1.3-0.9,2-1.4 c6.5,4.7,13,9.3,19.5,14c0.6,0.5,1.3,0.9,1.9,1.4c0,9.4,0,18.8,0,28.3c0,0.7,0,1.4,0,2.1C49.1,54.7,44.4,54.7,39.7,54.7z"></path>
                          <path d="M40.8,41.2c1-3.4,2.1-6.8,3.1-10.2c0.4-1.2-0.7-2.5-1.9-2.5c-5.1,0-10.3,0-15.4,0c-0.4-1.4-0.9-2.9-1.3-4.3 c-0.3-0.8-1-1.5-1.9-1.5c-1.5,0-3,0-4.5,0c-2.6,0-2.6,4,0,4c1,0,2,0,3.1,0c1.5,4.8,3,9.7,4.5,14.5c0,0,0,0,0,0l0,0l0.9,3.1 C25.3,45,24,46.7,24,48.8c0,2.6,2.1,4.8,4.8,4.8s4.8-2.1,4.8-4.8c0-0.3,0-0.5-0.1-0.8h1.1c0,0.2-0.1,0.5-0.1,0.8 c0,2.6,2.1,4.8,4.8,4.8s4.8-2.1,4.8-4.8S41.8,44,39.2,44h-8l-0.4-1.3c2.7,0,5.3,0,8,0C39.7,42.7,40.5,42.1,40.8,41.2z M39.3,32.5 c-0.6,2.1-1.3,4.1-1.9,6.2c-2.6,0-5.1,0-7.7,0c-0.6-2.1-1.3-4.1-1.9-6.2C31.6,32.5,35.4,32.5,39.3,32.5z M29.5,48.8 c0,0.4-0.3,0.8-0.8,0.8S28,49.2,28,48.8c0-0.4,0.3-0.8,0.8-0.8S29.5,48.3,29.5,48.8z M40,48.8c0,0.4-0.3,0.8-0.8,0.8 s-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8S40,48.3,40,48.8z"></path>
                        </g>
                      </g>
                    </svg>
                  }
                >
                  {transcript["Grocery"]}
                </SelectItem>
                <SelectItem
                  key="BookStore"
                  value="BookStore"
                  startContent={
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      fill="#000000"
                      viewBox="0 0 50 50"
                      version="1.2"
                      baseProfile="tiny"
                      xmlns="http://www.w3.org/2000/svg"
                      overflow="inherit"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M41 40v-34c0-2.2-1.8-4-4-4h-24c-2.2 0-4 1.8-4 4v38c0 2.2 1.8 4 4 4h24c1.858 0 4 0 4-2v-1h-27c-1.1 0-2-.9-2-2v-3h29zm-27-30c0-.55.45-1 1-1h20c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-20c-.55 0-1-.45-1-1v-2zm0 8c0-.55.45-1 1-1h20c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-20c-.55 0-1-.45-1-1v-2z"></path>
                      </g>
                    </svg>
                  }
                >
                  {transcript["BookStore"]}
                </SelectItem>
                <SelectItem
                  key="Bakery"
                  value="Bakery"
                  startContent={
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      fill="#000000"
                      viewBox="0 0 128 128"
                      id="Layer_1"
                      version="1.1"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M90.45,22.837l-0.037,0.002c-1.213-0.087-2.505-0.129-3.95-0.129c-1.059,0-2.151,0.029-3.44,0.091 c-0.121,0.006-0.232,0.041-0.337,0.085c-1.519-0.112-3.063-0.177-4.634-0.177c-20.146,0-36.536,9.52-36.536,21.222 c0,2.314,0.641,4.419,1.903,6.256c0.726,1.056,1.109,2.424,1.109,3.956V64.2c-5.864,0.002-11.449,0.774-16.6,2.295 C15.636,70.126,8,77.378,8,85.421c0,10.479,12.299,15.792,36.554,15.792c0.722,0,1.43-0.005,2.139-0.015 c1.906,2.482,4.891,4.091,8.251,4.091h8.412h37.804h8.412c5.743,0,10.416-4.681,10.416-10.435V51.567 c2-2.151,3.013-4.718,3.013-7.635C123,33.093,109.034,24.024,90.45,22.837z M44.554,99.213C28.791,99.213,10,96.82,10,85.421 c0-4.106,2.367-8.007,6.55-11.223c-0.102,1.294-0.024,3.036,0.552,5.214c0.119,0.448,0.523,0.745,0.966,0.745 c0.084,0,0.17-0.011,0.256-0.034c0.534-0.142,0.852-0.689,0.711-1.223c-0.946-3.573-0.373-5.693-0.152-6.311 c2.25-1.39,4.879-2.609,7.838-3.608c-0.601,2.528-1.251,7.31,0.539,12.6c0.141,0.417,0.53,0.68,0.947,0.68 c0.106,0,0.214-0.017,0.321-0.053c0.523-0.177,0.804-0.745,0.626-1.268c-1.98-5.848-0.639-11.132-0.165-12.661 c2.848-0.808,5.9-1.39,9.049-1.728c-0.523,3.197-1.633,12.259,1.606,17.117c0.193,0.289,0.51,0.445,0.833,0.445 c0.19,0,0.383-0.054,0.554-0.168c0.459-0.306,0.583-0.927,0.277-1.387c-2.996-4.494-1.619-13.828-1.207-16.193 c1.465-0.106,2.944-0.164,4.427-0.165v28.655c0,1.554,0.35,3.024,0.961,4.35C45.176,99.206,44.863,99.205,44.554,99.213z M63.356,103.29h-8.412c-4.641,0-8.416-3.784-8.416-8.435V54.144c0-1.938-0.505-3.698-1.46-5.089 c-1.044-1.519-1.552-3.194-1.552-5.123c0-10.599,15.493-19.222,34.536-19.222s34.536,8.623,34.536,19.222 c0,1.928-0.507,3.604-1.552,5.123c-0.956,1.391-1.46,3.15-1.46,5.089v40.711c0,4.651-3.775,8.435-8.417,8.435H63.356z M118.277,50.462c-0.186,0.187-0.29,0.44-0.29,0.704v43.689c0,4.651-3.775,8.435-8.416,8.435h-2.304 c2.605-1.899,4.309-4.968,4.309-8.435V54.144c0-1.532,0.383-2.9,1.109-3.956c1.263-1.837,1.903-3.942,1.903-6.256 c0-7.909-7.492-14.816-18.565-18.466C110.595,27.799,121,35.247,121,43.932C121,46.477,120.109,48.612,118.277,50.462z"></path>
                          <path d="M66.582,57.31c0-1.654-1.346-3-3-3s-3,1.346-3,3s1.346,3,3,3S66.582,58.964,66.582,57.31z M62.582,57.31 c0-0.551,0.449-1,1-1s1,0.449,1,1s-0.449,1-1,1S62.582,57.861,62.582,57.31z"></path>
                          <path d="M56.582,36.31c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S58.236,36.31,56.582,36.31z M56.582,40.31 c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S57.133,40.31,56.582,40.31z"></path>
                          <path d="M80.582,66.31c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S82.236,66.31,80.582,66.31z M80.582,70.31 c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S81.133,70.31,80.582,70.31z"></path>
                          <path d="M103.582,65.31c0-1.654-1.346-3-3-3s-3,1.346-3,3s1.346,3,3,3S103.582,66.964,103.582,65.31z M100.582,66.31 c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S101.133,66.31,100.582,66.31z"></path>
                          <path d="M87.582,82.31c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S89.236,82.31,87.582,82.31z M87.582,86.31 c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S88.133,86.31,87.582,86.31z"></path>
                          <path d="M64.582,82.31c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S66.236,82.31,64.582,82.31z M64.582,86.31 c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S65.133,86.31,64.582,86.31z"></path>
                          <path d="M89.582,40.31c0-1.654-1.346-3-3-3s-3,1.346-3,3s1.346,3,3,3S89.582,41.964,89.582,40.31z M85.582,40.31 c0-0.551,0.449-1,1-1s1,0.449,1,1s-0.449,1-1,1S85.582,40.861,85.582,40.31z"></path>
                        </g>
                      </g>
                    </svg>
                  }
                >
                  {transcript["Bakery"]}
                </SelectItem>
                <SelectItem
                  key="Hotel"
                  value="Hotel"
                  startContent={
                    <div className=" w-6 h-6 fill-black">
                      <Bed />
                    </div>
                  }
                >
                  {transcript["Hotel"]}
                </SelectItem>
                <SelectItem
                  key="Other"
                  value="Other"
                  startContent={
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      version="1.0"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlSpace="preserve"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path
                            fill="#231F20"
                            d="M59,0H5C2.789,0,1,1.789,1,4v20c0,2.22,1.208,4.152,3,5.19V60c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4 V29.19c1.792-1.038,3-2.971,3-5.19V4C63,1.789,61.211,0,59,0z M51,2v22c0,2.209-1.791,4-4,4s-4-1.791-4-4V2H51z M41,2v22 c0,2.209-1.791,4-4,4s-4-1.791-4-4V2H41z M31,2v22c0,2.209-1.791,4-4,4s-4-1.791-4-4V2H31z M21,2v22c0,2.209-1.791,4-4,4 s-4-1.791-4-4V2H21z M3,4c0-1.104,0.896-2,2-2h6v22c0,2.209-1.791,4-4,4s-4-1.791-4-4V4z M12,62V38h12v10h-1c-0.553,0-1,0.447-1,1 s0.447,1,1,1h1v12H12z M58,60c0,1.104-0.896,2-2,2H26V37c0-0.516-0.447-1-1-1H11c-0.553,0-1,0.447-1,1v25H8c-1.104,0-2-0.896-2-2 V29.91C6.326,29.965,6.658,30,7,30c2.088,0,3.926-1.068,5-2.687C13.074,28.932,14.912,30,17,30s3.926-1.068,5-2.687 C23.074,28.932,24.912,30,27,30s3.926-1.068,5-2.687C33.074,28.932,34.912,30,37,30s3.926-1.068,5-2.687 C43.074,28.932,44.912,30,47,30s3.926-1.068,5-2.687C53.074,28.932,54.912,30,57,30c0.342,0,0.674-0.035,1-0.09V60z M57,28 c-2.209,0-4-1.791-4-4V2h6c1.104,0,2,0.896,2,2v20C61,26.209,59.209,28,57,28z"
                          ></path>
                          <path
                            fill="#231F20"
                            d="M53,36H29c-0.553,0-1,0.447-1,1v20c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1V37 C54,36.447,53.553,36,53,36z M52,56H30V38h22V56z"
                          ></path>
                          <path
                            fill="#231F20"
                            d="M48.293,42.707C48.488,42.902,48.744,43,49,43s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414 l-1-1c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L48.293,42.707z"
                          ></path>
                          <path
                            fill="#231F20"
                            d="M48.293,47.707C48.488,47.902,48.744,48,49,48s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414 l-6-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L48.293,47.707z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  }
                >
                  {transcript["Other"]}
                </SelectItem>
              </Select>
              <Checkbox
                isSelected={opencheck}
                onValueChange={set247}
                color="secondary"
                size="lg"
              >
                {transcript["Open 24 / 7"]}
              </Checkbox>
              {!opencheck && (
                <>
                  <Input
                    labelPlacement="outside"
                    color="secondary"
                    type="time"
                    label={transcript["Start Time"]}
                    placeholder="Your Business Address"
                    variant="bordered"
                    value={opentime}
                    onValueChange={setopentime}
                    className="w-full"
                    classNames={{
                      inputWrapper: ["bg-primary", "h-12"],
                      input: ["text-white placeholder:text-white"],
                      label:
                        "text-accent text-md font-semibold text-center w-full",
                    }}
                  />
                  <Input
                    labelPlacement="outside"
                    color="secondary"
                    type="time"
                    label={transcript["Close Time"]}
                    placeholder="Your Business Address"
                    variant="bordered"
                    value={closetime}
                    onValueChange={setclosetime}
                    className="w-full"
                    classNames={{
                      inputWrapper: ["bg-primary", "h-12"],
                      input: ["text-white placeholder:text-white"],
                      label:
                        "text-accent text-md font-semibold text-center w-full",
                    }}
                  />
                  <WeekSelect values={weekday} setValues={setweekday} />
                </>
              )}

              <Input
                labelPlacement="outside"
                color="secondary"
                type="text"
                label={transcript["Address"]}
                placeholder={transcript["Your Business Address"]}
                variant="bordered"
                value={address}
                onValueChange={address_change}
                className="w-full"
                classNames={{
                  inputWrapper: ["bg-primary", "h-12"],
                  input: ["text-white placeholder:text-white"],
                  label: "text-accent text-md font-semibold text-center w-full",
                }}
                endContent={
                  <div
                    className={
                      address_valid ? "fill-green-500" : "fill-red-500"
                    }
                  >
                    {address_valid ? (
                      <div className="w-6 h-6">
                        <Correct />{" "}
                      </div>
                    ) : (
                      <Wrong />
                    )}
                  </div>
                }
              />
              <Button onClick={checkaddress}>
                {transcript["Check Address"]}
              </Button>

              <Checkbox
                isSelected={pipay}
                onValueChange={setpipay}
                color="secondary"
                size="lg"
              >

                {transcript["Pi Payment Online Support (Optional)"]}

              </Checkbox>
              <Checkbox
                isSelected={privacy}
                onValueChange={setprivacy}
                color="secondary"
                size="lg"
              >
                {transcript["I Agree Privacy Policy"]}
              </Checkbox>
            </div>
          )}

          {step == 2 && (
            <div className="w-full h-full">
              <h1 className="text-center text-3xl mb-5">
                {transcript["Address Confirmation"]}
              </h1>
              <div className="w-full !h-96">
                <MapCheck lat={geometric.lat} long={geometric.lng} />
              </div>
              <div className="w-full m-2 flex">
                <Location />
                {geometric.format}
              </div>
              <div className="w-full h-10 m-2">
                <Button
                  fullWidth={true}
                  onClick={() => {
                    if (checkdata) {
                      setcheck(false);
                    } else {
                      setcheck(true);
                    }
                  }}
                  className={checkdata ? "bg-success-500" : "bg-warning-500"}
                >
                  {transcript["Confirm"]}
                </Button>
              </div>
            </div>
          )}
          {step == 3 && (
            <div className="w-full h-full">
              <div className="w-full h-40 flex justify-center">
                {submitted ? (
                  <div className="fill-green-500 h-40 w-40">
                    <Correct />
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner color="warning" size="lg" />
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
        </ModalBody>
        <ModalFooter>
          {step == 3 ? null : (
            <Button color="danger" variant="light" onPress={prepage}>
              {step == 1 ? transcript["Close"] : transcript["Previous"]}
            </Button>
          )}
          <Button color="primary" onPress={nextpage} isDisabled={!checkdata}>

            {step == 1
              ? transcript["Next"]
              : step == 2
              ? transcript["Submit"]
              : transcript["Finish"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
