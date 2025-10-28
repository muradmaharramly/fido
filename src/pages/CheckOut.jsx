import React from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";

const CheckoutPage = () => {
  const { items, emptyCart } = useCart();
  const navigate = useNavigate();

  const phoneNumber = "+994558759382";

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      alert("Səbət boşdur!");
      return;
    }

    const totalWithDiscount = items.reduce((sum, item) => {
      const selectedVariant = item.variants?.[item.selectedVariantIndex] ?? null;
      const price = Number(selectedVariant?.price ?? item.price ?? 0);
      const discount = Number(selectedVariant?.discount ?? item.discount ?? 0);
      const finalPrice = price - (price * discount) / 100;

      return sum + finalPrice * item.quantity;
    }, 0);

    const message =
      "Yeni sifariş:\n\n" +
      items
        .map((item, index) => {
          const selectedVariant = item.variants?.[item.selectedVariantIndex] ?? null;
          const price = Number(selectedVariant?.price ?? item.price ?? 0);
          const discount = Number(selectedVariant?.discount ?? item.discount ?? 0);
          const finalPrice = (price - (price * discount) / 100).toFixed(2);
          const size = selectedVariant?.size ?? item.size ?? null;

          const discountText = discount
            ? `Endirim: ${discount}%\nƏsl qiymət: ${price} AZN\nEndirimli qiymət: ${finalPrice} AZN\n`
            : `Qiymət: ${finalPrice} AZN\n`;

          const sizeText = size ? `Ölçü: ${size}${item.category === "Parfum" ? " ml" : ""}\n` : "";

          return (
            `${index + 1}. ${item.title}\n` +
            discountText +
            sizeText +
            `Say: ${item.quantity} ədəd\n` +
            `\n-----------------------\n`
          );
        })
        .join("") +
      `Ümumi məbləğ (endirimlə): ${totalWithDiscount.toFixed(2)} AZN\n\n` +
      "Təşəkkürlər!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    emptyCart();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <div className="breadcrumb">
        <Link to="/">Ana səhifə</Link>
        <RiArrowRightDoubleFill />
        <Link to="/cart">Səbət</Link>
        <RiArrowRightDoubleFill />
        <span>Sifariş təsdiqləmə</span>
      </div>

      <div className="checkout-card">
        <h2 className="checkout-title">Sifarişi təsdiqlə</h2>
        <p className="checkout-description">
          Sifarişinizi tamamlamaq üçün aşağıdakı düyməyə klik edin. WhatsApp üzərindən sifariş
          təsdiq səhifəsinə yönləndiriləcəksiniz. Orada sifariş detallarınızı təsdiqləyərək
          alış-verişinizi başa çatdıra bilərsiniz.
        </p>

        <div className="checkout-buttons">
          <button className="whatsapp-btn" onClick={handleWhatsAppOrder}>
            <div className="icon"><FaWhatsapp /></div>
            WhatsApp<span>-da sifarişi təsdiqlə</span>
          </button>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Geri qayıt
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
