import { pingServer } from "../services/apiPing";

function Ping() {
  pingServer();
  return <div>hello</div>;
}

export default Ping;
