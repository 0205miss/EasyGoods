import { Pi } from "@/res/icon/pi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  Input,
  Divider,
  ModalFooter,
  Image,
  Button,
  Card,
  Spinner,
} from "@nextui-org/react";
import { Upload } from "@/res/icon/upload";
import { useEffect, useState } from "react";
import { Garbage } from "@/res/icon/garbage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../firestore";

export default function MenuModal({ isOpen, onOpenChange, data,onClose,setmenu }) {
  const [submit, setsubmit] = useState(false);
  const [imageurl, setimageurl] = useState(0);
  const [upload, setupload] = useState(0);
  const [cost, setcost] = useState('1.0000000');
  const [description, setdescription] = useState("");
  const [name, setname] = useState('');
  const [time, settime] = useState('0');
    const [checkvalid,setvalid] = useState(false)
  const fileupload = async (target) => {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }
    setupload(image);
    setimageurl(URL.createObjectURL(image));
  };

  useEffect(()=>{
    if(cost!=''&&name!=''&&time!=''&&upload!=0){
        setvalid(true)
    }else{
        setvalid(false)
    }
  },[cost,time,description,name,upload])

  const onsubmit = async () => {
    setsubmit(true)
    const product = {
      cost: parseFloat(cost),
      description: description,
      name: name,
      time: parseInt(time),
    };
    const url = await updateImage(data.id,upload)
    const res = await createproduct(data,url,product)
    onClose()
    setmenu(old => [...old,res])
    setimageurl(0)
    setupload(0)
    setcost('1.0000000')
    setdescription('')
    setname('')
    settime('0')
    setsubmit(false)
  };

  return (
    <Modal
      classNames={{
        wrapper: ["!px-8"],
      }}
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>Product Creation</ModalHeader>
        <ModalBody>
          <div
            className=" w-full h-40 flex justify-center items-center bg-white p-3"
            onClick={() => {
              if (imageurl == 0) {
                document.querySelector(".input-field").click();
              }
            }}
          >
            <div className=" h-36 w-full flex justify-center items-center">
              {imageurl == 0 ? (
                <div className="stroke-secondary-200 h-28 w-full">
                  <Upload />
                </div>
              ) : (
                <Card
                  isFooterBlurred
                  radius="none"
                  className="border-none h-36 w-full flex flex-row justify-center"
                >
                  <Image
                    alt="Woman listing to music"
                    className="!object-contain h-36"
                    radius="none"
                    src={imageurl}
                  />
                  <div className="absolute right-2 top-2 !z-30">
                    <Button
                      onClick={() => {
                        setimageurl(0)
                        setupload(0)
                    }}
                      isIconOnly
                      className="text-white fill-white p-1"
                      color="danger"
                    >
                      <Garbage />
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            <form>
              <input
                type="file"
                accept="image/*"
                className="input-field"
                hidden
                onChange={(e) => {
                  fileupload(e.target);
                }}
              />
            </form>
          </div>
          <Divider />
          <Input
            color="secondary"
            type="text"
            label="Product Name"
            placeholder="EX.Coffee"
            value={name}
            onValueChange={setname}
          />
          <Input
            color="secondary"
            type="number"
            label="Prepare Time"
            placeholder="EX.10"
            value={time}
            onValueChange={settime}
            endContent={
              <div className="pointer-events-none flex items-center">
                <div className=" h-8 w-8 fill-secondary-400">min</div>
              </div>
            }
          />
          <Input
            color="secondary"
            type="number"
            label="Price"
            placeholder="EX1.0000000"
            value={cost}
            onValueChange={setcost}
            endContent={
              <div className="pointer-events-none flex items-center">
                <div className=" h-8 w-8 fill-secondary-400">
                  <Pi />
                </div>
              </div>
            }
          />
          <Textarea
            label="Description"
            color="secondary"
            placeholder="Enter your description"
            value={description}
            onValueChange={setdescription}
          />
        </ModalBody>
        <ModalFooter className="!justify-center">
          <Button color="warning" onClick={onsubmit} isDisabled={!checkvalid}>
            Create
          </Button>
        </ModalFooter>
        {submit && (
          <div className=" absolute z-50 bg-black/30 w-full h-full flex justify-center">
            <Spinner color="warning" size="lg"></Spinner>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

async function updateImage(Id, image) {
  try {
    if (!Id) throw new Error("No restaurant ID has been provided.");

    if (!image || !image.name)
      throw new Error("A valid image has not been provided.");

    const publicImageUrl = await uploadImage(Id, image);

    return publicImageUrl;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

async function uploadImage(Id, image) {
  const filePath = `${Id}/menu/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
}

async function createproduct(data, url, product) {
  const shopRef = doc(db, "shop", data.id);
  const menuRef = collection(shopRef, "menu");
  const id = await addDoc(menuRef, {
    cost: product.cost,
    description: product.description,
    name: product.name,
    pricture: url,
    time: product.time,
  });
  return {
    id:id,
    cost: product.cost,
    description: product.description,
    name: product.name,
    pricture: url,
    time: product.time,
  }
}
