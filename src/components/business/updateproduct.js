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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firestore";
import { v4 as uuidv4 } from "uuid";

export default function UpdateProductModal({
  transcript,
  isOpen,
  shopId,
  onOpenChange,
  data,
  onClose,
  setproduct,
  index,
}) {
  const [submit, setsubmit] = useState(false);
  const [imageurl, setimageurl] = useState(data.picture);
  const [upload, setupload] = useState(1);
  const [cost, setcost] = useState(data.cost.toString());
  const [description, setdescription] = useState(data.description);
  const [name, setname] = useState(data.name);
  const [time, settime] = useState(data.time.toString());
  const [checkvalid, setvalid] = useState(false);

  useEffect(() => {
    setimageurl(data.picture);
    setcost(data.cost.toString());
    setdescription(data.description);
    setname(data.name);
    settime(data.time.toString());
  }, []);

  const fileupload = async (target) => {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }
    setupload(image);
    setimageurl(URL.createObjectURL(image));
  };
  const updatetime = (e) =>{
    const reg = /^\d+$/gm
    if(reg.test(e)){

      settime(parseInt(e).toString())
    }else if(e==''){
      settime('0')
    }
  }
  const updatecost = (e) =>{
    const reg = /^(\d+(?:\.\d{0,7})?)$/gm
    const reg2 = /^(\d+(?:\.\d{1,7})?)$/gm
    if(reg.test(e)){
      setcost(e)
      if(reg2.test(e)){
        setcost(parseFloat(e).toString())        
      }else{
        setcost(e)
      }
    }else if(e==''){
      setcost('0')

    }
  }
  useEffect(() => {
    if (
      imageurl == data.picture &&
      cost == data.cost.toString() &&
      description == data.description &&
      name == data.name &&
      time == data.time.toString()
    ) {
      setvalid(false);
    } else {
      if (cost != "" && name != "" && time != "" && upload != 0) {
        setvalid(true);
      } else {
        setvalid(false);
      }
    }
  }, [cost, time, description, name, upload, description]);

  const onsubmit = async () => {
    setsubmit(true);
    const newproduct = {
      cost: parseFloat(cost),
      description: description,
      name: name,
      time: parseInt(time),
    };

    let url;
    if (imageurl == data.picture) {
      url = imageurl;
    } else {
      await deleteImage(data.picture);
      url = await updateImage(shopId, upload);
    }
    const res = await createproduct(shopId, url, newproduct, data.id);
    setvalid(false);
    setsubmit(false);
    onClose();
    setproduct((old) => {
      let a = [...old];
      a[index] = res;
      return a;
    });
  };

  const ondelete = async () => {
    setsubmit(true);
    await deleteproduct(shopId, data.id);
    await deleteImage(data.picture);
    setsubmit(false);
    onClose();
    setproduct((old) => {
      let a = [...old];
      a[index] = 0;
      return a;
    });
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
        <ModalHeader>{transcript['Product Edit']}</ModalHeader>
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
                    alt="product picture"
                    className="!object-contain h-36"
                    radius="none"
                    src={imageurl}
                  />
                  <div className="absolute right-2 top-2 !z-30">
                    <Button
                      onClick={() => {
                        setimageurl(0);
                        setupload(0);
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
            label={transcript["Product Name"]}
            placeholder="EX.Coffee"
            value={name}
            onValueChange={setname}
          />
          <Input
            color="secondary"
            type="number"
            label={transcript["Prepare Time"]}
            placeholder="EX.10"
            value={time}
            onValueChange={updatetime}
            endContent={
              <div className="pointer-events-none flex items-center">
                <div className=" h-8 w-8 fill-secondary-400">{transcript['min']}</div>
              </div>
            }
          />
          <Input
            color="secondary"
            type="number"
            label={transcript["Price"]}
            placeholder="EX1.0000000"
            value={cost}
            onValueChange={updatecost}
            endContent={
              <div className="pointer-events-none flex items-center">
                <div className=" h-8 w-8 fill-secondary-400">
                  <Pi />
                </div>
              </div>
            }
          />
          <Textarea
            label={transcript["Description"]}
            color="secondary"
            placeholder={transcript["Enter your description"]}
            value={description}
            onValueChange={setdescription}
          />
        </ModalBody>
        <ModalFooter className="!justify-center">
          <Button color="danger" onClick={ondelete}>
            {transcript['Delete']}
          </Button>
          <Button color="warning" onClick={onsubmit} isDisabled={!checkvalid}>
            {transcript['Update']}
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
  const uid = uuidv4();
  const filePath = `${Id}/menu/${uid}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
}

async function createproduct(Id, url, product, menuId) {
  console.log(Id + "///" + menuId);
  const menuRef = doc(db, "shop", Id, "menu", menuId);
  const id = await setDoc(menuRef, {
    cost: product.cost,
    description: product.description,
    name: product.name,
    picture: url,
    time: product.time,
  });
  return {
    id: menuId,
    cost: product.cost,
    description: product.description,
    name: product.name,
    picture: url,
    time: product.time,
  };
}

async function deleteImage(url) {
  const httpsRef = ref(storage, url);
  deleteObject(httpsRef)
    .then(() => {
      return 1;
    })
    .catch((error) => {
      return 0;
    });
}

async function deleteproduct(Id, menuId) {
  await deleteDoc(doc(db, "shop", Id, "menu", menuId));
  return true;
}
