import axios from "axios";
import "./posting.css";
import { useEffect, useState } from "react";
import { Loading, Post } from "components";

function Posting() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const back = [
    "#F6D3E3",
    "#FAECE4",
    "#DBE4E5",
    "#C8E8F4",
    "#CAEAF2",
    "#D6E2EF",
    "#E9E6F2",
    "#F0D9E9",
    "#F9E2DF",
    "#FBE1C3",
    "#FDF1C3",
    "#FAE8DB",
    "#F1EEE5",
    "#E1F2EA",
    "#D5F0F3",
    "#E6F4F1",
    "#EDF6E8",
    "#EEF6F6",
    "#E9F6F9",
    "#DDF7FD",
  ];

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://127.0.0.1:8000/match/jobsearch-api/", {
          params: {
            limit: 20, // 가져올 데이터 개수 지정
            offset: (page - 1) * 20, // 데이터의 시작 위치 지정
          },
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data.results);
          setData(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    console.log(page);
    fetchData();
  }, [page]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="posting-wrapper">
          <h1>추천 공고</h1>
          <ul className="post-wrapper">
            {data.map((item) => (
              <Post
                key={item.id}
                title={item.title}
                keyword={item.keyword_name}
                company={item.company_detail_name}
                location={item.location_name}
                education={item.educationlevel_name}
                jobtype={item.jobtype_name}
                url={item.url}
                career={item.experiencelevel_name}
                date={item.expiration_timestamp}
                closetype={item.closetype_name}
                up={back[(item.id * page) % 10]}
              />
            ))}
          </ul>
          <div className="page-Btn">
            <button
              onClick={() =>
                setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.648 20.048a1.2 1.2 0 0 1-1.696 0l-7.2-7.2a1.2 1.2 0 0 1 0-1.696l7.2-7.2a1.2 1.2 0 0 1 1.696 1.696L6.497 10.8H20.4a1.2 1.2 0 1 1 0 2.4H6.497l5.151 5.152a1.2 1.2 0 0 1 0 1.696Z"
                  clipule="evenodd"
                ></path>
              </svg>
            </button>
            {page > 2 && (
              <button onClick={() => setPage((prevPage) => prevPage - 2)}>
                {page - 2}
              </button>
            )}
            {page > 1 && (
              <button onClick={() => setPage((prevPage) => prevPage - 1)}>
                {page - 1}
              </button>
            )}
            <button
              style={{ backgroundColor: "#cfdcee" }}
              onClick={() => setPage((prevPage) => prevPage + 2)}
            >
              {page}
            </button>
            <button onClick={() => setPage((prevPage) => prevPage + 1)}>
              {page + 1}
            </button>
            <button onClick={() => setPage((prevPage) => prevPage + 2)}>
              {page + 2}
            </button>
            {page < 2 && (
              <button onClick={() => setPage((prevPage) => prevPage + 3)}>
                {page < 2 ? 4 : page + 3}
              </button>
            )}
            {page < 3 && (
              <button onClick={() => setPage((prevPage) => prevPage + 4)}>
                {page < 3 ? 5 : page + 4}
              </button>
            )}
            <button onClick={() => setPage((prevPage) => prevPage + 1)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.352 3.952a1.2 1.2 0 0 1 1.696 0l7.2 7.2a1.2 1.2 0 0 1 0 1.696l-7.2 7.2a1.2 1.2 0 0 1-1.696-1.696l5.151-5.152H3.6a1.2 1.2 0 1 1 0-2.4h13.903l-5.151-5.152a1.2 1.2 0 0 1 0-1.696Z"
                  clipule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posting;
