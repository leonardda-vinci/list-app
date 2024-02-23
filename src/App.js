import React, { useState, useEffect, useRef,CSSProperties  } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { Row, Col } from 'react-bootstrap';

import ClipLoader from "react-spinners/ClipLoader";
import './App.css';

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loaderRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.spacexdata.com/v4/launches/?limit=3&page=${page}`);
      const data = response.data;

      if (data.length === 0) {
       
        setHasMore(false);
        return;
      }

      setTableData((prevData) => [...data]);
      setPage((prevPage) => prevPage + 1);
      console.log("API Data:", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore ) {
   
      fetchData();
     
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
  
    const observer = new IntersectionObserver(handleIntersection, options);
    if (loaderRef.current ) {
      observer.observe(loaderRef.current);
    
    }
  
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
        setHasMore(false);
      }
    };
  }, [loaderRef, hasMore ]);
console.log("hasMore"+ hasMore)
  return (
      <div className="app-container">
      <div className="search-bar-container">
      <input type="text" placeholder="Enter Keywords" className="search-bar" />
      </div>
      
          <div className="center-box">
          {tableData.map((launch, index) => (
          <Row className="tableData-descriptions" key={launch.id} style={{ flexWrap: 'nowrap' }}>
          <Col id="image-content" lg={6}>
           <LazyLoad height={200} offset={100} once>
           <img
              src={launch.links.patch.small}
              alt="Large Patch"
              className="img-fluid"
              loading="lazy"
            />
            </LazyLoad>
            </Col>
            
            <Col lg={6}>
            <LazyLoad height={200} offset={100} once>
            <p id="tableData-Header">{launch.flight_number}: {launch.name} ({launch.date_local.slice(0, 4)})</p>
            <p id="tableData-details">Details: {launch.details}</p>
            </LazyLoad>
           </Col>
           </Row>
           ))}
       
        {hasMore ? (
         <div style={{ textAlign: 'center', padding: '20px' }} ref={loaderRef}>
        {/* Display your loader here */}
        <ClipLoader className="loader" />
      </div>
      ) : (
      <p style={{ textAlign: 'center', padding: '20px' }}>
        <b>No more data to be fetched</b>
      </p>
      )}

      </div>
    
    </div>
    
  );
}

export default App;
