import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";


const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;

      setScrollPercent(percent);

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button className="back-to-top" onClick={scrollToTop}>
          <svg className="progress-ring" width="60" height="60">
            <circle
              className="progress-ring__circle"
              stroke="red"
              strokeWidth="3"
              fill="transparent"
              r="26"
              cx="30"
              cy="30"
              style={{
                strokeDasharray: 2 * Math.PI * 26,
                strokeDashoffset:
                  2 * Math.PI * 26 - (scrollPercent / 100) * (2 * Math.PI * 26),
              }}
            />
          </svg>
          <span className="arrow"><MdKeyboardArrowUp /></span>
        </button>
      )}
    </>
  );
};

export default BackToTop;
