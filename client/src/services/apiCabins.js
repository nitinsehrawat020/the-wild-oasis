import { SummaryApi } from "../common/summaryApi";
import Axios from "../utils/axios";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const res = await Axios({ ...SummaryApi.cabins.getCabins });
  return res.data.data;
}

export async function createEditCabin(newCabin, id) {
  const hasImage = newCabin.image?.includes("cloudinary");

  let res;

  if (!id) {
    res = await Axios({
      ...SummaryApi.cabins.createCabin,
      data: { ...newCabin },
    });
  }

  if (id)
    res = await Axios({
      ...SummaryApi.cabins.editCabin(id),
      data: { ...newCabin },
    });

  return res.data.data;
}

export async function deleteCabin(id) {
  const res = await Axios({ ...SummaryApi.cabins.deleteCabin(id) });

  return res.data.data;
}
