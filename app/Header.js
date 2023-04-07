"use client";
import Link from "next/link";
import Modal from "./Modal";
import useCart from "./(store)/store";

export default function Header() {
  const openModal = useCart((state) => state.openModal);
  const setOpenModal = useCart((state) => state.setOpenModal);

  return (
    <header className="sticky top-0 shadow p-6 text-2xl sm:text-3xl md:text-4xl bg-white bg-opacity-80 flex items-center justify-between">
      <Link href="/">
        <h1 className="cursor-pointer uppercase">Faz Shop</h1>
      </Link>
      <div>
        {openModal && <Modal />}
        <i
          onClick={setOpenModal}
          className="fa-solid fa-cart-shopping hover:text-slate-500 cursor-pointer"
        />
      </div>
    </header>
  );
}
