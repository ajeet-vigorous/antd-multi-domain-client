import { Button, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const AlertModal = ({ onConfirm, betStatusUpdate }) => {
  const { betPlaceMessage } = useSelector((state) => state.UserReducer)

  return (
    <Modal
      open={true}
      centered
      title={``}
      onCancel={onConfirm}
      footer={
        ''
      }
      className="gx-px-3 gx-text-uppercase"
    >
      {betStatusUpdate == "success" || betStatusUpdate === true && (


        <div
        >
          <div
            style={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

            }}
          >
            <img
              alt="success"
              src="/assets/images/checked.png"
              style={{ width: "3.5rem", height: "4rem" }}
            />
          </div>
          <div
            className="gx-font-weight-semi-bold gx-pt-1"
            style={{
              borderRadius: "9999px",
              fontSize: "1rem",
              textAlign: "center",

            }}
          >
            {betPlaceMessage ? betPlaceMessage : "Bet Placed Successfully"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //  paddingTop: "0.75rem",
              //  paddingBottom: "0.75rem",
            }}
          >
            <Button
              style={{
                fontWeight: "600",
                borderRadius: "0.25rem",
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
              className="gx-text-red  gx-px-2 gx-rounded-xxl gx-mt-4"
              onClick={() => onConfirm()}
            >
              ok
            </Button>
          </div>
        </div>


      )}
      {betStatusUpdate === "error" && (

        <div
        >
          <div
            style={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

            }}
          >
            <img
              alt="success"
              src="/assets/images/error-toest.png"
              style={{ width: "3.5rem", height: "4rem" }}
            />
          </div>
          <div
            className="gx-text-black"
            style={{
              borderRadius: "9999px",
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: "bold",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              paddingTop: "0.5rem"

            }}
          >
            {betPlaceMessage ? betPlaceMessage : "Bet not Placed !"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //  paddingTop: "0.75rem",
              //  paddingBottom: "0.75rem",
            }}
          >
            <Button
              style={{
                fontWeight: "600",
                borderRadius: "0.25rem",
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
              className="gx-text-red  gx-px-2 gx-rounded-xxl gx-mt-4"
              onClick={() => onConfirm()}
            >
              ok
            </Button>
          </div>
        </div>

      )}
    </Modal>
  );
};

export default AlertModal;

