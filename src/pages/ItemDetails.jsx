import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import api from "../components/UI/Api";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [nftData, setNftData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const nftId = window.location.pathname.slice(14)


  useEffect(() => {
    const fetchNftData = async () => {
      try{  
        const data = await api.get(`/itemDetails?nftId=${nftId}`)
        setNftData(data)
      }catch (err) {
        setError(err.message || "Failed to load NFT data")
      }finally{
        setLoading(false)
      }
    }
    fetchNftData()
  }, [nftId]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
      {loading ? (
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width={"100%"} height={"100%"}/>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton width={'616px'} height={'46px'}/>
                  <div className="item_info_counts">
                      <Skeleton width={'200px'} height={'30px'}/>                    
                  </div>
                  <Skeleton width={'500px'} height={'60px'}/>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">                        
                          <Skeleton width={'50px'} height={'50px'} borderRadius={'100px'}/>                                                     
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={'107px'} height={'21px'}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton width={'50px'} height={'50px'} borderRadius={'100px'}/> 
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={'107px'} height={'21px'}/>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <Skeleton width={'75px'} height={'37px'}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ) : (
        <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftData.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData.likes}
                    </div>
                  </div>
                  <p>
                    {nftData.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData.ownerId}`}>
                            <img className="lazy" src={nftData.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData.creatorId}`}>
                            <img className="lazy" src={nftData.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.creatorId}`}>{nftData.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
