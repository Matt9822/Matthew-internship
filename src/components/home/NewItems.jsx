import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        setNewItems(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching NewItems:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && newItems.length > 0) {
      setIsReady(true);
    }
  }, [loading, newItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdown = {};
      newItems.forEach((item) => {
        if (item.expiryDate) {
          const timeLeft = Math.max(
            new Date(item.expiryDate).getTime() - Date.now(),
            0
          );
          updatedCountdown[item.id] = formatTimeLeft(timeLeft);
        }
      });
      setCountdown(updatedCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [newItems]);

  const formatTimeLeft = (timeLeft) => {
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
    const seconds = Math.floor((timeLeft / 1000) % 60)
    return `${hours}h ${minutes}m ${seconds}s`
  }

  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      530: { items: 2 },
      800: { items: 3 },
      1000: { items: 4 },
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderLoadingItems = () => (
    <div className="row">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            key={`loading-${index}`}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <div className="skeleton-wrapper">
                  <Skeleton width="50px" height="50px" borderRadius="100px" />
                </div>
              </div>
              <div className="de_countdown-skeleton skeleton-wrapper">
                <Skeleton width="112.86px" height="32px" borderRadius="30px" />
              </div>
              <div className="nft__item_wrap">
                <div className="skeleton-wrapper">
                  <Skeleton width="274.5px" height="240px" />
                </div>
              </div>
              <div className="nft__item_info">
                <div className="skeleton-wrapper">
                  <Skeleton width="260px" height="49px" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  const renderNewItems = () => (
    <OwlCarousel className="owl-carousel owl-show" {...owlCarouselOptions}>
      {newItems.map((elem, id) => (
        <div className="nft__item" key={id}>
          <div className="author_list_pp">
            <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`Creator:${elem.authorId}`}
            >
              <img className="lazy" src={elem.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {elem.expiryDate ? (
            <div className="de_countdown">{countdown[elem.id]}</div>
          ) : (
            ""
          )}
          <div className="nft__item_wrap">
            <Link to="/item-details">
              <img
                src={elem.nftImage}
                className="lazy nft__item_preview"
                alt=""
                style={{
                  maxWidth: "400px",
                  maxHeight: "240px",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{elem.title}</h4>
            </Link>
            <div className="nft__item_price">{elem.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{elem.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!isReady ? renderLoadingItems() : renderNewItems()}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
