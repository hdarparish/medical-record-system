import React from "react";

const Home = () => {
  /*  const API_URL = "http://localhost:4000/";

  useEffect(() => {
    const getTable = async () => {
      // let history = useHistory();

      await axios
        .get(API_URL + "admin/viewPatients", {
          headers: authHeader(),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          return err.response;
        });
    };
    getTable();
  }, []);
 */
  return (
    <div>
      <p>This is the homepage</p>
      <p>Display dashboard</p>
    </div>
  );
};

export default Home;
