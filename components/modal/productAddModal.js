import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Resizer from "react-image-file-resizer";

import { Context } from "../../context/authContext";
import { POST } from "../../lib/api";
import Logo from "../../public/assets/logo.png";

export default function ProductAddModal({ visible, setVisible }) {
  const { state } = useContext(Context);

  // Router
  const router = useRouter();

  // product add form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState();

  const form = {
    name,
    description,
    unitPrice,
    category,
    quantity,
    photo,
    supplier: state.user?._id,
  };

  // console.log("photo :", photo);
  // console.log("form :", form);

  const resizeFile = (file) =>
    new Promise((res) => {
      Resizer.imageFileResizer(file, 800, 800, "JPEG", 100, 0, (uri) => {
        res(uri);
      });
    });

  const handleSetPhoto = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const image = await resizeFile(file);
      setPhoto(image);
    } else {
      setPhoto("");
    }
    // console.log(event.target.files[0]);
    // setPhoto(event.target.files[0]);
    // transformFile(file);
  };

  console.log("image is :", photo);

  // const transformFile = (file) => {
  //   const reader = new FileReader();

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setPhoto(reader.result);
  //     };
  //   } else {
  //     setPhoto("");
  //   }
  // };

  // POST API
  const handleSubmit = (event) => {
    event.preventDefault();
    // const files = photo;
    // const form = new FormData();
    // form.append("name", name);
    // form.append("description", description);
    // form.append("unitPrice", unitPrice);
    // form.append("category", category);
    // form.append("quantity", quantity);
    // form.append("supplier", state.user?._id);
    // if (photo) {
    //   form.append("photo", photo, photo.name);
    // }

    // FOR MULTIPLE IMAGES
    // for (let i = 0; i < files.length; i++) {
    //   form.append("photo", photo[i], photo.name[i]);
    // }

    POST("/products/createProduct", form).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
        console.log(status);
      } else if (status === 200) {
        console.log("Upload successful");
        console.log(data);
        location.reload();
      }
    });
  };

  const closeModal = () => {
    setVisible(false);
  };

  const handleActiveForm1 = () => {
    setSignInActive(false);
  };

  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6 text-gray-900 text-center pb-4 font-bold"
                  >
                    <Image src={Logo} width={50.0} height={68} alt={"logo"} />
                  </Dialog.Title>

                  <div>
                    <div className="text-lg text-gray-500 text-center font-semibold px-4 py-2 w-full rounded-md">
                      Add Product
                    </div>

                    <div className="mt-2">
                      <input
                        className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md "
                        placeholder="Name"
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md"
                        placeholder="description"
                        type="text"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="UnitPrice"
                        type="number"
                        value={unitPrice}
                        onChange={(e) => {
                          setUnitPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 ">
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="UnitPrice"
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="Category"
                        type="text"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex gap-3 items-center">
                      <h1>Images: </h1>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        type="file"
                        accept="image/"
                        // multiple
                        onChange={(e) => {
                          handleSetPhoto(e);
                        }}
                      />
                      {photo ? (
                        <div>
                          <Image src={photo} width={60} height={60} alt={"Img"} />
                        </div>
                      ) : (
                        <div>Image</div>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border bg-gray-600 px-4 py-2 font-medium text-gray-100 hover:bg-gray-700 w-full transition-all duration-75"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
