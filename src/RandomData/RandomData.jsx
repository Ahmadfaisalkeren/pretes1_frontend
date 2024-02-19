import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../FetchAPI/FetchAPI";
import Loading from "../Loader/Loading";

const RandomData = () => {
  const [randomData, setRandomData] = useState([]);
  const [profesiCount, setProfesiCount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}api/getUserData`);
        setRandomData(response.data.randomUser);
        setProfesiCount(response.data.profesiCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Data", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full grid grid-cols-1">
      <h1 className="text-center text-3xl font-bold">All Data Lists</h1>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-400 mb-5">
            <thead>
              <tr className="bg-gray-200">
                <th>No</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>Jalan</th>
                <th>Email</th>
                <th>Profesi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <Loading />
                  </td>
                </tr>
              ) : randomData && randomData.length > 0 ? (
                randomData.map((random, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{random.nama}</td>
                    <td>{random.gender.jenis_kelamin}</td>
                    <td>{random.nama_jalan}</td>
                    <td>{random.email}</td>
                    <td>{random.profesi.nama_profesi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full grid grid-cols-1">
        <h1 className="text-center text-3xl font-bold">Profesi Data Lists</h1>
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400 mb-5">
              <thead>
                <tr className="bg-gray-200">
                  <th>No</th>
                  <th>Profesi</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      <Loading />
                    </td>
                  </tr>
                ) : profesiCount && Object.keys(profesiCount).length > 0 ? (
                  Object.keys(profesiCount).map((profesi, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{profesi}</td>
                      <td className="text-center">{profesiCount[profesi]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomData;
