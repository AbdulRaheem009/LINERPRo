import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../style/mainMenu.css";
import Sidebar from "./Sidebar";
import Rightsidebar from "./Rightsidebar";
import Topbar from "./Topbar";
import "../style/ArticleHistory.css";

function ArticalHistory() {
  const [User, setUser] = useState([]);

  function userdata() {
    if (window.sessionStorage.getItem("userToken")) {
      axios
        .get("http://localhost:5000/api/users/datarequest?", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setUser(res.data.postdata);
        });
    }
    console.log(User)
  }

  useEffect(() => {
    userdata();
  }, []);

  return (
    <>
      <Topbar />
      <div>
        <Box sx={{ width: "40%", marginLeft: "30%" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box className="card" style={{ marginTop: "15px" }}>
              <Box className="card-header" style={{ marginTop: "-80px" }}>
                <Box style={{ width: "200%", display: "flex", flexDirection: "column" }}>
                  <Box style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <Box
                      style={{ background: "white" }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box marginLeft="15%">
                        <h1>Article History</h1>
                      </Box>
                      <Box>
                        <br />
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%", // Set the width to 100%
                            marginTop: "1em",
                          }}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{
                                  textAlign: "left",
                                  borderBottom: "2px solid #ddd",
                                  padding: "0.5em",
                                }}
                              >
                                Sr
                              </th>
                              <th
                                style={{
                                  textAlign: "left",
                                  borderBottom: "2px solid #ddd",
                                  padding: "0.5em",
                                }}
                              >
                                Topic
                              </th>
                              <th
                                style={{
                                  textAlign: "left",
                                  borderBottom: "2px solid #ddd",
                                  padding: "1em",
                                }}
                              >
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {User.map((post, index) => (
                              <tr className={index % 2 === 0 ? "even-row" : ""} key={post.id}>
                                <td style={{ padding: "0.5em", borderBottom: "1px solid #ddd" }}>
                                  {index + 1}
                                </td>
                                <td style={{ padding: "0.5em", borderBottom: "1px solid #ddd" }}>
                                  <a href={post.PostUrl}>{post.Topic}</a>
                                </td>
                                <td style={{ padding: "0.5em", borderBottom: "1px solid #ddd" }}>
                                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",

                                    day: "numeric",
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      <Rightsidebar />
      <Sidebar />
    </>
  );
}

export default ArticalHistory;