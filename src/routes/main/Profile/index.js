import React, { useEffect, useState } from "react";
import { Table, Row, Col, Select, Button, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setupdateRateReffrenece } from "../../../appRedux/actions/User";
import BackMenuButton from "../../../components/BackMenu";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { httpPatch } from "../../../http/http";


const { Option } = Select;

const Profile = () => {
  const dispatch = useDispatch();
  const [selectedRate, setSelectedRate] = useState(0);
  const [user, setUser] = useState(null);
  const [matchBetPlaceModal, setMatchBetPlaceModal] = useState(false);


  // Retrieve user data from localStorage and set it to state
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user_id_tvs99'));
    setUser(storedUser);
  }, []);

  // Handle changes to the rateReffrence in localStorage
  useEffect(() => {
    const rateReffrence = localStorage.getItem('rateReffrenec');
    if (rateReffrence) {
      setSelectedRate(rateReffrence * 100);
    }
  }, []);

  // Handle changes to the matchBetPlaceModal in localStorage
  useEffect(() => {
    const storedModalState = localStorage.getItem("matchBetPlaceModal");
    setMatchBetPlaceModal(storedModalState === "true");
  }, []);

  const handleSelectChange = (value) => {
    setSelectedRate(value);
  };
  const renderContent = (value) => ({
    children: value,
    props: {},
  });

  const handleSubmit = () => {
    if (selectedRate !== null) {
      const resultBody = { rate: Number(selectedRate) };
      try {
        dispatch(setupdateRateReffrenece(resultBody));
      } catch (error) {
        console.error('Error submitting rate:', error);
      }
    } else {
      console.warn('No rate selected for submission');
    }
  };
  // const handleBetModal = () => {
  //   let matchBetPlaceModal = localStorage.getItem('matchBetPlaceModal');
  //   if (matchBetPlaceModal === 'true') {
  //     localStorage.setItem('matchBetPlaceModal', 'false');
  //   } else {
  //     localStorage.setItem('matchBetPlaceModal', 'true');
  //   }
  // };
  const handleBetModalToggle = () => {
    const newState = !matchBetPlaceModal;
    setMatchBetPlaceModal(newState);
    updateBetChipsModal()
  };

  const updateBetChipsModal = async () => {
    try {
      const currentBetChipModalStatus = localStorage.getItem("matchBetPlaceModal") ? JSON.parse(localStorage.getItem("matchBetPlaceModal")) : false
      const reqData = {
        "status": !currentBetChipModalStatus
      }
      const result = await httpPatch("user/updateBetChipsModal", reqData);

      if (result) {
        if (result.error === false) {
          localStorage.setItem('matchBetPlaceModal', JSON.stringify(result?.data?.betChipsModal));
          NotificationManager.success(result?.message, "Success", 1000, () => {
            alert('callback');
          });
        } else {
          // Add error handling code for when result.error is true
          console.error("Error occurred: ", result.message);
        }
      } else {
        console.error("No result returned from the server.");
      }
    } catch (error) {
      // Handle any exceptions that might occur during the HTTP request
      console.error("An exception occurred: ", error.message);
    }
  };



  const rateColumns = [
    {
      title: 'Rate Information',
      dataIndex: 'age',
      key: 'age',
      colSpan: 3,

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      colSpan: 0,
      render: () => (
        <Select
          showSearch
          size="small"
          style={{ width: 50 }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={handleSelectChange}
          value={selectedRate}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Option key={value} value={value.toString()}>{value}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      colSpan: 0,
      render: () => (
        <div
          onClick={handleSubmit}
          className="gx-text-white gx-w-100 gx-pointer gx-font-weight-semi-bold gx-bg-green-0 gx-py-2 gx-px-2"
        >
          UPDATE
        </div>
      ),
    },
  ];

  const rateData = [
    { key: '1', age: 'Rate Difference', name: 'Select Rate' },
  ];

  const userData = user ? [
    {
      key: '1',
      tel: 'Client Name:',
      info: user?.data?.username || ''
    },
    {
      key: '2',
      tel: 'Client Code:',
      info: user?.data?.name || ''
    },
    {
      key: '3',
      tel: 'Chip:',
      info: user?.data?.balance !== undefined ?
        user.data.balance.toFixed(2) : '0'
    },
    { key: '4', tel: 'Content No.', info: 0 },
    { key: '5', tel: 'Date Of Joining', info: '12-08-2023' },
    { key: '6', tel: 'Address', info: 'INDIA' },
  ] : [];

  const companyData = [
    { key: '1', age: 'Help Line No:', name: '+91 1234567890' },
  ];

  const { loading } = useSelector((state) => state.UserReducer);



  return (
    <>
      {loading && <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        zIndex: 1000
      }} className="gx-bg-flex gx-align-items-center gx-justify-content-center">
        <div className="pulseLoader rounded-full"></div>
      </div>}
      <Row justify={"center"}>
        <Col xxl={14} xl={14} md={20} sm={24} xs={24} className="gx-col-full">
          <Table
            className="gx-table-responsive"
            dataSource={rateData}
            bordered
            size="small"
            pagination={false}
            columns={rateColumns}
          />
          {/* <Row justify={"space-around"} className="gx-align-items-center gx-py-1">
            <div className="gx-text-capitalize gx-font-weight-bold gx-fs-xl ">bet Modal On/Off</div>

            <Switch
              onChange={handleBetModalToggle}
              checked={matchBetPlaceModal}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className="gx-mx-3 gx-my-1 gx-px-1"
              style={{
                backgroundColor: matchBetPlaceModal ? "green" : "red",
                transform: "scale(1.3)",
              }}
            />
          </Row>  */}

          <Table
            className="gx-table-responsive"
            dataSource={userData}
            bordered
            size="small"
            pagination={false}
            columns={[
              {
                title: "Personal Information",
                dataIndex: "tel",
                key: "tel",
                colSpan: 2,
                render: renderContent,
              },
              {
                title: "Information",
                dataIndex: "info",
                key: "info",
                colSpan: 0,
                render: renderContent,
              },
            ]}
          />
          <Table
            className="gx-table-responsive"
            dataSource={companyData}
            bordered
            size="small"
            pagination={false}
            columns={[
              {
                title: "Company Information",
                dataIndex: "age",
                key: "age",
                colSpan: 2,
              },
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
                colSpan: 0,
              },
            ]}
          />
        </Col>
      </Row>
      <div className="gx-py-4">
        <BackMenuButton />
      </div>
      <NotificationContainer position="top-left" />
    </>
  );
};

export default Profile;