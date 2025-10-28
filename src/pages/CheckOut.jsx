import React from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const { items, emptyCart } = useCart();
  const navigate = useNavigate();

  const phoneNumber = "+994558759382";

  const handleWhatsAppOrder = async () => {
    if (items.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Səbət boşdur!",
        confirmButtonText: "Bağla",
      });
      return;
    }

    // 🟢 Əvvəlcə təsdiq popup-u göstər
    const result = await Swal.fire({
      title: "Sifarişi WhatsApp üzərindən təsdiqləmək istəyirsiniz?",
      text: "Bu əməliyyatı təsdiqlədikdən sonra WhatsApp-a yönləndiriləcəksiniz.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Bəli, təsdiqlə",
      cancelButtonText: "Xeyr, geri qayıt",
      reverseButtons: true,
      confirmButtonColor: "#25D366",
      cancelButtonColor: "#d33",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-text",
        confirmButton: "custom-swal-confirm",
        cancelButton: "custom-swal-cancel",
        icon: "custom-swal-icon"
      }
    });

    if (!result.isConfirmed) return;

    // 🧮 Hesablama
    const totalWithDiscount = items.reduce((sum, item) => {
      const selectedVariant = item.variants?.[item.selectedVariantIndex] ?? null;
      const price = Number(selectedVariant?.price ?? item.price ?? 0);
      const discount = Number(selectedVariant?.discount ?? item.discount ?? 0);
      const finalPrice = price - (price * discount) / 100;

      return sum + finalPrice * item.quantity;
    }, 0);

    const message =
      "🛍️ Yeni sifariş:\n\n" +
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

    // ✅ Yönləndirmə
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
