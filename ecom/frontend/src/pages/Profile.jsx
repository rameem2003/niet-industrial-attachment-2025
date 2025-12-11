import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Container from "../components/common/Container";
import { Link, useNavigate } from "react-router";
import UserForm from "../components/screens/profile/UserForm";
import OrdersList from "../components/screens/profile/OrdersList";
import UpdatePassword from "../components/screens/profile/UpdatePassword";

const Profile = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <main className=" py-20">
      <Container>
        <section className=" flex items-start justify-between gap-5">
          <aside className=" w-3/12">
            <ul>
              <li className=" mb-5">
                <button onClick={() => setPage(0)}>Profile</button>
              </li>
              <li className=" mb-5">
                <button onClick={() => setPage(1)}>Update Password</button>
              </li>
              <li className=" mb-5">
                <button onClick={() => setPage(2)}>Order</button>
              </li>
              <li className=" mb-5">
                <button>Logout</button>
              </li>
            </ul>
          </aside>

          {page == 0 && <UserForm />}
          {page == 1 && <UpdatePassword />}
          {page == 2 && <OrdersList />}
        </section>
      </Container>
    </main>
  );
};

export default Profile;
