import React, { useEffect, useState } from "react";
import * as api from "../services/user.service";
//styles
import styled from "styled-components";

//initial state for the new appointment
const initialState = {
  patientId: "",
  amount: 0,
};

const Billing = () => {
  const [table, setTable] = useState(false);
  const [addBillButton, setAddBillButton] = useState(false);
  const [billingInfo, setBillingInfo] = useState(initialState);

  const getTable = async () => {
    let result = await api.getBills();
    setTable(result.data);
  };

  const addBill = async (e) => {
    e.preventDefault();
    api.addBill(billingInfo);
    setAddBillButton(!addBillButton);
    clearState();
    await getTable();
  };
  useEffect(() => {
    getTable();
  }, []);

  const set = (name) => {
    return ({ target: { value } }) => {
      setBillingInfo((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const clearState = () => {
    setBillingInfo(initialState);
  };

  const toggleSideBar = () => {
    setAddBillButton(!addBillButton);
    clearState();
  };

  return (
    <Billings>
      <div className="wrapper-btn">
        <button onClick={toggleSideBar}>Add Bill</button>
      </div>
      <div className={`side-menu ${addBillButton ? "active-side-menu" : ""}`}>
        <form onSubmit={addBill}>
          <div>
            <label htmlFor="patientId">Patient ID</label>
            <input
              id="patientId"
              value={billingInfo.patientId}
              onChange={set("patientId")}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              value={billingInfo.amount}
              onChange={set("amount")}
              type="text"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {table &&
              table.map((row) => (
                <tr key={row.billNumber}>
                  <td>{row.billNumber}</td>
                  <td>{row.patientId}</td>
                  <td>
                    {row.lastName}, {row.firstName}
                  </td>
                  <td>{row.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Billings>
  );
};

const Billings = styled.div`
  .side-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 50rem;
    height: 100%;
    box-shadow: 2px 2px 50px rgb(179, 178, 178);
    transform: translateX(-100%);
    transition: all 0.5s ease;
    opacity: 0;
    z-index: 5;
    background: white;
    form {
      margin: 3rem;

      div {
        display: flex;
      }
      input {
        flex: 1;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: none;
        margin-top: 1rem;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
        flex: 1;
      }
      label {
        flex: 1;
        margin: 1rem 1rem 0rem 0rem;
        font-size: 1.5rem;
      }
      button {
        font-size: 1.5rem;
        border: none;
        margin-top: 1rem;
        padding: 0.5rem 2rem;
        cursor: pointer;
        background: #5e8ec4;
        color: white;
        &:hover {
          opacity: 0.7;
          transition: 0.3;
        }
      }
    }
  }
  .active-side-menu {
    transform: translateX(0);
    opacity: 1;
  }
  .wrapper-btn {
    text-align: end;
    button {
      font-size: 1.5rem;
      border: none;
      margin-top: 1rem;
      padding: 0.5rem 2rem;
      cursor: pointer;
      background: #5e8ec4;
      color: white;
      &:hover {
        opacity: 0.7;
        transition: 0.3;
      }
    }
  }
  table {
    margin-top: 1rem;
    width: 100%;
    border: 1px solid black;
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    td {
      text-align: center;
    }
  }
`;

export default Billing;
