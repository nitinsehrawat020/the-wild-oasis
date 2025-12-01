import { SummaryApi } from "../common/summaryApi";
import Axios from "../utils/axios";

export async function pingServer() {
  const res = await Axios({
    ...SummaryApi.ping.ping,
  });

  return res;
}
