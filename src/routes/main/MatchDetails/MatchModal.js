// import React, { useEffect, useState } from "react";
// import { Button, Modal } from "antd";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const MatchModal = ({ handleClose, datalist, marketId }) => {
//   const history = useHistory();
//   const[matchData ,setMatchData] = useState("")

//   const parseMatchDate = (dateString) => {

//     const [datePart, timePart] = dateString.split(' ');
//     const [day, month, year] = datePart.split('-');
//     const [hours, minutes] = timePart.split(':');
//     const isPM = timePart.includes('PM');

//     let hour = parseInt(hours, 10);
//     if (isPM && hour !== 12) hour += 12;
//     if (!isPM && hour === 12) hour = 0;

//     return new Date(year, month - 1, day, hour, minutes);
//   };

//   let adminMatchList = JSON.parse(localStorage.getItem('matchList'));
//   useEffect(() => {
//     let matchListData = adminMatchList ? adminMatchList : datalist;
//     if (matchListData) {
//       const data = matchListData?.map((item, index) => ({
//         key: item._id,
//         sn: index + 1,
//         name: item.matchName,
//         matchDate: item.matchDate,
//         seriesName: item.seriesName,
//         inplay: item.status,
//         matchName: item.matchName,
//         marketId: item.marketId,
//         eventId: item.eventId,
//         cacheUrl: item.cacheUrl

//       })).sort((a, b) => parseMatchDate(a.matchDate) - parseMatchDate(b.matchDate));
//       setMatchData(data);
//     }
//   }, [datalist]);

//   return (
//     <Modal
//       open={true}
//       title={`All matches`}
//       onCancel={handleClose}
//       footer={
//         <Button
//           className="gx-bg-grey gx-text-white gx-border-redius0"
//           onClick={() => handleClose()}
//         >
//           CLOSE
//         </Button>
//       }
//       className="gx-px-3"
//     >
//       <div className="bg-gx-flex  gx-flex-column">
//         {matchData &&
//           matchData.length > 0 &&
//           matchData
//             .filter((ele) => {
//               return ele.marketId !== marketId;
//             })
//             ?.map((ele, index) => {
//               return (
//                 <div
//                 key={index}
//                   onClick={() =>
//                     {history.push(
//                       `/main/match-deatils/${ele.marketId}/${ele.eventId}`
//                     );
//                   handleClose()
//                   }
//                   }
//                   // /${ele.cacheUrl}
//                   className=" gx-px-2 gx-py-2 gx-my-2 gx-w-100 gx-bg-grey gx-flex-column  gx-rounded-xxl gx-font-weight-semi-bold gx-text-white bg-gx-flex gx-justify-content-center gx-align-items-center"
//                 >
//                   <span className="gx-py-1">{ele.matchName}</span>
//                   <span className="gx-py-1"> 
//                   {/* {/ &#128337; /} */}
//                      {ele.matchDate}</span>
//                 </div>
//               );
//             })}
//       </div>
//     </Modal>
//   );
// };

// export default MatchModal;


import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

const MatchModal = ({ handleClose, datalist, marketId }) => {
  const history = useHistory();
  const [matchData, setMatchData] = useState([]);
  const [error, setError] = useState(null);

  // const parseMatchDate = (dateString) => {
  //   try {
  //     const [datePart, timePart] = dateString.split(' ');
  //     const [day, month, year] = datePart.split('-');
  //     const [hours, minutes] = timePart.split(':');
  //     const isPM = timePart.includes('PM');

  //     let hour = parseInt(hours, 10);
  //     if (isPM && hour !== 12) hour += 12;
  //     if (!isPM && hour === 12) hour = 0;

  //     return new Date(year, month - 1, day, hour, minutes);
  //   } catch (error) {
  //     console.error('Error parsing date:', error);
  //     return new Date(); // Return current date as fallback
  //   }
  // };

  const parseMatchDate = (dateString) => {
    if (!dateString) return null; // Handle empty case
    const [datePart, timePart] = dateString.split(' ');

    if (!timePart) return null; // Handle cases with only date

    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    const isPM = timePart.includes('PM');

    let hour = parseInt(hours, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    return new Date(year, month - 1, day, hour, minutes);
  };

  const sortMatchData = (data) => {
    return data?.sort((a, b) => {
      const dateA = parseMatchDate(a.matchDate);
      const dateB = parseMatchDate(b.matchDate);
      const isAM_A = a.matchDate.includes('AM');
      const isAM_B = b.matchDate.includes('AM');
      const hasTimeA = a.matchDate.includes(':');
      const hasTimeB = b.matchDate.includes(':');

      // Check for valid AM/PM and time
      const isValidA = !!dateA && (isAM_A || a.matchDate.includes('PM'));
      const isValidB = !!dateB && (isAM_B || b.matchDate.includes('PM'));

      // Sort based on AM/PM status and valid dates
      if (isValidA && isValidB) {
        if (isAM_A && !isAM_B) return -1; // A is AM, B is PM
        if (!isAM_A && isAM_B) return 1;  // A is PM, B is AM
        return dateA - dateB; // Both valid, sort by date
      } else if (isValidA) {
        return -1; // A is valid, B is invalid
      } else if (isValidB) {
        return 1; // B is valid, A is invalid
      } else {
        // Both invalid or without AM/PM
        if (!isAM_A && !isAM_B) {
          // Both are invalid, but A has time and B does not
          if (hasTimeA && !hasTimeB) return 1; // A goes last
          if (!hasTimeA && hasTimeB) return -1; // B goes last
          return 0; // Both go last
        }
        return 0; // Both invalid or both with no time
      }
    });
  };

  let adminMatchList = JSON.parse(localStorage.getItem('matchList'));

  useEffect(() => {
    try {
      let matchListData = adminMatchList ? adminMatchList : datalist;
      if (matchListData) {
        const data = matchListData.map((item, index) => ({
          key: item._id,
          sn: index + 1,
          name: item.matchName,
          matchDate: item.matchDate,
          seriesName: item.seriesName,
          inplay: item.status,
          matchName: item.matchName,
          marketId: item.marketId,
          eventId: item.eventId,
          cacheUrl: item.cacheUrl
        })).sort((a, b) => moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").isBefore(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss")) ? -1 : 1);

        // setMatchData(data);
        // const sortedData = sortMatchData(data);
        setMatchData(data);
      }
    } catch (error) {
      console.error('Error processing match data:', error);
      setError('Failed to load match data');
    }
  }, [datalist]);

  return (
    <Modal
      open={true}
      title={`All matches`}
      onCancel={handleClose}
      footer={
        <Button
          className="gx-bg-grey gx-text-white gx-border-redius0"
          onClick={() => handleClose()}
        >
          CLOSE
        </Button>
      }
      className="gx-px-3"
    >
      <div className="bg-gx-flex gx-flex-column">
        {error && <div className="error-message">{error}</div>}
        {matchData.length > 0 ? (
          matchData
            .filter((ele) => ele.marketId !== marketId)
            .map((ele, index) => (
              <a
                key={index}
                // onClick={(e) => {
                //   e.preventDefault(); // Prevent default anchor behavior
                //   history.push(`/main/match-deatils/${ele.marketId}/${ele.eventId}`);
                //   handleClose();
                // }}
                className="gx-px-2 gx-py-2 gx-my-2 gx-w-100 gx-bg-grey gx-flex-column gx-rounded-xxl gx-font-weight-semi-bold gx-text-white bg-gx-flex gx-justify-content-center gx-align-items-center"
                href={`/main/match-deatils/${ele.marketId}/${ele.eventId}`} // Optional: for accessibility
              >
                <span className="gx-py-1">{ele.matchName}</span>
                <span className="gx-py-1">{moment(ele.matchDate, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY hh:mm A")}</span>
              </a>

              // <div
              //   key={index}
              //   onClick={() => {
              //     history.push(`/main/match-deatils/${ele.marketId}/${ele.eventId}`);
              //     handleClose();
              //   }}
              //   className="gx-px-2 gx-py-2 gx-my-2 gx-w-100 gx-bg-grey gx-flex-column gx-rounded-xxl gx-font-weight-semi-bold gx-text-white bg-gx-flex gx-justify-content-center gx-align-items-center"
              // >
              //   <span className="gx-py-1">{ele.matchName}</span>
              //   <span className="gx-py-1">{ele.matchDate}</span>
              // </div>
            ))
        ) : (
          <div>No matches available</div>
        )}
      </div>
    </Modal>
  );
};

export default MatchModal;
