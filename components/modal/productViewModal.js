import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState, useContext, useEffect } from "react";
import { Context } from "../../context/authContext";
import { POST } from "../../lib/api";
import LoginModal from "./loginModal";

const ProductViewModal = ({ product, visible, setVisible }) => {
  const { state } = useContext(Context);
  const [productId, setProductId] = useState("");
  const [showModal, setShowModal]=  useState(false)

  const body = { product: productId };

  useEffect(() => {
    setProductId(product?._id);
  }, [product]);

  const handleSubmit = () => {
    POST("/requests", body).then(({ data, status }) => {
      if (status !== 200) {
        console.log(status);
        console.log(data);
      } else if (status === 200) {
        console.log(data);
        location.reload();
      }
    });
  };

  function closeModal() {
    setVisible(false);
  }
  const handleShowModal = ()=>{
    setShowModal(true)
  }
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
                <Dialog.Panel className="w-full max-w-md transform overflow- rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Image
                    className="rounded-xl"
                    src={product.photo?.url}
                    width={420}
                    height={400}
                    alt={"Product Image"}
                  />
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {product.name}
                  </Dialog.Title>
                  <div className="mt-2 text-lg ">
                  <p className="text-sm text-gray-500">
                  <span className="font-bold">Quantity: </span> {product.quantity}
                </p>

                {state.user && (
<div>  <p className="text-sm text-gray-500">
                  <span className="font-bold">SKU No.: </span> {product._id}
                </p>
                  
                  <p className="text-sm text-gray-500">
                  <span className="font-bold">Unit Price: </span> {product.unitPrice}
                  </p>
                  <p className="text-sm text-gray-500">
                  <span className="font-bold">Description: </span>
                  {product.description}
                  </p>
                  <p className="text-sm text-gray-500">
                  <span className="font-bold">Category: </span> {product.category}
                  </p>
                 <p className="text-sm">Send this article to your buyer email, you can change price and set email only.</p>
                 <p>Enter Email</p><p>Enter Price</p>
                 <p>Customer Support Number</p>
                 <p>+8801841933577</p>
                  </div>
                  )}

                  </div>

                  <div className="mt-4 flex justify-center">
                    {state.user && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none  focus-visible:ring-offset-2"
                        onClick={handleSubmit}
                      >
                        Request Supplier Info
                      </button>
                    )}
                    {!state.user && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:text-indigo-600 focus:outline-none  focus-visible:ring-offset-2"
                        onClick={() => {
                          handleShowModal();
                          
                      
                        }}
                      >
                        Login to see more details
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            <LoginModal visible={showModal} setVisible={setShowModal}/>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProductViewModal;
