"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useCart from "./(store)/store";

export default function ProductCard(props) {
  const { product } = props;
  const {
    id: price_id,
    unit_amount: cost,
    product: product_info,
  } = product;
  const router = useRouter();
  const setProduct = useCart((state) => state.setProduct);

  function onProductClick() {
    const newProduct = {
      price_id,
      name: product_info.name,
      description: product_info.description,
      image: product_info.images[0],
      cost,
      product: product_info,
    };

    setProduct({ newProduct });
    router.push(`/product?price_id=${price_id}`);
  }

  return (
    <div
      onClick={onProductClick}
      className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl"
    >
      <Image
        width="200"
        height="200"
        className="rounded-t-lg h-[250px] object-cover w-full"
        src={product_info.images[0]}
        alt={product_info.name}
        priority={true}
      />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900">
            {product_info.name}
          </h5>
          <p className="text-xl">${cost / 100}</p>
        </div>

        <p className="mb-3 font-normal text-gray-700">
          {product_info.description}
        </p>
      </div>
    </div>
  );
}
