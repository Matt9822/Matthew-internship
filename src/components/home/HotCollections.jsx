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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
        console.log("Collections data:", response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching collections:", error.message);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchData();
  }, []);

   useEffect(() => {
    console.log("Loading state:", loading);
    console.log("Collections:", collections);
  }, [loading, collections]);

  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  // if (loading) {

  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <OwlCarousel
            className="owl-carousel owl-show"
            {...owlCarouselOptions}
          >
            {collections.map((elem, id) => (
              <div className="" key={id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      {loading ? (
                        <Skeleton width="314.5px" height="200px" />
                      ) : (
                        <img
                          src={elem.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      )}
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      {loading ? (
                        <Skeleton width="60px" height="60px" borderRadius="100px" />
                      ) : (
                        <img
                          className="lazy pp-coll"
                          src={elem.authorImage}
                          alt=""
                        />
                      )}
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      {loading ? (
                        <Skeleton width="80px" height="19.19px" />
                      ) : (
                        <h4>{elem.title}</h4>
                      )}
                    </Link>
                    {loading ? (
                      <Skeleton width="50.66px" height="18px" />
                    ) : (
                      <span>ERC-{elem.code}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
