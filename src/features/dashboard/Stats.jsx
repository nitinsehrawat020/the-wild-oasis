import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "../cabins/useCabins";

function Stats({ bookings, confirmeStays }) {
  const [searchParam] = useSearchParams();
  const { cabins } = useCabins();
  const numNights = searchParam.get("last");
  const numCabins = cabins?.length;

  const totalNight = numNights * numCabins;

  //1.
  const numBookings = bookings.length;

  //2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3.
  const checkins = confirmeStays.length;

  //4.
  const occupation =
    confirmeStays.reduce((acc, cur) => acc + cur.numNights, 0) / totalNight;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
