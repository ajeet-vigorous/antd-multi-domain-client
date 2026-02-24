
import settings from "../../../domainConfig";
import MatchDetailsBalaji from "./Balaji";
import MatchDetailsOther from "./Other";


const MatchDetails = () => {
  return settings.domainName === "BALAJI12" ? <MatchDetailsBalaji /> : <MatchDetailsOther />
}
export default MatchDetails;






