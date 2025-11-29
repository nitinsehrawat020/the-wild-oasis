import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: "bookings",
      });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
