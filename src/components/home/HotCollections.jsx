import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching collections:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  useEffect(() => {
    if (!loading && collections.length > 0) {
      setIsReady(true);
    }
  }, [loading, collections]);

  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      800: { items: 3 },
      1000: { items: 4 },
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderLoadingItems = () => (
    <div className="row">
      {Array(4).fill(null).map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`loading-${index}`}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <div className="skeleton-wrapper">
                <Skeleton width="100%" height="200px" />
              </div>
            </div>
            <div className="nft_coll_pp">
              <div className="skeleton-wrapper">
                <Skeleton width="60px" height="60px" borderRadius="100px" />
              </div>
            </div>
            <div className="nft_coll_info">
              <div className="skeleton-wrapper">
                <Skeleton width="80px" height="19.19px" />
              </div>
              <div className="skeleton-wrapper">
                <Skeleton width="50.66px" height="18px" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCollections = () => (
    <OwlCarousel className="owl-carousel owl-show" {...owlCarouselOptions}>
      {collections.map((elem, id) => (
        <div className="" key={id}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to="/item-details">
                <img src={elem.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={elem.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{elem.title}</h4>
              </Link>
              <span>ERC-{elem.code}</span>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!isReady ? renderLoadingItems() : renderCollections()}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;