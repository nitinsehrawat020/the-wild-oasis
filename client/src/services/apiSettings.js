import { SummaryApi } from "../common/summaryApi";
import Axios from "../utils/axios";
import supabase from "./supabase";

export async function getSettings() {
  const res = await Axios({
    ...SummaryApi.settings.getSettings,
  });
  return res.data.data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const res = await Axios({
    ...SummaryApi.settings.patchSettings,
    data: { newSetting },
  });
  return res.data.data;
}
