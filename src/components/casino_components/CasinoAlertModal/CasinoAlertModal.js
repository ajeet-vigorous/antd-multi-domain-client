import { Button } from "antd";


function CasinoAlertModal({onConfirm, alertStatus}) {
    return (
      <>
        {alertStatus.type === "success" && 
        <div
          style={{
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: 2000,
            overflow: "hidden",
            marginTop: 0,
            paddingTop: "1rem",
            overflowY: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: "0.25rem",
          }}
          className="gx-position-fixed , gx-bg-flex gx-justify-content-center gx-align-items-center"
        >
          <div
            style={{
              marginRight: "0",
              marginLeft: "auto",
              marginRight: "auto",
              paddingRight: "1rem",
              maxWidth: "59%",
            }}
            className=" gx-bg-flex  gx-justify-content-center gx-align-items-center gx-w-100"
          >
            <div
              style={{
                borderRadius: "0.5rem",
                position: "relative",
                height: "auto",
                width: "100%",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
              }}
              className="gx-bg-primary gx-text-white"
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
                  style={{ width: "2.5rem", height: "3rem" }}
                />
              </div>
              <div
              className="gx-font-weight-semi-bold"
                style={{
                  borderRadius: "9999px",
                  fontSize: "1rem",
                  textAlign: "center",

                }}
              >
              {alertStatus .message}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                }}
              >
                <Button
                  style={{
                    fontWeight: "600",
                    borderRadius: "0.25rem",
                  }}
                  className="gx-text-red gx-rounded-xxl"
                  onClick={() => onConfirm()}
                >
                  ok
                </Button>
              </div>
            </div>
          </div>
        </div>
        } 
        {alertStatus.type === "error" && 
         <div
         style={{
           width: "100vw",
           height: "100vh",
           top: 0,
           zIndex: 2000,
           left:0,
           overflow: "hidden",
           marginTop: 0,
           paddingTop: "1rem",
           overflowY: "auto",
           backgroundColor: "rgba(0, 0, 0, 0.4)",
           padding: "0.25rem",
         }}
         className="gx-position-fixed , gx-bg-flex gx-justify-content-center gx-align-items-center"
       >
         <div
           style={{
             marginRight: "0",
             marginLeft: "auto",
             marginRight: "auto",
             paddingRight: "1rem",
             maxWidth: "59%",
           }}
           className=" gx-bg-flex gx-justify-content-center gx-align-items-center gx-w-100"
         >
           <div
           className="gx-bg-red"
             style={{
               borderRadius: "0.5rem",
               position: "relative",
               height: "auto",
               width: "100%",
               padding: "0.5rem 1rem",
               boxShadow: "0 10px 15px rgba(0, 0, 0, 0.5)",
               boxSizing: "border-box",
             }}
           >
             <div
             className="gx-text-white"
               style={{
                 borderRadius: "9999px",
                 fontSize: "1rem",
                 textAlign: "center",
                 fontWeight: "bold",
                 paddingLeft: "0.5rem",
                 paddingRight: "0.5rem",
     
               }}
             >
               {alertStatus.message}
             </div>
             <div
               style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 paddingTop: "0.75rem",
                 paddingBottom: "0.75rem",
               }}
             >
               <Button
                  style={{
                    fontWeight: "600",
                    borderRadius: "0.25rem",
                  }}
                  className="gx-text-red gx-rounded-xxl"
                  onClick={() => onConfirm()}
                >
                  ok
                </Button>
             </div>
           </div>
         </div>
       </div>
         }
      </>
    );
  }
  
  export default CasinoAlertModal;
  