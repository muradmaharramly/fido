import React from "react";
import { useCart } from "react-use-cart";

const CheckoutPage = () => {
  const { items, emptyCart } = useCart();

  const phoneNumber = "+994558759382";

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      alert("Səbət boşdur!");
      return;
    }

    const totalWithDiscount = items.reduce((sum, item) => {
      const discountedPrice = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return sum + discountedPrice * item.quantity;
    }, 0);

    const message =
      "Yeni sifariş:\n\n" +
      items
        .map((item, index) => {
          const discountedPrice = item.discount
            ? (item.price - (item.price * item.discount) / 100).toFixed(2)
            : item.price.toFixed(2);

          const discountText = item.discount
            ? `Endirim: ${item.discount}%\nƏsl qiymət: ${item.price} AZN\nEndirimli qiymət: ${discountedPrice} AZN\n`
            : `Qiymət: ${item.price} AZN\n`;

          return (
            `${index + 1}. ${item.title}\n` +
            discountText +
            `Say: ${item.quantity} ədəd\n` +
            (item.image1 ? `Şəkil: ${item.image1}\n` : "") +
            `\n-----------------------\n`
          );
        })
        .join("") +
      `Ümumi məbləğ (endirimlə): ${totalWithDiscount.toFixed(2)} AZN\n\n` +
      "Təşəkkürlər!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    emptyCart();
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Sifarişi təsdiqlə</h2>
      <button
        onClick={handleWhatsAppOrder}
        style={{
          backgroundColor: "#25D366",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        WhatsApp-da sifarişi təsdiqlə
      </button>
    </div>
  );
};

export default CheckoutPage;
