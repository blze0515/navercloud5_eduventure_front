import Title from "../components/Title";
import SearchIcon from "@mui/icons-material/Search";
import VODList from "../components/VODBoard/VODList";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const styles = {
  container: {
    width: "100vw",
    height: "calc(100vh - 50px)",
    overflow: "hidden",
    backgroundColor: "#5AC467",
    position: "relative",
  },
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
  buttonsAndSearchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "5px",
  },
  styleButton3: {
    width: "80px",
    height: "40px",
    backgroundColor: "#ffffff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "110px",
  },
};

const Dropdown = styled.select`
  width: 90px;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 40px;
  margin: 0 5px;
  border: none;
  padding: 0 15px;
  border-radius: 20px;
`;

const VODBoard = () => {
  const [searchOption, setSearchOption] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const [VODData, setVODData] = useState([]);
  const [originalVODList, setOriginalVODList] = useState([]); //검색 필터링에 기준이 되는 상태값

  useEffect(() => {
    const getVODList = async () => {
      try {
        const response = await axios.get(
          "http://223.130.161.116:80/vod/board-list",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        console.log(response);

        if (response.data.items) {
          setVODData(response.data.items);
          setOriginalVODList(response.data.items);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getVODList();
  }, []);

  const handleSelectChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search Option: ", searchOption);
    console.log("Search Text: ", searchText);
    const filteredVodData = originalVODList.filter((item) => {
      if (!item.title || !item.writer) {
        return false;
      }

      if (searchOption === "전체") {
        return (
          item.title.includes(searchText) || item.writer.includes(searchText)
        );
      } else if (searchOption === "강사명") {
        return item.writer.includes(searchText);
      } else if (searchOption === "강의명") {
        return item.title.includes(searchText);
      }
      return false;
    });

    setVODData(filteredVodData); // 필터링된 결과를 VODList에 저장
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <Title subtitle="복습해봐요" title="지난 수업 영상" color="#ffffff" />
      </div>
      <div style={styles.searchContainer}>
        <Dropdown value={searchOption} onChange={handleSelectChange}>
          <option value="전체">전체</option>
          <option value="강사명">강사명</option>
          <option value="강의명">강의명</option>
        </Dropdown>
        <SearchInput
          placeholder="검색어 입력"
          value={searchText}
          onChange={handleInputChange}
        />
        <button style={styles.styleButton3} onClick={handleSearch}>
          검색
        </button>
      </div>
      <VODList VODList={VODData} setVODList={setVODData} />
    </div>
  );
};

export default VODBoard;
