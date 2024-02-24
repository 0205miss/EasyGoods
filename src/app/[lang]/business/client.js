"use client";
import {
  useDisclosure,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  DropdownItem,
  Tab,
  Tabs,
  Spinner,
} from "@nextui-org/react";
import { useContext, useEffect, useState, useMemo } from "react";
import { OwnerContext } from "./business";
import LoadingPage from "@/components/loading";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/components/firestore";
import OrderCard from "@/components/business/ordercard";
import dynamic from "next/dynamic";

export default function BusinessClientPage({ dict, lang }) {
  const { ownershops, setshops } = useContext(OwnerContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentshop, setcurrentshop] = useState(null);
  const [shoplist, setshoplist] = useState([]);
  const [selected, setSelected] = useState("order");
  useEffect(() => {
    if (ownershops == null) return;
    if (ownershops.empty) {
      setcurrentshop(null);
      setshoplist([]);
    } else {
      setcurrentshop(0);
      let temp = [];
      ownershops.forEach((doc) => {
        let data = doc.data();
        console.log(data);
        data.id = doc.id;
        temp.push(data);
      });
      setshoplist(temp);
    }
  }, [ownershops]);
  const InfoBusiness = useMemo(
    () =>
      dynamic(() => import("@/components/business/info"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg" />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const AddCard = useMemo(
    () =>
      dynamic(() => import("@/components/business/addcard"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg" />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const MenuBusiness = useMemo(
    () =>
      dynamic(() => import("@/components/business/menu"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg" />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const AddBusinessModal = useMemo(() =>
    dynamic(() => import("@/components/business/addbusiness"), {
      loading: () => (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner color="warning" size="lg" />
        </div>
      ),
      ssr: false,
    })
  );

  useEffect(() => {
    if (currentshop == null) return;
    const q = query(
      collection(db, "offer"),
      where("shop", "==", shoplist[currentshop].id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().buyer);
      });
    });
  }, [currentshop]);

  const handledropdown = (key) => {
    if (key == "new") {
      onOpen();
    } else {
      setcurrentshop(key);
    }
  };

  if (ownershops == null || shoplist == null) return <LoadingPage />;
  return (
    <div className="w-full h-full">
      <div className="flex w-full px-5 py-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="w-full bg-ui-secondary text-white"
            >
              {shoplist.length == 0
                ? "You don't have business yet"
                : shoplist[currentshop].name}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu for shop"
            className="w-80"
            onAction={handledropdown}
          >
            {shoplist.length == 0 ? null : (
              <DropdownSection showDivider aria-label="shoplist">
                {shoplist.map((doc, index) => {
                  return <DropdownItem key={index}>{doc.name}</DropdownItem>;
                })}
              </DropdownSection>
            )}
            <DropdownSection aria-label="new shop creation">
              <DropdownItem
                key="new"
                shortcut="+"
                description={dict["Create a new shop"]}
              >
                {dict["Add Business"]}
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className=" pb-16 h-[calc(100%-64px)]">
        {shoplist.length == 0 ? (
          <AddCard transcript={dict} />
        ) : selected == "order" ? (
          <OrderCard transcript={dict} />
        ) : selected == "stamp" ? (
          "stamp"
        ) : selected == "menu" ? (
          <MenuBusiness
            data={shoplist[currentshop]}
          />
        ) : (
          <InfoBusiness
            transcript={dict}
            info={shoplist[currentshop]}
            setinfo={setshoplist}
            index={currentshop}
            origin={shoplist}
          />
        )}
      </div>

      <div className="fixed bottom-0 w-full h-16 pb-6">
        <div className=" flex justify-center">
          <div className=" w-72">
            <Tabs
              key="1"
              color="primary"
              aria-label="Tabs colors"
              radius="full"
              fullWidth={true}
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="order" title={dict.Order} />
              <Tab key="stamp" title={dict.Stamp} />
              <Tab key="menu" title={dict.Menu} />
              <Tab key="info" title={dict.Info} />
            </Tabs>
          </div>
        </div>
      </div>
      <AddBusinessModal
        transcript={dict}
        isOpen={isOpen}
        onClose={onClose}
        lang={lang}
        reload={setshops}
      />
    </div>
  );
}
