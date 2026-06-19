
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};

export default Spinner;