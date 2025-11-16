import React, { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const DeliveryBilling = () => {
  const [deliveryType, setDeliveryType] = useState("");
  const [total, setTotal] = useState(0);

  const handleDeliveryChange = (e) => {
    const type = e.target.value;
    setDeliveryType(type);

    let cost = 0;
    if (type === "metro_stansiya(SOS)") {
      cost = 3;
    } else if (type === "metro_çıxışı") {
      cost = 4;
    } else if (type === "taksiylə") {
      cost = 0; 
    } else if (type === "poçtla") {
      cost = 5;
    }
    setTotal(cost);
  };
  const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

  return (
    <div className="delivery-billing-container">
    <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Haqqımızda</span></div>
      <h2>Çatdırılma və Ödəniş</h2>

      <div className="section">
        <h3>Çatdırılma Seçimləri</h3>
        <div className="option">
          <input
            type="radio"
            id="metro_stansiya(SOS)"
            name="delivery"
            value="metro_stansiya(SOS)"
            onChange={handleDeliveryChange}
          />
          <label htmlFor="metro_stansiya(SOS)">
            Metrolara çatdırılma - 3 AZN
          </label>
        </div>

        <div className="option">
          <input
            type="radio"
            id="metro_çıxışı"
            name="delivery"
            value="metro_çıxışı"
            onChange={handleDeliveryChange}
          />
          <label htmlFor="metro_çıxışı">
            Metro çıxışı çatdırılma - 4 AZN
          </label>
        </div>

        <div className="option">
          <input
            type="radio"
            id="taksiylə"
            name="delivery"
            value="taksiylə"
            onChange={handleDeliveryChange}
          />
          <label htmlFor="taksiylə">
            Şəhərdaxili çatdırılma (taksi ilə) - ödəniş müştəri tərəfindən
          </label>
        </div>

        <div className="option">
          <input
            type="radio"
            id="poçtla"
            name="delivery"
            value="poçtla"
            onChange={handleDeliveryChange}
          />
          <label htmlFor="poçtla">
            Rayonlara poçtla çatdırılma - 5 AZN
          </label>
        </div>
      </div>

      <div className="section">
  <h3>Ödəniş xülasəsi</h3>
  <p>
    Seçilmiş çatdırılma:{" "}
    <label className="etiquet">{deliveryType ? capitalizeWords(deliveryType.replace("_", " ")) : "Seçilməyib"}</label>
  </p>
  <p>
    Ümumi məbləğ: {total > 0 ? `${total} AZN` : "Ödəniş müştəri tərəfindən"}
  </p>
</div>


      <div className="section">
        <h3>Ödəniş</h3>
        <p className="bannered">Ödəniş çatdırılma zamanı nağd və ya kart ilə həyata keçirilə bilər.</p>
      </div>
    </div>
  );
};

export default DeliveryBilling;
