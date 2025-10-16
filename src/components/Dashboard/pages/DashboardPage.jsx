import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { FaBox, FaNewspaper, FaBullhorn, FaUsers } from "react-icons/fa";
import { fetchCampaigns } from "../../../tools/request/fetchCampaigns";
import { fetchNews } from "../../../tools/request/fetchNews";
import { fetchProducts } from "../../../tools/request/fetchProducts";
import { FaBoxesStacked } from "react-icons/fa6";
import { HiNewspaper } from "react-icons/hi";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { campaigns, campaignCount } = useSelector((state) => state.campaigns);
  const { products, productCount } = useSelector((state) => state.products);
  const { news, newsCount } = useSelector((state) => state.news);

  useEffect(() => {
    fetchProducts();
    fetchCampaigns();
    fetchNews();
  }, []);

  const stats = [
    { title: "Məhsullar", icon: <FaBoxesStacked />, text: "Məhsullar barədə məlumat ala, redaktə edə və yeni məhsul əlavə ede bilərsiniz.", color: "#4CAF50", link: "/administrative/products" },
    { title: "Xəbərlər", icon: <HiNewspaper />, text: "Xəbərlərə nəzarət, redaktə və paylaşım sizin əlinizdədir!", color: "#2196F3", link: "/administrative/news" },
    { title: "Kampaniyalar", icon: <MdCampaign />, text: "Vaxtaşırı kampaniyalara göz gəzdir, yarat və izlə!", color: "#FF9800", link: "/administrative/campaigns" }
  ];

  const pieData = [
    { name: "Məhsullar", value: productCount, color: "rgb(255, 0, 0)" },
    { name: "Xəbərlər", value: newsCount, color: "rgb(0, 225, 255)" },
    { name: "Kampaniyalar", value: campaignCount, color: "rgb(1, 235, 126)" }
  ];

  const lineData = products
    ? products.map(product => ({
      price: product.price,
      discount: product.discount || 0,
    }))
    : [];

  return (
    <div className="dashboard-container">
      <div className="top-cards">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div className="content">
              <div className="headline"><div className="icon">{item.icon}</div><p>{item.title}</p></div>
              <p className="text">{item.text}</p>
              <Link to={item.link} className="view-button">Daha çox</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-section">
        <div className="line-chart-container">
          <h3>Qiymət endirim asılılığı</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="discount" label={{ value: "Endirim", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Qiymət", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-chart-container">
          <h3>Məzmun nisbəti</h3>
          <ResponsiveContainer width="100%" height={285}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legenda">
            <span>Məhsullar</span>
            <span>Xəbərlər</span>
            <span>Kampaniyalar</span>
          </div>
        </div>

        <div className="calendar-container">
          <h3>Kalendar</h3>
          <Calendar
            tileClassName={({ date, view }) =>
              view === "month" && date.toDateString() === new Date().toDateString()
                ? "highlight-today"
                : "other"
            } />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
